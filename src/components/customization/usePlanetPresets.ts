import { useState } from "react";
import { DEFAULT_PRESETS } from "./planetDefaults";
import type { PlanetPreset } from "./types";

const COOKIE_NAME = "planet-presets";
const DELETED_COOKIE_NAME = "planet-deleted-presets";
const MAX_AGE = 60 * 60 * 24 * 365;

function readCookie<T>(name: string, fallback: T): T {
  const value = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];

  if (!value) return fallback;

  try {
    return JSON.parse(decodeURIComponent(value)) as T;
  } catch {
    return fallback;
  }
}

function writeCookie<T>(name: string, value: T): void {
  document.cookie = [
    `${name}=${encodeURIComponent(JSON.stringify(value))}`,
    `max-age=${MAX_AGE}`,
    "path=/",
    "samesite=lax",
  ].join("; ");
}

export function usePlanetPresets() {
  const [customPresets, setCustomPresets] = useState<PlanetPreset[]>(() =>
    readCookie<PlanetPreset[]>(COOKIE_NAME, []),
  );

  const [deletedPresetIds, setDeletedPresetIds] = useState<string[]>(() =>
    readCookie<string[]>(DELETED_COOKIE_NAME, []),
  );

  const presets = [
    ...DEFAULT_PRESETS.filter(
      (preset) => !deletedPresetIds.includes(preset.id),
    ),
    ...customPresets,
  ];

  const savePreset = (preset: PlanetPreset) => {
    setCustomPresets((current) => {
      const next = [...current, preset];
      writeCookie(COOKIE_NAME, next);
      return next;
    });
  };

  const deletePreset = (id: string) => {
    if (DEFAULT_PRESETS.some((preset) => preset.id === id)) {
      setDeletedPresetIds((current) => {
        const next = [...current, id];
        writeCookie(DELETED_COOKIE_NAME, next);
        return next;
      });

      return;
    }

    setCustomPresets((current) => {
      const next = current.filter((preset) => preset.id !== id);
      writeCookie(COOKIE_NAME, next);
      return next;
    });
  };

  return {
    presets,
    savePreset,
    deletePreset,
  };
}
