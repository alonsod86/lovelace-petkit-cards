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
  PETKIT_DASHBOARD_CARD_EDITOR_NAME,
  PETKIT_LITTERBOX_STATE_DOMAINS,
} from "./const";
import {
  PetkitLitterboxDashboardCardConfig,
  petkitLitterboxDashboardCardConfigStruct,
} from "./petkit-litterbox-dashboard-card-config";

const DASHBOARD_LABELS = [
  "picture",
  "show_name",
  "camera_entity",
  "camera_mode",
  "camera_size",
  "arm_section",
  "arm_top_entity",
  "arm_top_name",
  "arm_top_visible",
  "arm_bottom_entity",
  "arm_bottom_name",
  "arm_bottom_visible",
  "sensor_1_entity",
  "sensor_1_name",
  "sensor_1_icon",
  "sensor_2_entity",
  "sensor_2_name",
  "sensor_2_icon",
  "sensor_3_entity",
  "sensor_3_name",
  "sensor_3_icon",
  "sensor_4_entity",
  "sensor_4_name",
  "sensor_4_icon",
];

const computeSchema = memoizeOne(
  (
    _localize: LocalizeFunc,
    customLocalize: ReturnType<typeof setupCustomlocalize>
  ): HaFormSchema[] => [
    {
      name: "entity",
      selector: { entity: { domain: PETKIT_LITTERBOX_STATE_DOMAINS } },
    },
    { name: "picture", selector: { text: {} } },
    { name: "show_name", selector: { boolean: {} } },
    // ── Camera panel ──────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "camera_section",
      flatten: true,
      icon: "mdi:camera",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.camera_section"
      ),
      schema: [
        { name: "camera_entity", selector: { entity: { domain: ["camera"] } } },
        {
          name: "camera_mode",
          selector: {
            select: {
              mode: "list" as const,
              options: [
                {
                  value: "snapshot",
                  label: customLocalize(
                    "editor.card.petkit_litterbox_dashboard.camera_mode_snapshot"
                  ),
                },
                {
                  value: "stream",
                  label: customLocalize(
                    "editor.card.petkit_litterbox_dashboard.camera_mode_stream"
                  ),
                },
              ],
            },
          },
        },
      ],
    },
    // ── Camera panel width (top-level so it's always visible) ─────────────────
    {
      name: "camera_size",
      selector: {
        number: {
          min: 15,
          max: 55,
          step: 5,
          unit_of_measurement: "%",
          mode: "box" as const,
        },
      },
    },    // ── Sensor arms (right side of device image) ───────────────────────
    {
      type: "expandable",
      name: "arm_section",
      flatten: true,
      icon: "mdi:arrow-right-bold",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.arm_section"
      ),
      schema: [
        { name: "arm_top_entity",    selector: { entity: {} } },
        { name: "arm_top_name",      selector: { text: {} } },
        { name: "arm_top_visible",   selector: { boolean: {} } },
        { name: "arm_bottom_entity", selector: { entity: {} } },
        { name: "arm_bottom_name",   selector: { text: {} } },
        { name: "arm_bottom_visible",selector: { boolean: {} } },
      ],
    },    // ── Sensor 1 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_1_section",
      flatten: true,
      icon: "mdi:numeric-1-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_1_section"
      ),
      schema: [
        {
          name: "sensor_1_entity",
          selector: { entity: {} },
        },
        { name: "sensor_1_name", selector: { text: {} } },
        {
          name: "sensor_1_icon",
          selector: {
            icon: {},
          },
          context: { icon_entity: "sensor_1_entity" },
        },
      ],
    },
    // ── Sensor 2 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_2_section",
      flatten: true,
      icon: "mdi:numeric-2-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_2_section"
      ),
      schema: [
        {
          name: "sensor_2_entity",
          selector: { entity: {} },
        },
        { name: "sensor_2_name", selector: { text: {} } },
        {
          name: "sensor_2_icon",
          selector: {
            icon: {},
          },
          context: { icon_entity: "sensor_2_entity" },
        },
      ],
    },
    // ── Sensor 3 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_3_section",
      flatten: true,
      icon: "mdi:numeric-3-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_3_section"
      ),
      schema: [
        {
          name: "sensor_3_entity",
          selector: { entity: {} },
        },
        { name: "sensor_3_name", selector: { text: {} } },
        {
          name: "sensor_3_icon",
          selector: {
            icon: {},
          },
          context: { icon_entity: "sensor_3_entity" },
        },
      ],
    },
    // ── Sensor 4 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_4_section",
      flatten: true,
      icon: "mdi:numeric-4-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_4_section"
      ),
      schema: [
        {
          name: "sensor_4_entity",
          selector: { entity: {} },
        },
        { name: "sensor_4_name", selector: { text: {} } },
        {
          name: "sensor_4_icon",
          selector: {
            icon: {},
          },
          context: { icon_entity: "sensor_4_entity" },
        },
      ],
    },
  ]
);

@customElement(PETKIT_DASHBOARD_CARD_EDITOR_NAME)
export class PetkitLitterboxDashboardCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: PetkitLitterboxDashboardCardConfig;

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: PetkitLitterboxDashboardCardConfig): void {
    assert(config, petkitLitterboxDashboardCardConfigStruct);
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const customLocalize = setupCustomlocalize(this.hass!);
    if (GENERIC_LABELS.includes(schema.name)) {
      return customLocalize(`editor.card.generic.${schema.name}`);
    }
    if (DASHBOARD_LABELS.includes(schema.name)) {
      return customLocalize(
        `editor.card.petkit_litterbox_dashboard.${schema.name}`
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
