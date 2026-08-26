import { createNoise3D } from "simplex-noise";

type Biome = "grassland" | "beach" | "mountain" | "snow";

const BIOME_COLORS: Record<Biome, [number, number, number]> = {
  grassland: [0.18, 0.5, 0.28],
  beach: [0.85, 0.76, 0.48],
  mountain: [0.45, 0.48, 0.52],
  snow: [0.94, 0.95, 0.98],
};

interface BiomeInput {
  waterLevel: number;
  height: number;
  x: number;
  y: number;
  z: number;
  noise3D: ReturnType<typeof createNoise3D>;
}

export function getBiome({
  waterLevel,
  height,
  x,
  y,
  z,
  noise3D,
}: BiomeInput): Biome {
  const variation = noise3D(x * 4, y * 4, z * 4);

  if (height < waterLevel + 0.2 && variation > 0) {
    return "beach";
  }

  if (height > waterLevel + 1.1 && Math.abs(y) > 0.5) {
    return "snow";
  }

  return height > waterLevel + 0.8 || variation > 0.55
    ? "mountain"
    : "grassland";
}

export function getBiomeColor(biome: Biome) {
  return BIOME_COLORS[biome];
}
