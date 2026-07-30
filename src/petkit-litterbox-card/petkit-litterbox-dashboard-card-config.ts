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
import { ActionConfig, actionConfigStruct } from "../ha";
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
  arm_top_entity?: string;
  arm_top_name?: string;
  arm_top_visible?: boolean;
  arm_bottom_entity?: string;
  arm_bottom_name?: string;
  arm_bottom_visible?: boolean;
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
  // Action buttons 1–2
  btn_1_entity?: string;
  btn_1_name?: string;
  btn_1_icon?: string;
  btn_1_tap_action?: ActionConfig;
  btn_2_entity?: string;
  btn_2_name?: string;
  btn_2_icon?: string;
  btn_2_tap_action?: ActionConfig;
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
    arm_top_visible: optional(boolean()),
    arm_bottom_entity: optional(string()),
    arm_bottom_name: optional(string()),
    arm_bottom_visible: optional(boolean()),
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
    btn_1_entity: optional(string()),
    btn_1_name: optional(string()),
    btn_1_icon: optional(string()),
    btn_1_tap_action: optional(actionConfigStruct),
    btn_2_entity: optional(string()),
    btn_2_name: optional(string()),
    btn_2_icon: optional(string()),
    btn_2_tap_action: optional(actionConfigStruct),
  })
);
