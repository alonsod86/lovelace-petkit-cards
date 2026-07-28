import { HassEntity } from "home-assistant-js-websocket";
import { PetkitLitterboxCardConfig } from "./petkit-litterbox-card-config";

export const DEFAULT_ACTIVE_STATES = [
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
];

export function isActiveState(
  stateObj: HassEntity,
  config: PetkitLitterboxCardConfig
): boolean {
  return (config.active_states ?? DEFAULT_ACTIVE_STATES).includes(
    stateObj.state
  );
}

export function isCleaningState(
  stateObj: HassEntity,
  config: PetkitLitterboxCardConfig
): boolean {
  const cleaningStates = ["cleaning", "scooping", "dumping", "leveling"];
  const activeList = config.active_states ?? cleaningStates;
  return activeList.some(
    (s) => cleaningStates.includes(s) && s === stateObj.state
  );
}
