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
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../ha";
import { registerCustomCard } from "../utils/custom-cards";
import {
  PETKIT_DASHBOARD_CARD_EDITOR_NAME,
  PETKIT_DASHBOARD_CARD_NAME,
  PETKIT_LITTERBOX_STATE_DOMAINS,
} from "./const";
import {
  PetkitLitterboxDashboardCardConfig,
  petkitLitterboxDashboardCardConfigStruct,
} from "./petkit-litterbox-dashboard-card-config";
import { PETKIT_DEVICE_IMAGE_URL } from "./assets/petkit-device-svg";

// ─── State metadata ───────────────────────────────────────────────────────────

const STATE_ICONS: Record<string, string> = {
  cleaning: "mdi:broom",
  scooping: "mdi:broom",
  dumping: "mdi:delete-empty",
  leveling: "mdi:layers-outline",
  odor_removal: "mdi:spray-bottle",
  deodorizing: "mdi:spray-bottle",
  maintenance: "mdi:tools",
  refreshing: "mdi:refresh",
  resetting: "mdi:restart",
  paused: "mdi:pause",
  idle: "mdi:sleep",
  error: "mdi:alert-circle",
  fault: "mdi:alert-circle",
};

/** Returns a CSS rgb() triple for the state, no parentheses. */
const STATE_RGB: Record<string, string> = {
  cleaning: "var(--rgb-state-vacuum, 3, 155, 229)",
  scooping: "var(--rgb-state-vacuum, 3, 155, 229)",
  dumping: "var(--rgb-state-vacuum, 3, 155, 229)",
  leveling: "var(--rgb-state-vacuum, 3, 155, 229)",
  odor_removal: "103, 58, 183",
  deodorizing: "103, 58, 183",
  maintenance: "245, 158, 11",
  refreshing: "59, 130, 246",
  resetting: "59, 130, 246",
  paused: "158, 158, 158",
  idle: "158, 158, 158",
  error: "244, 67, 54",
  fault: "244, 67, 54",
};

const DEFAULT_STATE_ICON = "mdi:help-circle-outline";
const DEFAULT_STATE_RGB = "158, 158, 158";

const ACTIVE_STATES = new Set([
  "cleaning",
  "scooping",
  "dumping",
  "leveling",
  "odor_removal",
  "deodorizing",
  "maintenance",
  "refreshing",
  "resetting",
]);

/** SVG ring circumference for r=26 */
const CIRCUMFERENCE = 2 * Math.PI * 26; // ≈ 163.36

function ringDash(pct: number): string {
  const filled = Math.min(100, Math.max(0, pct));
  return `${((CIRCUMFERENCE * filled) / 100).toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`;
}

function defaultLabel(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

// ─── Registration ─────────────────────────────────────────────────────────────

registerCustomCard({
  type: PETKIT_DASHBOARD_CARD_NAME,
  name: "Mushroom Petkit Dashboard Card",
  description: "Device hero card with sensor stats for Petkit T5 Litterbox",
});

// ─── Card element ─────────────────────────────────────────────────────────────

@customElement(PETKIT_DASHBOARD_CARD_NAME)
export class PetkitLitterboxDashboardCard
  extends LitElement
  implements LovelaceCard
{
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./petkit-litterbox-dashboard-card-editor");
    return document.createElement(
      PETKIT_DASHBOARD_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return { type: `custom:${PETKIT_DASHBOARD_CARD_NAME}`, entity: "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: PetkitLitterboxDashboardCardConfig;

  public setConfig(config: PetkitLitterboxDashboardCardConfig): void {
    assert(config, petkitLitterboxDashboardCardConfigStruct);
    this._config = config;
  }

  public getCardSize(): number {
    return 5;
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const stateObj = this.hass.states[this._config.entity] as
      | HassEntity
      | undefined;

    // Resolve picture URL: config override → entity_picture → undefined
    const picture =
      this._config.picture ||
      (stateObj?.attributes?.entity_picture as string | undefined);

    // Collect configured sensor slots
    const sensors = (
      [1, 2, 3, 4] as const
    ).map((n) => ({
      pos: n,
      entity: this._config[`sensor_${n}_entity` as keyof PetkitLitterboxDashboardCardConfig] as
        | string
        | undefined,
      name: this._config[`sensor_${n}_name` as keyof PetkitLitterboxDashboardCardConfig] as
        | string
        | undefined,
      icon: this._config[`sensor_${n}_icon` as keyof PetkitLitterboxDashboardCardConfig] as
        | string
        | undefined,
    })).filter((s) => s.entity);

    const showName = this._config.show_name !== false;
    const friendlyName =
      stateObj?.attributes?.friendly_name ?? this._config.entity;

    return html`
      <ha-card>
        ${showName
          ? html`<div class="card-header">${friendlyName}</div>`
          : nothing}
        ${this._renderHero(picture, stateObj)}
        ${sensors.length > 0
          ? html`
              <div class="sensors-row">
                ${sensors.map((s) => this._renderSensor(s.entity!, s.pos, s.name, s.icon))}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  private _renderHero(
    picture: string | undefined,
    stateObj: HassEntity | undefined
  ): TemplateResult {
    const imgUrl = picture ?? PETKIT_DEVICE_IMAGE_URL;
    const cameraEntity = this._config.camera_entity;
    const cameraStateObj = cameraEntity
      ? (this.hass.states[cameraEntity] as HassEntity | undefined)
      : undefined;

    if (cameraStateObj) {
      return this._renderSplitHero(imgUrl, stateObj, cameraStateObj);
    }

    return html`
      <div class="hero" style=${styleMap({ backgroundImage: `url('${imgUrl}')` })}>
        <div class="hero-gradient"></div>
        ${stateObj ? this._renderStateBadge(stateObj) : nothing}
      </div>
    `;
  }

  private _renderSplitHero(
    imgUrl: string,
    stateObj: HassEntity | undefined,
    cameraStateObj: HassEntity
  ): TemplateResult {
    const isStream = this._config.camera_mode === "stream";
    // Cache-bust snapshot with last_changed so new frames load on state updates
    const snapshotUrl = `${cameraStateObj.attributes.entity_picture as string}&_t=${cameraStateObj.last_changed}`;

    return html`
      <div class="hero hero-split">
        <!-- Camera panel -->
        <div class="hero-camera">
          ${isStream
            ? html`
                <ha-camera-stream
                  .hass=${this.hass}
                  .stateObj=${cameraStateObj}
                  muted
                ></ha-camera-stream>
              `
            : html`
                <img
                  class="camera-img"
                  src=${snapshotUrl}
                  alt="camera"
                  loading="lazy"
                />
              `}
        </div>

        <!-- Cable zone: horizontal connector line -->
        <div class="hero-cable"></div>

        <!-- Device image panel — never cropped -->
        <div
          class="hero-device"
          style=${styleMap({ backgroundImage: `url('${imgUrl}')` })}
        >
          <div class="hero-gradient"></div>
          ${stateObj ? this._renderStateBadge(stateObj) : nothing}
        </div>
      </div>
    `;
  }

  private _renderStateBadge(stateObj: HassEntity): TemplateResult {
    const s = stateObj.state;
    const rgb = STATE_RGB[s] ?? DEFAULT_STATE_RGB;
    const icon = STATE_ICONS[s] ?? DEFAULT_STATE_ICON;
    const label = defaultLabel(s);
    const isActive = ACTIVE_STATES.has(s);

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
      <div class="sensor-chip chip-${pos}">
        <div class="ring-wrap">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Track -->
            <circle
              cx="32" cy="32" r="26"
              stroke="var(--divider-color, rgba(0,0,0,0.12))"
              stroke-width="3.5"
            />
            <!-- Progress -->
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
        <div class="chip-value">${stateObj.state}<span class="chip-unit">%</span></div>
        <div class="chip-label">${label}</div>
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
      <div class="sensor-chip chip-${pos}">
        <div class="icon-circle">
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="chip-value">
          ${stateObj.state}${unit
            ? html`<span class="chip-unit"> ${unit}</span>`
            : nothing}
        </div>
        <div class="chip-label">${label}</div>
      </div>
    `;
  }

  // ─── Styles ────────────────────────────────────────────────────────────────

  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        padding-bottom: 16px;
      }

      .card-header {
        padding: 16px 16px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--secondary-text-color);
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }

      /* ── Hero image area ── */
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

      /* ── Split layout: CSS Grid (camera | cable | device) ── */
      .hero.hero-split {
        display: grid;
        grid-template-columns: 44% 48px 1fr;
        align-items: stretch;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
        position: relative;
      }

      .hero-camera {
        position: relative;
        overflow: hidden;
        background: #000;
      }

      .camera-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .hero-camera ha-camera-stream {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* ── Cable zone: thin connector line, inset from both panel edges ── */
      .hero-cable {
        position: relative;
        z-index: 5;
      }
      .hero-cable::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 1px;
        background: rgba(var(--rgb-state-vacuum, 3, 155, 229), 0.5);
        z-index: 1;
        pointer-events: none;
      }

      /* ── Device panel: ALWAYS contain — never cropped ── */
      .hero-device {
        position: relative;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
      }

      /* State badge sits inside .hero or .hero-device (both position:relative) */

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
        position: absolute;
        bottom: 14px;
        left: 14px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 7px 14px 7px 10px;
        border-radius: 999px;
        background: rgba(10, 10, 20, 0.55);
        backdrop-filter: blur(12px) saturate(1.5);
        -webkit-backdrop-filter: blur(12px) saturate(1.5);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: white;
        font-size: 13px;
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
        50% { opacity: 0.5; transform: scale(0.75); }
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
        justify-content: space-around;
        align-items: flex-start;
        padding: 20px 8px 4px;
        gap: 4px;
      }

      /* ── Chip base ── */
      .sensor-chip {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex: 1;
        min-width: 0;
      }

      /* ── Per-slot accent colors ── */
      .chip-1 { --chip-rgb: var(--rgb-state-vacuum, 3, 155, 229); }
      .chip-2 { --chip-rgb: 76, 175, 80; }
      .chip-3 { --chip-rgb: 255, 152, 0; }
      .chip-4 { --chip-rgb: 156, 39, 176; }

      /* ── SVG ring chip ── */
      .ring-wrap {
        position: relative;
        width: 64px;
        height: 64px;
      }

      .ring-wrap svg {
        width: 64px;
        height: 64px;
        display: block;
      }

      .ring-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--chip-rgb));
      }

      .ring-icon ha-icon {
        --mdc-icon-size: 20px;
      }

      /* ── Icon circle chip ── */
      .icon-circle {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(var(--chip-rgb), 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--chip-rgb));
      }

      .icon-circle ha-icon {
        --mdc-icon-size: 24px;
      }

      /* ── Chip text ── */
      .chip-value {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1;
        text-align: center;
      }

      .chip-unit {
        font-size: 11px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .chip-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-align: center;
        line-height: 1.2;
        max-width: 72px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sensor-chip.unavailable {
        opacity: 0.3;
      }
    `;
  }
}
