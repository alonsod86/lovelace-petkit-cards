import {
  assign,
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
  layout?: TimelineLayout;
  hours_to_show?: number;
}

export const petkitLitterboxTimelineCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    entity: string(),
    layout: optional(union([literal("vertical"), literal("horizontal")])),
    hours_to_show: optional(number()),
  })
);
