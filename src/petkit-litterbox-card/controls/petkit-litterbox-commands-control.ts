import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { computeRTL, HomeAssistant, isAvailable } from "../../ha";
import { PetkitLitterboxActionKey } from "../petkit-litterbox-card-config";

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

  @property({ type: Boolean }) public fill: boolean = false;

  private _callService(e: CustomEvent) {
    e.stopPropagation();
    const entityId = (e.target! as any)._entityId as string;
    if (!entityId) return;
    const domain = entityId.split(".")[0];
    if (domain === "script") {
      this.hass.callService("script", "turn_on", { entity_id: entityId });
    } else {
      this.hass.callService("button", "press", { entity_id: entityId });
    }
  }

  protected render(): TemplateResult {
    const rtl = computeRTL(this.hass);

    return html`
      <mushroom-button-group .fill=${this.fill} ?rtl=${rtl}>
        ${PETKIT_LITTERBOX_BUTTONS.filter((btn) =>
          isButtonVisible(btn, this.config)
        ).map((btn) => {
          const entityId = this.config[btn.entityConfigKey] as string;
          const stateObj = this.hass.states[entityId];
          const disabled = !stateObj || !isAvailable(stateObj);
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
