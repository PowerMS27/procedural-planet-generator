import type { EditableBiome } from "@/components/planet/biome/biomes";

export type BiomeColors = Record<EditableBiome, string>;

export interface VisualSettings {
  detail: number;
  radius: number;
  waterLevel: number;
  temperature: number;
  colors: BiomeColors;
}

export interface GenerationSettings {
  terrainStrength: number;
  noiseFrequency: number;
  noiseOctaves: number;
}

export interface PlanetState {
  seed: number;
  visual: VisualSettings;
  generation: GenerationSettings;
}

export interface PlanetPreset {
  id: string;
  name: string;
  seed: number;
  visual: VisualSettings;
  generation: GenerationSettings;
}
