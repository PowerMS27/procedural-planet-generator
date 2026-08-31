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
      temperature: -20,
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 0.7,
    },
  },
  {
    id: "earth-barren",
    name: "Earth Barren",
    seed: 765098893,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      temperature: 100,
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 0.7,
      noiseOctaves: 5,
    },
  },
  {
    id: "earth-frozen",
    name: "Earth Frozen",
    seed: 765098893,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      temperature: -30,
      waterLevel: 0.5,
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 0.7,
      noiseOctaves: 5,
    },
  },
  {
    id: "mars",
    name: "Mars",
    seed: 3244225864,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      waterLevel: -1.4,
      temperature: 50,
      colors: {
        ocean: "#BF9E63",
        grassland: "#7C3E2B",
        beach: "#C25A3F",
        desert: "#E85834",
        mountain: "#D63F1A",
      },
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 1,
      terrainStrength: 0.1,
    },
  },
  {
    id: "55-cancri-e",
    name: "55 Cancri e",
    seed: 1956966400,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      waterLevel: -0.3,
      temperature: 90,
      colors: {
        ocean: "#e86500",
        grassland: "#4d2f25",
        beach: "#3d3120",
        desert: "#2b1f16",
        mountain: "#261c13",
      },
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 1.6,
      terrainStrength: 0.1,
    },
  },
  {
    id: "kepler-186-f",
    name: "Kepler-186 f",
    seed: 2259097819,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      waterLevel: 0.1,
      temperature: 10,
      colors: {
        ocean: "#22857c",
        grassland: "#a8843b",
        beach: "#a13a25",
        desert: "#E85834",
        mountain: "#2e3136",
      },
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 0.9,
      noiseOctaves: 5,
      terrainStrength: 0.1,
    },
  },
  {
    id: "paradise",
    name: "Paradise",
    seed: 2051919471,
    visual: {
      ...DEFAULT_VISUAL_SETTINGS,
      detail: 7,
      waterLevel: 0.1,
      temperature: 40,
      colors: {
        ocean: "#4CA6B8",
        grassland: "#763F9E",
        beach: "#3e9426",
        desert: "#3d8536",
        mountain: "#3C424A",
      },
    },
    generation: {
      ...DEFAULT_GENERATION_SETTINGS,
      noiseFrequency: 1.1,
      noiseOctaves: 7,
    },
  },
];
