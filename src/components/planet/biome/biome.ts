import { BIOMES } from "./biomes";
import type { Biome } from "./types";
import type { BiomeColors } from "@/components/customization/types";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

interface BiomeInput {
  waterLevel: number;
  wasWater: boolean;
  temperature: number;
  height: number;
  x: number;
  y: number;
  z: number;
  noise3D: BiomeNoise;
}

export type BiomeNoise = ReturnType<typeof createNoise3D>;

function getExtremeColdBiome(
  { x, y, z, noise3D }: BiomeInput,
  isFreezingAllowed: boolean,
): Biome {
  if (!isFreezingAllowed) {
    return "mountain";
  }

  const isIceZone = noise3D(x * 1.8, y * 1.8, z * 1.8) > 0.3;
  const isIceDetail = noise3D(x * 14, y * 14, z * 14) > 0.45;
  return isIceZone && isIceDetail ? "ice" : "snow";
}

function getExtremeHeatBiome({
  wasWater,
  x,
  y,
  z,
  noise3D,
}: BiomeInput): Biome {
  if (!wasWater) {
    return "desert";
  }

  const isBeachZone = noise3D(x * 1.5, y * 1.5, z * 1.5) > 0.65;
  const isDesertDetail = noise3D(x * 12, y * 12, z * 12) > 0.4;
  return isBeachZone && isDesertDetail ? "desert" : "beach";
}

function getFreezingBiome(
  { waterLevel, temperature, height, x, y, z, noise3D }: BiomeInput,
  isFreezingAllowed: boolean,
  iceNoise: number,
  polarNoise: number,
  mountainSnowNoise: number,
): Biome | null {
  if (!isFreezingAllowed || temperature > 0 || temperature <= -30) {
    return null;
  }

  const coldIntensity = THREE.MathUtils.clamp(temperature / -10, 0, 1);

  if (height <= waterLevel) {
    const isIceZone = noise3D(x * 2.0, y * 2.0, z * 2.0) > 0.25;
    const iceThreshold = THREE.MathUtils.lerp(0.75, 0.4, coldIntensity);

    return isIceZone && iceNoise > iceThreshold
      ? polarNoise > 0.4
        ? "snow"
        : "ice"
      : null;
  }

  const heightAboveWater = height - waterLevel;
  const heightBonus = THREE.MathUtils.clamp(heightAboveWater * 1.5, 0, 0.4);
  const snowThreshold =
    THREE.MathUtils.lerp(0.85, 0.45, coldIntensity) - heightBonus;

  return mountainSnowNoise > snowThreshold ? "snow" : null;
}

export function getBiome(input: BiomeInput): Biome {
  const { waterLevel, temperature, height, x, y, z, noise3D } = input;
  const isFreezingAllowed = waterLevel > -1.5;

  if (temperature <= -30) {
    return getExtremeColdBiome(input, isFreezingAllowed);
  }

  if (temperature >= 100) {
    return getExtremeHeatBiome(input);
  }

  // Noise values for biome placement
  const latitude = Math.abs(y);
  const iceNoise = noise3D(x * 9, y * 10, z * 10);
  const polarNoise = noise3D(x * 2.3, y * 2.3, z * 2.3);
  const mountainSnowNoise = noise3D(x * 4, y * 4, z * 4);
  const baseNoise = noise3D(x * 1.2, y * 1.2, z * 1.2);
  const beachNoise = noise3D(x * 8, y * 8, z * 8);

  const freezingBiome = getFreezingBiome(
    input,
    isFreezingAllowed,
    iceNoise,
    polarNoise,
    mountainSnowNoise,
  );

  if (freezingBiome) {
    return freezingBiome;
  }

  const coldFactor = THREE.MathUtils.clamp((temperature + 5) / 40, 0, 1);
  const noiseStrength = temperature < 30 ? 0.25 : 0.2 * coldFactor;
  const polarFactor =
    latitude + polarNoise * noiseStrength + baseNoise * 0.08 * (1 - coldFactor);

  // Ice and snow near the poles
  if (isFreezingAllowed && temperature < 60) {
    const edgeDistortion = temperature < 15 ? baseNoise * 0.45 : 0;
    if (
      polarFactor >
        THREE.MathUtils.lerp(0.5, 0.91, coldFactor) + edgeDistortion &&
      iceNoise > 0.6 &&
      temperature < 50
    )
      return "ice";
    if (
      polarFactor >
        THREE.MathUtils.lerp(0.5, 0.92, coldFactor) + edgeDistortion &&
      polarNoise < 0.5 - temperature / 100
    )
      return "snow";
    if (
      latitude > THREE.MathUtils.lerp(0.7, 0.98, coldFactor) + edgeDistortion &&
      iceNoise < 0.4 &&
      temperature < 40
    )
      return "snow";
  }

  // Beach near the water
  if (polarFactor < 0.6 && height < waterLevel + 0.2 && beachNoise > 0.5)
    return "beach";

  // Snow on high mountains
  if (
    isFreezingAllowed &&
    temperature < 50 &&
    polarFactor >= THREE.MathUtils.lerp(0.0, 0.3, coldFactor) &&
    height > waterLevel + (1.1 - mountainSnowNoise * 0.2) &&
    mountainSnowNoise > 0.65
  ) {
    return "snow";
  }

  // Desert in warm lowlands
  if (
    temperature > 10 &&
    height > waterLevel + 0.1 &&
    height < waterLevel + 0.85
  ) {
    if (
      (polarFactor < 0.3 && baseNoise > 0.3) ||
      (temperature > 30 &&
        baseNoise >
          THREE.MathUtils.lerp(
            0.3,
            -0.5,
            THREE.MathUtils.clamp((temperature - 30) / 70, 0, 1),
          ))
    ) {
      return "desert";
    }
  }

  return height > waterLevel + 0.85 ? "mountain" : "grassland";
}

export function getBiomeColor(
  biome: Biome,
  colors: BiomeColors,
): [number, number, number] {
  // Snow and ice use fixed colors
  if (biome === "snow" || biome === "ice") {
    return BIOMES[biome].color;
  }

  const color = colors[biome];
  const hex = color.replace("#", "");

  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
}
