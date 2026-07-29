import { HassEntity } from "home-assistant-js-websocket";
import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { computeRTL, HomeAssistant, isAvailable } from "../../ha";
import { PetkitLitterboxActionKey } from "../petkit-litterbox-card-config";
import { DEFAULT_ACTIVE_STATES } from "../utils";

interface PetkitButton {
  icon: string;
  action: PetkitLitterboxActionKey;
  entityConfigKey:
    | "scoop_entity"
    | "deodorize_entity"
    | "level_litter_entity"
    | "maintenance_entity";
}

interface PetkitButtonConfig {
  scoop_entity?: string;
  deodorize_entity?: string;
  level_litter_entity?: string;
  maintenance_entity?: string;
  actions?: PetkitLitterboxActionKey[];
  active_states?: string[];
}

export const PETKIT_LITTERBOX_BUTTONS: PetkitButton[] = [
  {
    icon: "mdi:broom",
    action: "scoop",
    entityConfigKey: "scoop_entity",
  },
  {
    icon: "mdi:spray-bottle",
    action: "deodorize",
    entityConfigKey: "deodorize_entity",
  },
  {
    icon: "mdi:layers-outline",
    action: "level_litter",
    entityConfigKey: "level_litter_entity",
  },
  {
    icon: "mdi:tools",
    action: "maintenance",
    entityConfigKey: "maintenance_entity",
  },
];

export function isButtonVisible(
  button: PetkitButton,
  config: PetkitButtonConfig
): boolean {
  const allowedActions = config.actions;
  if (allowedActions !== undefined && !allowedActions.includes(button.action)) {
    return false;
  }
  return Boolean(config[button.entityConfigKey]);
}

export function isCommandsControlVisible(config: PetkitButtonConfig): boolean {
  return PETKIT_LITTERBOX_BUTTONS.some((b) => isButtonVisible(b, config));
}

@customElement("mushroom-petkit-litterbox-commands-control")
export class PetkitLitterboxCommandsControl extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public config!: PetkitButtonConfig;

  /** Main litterbox entity — used to detect active/idle transitions. */
  @property({ attribute: false }) public stateObj?: HassEntity;

  @property({ type: Boolean }) public fill: boolean = false;

  @state() private _pending = false;

  /** True once the entity entered an active state after a button press. */
  private _wasActivated = false;

  /** Failsafe timeout handle — clears pending if the entity never responds. */
  private _timeout?: ReturnType<typeof setTimeout>;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeout();
  }

  private _clearTimeout() {
    if (this._timeout !== undefined) {
      clearTimeout(this._timeout);
      this._timeout = undefined;
    }
  }

  private _isActiveState(): boolean {
    if (!this.stateObj) return false;
    return (this.config.active_states ?? DEFAULT_ACTIVE_STATES).includes(
      this.stateObj.state
    );
  }

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (!changedProps.has("stateObj") || !this._pending) return;

    const nowActive = this._isActiveState();
    if (nowActive) {
      // The action registered — cancel failsafe, track that we got activated.
      this._wasActivated = true;
      this._clearTimeout();
    } else if (this._wasActivated) {
      // Returned to idle after being active — release lock.
      this._pending = false;
      this._wasActivated = false;
    }
  }

  private _callService(e: CustomEvent) {
    e.stopPropagation();
    const entityId = (e.target! as any)._entityId as string;
    if (!entityId) return;

    // Lock buttons immediately; failsafe releases after 30 s.
    this._pending = true;
    this._wasActivated = false;
    this._clearTimeout();
    this._timeout = setTimeout(() => {
      this._pending = false;
      this._wasActivated = false;
      this._timeout = undefined;
    }, 30_000);

    const domain = entityId.split(".")[0];
    if (domain === "script") {
      this.hass.callService("script", "turn_on", { entity_id: entityId });
    } else {
      this.hass.callService("button", "press", { entity_id: entityId });
    }
  }

  protected render(): TemplateResult {
    const rtl = computeRTL(this.hass);
    const globalBusy = this._pending || this._isActiveState();

    return html`
      <mushroom-button-group .fill=${this.fill} ?rtl=${rtl}>
        ${PETKIT_LITTERBOX_BUTTONS.filter((btn) =>
          isButtonVisible(btn, this.config)
        ).map((btn) => {
          const entityId = this.config[btn.entityConfigKey] as string;
          const stateObj = this.hass.states[entityId];
          const disabled = !stateObj || !isAvailable(stateObj) || globalBusy;
          return html`
            <mushroom-button
              ._entityId=${entityId}
              .disabled=${disabled}
              @click=${this._callService}
            >
              <ha-icon .icon=${btn.icon}></ha-icon>
            </mushroom-button>
          `;
        })}
      </mushroom-button-group>
    `;
  }
}
