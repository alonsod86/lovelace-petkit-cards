import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { LocalizeFunc, LovelaceCardEditor, fireEvent } from "../ha";
import setupCustomlocalize from "../localize";
import { MushroomBaseElement } from "../utils/base-element";
import { GENERIC_LABELS } from "../utils/form/generic-fields";
import { HaFormSchema } from "../utils/form/ha-form";
import { loadHaComponents } from "../utils/loader";
import {
  PETKIT_TIMELINE_CARD_EDITOR_NAME,
  PETKIT_LITTERBOX_STATE_DOMAINS,
} from "./const";
import {
  PetkitLitterboxTimelineCardConfig,
  petkitLitterboxTimelineCardConfigStruct,
} from "./petkit-litterbox-timeline-card-config";

const TIMELINE_LABELS = ["hours_to_show", "layout"];

const computeSchema = memoizeOne(
  (
    _localize: LocalizeFunc,
    customLocalize: ReturnType<typeof setupCustomlocalize>
  ): HaFormSchema[] => [
    {
      name: "entity",
      selector: { entity: { domain: PETKIT_LITTERBOX_STATE_DOMAINS } },
    },
    {
      name: "layout",
      selector: {
        select: {
          mode: "list" as const,
          options: [
            {
              value: "vertical",
              label: customLocalize(
                "editor.card.petkit_litterbox_timeline.layout_vertical"
              ),
            },
            {
              value: "horizontal",
              label: customLocalize(
                "editor.card.petkit_litterbox_timeline.layout_horizontal"
              ),
            },
          ],
        },
      },
    },
    {
      name: "hours_to_show",
      selector: {
        number: {
          min: 1,
          max: 168,
          step: 1,
          unit_of_measurement: "h",
          mode: "box" as const,
        },
      },
    },
  ]
);

@customElement(PETKIT_TIMELINE_CARD_EDITOR_NAME)
export class PetkitLitterboxTimelineCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: PetkitLitterboxTimelineCardConfig;

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: PetkitLitterboxTimelineCardConfig): void {
    assert(config, petkitLitterboxTimelineCardConfigStruct);
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const customLocalize = setupCustomlocalize(this.hass!);
    if (GENERIC_LABELS.includes(schema.name)) {
      return customLocalize(`editor.card.generic.${schema.name}`);
    }
    if (TIMELINE_LABELS.includes(schema.name)) {
      return customLocalize(
        `editor.card.petkit_litterbox_timeline.${schema.name}`
      );
    }
    return this.hass!.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    );
  };

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const customLocalize = setupCustomlocalize(this.hass!);
    const schema = computeSchema(this.hass!.localize, customLocalize);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}
