import { IntlMessageFormat } from "intl-messageformat";
import { HomeAssistant } from "./ha";
import * as en from "./translations/en.json";

const languages: Record<string, unknown> = { en };

function getTranslation(language: string): unknown {
  if (language in languages) return languages[language];
  // Strip region code (e.g. "en-US" → "en")
  const base = language.split("-")[0];
  return languages[base] ?? languages["en"];
}

export default function setupCustomlocalize(hass?: HomeAssistant) {
  const language = hass?.locale?.language ?? "en";
  const translation = getTranslation(language) as Record<string, unknown>;

  return function (key: string, data?: Record<string, unknown>): string {
    const keys = key.split(".");
    let value: unknown = translation;
    for (const k of keys) {
      if (value == null || typeof value !== "object") {
        value = undefined;
        break;
      }
      value = (value as Record<string, unknown>)[k];
    }

    // Fall back to English if key not found in requested language
    if (value === undefined && language !== "en") {
      let fallback: unknown = languages["en"];
      for (const k of keys) {
        if (fallback == null || typeof fallback !== "object") {
          fallback = undefined;
          break;
        }
        fallback = (fallback as Record<string, unknown>)[k];
      }
      value = fallback;
    }

    if (typeof value !== "string") return key;
    if (!data) return value;

    try {
      return new IntlMessageFormat(value, language).format(data) as string;
    } catch {
      return value;
    }
  };
}
