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
    return 5;
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const cfg = this._config;
    const stateObj = this.hass.states[cfg.entity] as HassEntity | undefined;

    // Resolve picture URL: config override → undefined (falls back to asset).
    const picture = cfg.picture || undefined;

    // Collect configured sensor slots
    const sensors = (
      [1, 2, 3, 4] as const
    ).map((n) => ({
      pos: n,
      entity: cfg[`sensor_${n}_entity` as keyof PetlibroDockstream2CardConfig] as
        | string
        | undefined,
      name: cfg[`sensor_${n}_name` as keyof PetlibroDockstream2CardConfig] as
        | string
        | undefined,
      icon: cfg[`sensor_${n}_icon` as keyof PetlibroDockstream2CardConfig] as
        | string
        | undefined,
    })).filter((s) => s.entity);

    const showName = cfg.show_name !== false;
    const showState = cfg.show_state !== false;
    const titleText =
      cfg.title?.trim() ||
      (stateObj?.attributes?.friendly_name as string | undefined) ||
      cfg.entity;

    return html`
      <ha-card>
        ${showName || (showState && stateObj)
          ? html`
              <div class="card-header">
                ${showName
                  ? html`<span class="card-title">${titleText}</span>`
                  : nothing}
                ${showState && stateObj
                  ? this._renderStateBadge(stateObj)
                  : nothing}
              </div>
            `
          : nothing}
        ${this._renderHero(picture)}
        ${sensors.length > 0
          ? html`
              <div class="sensors-row">
                ${sensors.map((s) => this._renderSensor(s.entity!, s.pos, s.name, s.icon))}
              </div>
            `
          : nothing}
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

  // ─── State badge ──────────────────────────────────────────────────────────

  private _renderStateBadge(stateObj: HassEntity): TemplateResult {
    const s = String(stateObj.state);
    const key = stateBadgeKey(s);
    const rgb = STATE_RGB[key] ?? DEFAULT_STATE_RGB;
    const icon = STATE_ICONS[key] ?? DEFAULT_STATE_ICON;
    const label = defaultLabel(s);
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

  // ─── Sensors ──────────────────────────────────────────────────────────────

  private _renderSensor(
    entityId: string,
    pos: 1 | 2 | 3 | 4,
    nameOverride?: string,
    iconOverride?: string
  ): TemplateResult {
    const stateObj = this.hass.states[entityId] as HassEntity | undefined;
    if (!stateObj) {
      return html`<div class="sensor-chip chip-${pos} unavailable"></div>`;
    }

    const unit: string = stateObj.attributes?.unit_of_measurement ?? "";
    const label =
      nameOverride ||
      (stateObj.attributes?.friendly_name as string | undefined) ||
      entityId;
    const icon =
      iconOverride || (stateObj.attributes?.icon as string | undefined) || "mdi:gauge";

    if (unit === "%") {
      const pct = parseFloat(stateObj.state);
      return this._renderRingChip(stateObj, isNaN(pct) ? 0 : pct, pos, label, icon);
    }
    return this._renderIconChip(stateObj, pos, label, icon, unit);
  }

  private _renderRingChip(
    stateObj: HassEntity,
    pct: number,
    pos: 1 | 2 | 3 | 4,
    label: string,
    icon: string
  ): TemplateResult {
    return html`
      <div class="sensor-chip chip-${pos}"
        role="button" tabindex="0"
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
              stroke="rgb(var(--chip-rgb))"
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
        <div class="chip-text">
          <div class="chip-value">${stateObj.state}<span class="chip-unit">%</span></div>
          <div class="chip-label">${label}</div>
        </div>
      </div>
    `;
  }

  private _renderIconChip(
    stateObj: HassEntity,
    pos: 1 | 2 | 3 | 4,
    label: string,
    icon: string,
    unit: string
  ): TemplateResult {
    return html`
      <div class="sensor-chip chip-${pos}"
        role="button" tabindex="0"
        @click=${() => this._openMoreInfo(stateObj.entity_id)}
      >
        <div class="icon-circle">
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="chip-text">
          <div class="chip-value">
            ${stateObj.state}${unit
              ? html`<span class="chip-unit"> ${unit}</span>`
              : nothing}
          </div>
          <div class="chip-label">${label}</div>
        </div>
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
        height: 220px;
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
          transparent 40%,
          rgba(0, 0, 0, 0.32) 100%
        );
        pointer-events: none;
      }

      /* ── Glass state badge ── */
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

      /* ── Sensor strip ── */
      .sensors-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 14px 20px 12px;
        gap: 0;
      }

      .sensor-chip {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
        padding: 0 16px 0 0;
        cursor: pointer;
        transition: background 120ms ease;
      }

      .sensor-chip:hover {
        background: rgba(120, 120, 128, 0.07);
        border-radius: 10px;
      }

      .sensor-chip + .sensor-chip {
        padding: 0 16px 0 16px;
        border-left: 1px solid var(--divider-color, rgba(120, 120, 128, 0.2));
      }

      .sensor-chip:last-child { padding-right: 0; }

      /* Per-slot accent colors */
      .chip-1 { --chip-rgb: var(--rgb-state-water, 3, 169, 244); }
      .chip-2 { --chip-rgb: 76, 175, 80; }
      .chip-3 { --chip-rgb: 255, 152, 0; }
      .chip-4 { --chip-rgb: 156, 39, 176; }

      /* ── SVG ring chip ── */
      .ring-wrap {
        position: relative;
        width: 48px;
        height: 48px;
        flex-shrink: 0;
      }

      .ring-wrap svg { width: 100%; height: 100%; display: block; }

      .ring-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--chip-rgb));
      }

      .ring-icon ha-icon { --mdc-icon-size: 17px; }

      /* ── Icon circle chip ── */
      .icon-circle {
        width: 44px;
        height: 44px;
        flex-shrink: 0;
        border-radius: 50%;
        background: rgba(var(--chip-rgb), 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--chip-rgb));
      }

      .icon-circle ha-icon { --mdc-icon-size: 22px; }

      /* ── Chip text ── */
      .chip-text {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
      }

      .chip-value {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary-text-color);
        line-height: 1;
      }

      .chip-unit {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .chip-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sensor-chip.unavailable { opacity: 0.3; }

      /* ── Action buttons ── */
      .actions-row {
        display: flex;
        flex-direction: row;
        gap: 0;
        padding: 4px 16px 0;
      }

      .sensors-row + .actions-row {
        margin: 0 4px;
        padding-left: 12px;
        padding-right: 12px;
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
        .hero                        { height: 165px; }
        .sensors-row                 { padding: 10px 12px 8px; }
        .sensor-chip                 { gap: 8px; padding: 0 10px 0 0; }
        .sensor-chip + .sensor-chip  { padding: 0 10px; }
        .ring-wrap                   { width: 36px; height: 36px; }
        .ring-icon ha-icon           { --mdc-icon-size: 13px; }
        .icon-circle                 { width: 34px; height: 34px; }
        .icon-circle ha-icon         { --mdc-icon-size: 16px; }
        .chip-value                  { font-size: 14px; }
        .chip-unit                   { font-size: 10px; }
        .chip-label                  { font-size: 10px; }
        .actions-row                 { padding: 4px 12px 0; }
        .sensors-row + .actions-row  { padding-left: 8px; padding-right: 8px; }
        .action-btn                  { gap: 8px; padding: 10px 10px; }
        .action-btn-icon             { width: 32px; height: 32px; border-radius: 8px; }
        .action-btn-icon ha-state-icon { --mdc-icon-size: 16px; }
        .action-btn-label            { font-size: 11px; }
      }

      /* Fallback for older engines without container queries */
      @media (max-width: 460px) {
        .hero                        { height: 165px; }
        .sensors-row                 { padding: 10px 12px 8px; }
        .sensor-chip                 { gap: 8px; padding: 0 10px 0 0; }
        .sensor-chip + .sensor-chip  { padding: 0 10px; }
        .ring-wrap                   { width: 36px; height: 36px; }
        .ring-icon ha-icon           { --mdc-icon-size: 13px; }
        .icon-circle                 { width: 34px; height: 34px; }
        .icon-circle ha-icon         { --mdc-icon-size: 16px; }
        .chip-value                  { font-size: 14px; }
        .chip-unit                   { font-size: 10px; }
        .chip-label                  { font-size: 10px; }
        .actions-row                 { padding: 4px 12px 0; }
        .sensors-row + .actions-row  { padding-left: 8px; padding-right: 8px; }
        .action-btn                  { gap: 8px; padding: 10px 10px; }
        .action-btn-icon             { width: 32px; height: 32px; border-radius: 8px; }
        .action-btn-icon ha-state-icon { --mdc-icon-size: 16px; }
        .action-btn-label            { font-size: 11px; }
      }
    `;
  }
}
