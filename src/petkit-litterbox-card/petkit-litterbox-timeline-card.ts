import { HassEntity } from "home-assistant-js-websocket";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { assert } from "superstruct";
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../ha";
import { registerCustomCard } from "../utils/custom-cards";
import {
  PETKIT_LITTERBOX_STATE_DOMAINS,
  PETKIT_TIMELINE_CARD_EDITOR_NAME,
  PETKIT_TIMELINE_CARD_NAME,
} from "./const";
import {
  PetkitLitterboxTimelineCardConfig,
  petkitLitterboxTimelineCardConfigStruct,
} from "./petkit-litterbox-timeline-card-config";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawStateItem {
  state: string;
  last_changed: string;
}

type EventSource = "primary" | "secondary";

interface TimelineEvent {
  state: string;
  startTime: Date;
  durationSeconds: number;
  isCurrent: boolean;
  source: EventSource;
}

interface StateMeta {
  icon: string;
  cssClass: string;
}

// ─── State metadata ───────────────────────────────────────────────────────────

const STATE_META: Record<string, StateMeta> = {
  cleaning: { icon: "mdi:broom", cssClass: "state-clean" },
  scooping: { icon: "mdi:broom", cssClass: "state-clean" },
  dumping: { icon: "mdi:delete-empty", cssClass: "state-clean" },
  leveling: { icon: "mdi:layers-outline", cssClass: "state-clean" },
  odor_removal: { icon: "mdi:spray-bottle", cssClass: "state-odor" },
  deodorizing: { icon: "mdi:spray-bottle", cssClass: "state-odor" },
  maintenance: { icon: "mdi:tools", cssClass: "state-maint" },
  refreshing: { icon: "mdi:refresh", cssClass: "state-other" },
  resetting: { icon: "mdi:restart", cssClass: "state-other" },
  paused: { icon: "mdi:pause", cssClass: "state-idle" },
  idle: { icon: "mdi:sleep", cssClass: "state-idle" },
  error: { icon: "mdi:alert-circle", cssClass: "state-error" },
  fault: { icon: "mdi:alert-circle", cssClass: "state-error" },
};

const DEFAULT_META: StateMeta = {
  icon: "mdi:help-circle-outline",
  cssClass: "state-label",
};

function getStateMeta(s: string): StateMeta {
  return STATE_META[s] ?? DEFAULT_META;
}

// Palette for dynamically assigned per-label colors (cat names, etc.)
const LABEL_PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [236,  72, 153], // pink
  [ 16, 185, 129], // emerald
  [251, 146,  60], // orange
  [167, 139, 250], // violet
  [ 34, 211, 238], // cyan
  [250, 204,  21], // yellow
  [ 74, 222, 128], // green
  [248, 113, 113], // rose
] as const;

/** Default label: capitalize + replace underscores with spaces. */
function defaultLabel(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function processHistory(
  items: RawStateItem[],
  source: EventSource
): TimelineEvent[] {
  if (!items.length) return [];
  const now = new Date();
  return items
    .map((item, i) => {
      const startTime = new Date(item.last_changed);
      const nextTime =
        i + 1 < items.length ? new Date(items[i + 1].last_changed) : now;
      const durationSeconds =
        (nextTime.getTime() - startTime.getTime()) / 1000;
      return {
        state: item.state,
        startTime,
        durationSeconds,
        isCurrent: i === items.length - 1,
        source,
      };
    })
    .reverse(); // newest first
}

// ─── Registration ─────────────────────────────────────────────────────────────

registerCustomCard({
  type: PETKIT_TIMELINE_CARD_NAME,
  name: "Mushroom Petkit Timeline Card",
  description: "Event history timeline for Petkit litter boxes",
});

// ─── Card element ─────────────────────────────────────────────────────────────

@customElement(PETKIT_TIMELINE_CARD_NAME)
export class PetkitLitterboxTimelineCard
  extends LitElement
  implements LovelaceCard
{
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./petkit-litterbox-timeline-card-editor");
    return document.createElement(
      PETKIT_TIMELINE_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<PetkitLitterboxTimelineCardConfig> {
    const entities = Object.keys(hass.states);
    const candidate = entities.find(
      (e) =>
        PETKIT_LITTERBOX_STATE_DOMAINS.includes(e.split(".")[0]) &&
        (e.includes("litter") || e.includes("petkit") || e.includes("state"))
    );
    return {
      type: `custom:${PETKIT_TIMELINE_CARD_NAME}`,
      entity:
        candidate ??
        entities.find((e) => e.startsWith("sensor.")) ??
        "",
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: PetkitLitterboxTimelineCardConfig;
  @state() private _events: TimelineEvent[] = [];
  @state() private _loading = false;

  public setConfig(config: PetkitLitterboxTimelineCardConfig): void {
    assert(config, petkitLitterboxTimelineCardConfigStruct);
    this._config = config;
  }

  public getCardSize(): number {
    return this._config?.layout === "horizontal" ? 3 : 6;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config?.entity || !this.hass) return;

    if (changedProps.has("_config")) {
      void this._fetchHistory();
      return;
    }

    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
      if (!oldHass) {
        void this._fetchHistory();
        return;
      }
      const ids = [this._config.entity, this._config.secondary_entity].filter(
        (id): id is string => !!id
      );
      const changed = ids.some(
        (id) =>
          this.hass.states[id]?.last_changed !==
          oldHass.states[id]?.last_changed
      );
      if (changed) {
        void this._fetchHistory();
      }
    }
  }

  /** Return custom label override if set; falls back to unknown placeholder or default. */
  private _stateLabel(s: string): string {
    const key = (`label_${s}`) as keyof PetkitLitterboxTimelineCardConfig;
    const override = this._config![key] as string | undefined;
    if (override?.trim()) return override.trim();
    const normalized = s.toLowerCase();
    if (["unknown", "unavailable", "none", ""].includes(normalized)) {
      return this._config!.unknown_label?.trim() || "Gato";
    }
    return defaultLabel(s);
  }

  /**
   * Build a map of state value → "R, G, B" string for states not in STATE_META
   * (e.g. cat names). Colors are assigned from LABEL_PALETTE in first-appearance
   * order across the current events array.
   */
  private _buildLabelColorMap(): Map<string, string> {
    const map = new Map<string, string>();
    let idx = 0;
    for (const ev of this._events) {
      if (!STATE_META[ev.state] && !map.has(ev.state)) {
        const [r, g, b] = LABEL_PALETTE[idx % LABEL_PALETTE.length];
        map.set(ev.state, `${r}, ${g}, ${b}`);
        idx++;
      }
    }
    return map;
  }

  private async _fetchHistory(): Promise<void> {
    if (!this._config?.entity || !this.hass) return;
    this._loading = true;
    try {
      const hours = this._config.hours_to_show ?? 12;
      const startTime = new Date(Date.now() - hours * 3_600_000);
      const startIso = startTime.toISOString();
      const hideIdle = this._config.show_idle_events === false;

      const fetchOne = async (
        entityId: string,
        source: EventSource
      ): Promise<TimelineEvent[]> => {
        const eid = encodeURIComponent(entityId);
        const raw = await this.hass.callApi<RawStateItem[][]>(
          "GET",
          `history/period/${startIso}?filter_entity_id=${eid}&no_attributes=true&significant_changes_only=false`
        );
        const events = processHistory(raw?.[0] ?? [], source);
        return hideIdle ? events.filter((ev) => ev.state !== "idle") : events;
      };

      const jobs: Promise<TimelineEvent[]>[] = [
        fetchOne(this._config.entity, "primary"),
      ];
      if (this._config.secondary_entity) {
        jobs.push(fetchOne(this._config.secondary_entity, "secondary"));
      }
      const results = await Promise.all(jobs);
      // Merge and sort newest → oldest.
      this._events = results
        .flat()
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
    } catch (_) {
      this._events = [];
    } finally {
      this._loading = false;
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config?.entity || !this.hass) return nothing;

    const stateObj: HassEntity | undefined =
      this.hass.states[this._config.entity];
    const entityName =
      (stateObj?.attributes.friendly_name as string | undefined) ??
      this._config.entity;
    const hours = this._config.hours_to_show ?? 12;
    const layout = this._config.layout ?? "vertical";
    const hasSecondary = !!this._config.secondary_entity;
    const secondaryStateObj: HassEntity | undefined = hasSecondary
      ? this.hass.states[this._config.secondary_entity!]
      : undefined;
    const secondaryName = hasSecondary
      ? (secondaryStateObj?.attributes.friendly_name as string | undefined) ??
        this._config.secondary_entity!
      : "";

    const showIcon = this._config.show_header_icon !== false;
    const showTitle = this._config.show_header_title !== false;
    const showHours = this._config.show_header_hours !== false;
    const headerTitle = this._config.header_title?.trim() || entityName;
    const showHeader = showIcon || showTitle || showHours;
    const labelColorMap = this._buildLabelColorMap();
    // Horizontal layout does not support the two-column merge; render only
    // primary events there. Vertical merges both when a secondary is set.
    const visibleEvents =
      layout === "horizontal" && hasSecondary
        ? this._events.filter((ev) => ev.source === "primary")
        : this._events;

    return html`
      <ha-card>
        ${showHeader
          ? html`
              <div class="card-header">
                ${showIcon
                  ? html`<ha-icon class="header-icon" icon="mdi:history"></ha-icon>`
                  : nothing}
                ${showTitle
                  ? html`<span class="card-title">${headerTitle}</span>`
                  : nothing}
                ${showHours
                  ? html`<span class="hours-badge">${hours}h</span>`
                  : nothing}
              </div>
            `
          : nothing}
        <div class="card-content">
          ${this._loading
            ? html`<div class="placeholder">
                <div class="placeholder-icon">
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                </div>
              </div>`
            : visibleEvents.length === 0
            ? html`<div class="placeholder">
                <ha-icon icon="mdi:history"></ha-icon>
                <span>No events in the last ${hours}h</span>
              </div>`
            : layout === "horizontal"
            ? this._renderHorizontal(visibleEvents, labelColorMap)
            : hasSecondary
            ? this._renderVerticalTwoColumn(
                visibleEvents,
                labelColorMap,
                entityName,
                secondaryName
              )
            : this._renderVertical(visibleEvents, labelColorMap)}
        </div>
      </ha-card>
    `;
  }

  // ── Vertical (single column) ────────────────────────────────────────────────

  private _renderVertical(
    sourceEvents: TimelineEvent[],
    labelColorMap: Map<string, string>
  ): TemplateResult {
    const events = this._config!.reverse_order
      ? [...sourceEvents].reverse() // oldest → top
      : sourceEvents;               // newest → top (default)
    return html`
      <div class="timeline-v">
        ${events.map((ev, i) =>
          this._renderVerticalItem(ev, i === events.length - 1, labelColorMap)
        )}
      </div>
    `;
  }

  private _renderVerticalItem(
    ev: TimelineEvent,
    isLast: boolean,
    labelColorMap: Map<string, string>
  ): TemplateResult {
    const meta = getStateMeta(ev.state);
    const labelColor = labelColorMap.get(ev.state);
    const showTime = this._config!.show_event_time !== false;
    const showDuration = this._config!.show_event_duration !== false;
    return html`
      <div class="v-item ${meta.cssClass}"
           style=${labelColor ? `--ev-rgb: ${labelColor}` : nothing}>
        <div class="v-rail">
          <div class="dot ${ev.isCurrent ? "current" : ""}"></div>
          ${!isLast ? html`<div class="v-line"></div>` : nothing}
        </div>
        <div class="v-content">
          <div class="ev-header">
            <span class="ev-state">${this._stateLabel(ev.state)}</span>
            ${ev.isCurrent
              ? html`<span class="badge-now">Now</span>`
              : nothing}
          </div>
          ${showTime || showDuration
            ? html`<div class="ev-meta">
                ${showTime
                  ? html`<span class="ev-time">${formatTime(ev.startTime)}</span>`
                  : nothing}
                ${showDuration
                  ? html`<span class="ev-dur">${formatDuration(ev.durationSeconds)}</span>`
                  : nothing}
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  // ── Vertical (two columns: primary | rail | secondary) ─────────────────────

  private _renderVerticalTwoColumn(
    sourceEvents: TimelineEvent[],
    labelColorMap: Map<string, string>,
    primaryName: string,
    secondaryName: string
  ): TemplateResult {
    const events = this._config!.reverse_order
      ? [...sourceEvents].reverse() // oldest → top
      : sourceEvents;               // newest → top (default)
    return html`
      <div class="timeline-v2">
        <div class="v2-legend">
          <span class="v2-legend-label v2-legend-left">${primaryName}</span>
          <span class="v2-legend-rail"></span>
          <span class="v2-legend-label v2-legend-right">${secondaryName}</span>
        </div>
        ${events.map((ev, i) =>
          this._renderVerticalTwoColumnItem(
            ev,
            i === events.length - 1,
            labelColorMap
          )
        )}
      </div>
    `;
  }

  private _renderVerticalTwoColumnItem(
    ev: TimelineEvent,
    isLast: boolean,
    labelColorMap: Map<string, string>
  ): TemplateResult {
    const meta = getStateMeta(ev.state);
    const labelColor = labelColorMap.get(ev.state);
    const showTime = this._config!.show_event_time !== false;
    const showDuration = this._config!.show_event_duration !== false;
    const isPrimary = ev.source === "primary";
    const content = html`
      <div class="ev-header">
        <span class="ev-state">${this._stateLabel(ev.state)}</span>
        ${ev.isCurrent
          ? html`<span class="badge-now">Now</span>`
          : nothing}
      </div>
      ${showTime || showDuration
        ? html`<div class="ev-meta">
            ${showTime
              ? html`<span class="ev-time">${formatTime(ev.startTime)}</span>`
              : nothing}
            ${showDuration
              ? html`<span class="ev-dur">${formatDuration(ev.durationSeconds)}</span>`
              : nothing}
          </div>`
        : nothing}
    `;
    return html`
      <div class="v2-item ${meta.cssClass} ${isPrimary ? "src-primary" : "src-secondary"}"
           style=${labelColor ? `--ev-rgb: ${labelColor}` : nothing}>
        <div class="v2-left">
          ${isPrimary ? content : nothing}
        </div>
        <div class="v2-rail">
          <div class="dot ${ev.isCurrent ? "current" : ""}"></div>
          ${!isLast ? html`<div class="v-line"></div>` : nothing}
        </div>
        <div class="v2-right">
          ${!isPrimary ? content : nothing}
        </div>
      </div>
    `;
  }

  // ── Horizontal ──────────────────────────────────────────────────────────────

  private _renderHorizontal(
    sourceEvents: TimelineEvent[],
    labelColorMap: Map<string, string>
  ): TemplateResult {
    // Default: oldest → newest (left → right). reverse_order flips to newest → oldest.
    const events = this._config!.reverse_order
      ? [...sourceEvents]            // newest → left
      : [...sourceEvents].reverse(); // oldest → left (default)
    return html`
      <div class="timeline-h">
        ${events.map((ev, i) =>
          this._renderHorizontalItem(ev, i, events.length, labelColorMap)
        )}
      </div>
    `;
  }

  private _renderHorizontalItem(
    ev: TimelineEvent,
    index: number,
    total: number,
    labelColorMap: Map<string, string>
  ): TemplateResult {
    const meta = getStateMeta(ev.state);
    const labelColor = labelColorMap.get(ev.state);
    const isFirst = index === 0;
    const isLast = index === total - 1;
    const showTime = this._config!.show_event_time !== false;
    const showDuration = this._config!.show_event_duration !== false;
    return html`
      <div class="h-item ${meta.cssClass}"
           style=${labelColor ? `--ev-rgb: ${labelColor}` : nothing}>
        <div class="h-dot-row">
          <div class="${isFirst ? "h-spacer" : "h-line"}"></div>
          <div class="dot ${ev.isCurrent ? "current" : ""}"></div>
          <div class="${isLast ? "h-spacer" : "h-line"}"></div>
        </div>
        <div class="h-content">
          <span class="h-state">${this._stateLabel(ev.state)}</span>
          ${showTime
            ? html`<span class="h-time">${formatTime(ev.startTime)}</span>`
            : nothing}
          ${showDuration
            ? html`<span class="h-dur">${formatDuration(ev.durationSeconds)}</span>`
            : nothing}
        </div>
      </div>
    `;
  }

  // ── Styles ──────────────────────────────────────────────────────────────────

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
      }

      /* ── Header ── */
      .card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 16px 12px;
        border-bottom: 1px solid var(--divider-color);
      }
      .header-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }
      .card-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hours-badge {
        font-size: 11px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        padding: 2px 8px;
        border-radius: 999px;
        flex-shrink: 0;
        letter-spacing: 0.3px;
        font-weight: 500;
      }

      /* ── Card content ── */
      .card-content {
        padding: 0;
      }

      /* ── Placeholder (loading / empty) ── */
      .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 32px 16px;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
      .placeholder ha-icon {
        --mdc-icon-size: 28px;
        opacity: 0.4;
      }
      .placeholder-icon ha-icon {
        --mdc-icon-size: 28px;
        opacity: 0.4;
        animation: spin 1.5s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* ── State color classes (inherit via CSS custom prop) ── */
      .state-clean { --ev-rgb: var(--rgb-state-vacuum, 3, 155, 229); }
      .state-odor  { --ev-rgb: 103, 58, 183; }
      .state-maint { --ev-rgb: 245, 158, 11; }
      .state-other { --ev-rgb: 59, 130, 246; }
      .state-idle  { --ev-rgb: var(--rgb-disabled-color, 158, 158, 158); }
      .state-error { --ev-rgb: 244, 67, 54; }
      /* Dynamically colored labels (cat names etc.) — --ev-rgb injected inline */
      .state-label { --ev-rgb: 158, 158, 158; }

      /* ── Shared: dot ── */
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgb(var(--ev-rgb));
        box-shadow: 0 0 0 3px rgba(var(--ev-rgb), 0.2);
        flex-shrink: 0;
        position: relative;
        z-index: 1;
      }
      .dot.current {
        animation: pulse-dot 2.2s ease-in-out infinite;
      }
      @keyframes pulse-dot {
        0%, 100% { box-shadow: 0 0 0 3px rgba(var(--ev-rgb), 0.2); }
        50%       { box-shadow: 0 0 0 8px rgba(var(--ev-rgb), 0.32); }
      }

      /* ── Vertical layout ── */
      .timeline-v {
        padding: 16px 16px 8px;
        display: flex;
        flex-direction: column;
      }
      .v-item {
        display: grid;
        grid-template-columns: 22px 1fr;
        gap: 0 12px;
      }
      .v-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 5px;
      }
      .v-line {
        width: 2px;
        flex: 1;
        min-height: 10px;
        background: var(--divider-color);
        margin-top: 5px;
      }
      .v-content {
        padding-bottom: 16px;
      }
      .ev-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .ev-state {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
        flex: 1;
      }
      .badge-now {
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: rgb(var(--ev-rgb));
        background: rgba(var(--ev-rgb), 0.12);
        padding: 2px 7px;
        border-radius: 999px;
        flex-shrink: 0;
      }
      .ev-meta {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 4px;
      }
      .ev-time {
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .ev-dur {
        font-size: 11px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
        padding: 1px 6px;
        border-radius: 999px;
      }

      /* ── Vertical two-column layout (primary | rail | secondary) ── */
      .timeline-v2 {
        padding: 12px 16px 8px;
        display: flex;
        flex-direction: column;
      }
      .v2-legend {
        display: grid;
        grid-template-columns: 1fr 22px 1fr;
        gap: 0 12px;
        align-items: center;
        padding-bottom: 8px;
        margin-bottom: 4px;
        border-bottom: 1px dashed var(--divider-color);
      }
      .v2-legend-label {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.3px;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .v2-legend-left  { text-align: right; }
      .v2-legend-right { text-align: left; }
      .v2-item {
        display: grid;
        grid-template-columns: 1fr 22px 1fr;
        gap: 0 12px;
      }
      .v2-left {
        text-align: right;
        padding-bottom: 14px;
      }
      .v2-right {
        text-align: left;
        padding-bottom: 14px;
      }
      /* Right-align content in the .v2-left column */
      .v2-left .ev-header,
      .v2-left .ev-meta {
        justify-content: flex-end;
      }
      .v2-left .ev-state {
        flex: 0 0 auto;
      }
      .v2-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 5px;
      }

      /* ── Horizontal layout ── */
      .timeline-h {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: 16px 0 16px;
      }
      .timeline-h::-webkit-scrollbar {
        display: none;
      }
      .h-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        min-width: 76px;
        max-width: 76px;
      }
      .h-item:first-child {
        padding-left: 16px;
        min-width: 92px;
        max-width: 92px;
      }
      .h-item:last-child {
        padding-right: 16px;
        min-width: 92px;
        max-width: 92px;
      }
      .h-dot-row {
        display: flex;
        align-items: center;
        width: 100%;
        height: 18px;
        margin-bottom: 8px;
      }
      .h-line {
        flex: 1;
        height: 2px;
        background: var(--divider-color);
      }
      .h-spacer {
        flex: 1;
      }
      .h-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        width: 100%;
        padding: 0 2px;
        box-sizing: border-box;
      }
      .h-state {
        font-size: 10px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
      .h-time {
        font-size: 10px;
        color: var(--secondary-text-color);
        text-align: center;
        white-space: nowrap;
      }
      .h-dur {
        font-size: 10px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
        padding: 1px 5px;
        border-radius: 999px;
        white-space: nowrap;
      }
    `;
  }
}
