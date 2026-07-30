import {
  assign,
  boolean,
  literal,
  number,
  object,
  optional,
  string,
  union,
} from "superstruct";
import {
  lovelaceCardConfigStruct,
  LovelaceCardConfig,
} from "../shared/config/lovelace-card-config";

export type CameraMode = "snapshot" | "stream";

export interface PetkitLitterboxDashboardCardConfig extends LovelaceCardConfig {
  entity: string;
  picture?: string;
  show_name?: boolean;
  // Optional camera panel (left side of hero)
  camera_entity?: string;
  camera_mode?: CameraMode;
  camera_size?: number; // camera panel width as % of card (default 30)
  // Sensor arm connectors (right side of device image in split layout)
  arm_top_entity?: string;    // upper-third arm (e.g. N60 days left)
  arm_top_name?: string;      // custom label override for upper arm badge
  arm_bottom_entity?: string; // lower-third arm (e.g. N50 days left)
  arm_bottom_name?: string;   // custom label override for lower arm badge
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
    camera_entity: optional(string()),
    camera_mode: optional(union([literal("snapshot"), literal("stream")])),
    camera_size: optional(number()),
    arm_top_entity: optional(string()),
    arm_top_name: optional(string()),
    arm_bottom_entity: optional(string()),
    arm_bottom_name: optional(string()),
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
