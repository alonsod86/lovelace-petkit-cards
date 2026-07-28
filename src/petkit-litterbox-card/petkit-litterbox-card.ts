import { HassEntity } from "home-assistant-js-websocket";
import { css, CSSResultGroup, html, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
  actionHandler,
  ActionHandlerEvent,
  computeRTL,
  handleAction,
  hasAction,
  HomeAssistant,
  isActive,
  LovelaceCard,
  LovelaceCardEditor,
} from "../ha";
import { computeAppearance } from "../utils/appearance";
import { MushroomBaseCard } from "../utils/base-card";
import { cardStyle } from "../utils/card-styles";
import { computeEntityName } from "../utils/compute-entity-name";
import { registerCustomCard } from "../utils/custom-cards";
import { computeEntityPicture } from "../utils/info";
import {
  PETKIT_LITTERBOX_CARD_EDITOR_NAME,
  PETKIT_LITTERBOX_CARD_NAME,
  PETKIT_LITTERBOX_STATE_DOMAINS,
} from "./const";
import "./controls/petkit-litterbox-commands-control";
import { isCommandsControlVisible } from "./controls/petkit-litterbox-commands-control";
import { isCleaningState } from "./utils";
import { PetkitLitterboxCardConfig } from "./petkit-litterbox-card-config";

registerCustomCard({
  type: PETKIT_LITTERBOX_CARD_NAME,
  name: "Mushroom Petkit Litter-Box Card",
  description:
    "Scoop & deodorize your Petkit litter box (T5 Purobot Max Pro, T6 and others)",
});

@customElement(PETKIT_LITTERBOX_CARD_NAME)
export class PetkitLitterboxCard
  extends MushroomBaseCard<PetkitLitterboxCardConfig, HassEntity>
  implements LovelaceCard
{
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./petkit-litterbox-card-editor");
    return document.createElement(
      PETKIT_LITTERBOX_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<PetkitLitterboxCardConfig> {
    const entities = Object.keys(hass.states);
    const candidates = entities.filter(
      (e) =>
        PETKIT_LITTERBOX_STATE_DOMAINS.includes(e.split(".")[0]) &&
        (e.includes("litter") || e.includes("state"))
    );
    return {
      type: `custom:${PETKIT_LITTERBOX_CARD_NAME}`,
      entity: candidates[0] ?? entities.find((e) => e.startsWith("sensor.")),
    };
  }

  @state() private _config?: PetkitLitterboxCardConfig;

  protected get hasControls(): boolean {
    if (!this._config) return false;
    return isCommandsControlVisible(this._config);
  }

  private _handleAction(ev: ActionHandlerEvent) {
    handleAction(this, this.hass!, this._config!, ev.detail.action!);
  }

  protected render() {
    if (!this._config || !this.hass || !this._config.entity) {
      return nothing;
    }

    const stateObj = this._stateObj;

    if (!stateObj) {
      return this.renderNotFound(this._config);
    }

    const name = computeEntityName(this.hass, stateObj, this._config.name);
    const icon = this._config.icon;
    const appearance = computeAppearance(this._config);
    const picture = computeEntityPicture(stateObj, appearance.icon_type);

    const rtl = computeRTL(this.hass);

    return html`
      <ha-card
        class=${classMap({ "fill-container": appearance.fill_container })}
      >
        <mushroom-card .appearance=${appearance} ?rtl=${rtl}>
          <mushroom-state-item
            ?rtl=${rtl}
            .appearance=${appearance}
            @action=${this._handleAction}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this._config.hold_action),
              hasDoubleClick: hasAction(this._config.double_tap_action),
            })}
          >
            ${picture
              ? this.renderPicture(picture)
              : this.renderIcon(stateObj, icon)}
            ${this.renderBadge(stateObj)}
            ${this.renderStateInfo(stateObj, appearance, name)};
          </mushroom-state-item>
          ${isCommandsControlVisible(this._config)
            ? html`
                <div class="actions" ?rtl=${rtl}>
                  <mushroom-petkit-litterbox-commands-control
                    .hass=${this.hass}
                    .config=${this._config}
                    .fill=${appearance.layout !== "horizontal"}
                  >
                  </mushroom-petkit-litterbox-commands-control>
                </div>
              `
            : nothing}
        </mushroom-card>
      </ha-card>
    `;
  }

  protected renderIcon(stateObj: HassEntity, icon?: string): TemplateResult {
    const cleaning =
      isCleaningState(stateObj, this._config!) &&
      Boolean(this._config?.icon_animation);

    return html`
      <mushroom-shape-icon
        slot="icon"
        class=${classMap({ cleaning })}
        .disabled=${!isActive(stateObj)}
      >
        <ha-state-icon
          .hass=${this.hass}
          .stateObj=${stateObj}
          .icon=${icon}
        ></ha-state-icon>
      </mushroom-shape-icon>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      cardStyle,
      css`
        mushroom-state-item {
          cursor: pointer;
        }
        mushroom-shape-icon {
          --icon-color: rgb(var(--rgb-state-vacuum));
          --shape-color: rgba(var(--rgb-state-vacuum), 0.2);
        }
        .cleaning ha-state-icon {
          animation: 2s infinite linear cleaning;
        }
        @keyframes cleaning {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        mushroom-petkit-litterbox-commands-control {
          flex: 1;
        }
      `,
    ];
  }
}
