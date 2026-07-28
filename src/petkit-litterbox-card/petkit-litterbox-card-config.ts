import {
  array,
  assign,
  boolean,
  object,
  optional,
  string,
} from "superstruct";
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
  })
);
