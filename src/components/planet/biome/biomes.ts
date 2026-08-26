import type { Biome } from "./types";

export type RGBColor = [number, number, number];

interface BiomeDefinition {
  color: RGBColor;
}

export const BIOMES: Record<Biome, BiomeDefinition> = {
  ocean: { color: [0.08, 0.18, 0.52] },
  grassland: { color: [0.28, 0.52, 0.22] },
  beach: { color: [0.85, 0.76, 0.48] },
  desert: { color: [0.8, 0.48, 0.22] },
  mountain: { color: [0.45, 0.48, 0.52] },
  snow: { color: [0.94, 0.95, 0.98] },
  ice: { color: [0.42, 0.74, 0.88] },
};
