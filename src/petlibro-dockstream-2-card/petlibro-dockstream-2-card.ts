import { HassEntity } from "home-assistant-js-websocket";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { assert } from "superstruct";
import {
  actionHandler,
  ActionHandlerEvent,
  handleAction,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
} from "../ha";
import { registerCustomCard } from "../utils/custom-cards";
import {
  PETLIBRO_DOCKSTREAM_2_CARD_EDITOR_NAME,
  PETLIBRO_DOCKSTREAM_2_CARD_NAME,
} from "./const";
import {
  PetlibroDockstream2CardConfig,
  petlibroDockstream2CardConfigStruct,
} from "./petlibro-dockstream-2-card-config";
import { PETLIBRO_DOCKSTREAM_2_IMAGE_URL } from "./assets/petlibro-dockstream-2-image";

// ─── State metadata ───────────────────────────────────────────────────────────

/** Map select-option values → badge state-key. */
const MODE_STATES = new Set([
  "Flowing Water (Constant)",
  "Intermittent Water (Scheduled)",
  "Sensor-Activated (Near)",
  "Sensor-Activated (Far)",
  "Off",
]);

const STATE_ICONS: Record<string, string> = {
  // Binary-sensor friendly states
  on: "mdi:water",
  off: "mdi:water-off",
  // Select-based modes
  "Flowing Water (Constant)": "mdi:waves-arrow-right",
  "Intermittent Water (Scheduled)": "mdi:timer-sand",
  "Sensor-Activated (Near)": "mdi:motion-sensor",
  "Sensor-Activated (Far)": "mdi:radar",
  Off: "mdi:power",
  // Generic / unknown
  idle: "mdi:sleep",
  unavailable: "mdi:cloud-alert",
  unknown: "mdi:help-circle-outline",
};

const STATE_RGB: Record<string, string> = {
  on: "var(--rgb-state-water, 3, 169, 244)",
  off: "158, 158, 158",
  "Flowing Water (Constant)": "var(--rgb-state-water, 3, 169, 244)",
  "Intermittent Water (Scheduled)": "var(--rgb-state-water, 3, 169, 244)",
  "Sensor-Activated (Near)": "103, 58, 183",
  "Sensor-Activated (Far)": "103, 58, 183",
  Off: "158, 158, 158",
  idle: "158, 158, 158",
  unavailable: "245, 158, 11",
  unknown: "158, 158, 158",
};

const DEFAULT_STATE_ICON = "mdi:help-circle-outline";
const DEFAULT_STATE_RGB = "158, 158, 158";

const ACTIVE_STATES = new Set([
  "on",
  "Flowing Water (Constant)",
  "Intermittent Water (Scheduled)",
  "Sensor-Activated (Near)",
  "Sensor-Activated (Far)",
]);

/** SVG ring circumference for r=26. */
const CIRCUMFERENCE = 2 * Math.PI * 26;

function ringDash(pct: number): string {
  const filled = Math.min(100, Math.max(0, pct));
  return `${((CIRCUMFERENCE * filled) / 100).toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`;
}

function defaultLabel(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

function stateBadgeKey(s: string): string {
  return MODE_STATES.has(s) ? s : s.toLowerCase();
}

// ─── Registration ─────────────────────────────────────────────────────────────

registerCustomCard({
  type: PETLIBRO_DOCKSTREAM_2_CARD_NAME,
  name: "Mushroom Petlibro Dockstream 2 Card",
  description:
    "Device hero card with sensor stats for the Petlibro Dockstream 2 Smart Fountain (PLWF106 / PLWF116 cordless)",
});

// ─── Card element ─────────────────────────────────────────────────────────────

@customElement(PETLIBRO_DOCKSTREAM_2_CARD_NAME)
export class PetlibroDockstream2Card
  extends LitElement
  implements LovelaceCard
{
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./petlibro-dockstream-2-card-editor");
    return document.createElement(
      PETLIBRO_DOCKSTREAM_2_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return { type: `custom:${PETLIBRO_DOCKSTREAM_2_CARD_NAME}`, entity: "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: PetlibroDockstream2CardConfig;

  public setConfig(config: PetlibroDockstream2CardConfig): void {
    assert(config, petlibroDockstream2CardConfigStruct);
    this._config = config;
  }

  public getCardSize(): number {
    return 6;
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const cfg = this._config;

    const stateObj = this.hass.states[cfg.entity] as HassEntity | undefined;

    // Resolve picture URL: config override → undefined (falls back to asset).
    const picture = cfg.picture || undefined;

    const showName = cfg.show_name !== false;
    const showState = cfg.show_state !== false;

    const titleText =
      cfg.title?.trim() ||
      stateObj?.attributes?.friendly_name ||
      cfg.entity;

    // Resolve a state badge even when the primary entity is a sensor (e.g.
    // weight %) — prefer dispensing binary sensor, then mode select, then the
    // primary entity.
    const badgeSource =
      this.hass.states[cfg.dispensing_entity ?? ""] ??
      this.hass.states[cfg.mode_entity ?? ""] ??
      stateObj;
    const badgeState = badgeSource ? String(badgeSource.state) : "";

    return html`
      <ha-card>
        ${showName || (showState && badgeSource)
          ? html`
              <div class="card-header">
                ${showName
                  ? html`<span class="card-title">${titleText}</span>`
                  : nothing}
                ${showState && badgeSource
                  ? this._renderStateBadge(badgeState)
                  : nothing}
              </div>
            `
          : nothing}
        ${this._renderHero(picture)}
        ${this._renderMetrics()}
        ${this._renderActions()}
      </ha-card>
    `;
  }

  // ─── Hero ─────────────────────────────────────────────────────────────────

  private _renderHero(picture: string | undefined): TemplateResult {
    const imgUrl = picture ?? PETLIBRO_DOCKSTREAM_2_IMAGE_URL;
    return html`
      <div class="hero" style=${styleMap({ backgroundImage: `url('${imgUrl}')` })}>
        <div class="hero-gradient"></div>
      </div>
    `;
  }

  // ─── Metrics ──────────────────────────────────────────────────────────────

  private _renderMetrics(): TemplateResult | typeof nothing {
    const cfg = this._config;

    // Primary ring slot (water level %).
    const primary = cfg.water_level_entity
      ? this._renderRingChipEntity(
          cfg.water_level_entity,
          "mdi:water-percent",
          "Water Level",
          this._waterPctColor()
        )
      : nothing;

    // Secondary metric tiles laid out in a 2-column grid.
    const tiles: (TemplateResult | typeof nothing)[] = [];
    const tileDefs: Array<{
      key?: string;
      icon: string;
      label: string;
      unitHint?: string;
      accent?: string;
    }> = [
      {
        key: cfg.water_volume_entity,
        icon: "mdi:water",
        label: "Remaining Water",
        accent: "59, 130, 246",
      },
      {
        key: cfg.today_water_entity,
        icon: "mdi:cup-water",
        label: "Today",
        accent: "3, 169, 244",
      },
      {
        key: cfg.yesterday_water_entity,
        icon: "mdi:cup-water-outline",
        label: "Yesterday",
        accent: "156, 163, 175",
      },
      {
        key: cfg.filter_days_entity,
        icon: "mdi:air-filter",
        label: "Filter",
        accent: "76, 175, 80",
      },
      {
        key: cfg.cleaning_days_entity,
        icon: "mdi:broom",
        label: "Cleaning",
        accent: "255, 152, 0",
      },
      {
        key: cfg.battery_entity,
        icon: "mdi:battery",
        label: "Battery",
        accent: "139, 195, 74",
      },
    ];
    for (const def of tileDefs) {
      if (def.key) {
        tiles.push(this._renderTileEntity(def.key!, def.icon, def.label, def.accent!));
      }
    }

    // Status pills row — connectivity, power, dispensing, mode.
    const pills: (TemplateResult | typeof nothing)[] = [];
    const pillDefs: Array<{ key?: string; icon: string; label: string; isBinary?: boolean }> = [
      { key: cfg.connectivity_entity, icon: "mdi:wifi", label: "Wi-Fi", isBinary: true },
      { key: cfg.power_entity, icon: "mdi:power-plug", label: "Power", isBinary: true },
      { key: cfg.dispensing_entity, icon: "mdi:water-pump", label: "Dispensing", isBinary: true },
      { key: cfg.mode_entity, icon: "mdi:waves", label: "Mode", isBinary: false },
    ];
    for (const def of pillDefs) {
      if (def.key) {
        pills.push(
          this._renderPillEntity(def.key!, def.icon, def.label, !!def.isBinary)
        );
      }
    }

    if (primary === nothing && tiles.length === 0 && pills.length === 0) {
      return nothing;
    }

    return html`
      <div class="metrics">
        ${primary !== nothing
          ? html`
              <div class="metrics-primary">${primary}</div>
            `
          : nothing}
        ${tiles.length > 0
          ? html`
              <div class="metrics-tiles">
                ${tiles.map((t) => html`<div class="metric-tile">${t}</div>`)}
              </div>
            `
          : nothing}
        ${pills.length > 0
          ? html`
              <div class="metrics-pills">
                ${pills.map((p) => p)}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _waterPctColor(): string {
    return "var(--rgb-state-water, 3, 169, 244)";
  }

  // ─── Chip renderers ───────────────────────────────────────────────────────

  private _renderRingChipEntity(
    entityId: string,
    icon: string,
    labelFallback: string,
    _rgb: string
  ): TemplateResult | typeof nothing {
    const stateObj = this.hass.states[entityId] as HassEntity | undefined;
    if (!stateObj) return nothing;
    const pct = parseFloat(stateObj.state);
    const label =
      (stateObj.attributes?.friendly_name as string | undefined) ||
      labelFallback;
    return this._renderRing(stateObj, isNaN(pct) ? 0 : pct, label, icon);
  }

  private _renderRing(
    stateObj: HassEntity,
    pct: number,
    label: string,
    icon: string
  ): TemplateResult {
    return html`
      <div
        class="ring-chip"
        role="button"
        tabindex="0"
        @click=${() => this._openMoreInfo(stateObj.entity_id)}
      >
        <div class="ring-wrap">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="32" cy="32" r="26"
              stroke="var(--divider-color, rgba(0,0,0,0.12))"
              stroke-width="3.5"
            />
            <circle
              cx="32" cy="32" r="26"
              stroke="var(--chip-rgb, var(--rgb-state-water, 3, 169, 244))"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-dasharray="${ringDash(pct)}"
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div class="ring-icon">
            <ha-icon .icon=${icon}></ha-icon>
          </div>
        </div>
        <div class="ring-text">
          <div class="ring-value">${stateObj.state}<span class="ring-unit">%</span></div>
          <div class="ring-label">${label}</div>
        </div>
      </div>
    `;
  }

  private _renderTileEntity(
    entityId: string,
    icon: string,
    labelFallback: string,
    rgb: string
  ): TemplateResult | typeof nothing {
    const stateObj = this.hass.states[entityId] as HassEntity | undefined;
    if (!stateObj) return nothing;
    const unit: string = stateObj.attributes?.unit_of_measurement ?? "";
    const label =
      (stateObj.attributes?.friendly_name as string | undefined) ||
      labelFallback;
    const unavailable =
      stateObj.state === "unavailable" || stateObj.state === "unknown";
    return html`
      <div
        class="tile"
        style=${styleMap({ "--tile-rgb": rgb })}
        role="button"
        tabindex="0"
        @click=${() => this._openMoreInfo(entityId)}
      >
        <div class="tile-icon">
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="tile-text">
          <div class="tile-value">
            ${stateObj.state}${unit
              ? html`<span class="tile-unit"> ${unit}</span>`
              : nothing}
          </div>
          <div class="tile-label ${unavailable ? "tile-unavail" : ""}">${label}</div>
        </div>
      </div>
    `;
  }

  private _renderPillEntity(
    entityId: string,
    icon: string,
    labelFallback: string,
    isBinary: boolean
  ): TemplateResult | typeof nothing {
    const stateObj = this.hass.states[entityId] as HassEntity | undefined;
    if (!stateObj) return nothing;
    const label =
      (stateObj.attributes?.friendly_name as string | undefined) ||
      labelFallback;
    const s = String(stateObj.state);
    let active = false;
    if (isBinary) {
      active = s.toLowerCase() === "on" || s.toLowerCase() === "true";
    } else {
      active = MODE_STATES.has(s) && s !== "Off";
    }
    return html`
      <div
        class="pill ${active ? "pill-on" : ""}"
        role="button"
        tabindex="0"
        @click=${() => this._openMoreInfo(entityId)}
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span class="pill-label">${label}</span>
        <span class="pill-state">${defaultLabel(s)}</span>
      </div>
    `;
  }

  // ─── State badge ──────────────────────────────────────────────────────────

  private _renderStateBadge(stateRaw: string): TemplateResult {
    const key = stateBadgeKey(stateRaw);
    const rgb = STATE_RGB[key] ?? DEFAULT_STATE_RGB;
    const icon = STATE_ICONS[key] ?? DEFAULT_STATE_ICON;
    const label = defaultLabel(stateRaw);
    const isActive = ACTIVE_STATES.has(key);

    return html`
      <div class="state-badge">
        <span
          class="state-dot ${isActive ? "pulse" : ""}"
          style="background: rgb(${rgb});"
        ></span>
        <ha-icon class="state-icon" .icon=${icon}></ha-icon>
        <span class="state-label">${label}</span>
      </div>
    `;
  }

  // ─── Action buttons ───────────────────────────────────────────────────────

  private _renderActions(): TemplateResult | typeof nothing {
    const cfg = this._config;
    const btns = (["btn_1", "btn_2"] as const).flatMap((prefix) => {
      const entity = cfg[`${prefix}_entity` as keyof PetlibroDockstream2CardConfig] as string | undefined;
      if (!entity) return [];
      return [{
        entity,
        name: cfg[`${prefix}_name` as keyof PetlibroDockstream2CardConfig] as string | undefined,
        icon: cfg[`${prefix}_icon` as keyof PetlibroDockstream2CardConfig] as string | undefined,
        icon_color: cfg[`${prefix}_icon_color` as keyof PetlibroDockstream2CardConfig] as string | undefined,
        tap_action: cfg[`${prefix}_tap_action` as keyof PetlibroDockstream2CardConfig] as import("../ha").ActionConfig | undefined,
      }];
    });
    if (btns.length === 0) return nothing;
    return html`
      <div class="actions-row">
        ${btns.map((btn) => this._renderActionBtn(btn))}
      </div>
    `;
  }

  private _renderActionBtn(btn: {
    entity: string;
    name?: string;
    icon?: string;
    icon_color?: string;
    tap_action?: import("../ha").ActionConfig;
  }): TemplateResult {
    const stateObj = this.hass?.states[btn.entity] as HassEntity | undefined;
    const label =
      btn.name ??
      (stateObj?.attributes?.friendly_name as string | undefined) ??
      btn.entity;
    const icon =
      btn.icon ??
      (stateObj?.attributes?.icon as string | undefined) ??
      "mdi:gesture-tap-button";
    const iconStyle = btn.icon_color
      ? {
          color: btn.icon_color,
          background: `color-mix(in srgb, ${btn.icon_color} 15%, transparent)`,
        }
      : {};

    return html`
      <div
        class="action-btn"
        role="button"
        tabindex="0"
        @action=${(ev: ActionHandlerEvent) =>
          handleAction(
            this,
            this.hass!,
            { entity: btn.entity, tap_action: btn.tap_action ?? { action: "toggle" } },
            ev.detail.action!
          )}
        .actionHandler=${actionHandler({ hasHold: false, hasDoubleClick: false })}
      >
        <div class="action-btn-icon" style=${styleMap(iconStyle)}>
          <ha-state-icon
            .hass=${this.hass}
            .stateObj=${stateObj}
            .icon=${icon}
          ></ha-state-icon>
        </div>
        <span class="action-btn-label">${label}</span>
      </div>
    `;
  }

  private _openMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  // ─── Styles ───────────────────────────────────────────────────────────────

  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        padding-bottom: 8px;
        container-type: inline-size;
      }

      .card-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px 8px;
        gap: 8px;
      }

      .card-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--secondary-text-color);
        letter-spacing: 0.02em;
        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }

      /* ── Hero ── */
      .hero {
        position: relative;
        width: 100%;
        height: 260px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
        overflow: hidden;
      }

      .hero-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          transparent 45%,
          rgba(0, 0, 0, 0.25) 100%
        );
        pointer-events: none;
      }

      /* ── State badge ── */
      .state-badge {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px 5px 8px;
        border-radius: 999px;
        background: var(--secondary-background-color, rgba(120, 120, 128, 0.08));
        border: 1px solid var(--divider-color, rgba(120, 120, 128, 0.2));
        color: var(--primary-text-color);
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        pointer-events: none;
      }

      .state-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .state-dot.pulse {
        animation: dot-pulse 1.4s ease-in-out infinite;
      }

      @keyframes dot-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.5; transform: scale(0.75); }
      }

      .state-icon {
        --mdc-icon-size: 16px;
        opacity: 0.85;
      }

      .state-label {
        white-space: nowrap;
      }

      /* ── Metrics container ── */
      .metrics {
        padding: 14px 16px 4px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .metrics-primary {
        display: flex;
        justify-content: center;
      }

      .metrics-tiles {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }

      .metric-tile { min-width: 0; }

      .metrics-pills {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
        padding-top: 2px;
      }

      /* ── Ring chip (primary metric) ── */
      .ring-chip {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14px;
        padding: 8px 16px;
        cursor: pointer;
        transition: background 120ms ease;
        border-radius: 14px;
      }

      .ring-chip:hover {
        background: rgba(120, 120, 128, 0.07);
      }

      .ring-wrap {
        position: relative;
        width: 64px;
        height: 64px;
        flex-shrink: 0;
      }

      .ring-wrap svg { width: 100%; height: 100%; display: block; }

      .ring-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--chip-rgb, var(--rgb-state-water, 3, 169, 244));
      }

      .ring-icon ha-icon { --mdc-icon-size: 22px; }

      .ring-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .ring-value {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-text-color);
        line-height: 1;
      }

      .ring-unit {
        font-size: 14px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .ring-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* ── Tile ── */
      .tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 6px;
        padding: 10px 6px;
        border-radius: 12px;
        background: color-mix(in srgb, rgb(var(--tile-rgb, 59, 130, 246)) 8%, transparent);
        cursor: pointer;
        transition: background 120ms ease;
        min-width: 0;
      }

      .tile:hover {
        background: color-mix(in srgb, rgb(var(--tile-rgb, 59, 130, 246)) 14%, transparent);
      }

      .tile-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: color-mix(in srgb, rgb(var(--tile-rgb, 59, 130, 246)) 18%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--tile-rgb, 59, 130, 246));
        flex-shrink: 0;
      }

      .tile-icon ha-icon { --mdc-icon-size: 18px; }

      .tile-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        max-width: 100%;
      }

      .tile-value {
        font-size: 14px;
        font-weight: 700;
        color: var(--primary-text-color);
        line-height: 1.1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tile-unit {
        font-size: 10px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .tile-label {
        font-size: 10px;
        color: var(--secondary-text-color);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }

      .tile-unavail { opacity: 0.5; }

      /* ── Pills ── */
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--secondary-background-color, rgba(120, 120, 128, 0.08));
        border: 1px solid var(--divider-color, rgba(120, 120, 128, 0.2));
        color: var(--primary-text-color);
        font-size: 11px;
        line-height: 1;
        cursor: pointer;
        transition: background 120ms ease;
      }

      .pill:hover {
        background: rgba(120, 120, 128, 0.14);
      }

      .pill ha-icon { --mdc-icon-size: 14px; opacity: 0.85; }

      .pill-on {
        background: color-mix(in srgb, var(--rgb-state-water, 3, 169, 244) 16%, transparent);
        border-color: color-mix(in srgb, var(--rgb-state-water, 3, 169, 244) 40%, transparent);
        color: var(--primary-text-color);
      }

      .pill-label {
        font-weight: 500;
        opacity: 0.85;
      }

      .pill-state {
        font-weight: 600;
      }

      /* ── Action buttons ── */
      .actions-row {
        display: flex;
        flex-direction: row;
        gap: 0;
        padding: 8px 16px 4px;
        margin: 0 4px;
        border-top: 1px solid var(--divider-color, rgba(120, 120, 128, 0.18));
      }

      .action-btn {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 0;
        background: none;
        border: none;
        cursor: pointer;
        user-select: none;
        transition: background 120ms ease, transform 80ms ease;
        min-width: 0;
      }

      .action-btn:hover {
        background: rgba(120, 120, 128, 0.07);
        border-radius: 12px;
      }

      .action-btn:active { transform: scale(0.97); }

      .action-btn + .action-btn {
        border-left: 1px solid var(--divider-color, rgba(120, 120, 128, 0.2));
      }

      .action-btn-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: rgba(var(--rgb-state-water, 3, 169, 244), 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--rgb-state-water, 3, 169, 244));
      }

      .action-btn-icon ha-state-icon { --mdc-icon-size: 20px; }

      .action-btn-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
      }

      /* ─────────────────────────────────────────────────────────────
         Small-card layout (container ≤ 460 px — primary target)
         ───────────────────────────────────────────────────────────── */
      @container (max-width: 460px) {
        .hero                { height: 180px; }
        .metrics             { padding: 10px 10px 2px; gap: 10px; }
        .ring-chip           { padding: 6px 8px; gap: 10px; }
        .ring-wrap           { width: 50px; height: 50px; }
        .ring-icon ha-icon   { --mdc-icon-size: 17px; }
        .ring-value          { font-size: 18px; }
        .ring-label          { font-size: 11px; }
        .metrics-tiles       { gap: 6px; }
        .tile                { padding: 8px 4px; gap: 4px; }
        .tile-icon           { width: 30px; height: 30px; }
        .tile-icon ha-icon   { --mdc-icon-size: 14px; }
        .tile-value          { font-size: 12px; }
        .tile-label          { font-size: 9px; }
        .pill                { font-size: 10px; padding: 3px 8px; }
        .pill ha-icon        { --mdc-icon-size: 12px; }
        .actions-row         { padding: 6px 10px 2px; }
        .action-btn          { gap: 8px; padding: 10px 10px; }
        .action-btn-icon     { width: 32px; height: 32px; border-radius: 8px; }
        .action-btn-icon ha-state-icon { --mdc-icon-size: 16px; }
        .action-btn-label    { font-size: 11px; }
      }

      /* Fallback for older engines without container queries */
      @media (max-width: 460px) {
        .hero                { height: 180px; }
        .metrics             { padding: 10px 10px 2px; gap: 10px; }
        .ring-chip           { padding: 6px 8px; gap: 10px; }
        .ring-wrap           { width: 50px; height: 50px; }
        .ring-icon ha-icon   { --mdc-icon-size: 17px; }
        .ring-value          { font-size: 18px; }
        .ring-label          { font-size: 11px; }
        .metrics-tiles       { gap: 6px; }
        .tile                { padding: 8px 4px; gap: 4px; }
        .tile-icon           { width: 30px; height: 30px; }
        .tile-icon ha-icon   { --mdc-icon-size: 14px; }
        .tile-value          { font-size: 12px; }
        .tile-label          { font-size: 9px; }
        .pill                { font-size: 10px; padding: 3px 8px; }
        .pill ha-icon        { --mdc-icon-size: 12px; }
        .actions-row         { padding: 6px 10px 2px; }
        .action-btn          { gap: 8px; padding: 10px 10px; }
        .action-btn-icon     { width: 32px; height: 32px; border-radius: 8px; }
        .action-btn-icon ha-state-icon { --mdc-icon-size: 16px; }
        .action-btn-label    { font-size: 11px; }
      }
    `;
  }
}
