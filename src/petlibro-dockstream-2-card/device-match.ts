import { HomeAssistant } from "../ha";

/**
 * Returns the set of `entity_id`s that belong to a Petlibro Dockstream 2
 * Smart Fountain (PLWF106 plug-in or PLWF116 cordless), as registered in the
 * Home Assistant device registry.
 *
 * Matching strategy (any of the following is sufficient):
 *   - Device `manufacturer` contains "petlibro"  (case-insensitive)
 *     AND device `model` matches one of the Dockstream 2 model identifiers.
 *   - Device `model` is missing but the device `name` looks like a Dockstream 2.
 *
 * Model identifiers recognised (lower-cased, comma-separated matches):
 *   - "dockstream 2 smart fountain"
 *   - "dockstream 2 smart cordless fountain"
 *   - "plwf106"
 *   - "plwf116"
 *
 * Returns `null` when no candidate device is found, so callers can fall back
 * to a broader (domain-only) selector.
 */
export function findDockstream2EntityIds(
  hass?: HomeAssistant
): Set<string> | null {
  if (!hass?.devices || !hass.entities) return null;

  const MODEL_HINTS = [
    "dockstream 2 smart fountain",
    "dockstream 2 smart cordless fountain",
    "plwf106",
    "plwf116",
  ];
  const NAME_HINTS = ["dockstream 2"];

  const isDockstream2 = (device: {
    manufacturer?: string | null;
    model?: string | null;
    name?: string;
  }): boolean => {
    const mfr = (device.manufacturer ?? "").toLowerCase();
    const model = (device.model ?? "").toLowerCase();
    const name = (device.name ?? "").toLowerCase();
    if (!mfr.includes("petlibro")) return false;
    if (MODEL_HINTS.some((h) => model.includes(h))) return true;
    if (model === "" && NAME_HINTS.some((h) => name.includes(h))) return true;
    return false;
  };

  const deviceIds = new Set<string>();
  for (const device of Object.values(hass.devices) as Array<{
    id: string;
    manufacturer?: string | null;
    model?: string | null;
    name?: string;
  }>) {
    if (isDockstream2(device)) deviceIds.add(device.id);
  }

  if (deviceIds.size === 0) return null;

  const entityIds = new Set<string>();
  for (const entity of Object.values(hass.entities) as Array<{
    device_id?: string | null;
    entity_id: string;
  }>) {
    if (entity.device_id && deviceIds.has(entity.device_id)) {
      entityIds.add(entity.entity_id);
    }
  }

  return entityIds.size > 0 ? entityIds : null;
}

/**
 * Restrict an entity-domain list (`["sensor"]`, `["binary_sensor"]`, …) to the
 * subset of Dockstream 2 entities that match those domains. Used to scope the
 * picker per slot while still respecting domain constraints.
 */
export function filterDockstream2ByDomains(
  hass: HomeAssistant | undefined,
  entityIds: Set<string> | null,
  domains: readonly string[] | string | undefined
): string[] | undefined {
  if (!hass || !entityIds) return undefined;
  const domainList = Array.isArray(domains)
    ? domains
    : typeof domains === "string"
    ? [domains]
    : [];
  const allowed: string[] = [];
  for (const id of entityIds) {
    const domain = id.split(".", 1)[0];
    if (domainList.length === 0 || domainList.includes(domain)) {
      allowed.push(id);
    }
  }
  return allowed.length > 0 ? allowed : undefined;
}
