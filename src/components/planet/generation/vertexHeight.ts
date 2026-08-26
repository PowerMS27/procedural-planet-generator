import * as THREE from "three";

interface VertexHeightProps {
  x: number;
  y: number;
  z: number;
  waterLevel: number;
  getTerrainHeight: (x: number, y: number, z: number) => number;
}

export interface VertexHeight {
  height: number;
}

function adjustTerrainHeight(height: number, y: number, waterLevel: number) {
  const polarFactor = Math.pow(Math.abs(y), 8);
  const smoothing = THREE.MathUtils.lerp(0.1, 0.2, polarFactor);

  if (waterLevel <= -1.5) {
    return height < waterLevel
      ? THREE.MathUtils.lerp(waterLevel, height, smoothing)
      : height;
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
  getTerrainHeight,
}: VertexHeightProps): VertexHeight {
  const rawHeight = getTerrainHeight(x, y, z);
  const height = adjustTerrainHeight(rawHeight, y, waterLevel);

  return {
    height,
  };
}
