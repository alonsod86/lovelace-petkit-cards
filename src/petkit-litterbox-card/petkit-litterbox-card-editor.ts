import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { LocalizeFunc, LovelaceCardEditor, fireEvent } from "../ha";
import setupCustomlocalize from "../localize";
import { computeActionsFormSchema } from "../shared/config/actions-config";
import { computeAppearanceFormSchema } from "../shared/config/appearance-config";
import { MushroomBaseElement } from "../utils/base-element";
import { GENERIC_LABELS } from "../utils/form/generic-fields";
import { HaFormSchema } from "../utils/form/ha-form";
import { computeNameSchema } from "../utils/form/name-schema";
import { loadHaComponents } from "../utils/loader";
import {
  PETKIT_LITTERBOX_CARD_EDITOR_NAME,
  PETKIT_LITTERBOX_STATE_DOMAINS,
} from "./const";
import {
  PETKIT_LITTERBOX_ACTIONS,
  PetkitLitterboxCardConfig,
  petkitLitterboxCardConfigStruct,
} from "./petkit-litterbox-card-config";

const PETKIT_LITTERBOX_LABELS = [
  "actions",
  "icon_animation",
  "active_states",
  "scoop_entity",
  "deodorize_entity",
  "level_litter_entity",
  "maintenance_entity",
  "footer_1",
  "footer_2",
];

const computeSchema = memoizeOne(
  (
    localize: LocalizeFunc,
    customLocalize: ReturnType<typeof setupCustomlocalize>,
    version: string
  ): HaFormSchema[] => [
    {
      name: "entity",
      selector: { entity: { domain: PETKIT_LITTERBOX_STATE_DOMAINS } },
    },
    computeNameSchema(version),
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "icon",
          selector: { icon: {} },
          context: { icon_entity: "entity" },
        },
        { name: "icon_animation", selector: { boolean: {} } },
      ],
    },
    ...computeAppearanceFormSchema(customLocalize as any),
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "scoop_entity",
          selector: { entity: { domain: ["button", "script"] } },
        },
        {
          name: "deodorize_entity",
          selector: { entity: { domain: ["button", "script"] } },
        },
        {
          name: "level_litter_entity",
          selector: { entity: { domain: ["button", "script"] } },
        },
        {
          name: "maintenance_entity",
          selector: { entity: { domain: ["button", "script"] } },
        },
      ],
    },
    {
      name: "actions",
      selector: {
        select: {
          mode: "list",
          multiple: true,
          options: PETKIT_LITTERBOX_ACTIONS.map((action) => ({
            value: action,
            label: customLocalize(
              `editor.card.petkit_litterbox.actions_list.${action}`
            ),
          })),
        },
      },
    },
    {
      name: "active_states",
      selector: {
        select: {
          mode: "list",
          multiple: true,
          custom_value: true,
          options: [
            "cleaning",
            "scooping",
            "dumping",
            "leveling",
            "odor_removal",
            "deodorizing",
            "maintenance",
            "refreshing",
            "paused",
            "resetting",
          ].map((s) => ({ value: s, label: s })),
        },
      },
    },
    {
      type: "expandable",
      name: "footer_1",
      flatten: true,
      title: customLocalize("editor.card.petkit_litterbox.footer_1"),
      icon: "mdi:view-headline",
      schema: [
        { name: "footer_1_entity", selector: { entity: {} } },
        { name: "footer_1_name", selector: { text: {} } },
        {
          name: "footer_1_icon",
          selector: { icon: {} },
          context: { icon_entity: "footer_1_entity" },
        },
        {
          name: "footer_1_tap_action",
          selector: { ui_action: { default_action: "more-info" } },
        },
      ],
    },
    {
      type: "expandable",
      name: "footer_2",
      flatten: true,
      title: customLocalize("editor.card.petkit_litterbox.footer_2"),
      icon: "mdi:view-headline",
      schema: [
        { name: "footer_2_entity", selector: { entity: {} } },
        { name: "footer_2_name", selector: { text: {} } },
        {
          name: "footer_2_icon",
          selector: { icon: {} },
          context: { icon_entity: "footer_2_entity" },
        },
        {
          name: "footer_2_tap_action",
          selector: { ui_action: { default_action: "more-info" } },
        },
      ],
    },
    ...computeActionsFormSchema(),
  ]
);

@customElement(PETKIT_LITTERBOX_CARD_EDITOR_NAME)
export class PetkitLitterboxCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: PetkitLitterboxCardConfig;

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: PetkitLitterboxCardConfig): void {
    assert(config, petkitLitterboxCardConfigStruct);
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const customLocalize = setupCustomlocalize(this.hass!);

    // Footer sub-fields use flat prefixed names (footer_1_entity, ...);
    // strip the prefix so they resolve to the generic label ("Entity", etc).
    const bareName = schema.name.replace(/^footer_[12]_/, "");

    if (GENERIC_LABELS.includes(schema.name)) {
      return customLocalize(`editor.card.generic.${schema.name}`);
    }
    if (PETKIT_LITTERBOX_LABELS.includes(schema.name)) {
      return customLocalize(`editor.card.petkit_litterbox.${schema.name}`);
    }
    return this.hass!.localize(
      `ui.panel.lovelace.editor.card.generic.${bareName}`
    );
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const customLocalize = setupCustomlocalize(this.hass!);
    const schema = computeSchema(
      this.hass!.localize,
      customLocalize,
      this.hass!.config.version
    );

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
