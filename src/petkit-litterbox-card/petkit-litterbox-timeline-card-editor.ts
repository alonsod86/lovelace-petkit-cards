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

const TIMELINE_LABELS = [
  "hours_to_show",
  "layout",
  "secondary_entity",
  "header_title",
  "show_header_icon",
  "show_header_title",
  "show_header_hours",
  "show_idle_events",
  "show_event_time",
  "show_event_duration",
  "reverse_order",
  "use_icons",
  "unknown_label",
  "label_idle",
  "label_cleaning",
  "label_scooping",
  "label_dumping",
  "label_leveling",
  "label_odor_removal",
  "label_deodorizing",
  "label_maintenance",
  "label_refreshing",
  "label_resetting",
  "label_paused",
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
    {
      name: "secondary_entity",
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
    // ── Header options ────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "header_section",
      flatten: true,
      icon: "mdi:page-layout-header",
      title: customLocalize(
        "editor.card.petkit_litterbox_timeline.header_section"
      ),
      schema: [
        { name: "header_title", selector: { text: {} } },
        {
          type: "grid" as const,
          name: "",
          schema: [
            { name: "show_header_icon",  selector: { boolean: {} } },
            { name: "show_header_title", selector: { boolean: {} } },
            { name: "show_header_hours", selector: { boolean: {} } },
          ],
        },
      ],
    },
    // ── Event display options ─────────────────────────────────────────
    {
      type: "expandable",
      name: "events_section",
      flatten: true,
      icon: "mdi:tune",
      title: customLocalize(
        "editor.card.petkit_litterbox_timeline.events_section"
      ),
      schema: [
        {
          type: "grid" as const,
          name: "",
          schema: [
            { name: "show_idle_events",    selector: { boolean: {} } },
            { name: "show_event_time",     selector: { boolean: {} } },
            { name: "show_event_duration", selector: { boolean: {} } },
            { name: "reverse_order",       selector: { boolean: {} } },
            { name: "use_icons",           selector: { boolean: {} } },
          ],
        },
      ],
    },
    // ── State label overrides ─────────────────────────────────────────────────
    {
      type: "expandable",
      name: "labels_section",
      flatten: true,
      icon: "mdi:label-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_timeline.labels_section"
      ),
      schema: [
        {
          type: "grid" as const,
          name: "",
          schema: [
            { name: "unknown_label",      selector: { text: {} } },
            { name: "label_idle",        selector: { text: {} } },
            { name: "label_cleaning",    selector: { text: {} } },
            { name: "label_scooping",    selector: { text: {} } },
            { name: "label_dumping",     selector: { text: {} } },
            { name: "label_leveling",    selector: { text: {} } },
            { name: "label_odor_removal",selector: { text: {} } },
            { name: "label_deodorizing", selector: { text: {} } },
            { name: "label_maintenance", selector: { text: {} } },
            { name: "label_refreshing",  selector: { text: {} } },
            { name: "label_resetting",   selector: { text: {} } },
            { name: "label_paused",      selector: { text: {} } },
          ],
        },
      ],
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
