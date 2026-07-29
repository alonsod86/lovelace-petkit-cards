import {
  array,
  assign,
  boolean,
  object,
  optional,
  string,
} from "superstruct";
import { ActionConfig, actionConfigStruct } from "../ha";
import { LovelaceCardConfig } from "../shared/config/lovelace-card-config";
import {
  ActionsSharedConfig,
  actionsSharedConfigStruct,
} from "../shared/config/actions-config";
import {
  AppearanceSharedConfig,
  appearanceSharedConfigStruct,
} from "../shared/config/appearance-config";
import {
  EntitySharedConfig,
  entitySharedConfigStruct,
} from "../shared/config/entity-config";
import { lovelaceCardConfigStruct } from "../shared/config/lovelace-card-config";

export const PETKIT_LITTERBOX_ACTIONS = [
  "scoop",
  "deodorize",
  "level_litter",
  "maintenance",
] as const;

export type PetkitLitterboxActionKey =
  (typeof PETKIT_LITTERBOX_ACTIONS)[number];

// Runtime-only helper shape (resolved from the flat prefixed config fields).
// Not exposed as a struct — the editor and YAML both use the flat form.
export interface PetkitFooterItemConfig {
  entity: string;
  name?: string;
  icon?: string;
  tap_action?: ActionConfig;
}

export type PetkitLitterboxCardConfig = LovelaceCardConfig &
  EntitySharedConfig &
  AppearanceSharedConfig &
  ActionsSharedConfig & {
    icon_animation?: boolean;
    actions?: PetkitLitterboxActionKey[];
    scoop_entity?: string;
    deodorize_entity?: string;
    level_litter_entity?: string;
    maintenance_entity?: string;
    active_states?: string[];
    footer_1_entity?: string;
    footer_1_name?: string;
    footer_1_icon?: string;
    footer_1_tap_action?: ActionConfig;
    footer_2_entity?: string;
    footer_2_name?: string;
    footer_2_icon?: string;
    footer_2_tap_action?: ActionConfig;
  };

export const petkitLitterboxCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  assign(
    entitySharedConfigStruct,
    appearanceSharedConfigStruct,
    actionsSharedConfigStruct
  ),
  object({
    icon_animation: optional(boolean()),
    actions: optional(array(string())),
    scoop_entity: optional(string()),
    deodorize_entity: optional(string()),
    level_litter_entity: optional(string()),
    maintenance_entity: optional(string()),
    active_states: optional(array(string())),
    footer_1_entity: optional(string()),
    footer_1_name: optional(string()),
    footer_1_icon: optional(string()),
    footer_1_tap_action: optional(actionConfigStruct),
    footer_2_entity: optional(string()),
    footer_2_name: optional(string()),
    footer_2_icon: optional(string()),
    footer_2_tap_action: optional(actionConfigStruct),
  })
);
