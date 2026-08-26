import { BIOMES } from "./biomes";
import type { Biome } from "./types";
import { createNoise3D } from "simplex-noise";

interface BiomeInput {
  waterLevel: number;
  height: number;
  x: number;
  y: number;
  z: number;
  noise3D: BiomeNoise;
}

export type BiomeNoise = ReturnType<typeof createNoise3D>;

export function getBiome(input: BiomeInput): Biome {
  const { waterLevel, height, x, y, z, noise3D } = input;
  const isFreezingAllowed = waterLevel > -1.5;

  // Noise values for biome placement
  const latitude = Math.abs(y);
  const iceNoise = noise3D(x * 9, y * 10, z * 10);
  const polarNoise = noise3D(x * 2.3, y * 2.3, z * 2.3);
  const mountainSnowNoise = noise3D(x * 4, y * 4, z * 4);
  const baseNoise = noise3D(x * 1.2, y * 1.2, z * 1.2);
  const beachNoise = noise3D(x * 8, y * 8, z * 8);

  const polarFactor = latitude + polarNoise * 0.15 + baseNoise * 0.04;

  // Ice and snow near the poles
  if (isFreezingAllowed) {
    const edgeDistortion = baseNoise * 0.15;
    if (polarFactor > 0.87 + edgeDistortion && iceNoise > 0.6) return "ice";
    if (polarFactor > 0.9 + edgeDistortion && polarNoise < 0.2) return "snow";
    if (latitude > 0.86 + edgeDistortion && iceNoise < 0.4) return "snow";
  }

  // Beach near the water
  if (polarFactor < 0.6 && height < waterLevel + 0.2 && beachNoise > 0.5)
    return "beach";

  // Snow on high mountains
  if (
    isFreezingAllowed &&
    polarFactor >= 0.15 &&
    height > waterLevel + (1.1 - mountainSnowNoise * 0.2) &&
    mountainSnowNoise > 0.65
  ) {
    return "snow";
  }

  // Desert in warm lowlands
  if (height > waterLevel + 0.1 && height < waterLevel + 0.85) {
    if ((polarFactor < 0.3 && baseNoise > 0.3) || baseNoise > 0.65) {
      return "desert";
    }
  }

  return height > waterLevel + 0.85 ? "mountain" : "grassland";
}

export function getBiomeColor(biome: Biome) {
  return BIOMES[biome].color;
}
