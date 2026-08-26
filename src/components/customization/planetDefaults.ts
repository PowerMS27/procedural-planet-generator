import type { GenerationSettings, VisualSettings } from "./types";

export const DEFAULT_VISUAL_SETTINGS: VisualSettings = {
  detail: 5,
  radius: 2,
  waterLevel: 0.3,
};

export const DEFAULT_GENERATION_SETTINGS: GenerationSettings = {
  terrainStrength: 0.2,
  noiseFrequency: 0.8,
  noiseOctaves: 4,
};

export const INITIAL_SEED = 1;
