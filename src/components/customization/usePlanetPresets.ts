import { useState } from "react";
import { DEFAULT_PRESETS } from "./planetDefaults";
import type { PlanetPreset } from "./types";

const PRESETS_STORAGE_KEY = "planet-presets";
const DELETED_PRESETS_STORAGE_KEY = "planet-deleted-presets";
export const MAX_CUSTOM_PRESETS = 20;

export type PresetActionResult = "success" | "limit-reached" | "storage-error";

function readStorage<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key);
    const parsedValue: unknown = value === null ? [] : JSON.parse(value);
    return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
  } catch {
    return [];
  }
}

function writeStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function usePlanetPresets() {
  const [customPresets, setCustomPresets] = useState<PlanetPreset[]>(() =>
    readStorage<PlanetPreset>(PRESETS_STORAGE_KEY),
  );

  const [deletedPresetIds, setDeletedPresetIds] = useState<string[]>(() =>
    readStorage<string>(DELETED_PRESETS_STORAGE_KEY),
  );

  const presets = [
    ...DEFAULT_PRESETS.filter(
      (preset) => !deletedPresetIds.includes(preset.id),
    ),
    ...customPresets,
  ];

  const savePreset = (preset: PlanetPreset): PresetActionResult => {
    if (customPresets.length >= MAX_CUSTOM_PRESETS) {
      return "limit-reached";
    }

    const next = [...customPresets, preset];

    if (!writeStorage(PRESETS_STORAGE_KEY, next)) {
      return "storage-error";
    }

    setCustomPresets(next);
    return "success";
  };

  const deletePreset = (id: string): PresetActionResult => {
    if (DEFAULT_PRESETS.some((preset) => preset.id === id)) {
      const next = [...deletedPresetIds, id];

      if (!writeStorage(DELETED_PRESETS_STORAGE_KEY, next)) {
        return "storage-error";
      }

      setDeletedPresetIds(next);
      return "success";
    }

    const next = customPresets.filter((preset) => preset.id !== id);

    if (!writeStorage(PRESETS_STORAGE_KEY, next)) {
      return "storage-error";
    }

    setCustomPresets(next);
    return "success";
  };

  return {
    presets,
    savePreset,
    deletePreset,
  };
}
