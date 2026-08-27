import * as THREE from "three";

interface VertexHeightProps {
  x: number;
  y: number;
  z: number;
  waterLevel: number;
  temperature: number;
  getTerrainHeight: (x: number, y: number, z: number) => number;
}

export interface VertexHeight {
  height: number;
  wasWater: boolean;
}

function adjustTerrainHeight(
  height: number,
  y: number,
  waterLevel: number,
  temperature: number,
) {
  const polarFactor = Math.pow(Math.abs(y), 8);
  const smoothing = THREE.MathUtils.lerp(0.1, 0.2, polarFactor);

  if (waterLevel <= -1.5) {
    return height < waterLevel
      ? THREE.MathUtils.lerp(waterLevel, height, smoothing)
      : height;
  }

  if (temperature <= -30 || temperature >= 100) {
    if (height < waterLevel) {
      return Math.max(
        waterLevel,
        THREE.MathUtils.lerp(waterLevel, height, smoothing),
      );
    }
  }

  if (temperature <= 0 && temperature > -30 && height < waterLevel) {
    return Math.min(
      waterLevel - 0.002,
      THREE.MathUtils.lerp(waterLevel, height, smoothing),
    );
  }

  return height < waterLevel
    ? THREE.MathUtils.lerp(waterLevel, height, smoothing)
    : height;
}

export function calculateVertexHeight({
  x,
  y,
  z,
  waterLevel,
  temperature,
  getTerrainHeight,
}: VertexHeightProps): VertexHeight {
  const rawHeight = getTerrainHeight(x, y, z);
  const wasWater = rawHeight < waterLevel;

  // Slightly lowered water level for hot planets
  const adjustedWaterLevel = temperature >= 100 ? waterLevel - 0.5 : waterLevel;

  const height = adjustTerrainHeight(
    rawHeight,
    y,
    adjustedWaterLevel,
    temperature,
  );

  return {
    height,
    wasWater,
  };
}
