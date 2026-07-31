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
import { LovelaceCardConfig } from "../shared/config/lovelace-card-config";
import { lovelaceCardConfigStruct } from "../shared/config/lovelace-card-config";

export type TimelineLayout = "vertical" | "horizontal";

export interface PetkitLitterboxTimelineCardConfig extends LovelaceCardConfig {
  entity: string;
  entity_icon?: string;
  primary_column_title?: string;
  secondary_entity?: string;
  secondary_entity_icon?: string;
  secondary_column_title?: string;
  layout?: TimelineLayout;
  hours_to_show?: number;
  // Header
  header_title?: string;
  show_header_icon?: boolean;
  show_header_title?: boolean;
  show_header_hours?: boolean;
  // Event display options
  show_idle_events?: boolean;
  show_event_time?: boolean;
  show_event_duration?: boolean;
  reverse_order?: boolean;
  // Unknown state placeholder
  unknown_label?: string;
  // Per-state label overrides
  label_idle?: string;
  label_cleaning?: string;
  label_scooping?: string;
  label_dumping?: string;
  label_leveling?: string;
  label_odor_removal?: string;
  label_deodorizing?: string;
  label_maintenance?: string;
  label_refreshing?: string;
  label_resetting?: string;
  label_paused?: string;
}

export const petkitLitterboxTimelineCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    entity: string(),
    entity_icon: optional(string()),
    primary_column_title: optional(string()),
    secondary_entity: optional(string()),
    secondary_entity_icon: optional(string()),
    secondary_column_title: optional(string()),
    layout: optional(union([literal("vertical"), literal("horizontal")])),
    hours_to_show: optional(number()),
    header_title: optional(string()),
    show_header_icon: optional(boolean()),
    show_header_title: optional(boolean()),
    show_header_hours: optional(boolean()),
    show_idle_events: optional(boolean()),
    show_event_time: optional(boolean()),
    show_event_duration: optional(boolean()),
    reverse_order: optional(boolean()),
    unknown_label: optional(string()),
    label_idle: optional(string()),
    label_cleaning: optional(string()),
    label_scooping: optional(string()),
    label_dumping: optional(string()),
    label_leveling: optional(string()),
    label_odor_removal: optional(string()),
    label_deodorizing: optional(string()),
    label_maintenance: optional(string()),
    label_refreshing: optional(string()),
    label_resetting: optional(string()),
    label_paused: optional(string()),
  })
);
