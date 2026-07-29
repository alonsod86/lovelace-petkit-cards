import {
  assign,
  boolean,
  object,
  optional,
  string,
} from "superstruct";
import {
  lovelaceCardConfigStruct,
  LovelaceCardConfig,
} from "../shared/config/lovelace-card-config";

export interface PetkitLitterboxDashboardCardConfig extends LovelaceCardConfig {
  entity: string;
  picture?: string;
  show_name?: boolean;
  // Sensor chip slots 1–4 (flat prefixed fields)
  sensor_1_entity?: string;
  sensor_1_name?: string;
  sensor_1_icon?: string;
  sensor_2_entity?: string;
  sensor_2_name?: string;
  sensor_2_icon?: string;
  sensor_3_entity?: string;
  sensor_3_name?: string;
  sensor_3_icon?: string;
  sensor_4_entity?: string;
  sensor_4_name?: string;
  sensor_4_icon?: string;
}

export const petkitLitterboxDashboardCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    entity: string(),
    picture: optional(string()),
    show_name: optional(boolean()),
    sensor_1_entity: optional(string()),
    sensor_1_name: optional(string()),
    sensor_1_icon: optional(string()),
    sensor_2_entity: optional(string()),
    sensor_2_name: optional(string()),
    sensor_2_icon: optional(string()),
    sensor_3_entity: optional(string()),
    sensor_3_name: optional(string()),
    sensor_3_icon: optional(string()),
    sensor_4_entity: optional(string()),
    sensor_4_name: optional(string()),
    sensor_4_icon: optional(string()),
  })
);
