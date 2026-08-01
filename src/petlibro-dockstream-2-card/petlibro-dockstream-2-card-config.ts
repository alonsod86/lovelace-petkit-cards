import {
  any,
  assign,
  boolean,
  object,
  optional,
  string,
} from "superstruct";
import { ActionConfig } from "../ha";
import {
  lovelaceCardConfigStruct,
  LovelaceCardConfig,
} from "../shared/config/lovelace-card-config";

/**
 * Configuration for the Petlibro Dockstream 2 dashboard card.
 *
 * Mirrors the Petkit Litterbox dashboard card layout: a large hero image, a
 * horizontal strip of up to four user-chosen sensor chips (percentage values
 * render as SVG rings, anything else as an icon chip), and two configurable
 * action buttons.
 */
export interface PetlibroDockstream2CardConfig extends LovelaceCardConfig {
  /** Required primary entity used for the title and optional state badge. */
  entity: string;
  picture?: string;
  title?: string;
  show_name?: boolean;
  show_state?: boolean;
  /** Sensor arm connectors (right side of the device image). */
  arm_top_entity?: string;
  arm_top_name?: string;
  arm_top_visible?: boolean;
  arm_bottom_entity?: string;
  arm_bottom_name?: string;
  arm_bottom_visible?: boolean;
  /** Sensor chip slots 1–4 (flat prefixed fields). */
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
  /** Action buttons 1–2 (button / script / switch). */
  btn_1_entity?: string;
  btn_1_name?: string;
  btn_1_icon?: string;
  btn_1_icon_color?: string;
  btn_1_tap_action?: ActionConfig;
  btn_2_entity?: string;
  btn_2_name?: string;
  btn_2_icon?: string;
  btn_2_icon_color?: string;
  btn_2_tap_action?: ActionConfig;
}

export const petlibroDockstream2CardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    entity: string(),
    picture: optional(string()),
    title: optional(string()),
    show_name: optional(boolean()),
    show_state: optional(boolean()),
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
    btn_1_icon_color: optional(string()),
    btn_1_tap_action: optional(any()),
    btn_2_entity: optional(string()),
    btn_2_name: optional(string()),
    btn_2_icon: optional(string()),
    btn_2_icon_color: optional(string()),
    btn_2_tap_action: optional(any()),
  })
);
