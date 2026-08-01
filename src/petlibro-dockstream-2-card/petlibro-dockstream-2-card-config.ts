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

export interface PetlibroDockstream2CardConfig extends LovelaceCardConfig {
  /** Required primary entity (e.g. water dispensing state or weight %). */
  entity: string;
  picture?: string;
  title?: string;
  show_name?: boolean;
  show_state?: boolean;
  /**
   * Optional fields, all unset by default. The card gracefully hides any
   * missing/unavailable entity — only configured ones render as chips.
   */
  water_level_entity?: string;       // sensor.current_weight_percent (%)
  water_volume_entity?: string;      // sensor.remaining_water (mL)
  today_water_entity?: string;       // sensor.today_drinking_amount (mL)
  yesterday_water_entity?: string;   // sensor.yesterday_drinking_amount (mL)
  filter_days_entity?: string;       // sensor.remaining_filter_days (d)
  cleaning_days_entity?: string;     // sensor.remaining_cleaning_days (d)
  battery_entity?: string;           // sensor.electric_quantity (%)
  power_entity?: string;             // binary_sensor.power_state
  connectivity_entity?: string;      // binary_sensor.online
  dispensing_entity?: string;        // binary_sensor.water_state
  mode_entity?: string;              // select.water_dispensing_mode
  /** Action buttons (1 & 2) — e.g. filter_reset, cleaning_reset, light_on/off. */
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
    water_level_entity: optional(string()),
    water_volume_entity: optional(string()),
    today_water_entity: optional(string()),
    yesterday_water_entity: optional(string()),
    filter_days_entity: optional(string()),
    cleaning_days_entity: optional(string()),
    battery_entity: optional(string()),
    power_entity: optional(string()),
    connectivity_entity: optional(string()),
    dispensing_entity: optional(string()),
    mode_entity: optional(string()),
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
