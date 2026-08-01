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
  PETLIBRO_DOCKSTREAM_2_CARD_EDITOR_NAME,
  PETLIBRO_DOCKSTREAM_2_STATE_DOMAINS,
} from "./const";
import {
  PetlibroDockstream2CardConfig,
  petlibroDockstream2CardConfigStruct,
} from "./petlibro-dockstream-2-card-config";

const DOCKSTREAM_2_LABELS = [
  "picture",
  "title",
  "show_name",
  "show_state",
  "sensors_section",
  "water_level_entity",
  "water_volume_entity",
  "today_water_entity",
  "yesterday_water_entity",
  "filter_days_entity",
  "cleaning_days_entity",
  "battery_entity",
  "status_section",
  "power_entity",
  "connectivity_entity",
  "dispensing_entity",
  "mode_entity",
  "actions_section",
  "btn_1_entity",
  "btn_1_name",
  "btn_1_icon",
  "btn_1_icon_color",
  "btn_2_entity",
  "btn_2_name",
  "btn_2_icon",
  "btn_2_icon_color",
];

const computeSchema = memoizeOne(
  (
    _localize: LocalizeFunc,
    customLocalize: ReturnType<typeof setupCustomlocalize>
  ): HaFormSchema[] => [
    {
      name: "entity",
      selector: { entity: { domain: PETLIBRO_DOCKSTREAM_2_STATE_DOMAINS } },
    },
    { name: "picture", selector: { text: {} } },
    { name: "title", selector: { text: {} } },
    { name: "show_name", selector: { boolean: {} } },
    { name: "show_state", selector: { boolean: {} } },
    // ── Sensors ──────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensors_section",
      flatten: true,
      icon: "mdi:water-percent",
      title: customLocalize(
        "editor.card.petlibro_dockstream_2.sensors_section"
      ),
      schema: [
        { name: "water_level_entity",     selector: { entity: { domain: ["sensor"] } } },
        { name: "water_volume_entity",    selector: { entity: { domain: ["sensor"] } } },
        { name: "today_water_entity",     selector: { entity: { domain: ["sensor"] } } },
        { name: "yesterday_water_entity", selector: { entity: { domain: ["sensor"] } } },
        { name: "filter_days_entity",     selector: { entity: { domain: ["sensor"] } } },
        { name: "cleaning_days_entity",   selector: { entity: { domain: ["sensor"] } } },
        { name: "battery_entity",         selector: { entity: { domain: ["sensor"] } } },
      ],
    },
    // ── Status (binary_sensor + select) ───────────────────────────────
    {
      type: "expandable",
      name: "status_section",
      flatten: true,
      icon: "mdi:information-outline",
      title: customLocalize(
        "editor.card.petlibro_dockstream_2.status_section"
      ),
      schema: [
        { name: "power_entity",        selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "connectivity_entity", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "dispensing_entity",   selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "mode_entity",         selector: { entity: { domain: ["select"] } } },
      ],
    },
    // ── Action buttons ───────────────────────────────────────────────
    {
      type: "expandable",
      name: "actions_section",
      flatten: true,
      icon: "mdi:gesture-tap-button",
      title: customLocalize(
        "editor.card.petlibro_dockstream_2.actions_section"
      ),
      schema: [
        {
          type: "expandable",
          name: "btn_1_section",
          flatten: true,
          icon: "mdi:numeric-1-circle-outline",
          title: customLocalize(
            "editor.card.petlibro_dockstream_2.btn_1_section"
          ),
          schema: [
            { name: "btn_1_entity", selector: { entity: {} } },
            { name: "btn_1_name",   selector: { text: {} } },
            {
              name: "btn_1_icon",
              selector: { icon: {} },
              context: { icon_entity: "btn_1_entity" },
            },
            { name: "btn_1_icon_color", selector: { text: {} } },
          ],
        },
        {
          type: "expandable",
          name: "btn_2_section",
          flatten: true,
          icon: "mdi:numeric-2-circle-outline",
          title: customLocalize(
            "editor.card.petlibro_dockstream_2.btn_2_section"
          ),
          schema: [
            { name: "btn_2_entity", selector: { entity: {} } },
            { name: "btn_2_name",   selector: { text: {} } },
            {
              name: "btn_2_icon",
              selector: { icon: {} },
              context: { icon_entity: "btn_2_entity" },
            },
            { name: "btn_2_icon_color", selector: { text: {} } },
          ],
        },
      ],
    },
  ]
);

@customElement(PETLIBRO_DOCKSTREAM_2_CARD_EDITOR_NAME)
export class PetlibroDockstream2CardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: PetlibroDockstream2CardConfig;

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: PetlibroDockstream2CardConfig): void {
    assert(config, petlibroDockstream2CardConfigStruct);
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const customLocalize = setupCustomlocalize(this.hass!);
    if (GENERIC_LABELS.includes(schema.name)) {
      return customLocalize(`editor.card.generic.${schema.name}`);
    }
    if (DOCKSTREAM_2_LABELS.includes(schema.name)) {
      return customLocalize(
        `editor.card.petlibro_dockstream_2.${schema.name}`
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
