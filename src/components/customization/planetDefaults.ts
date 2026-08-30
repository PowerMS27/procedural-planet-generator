import type { GenerationSettings, PlanetPreset, VisualSettings } from "./types";

export const DEFAULT_VISUAL_SETTINGS: VisualSettings = {
  detail: 5,
  radius: 2,
  waterLevel: 0.3,
  temperature: 30,
  colors: {
    ocean: "#5482CB",
    grassland: "#477A35",
    beach: "#D9C27A",
    desert: "#C47736",
    mountain: "#59616B",
  },
};

export const DEFAULT_GENERATION_SETTINGS: GenerationSettings = {
  terrainStrength: 0.2,
  noiseFrequency: 0.8,
  noiseOctaves: 4,
};

export const DEFAULT_PRESETS: PlanetPreset[] = [
  {
    id: "earth",
    name: "Earth Modern",
    seed: 765098893,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      waterLevel: 0.4,
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 0.7,
      noiseOctaves: 5,
    },
  },
  {
    id: "earth-ice-age",
    name: "Earth Ice Age",
    seed: 765098893,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      waterLevel: 0.3,
      temperature: -20,
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 0.7,
      noiseOctaves: 4,
    },
  },
];
