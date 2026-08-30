import { useEffect, useState } from "react";
import { DEFAULT_PRESETS } from "./planetDefaults";
import type { PlanetPreset } from "./types";

const PRESETS_STORAGE_KEY = "planet-presets";
const DELETED_PRESETS_STORAGE_KEY = "planet-deleted-presets";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function usePlanetPresets() {
  const [customPresets, setCustomPresets] = useState<PlanetPreset[]>(() =>
    readStorage<PlanetPreset[]>(PRESETS_STORAGE_KEY, []),
  );

  const [deletedPresetIds, setDeletedPresetIds] = useState<string[]>(() =>
    readStorage<string[]>(DELETED_PRESETS_STORAGE_KEY, []),
  );

  useEffect(() => {
    writeStorage(PRESETS_STORAGE_KEY, customPresets);
  }, [customPresets]);

  useEffect(() => {
    writeStorage(DELETED_PRESETS_STORAGE_KEY, deletedPresetIds);
  }, [deletedPresetIds]);

  const presets = [
    ...DEFAULT_PRESETS.filter(
      (preset) => !deletedPresetIds.includes(preset.id),
    ),
    ...customPresets,
  ];

  const savePreset = (preset: PlanetPreset) => {
    setCustomPresets((current) => [...current, preset]);
  };

  const deletePreset = (id: string) => {
    if (DEFAULT_PRESETS.some((preset) => preset.id === id)) {
      setDeletedPresetIds((current) => [...current, id]);

      return;
    }

    setCustomPresets((current) =>
      current.filter((preset) => preset.id !== id),
    );
  };

  return {
    presets,
    savePreset,
    deletePreset,
  };
}
