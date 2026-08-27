import type { GeneratedPlanetGeometry, PlanetGenerationOptions } from "./types";
import { getBiome, getBiomeColor } from "./biome/biome";
import { generateIcosphere } from "./generation/icosphere";
import { calculateVertexHeight } from "./generation/vertexHeight";
import { createTerrainHeight } from "./noise";
import { createNoise3D } from "simplex-noise";
import { createSeededRandom } from "./generation/seededRandom";

export function generatePlanetGeometry({
  detail,
  radius,
  waterLevel,
  temperature,
  terrainStrength,
  noiseFrequency,
  noiseOctaves,
  seed,
  colors,
}: PlanetGenerationOptions): GeneratedPlanetGeometry {
  const { vertices, indices } = generateIcosphere(detail);
  const totalTriangles = indices.length / 3;

  // Each triangle with its own vertices
  const landPositions = new Float32Array(totalTriangles * 9);
  const landColors = new Float32Array(totalTriangles * 9);
  const landIndices = new Uint32Array(totalTriangles * 3);

  const waterPositions = new Float32Array(totalTriangles * 9);
  const waterIndices = new Uint32Array(totalTriangles * 3);

  let landVertCount = 0;
  let landIdxCount = 0;
  let waterVertCount = 0;
  let waterIdxCount = 0;

  // Terrain shape from the seed and generation settings
  const getTerrainHeight = createTerrainHeight({
    seed,
    frequency: noiseFrequency,
    octaves: noiseOctaves,
  });

  // Seeded noise
  const biomeNoise = createNoise3D(
    createSeededRandom((seed ^ 0x9e3779b9) >>> 0),
  );

  // Extreme temperatures remove water
  const isExtremeTemperature = temperature <= -30 || temperature >= 100;

  for (let i = 0; i < indices.length; i += 3) {
    const t0 = indices[i];
    const t1 = indices[i + 1];
    const t2 = indices[i + 2];

    const v0 = vertices[t0];
    const v1 = vertices[t1];
    const v2 = vertices[t2];

    const vertex0 = calculateVertexHeight({
      x: v0[0],
      y: v0[1],
      z: v0[2],
      waterLevel,
      temperature,
      getTerrainHeight,
    });

    const vertex1 = calculateVertexHeight({
      x: v1[0],
      y: v1[1],
      z: v1[2],
      waterLevel,
      temperature,
      getTerrainHeight,
    });

    const vertex2 = calculateVertexHeight({
      x: v2[0],
      y: v2[1],
      z: v2[2],
      waterLevel,
      temperature,
      getTerrainHeight,
    });

    const { height: h0, wasWater: wasWater0 } = vertex0;
    const { height: h1, wasWater: wasWater1 } = vertex1;
    const { height: h2, wasWater: wasWater2 } = vertex2;

    const wasWater = wasWater0 && wasWater1 && wasWater2;

    const centerX = (v0[0] + v1[0] + v2[0]) / 3;
    const centerY = (v0[1] + v1[1] + v2[1]) / 3;
    const centerZ = (v0[2] + v1[2] + v2[2]) / 3;
    const avgHeight = (h0 + h1 + h2) / 3;

    const triangleBiome = getBiome({
      waterLevel,
      wasWater,
      temperature,
      height: avgHeight,
      x: centerX,
      y: centerY,
      z: centerZ,
      noise3D: biomeNoise,
    });

    const isBaseWater =
      !isExtremeTemperature &&
      h0 < waterLevel &&
      h1 < waterLevel &&
      h2 < waterLevel;
    const isIceOrSnowOnWater =
      isBaseWater && (triangleBiome === "ice" || triangleBiome === "snow");
    const isWater = isBaseWater && !isIceOrSnowOnWater;

    if (isWater) {
      // Separate water mesh
      const offset = waterVertCount / 3;

      waterPositions[waterVertCount++] =
        v0[0] * (radius + h0 * terrainStrength);
      waterPositions[waterVertCount++] =
        v0[1] * (radius + h0 * terrainStrength);
      waterPositions[waterVertCount++] =
        v0[2] * (radius + h0 * terrainStrength);

      waterPositions[waterVertCount++] =
        v1[0] * (radius + h1 * terrainStrength);
      waterPositions[waterVertCount++] =
        v1[1] * (radius + h1 * terrainStrength);
      waterPositions[waterVertCount++] =
        v1[2] * (radius + h1 * terrainStrength);

      waterPositions[waterVertCount++] =
        v2[0] * (radius + h2 * terrainStrength);
      waterPositions[waterVertCount++] =
        v2[1] * (radius + h2 * terrainStrength);
      waterPositions[waterVertCount++] =
        v2[2] * (radius + h2 * terrainStrength);

      waterIndices[waterIdxCount++] = offset;
      waterIndices[waterIdxCount++] = offset + 1;
      waterIndices[waterIdxCount++] = offset + 2;
    } else {
      // Terrain and frozen water - land mesh
      const offset = landVertCount / 3;
      const color = getBiomeColor(triangleBiome, colors);

      landPositions[landVertCount] = v0[0] * (radius + h0 * terrainStrength);
      landColors[landVertCount++] = color[0];
      landPositions[landVertCount] = v0[1] * (radius + h0 * terrainStrength);
      landColors[landVertCount++] = color[1];
      landPositions[landVertCount] = v0[2] * (radius + h0 * terrainStrength);
      landColors[landVertCount++] = color[2];

      landPositions[landVertCount] = v1[0] * (radius + h1 * terrainStrength);
      landColors[landVertCount++] = color[0];
      landPositions[landVertCount] = v1[1] * (radius + h1 * terrainStrength);
      landColors[landVertCount++] = color[1];
      landPositions[landVertCount] = v1[2] * (radius + h1 * terrainStrength);
      landColors[landVertCount++] = color[2];

      landPositions[landVertCount] = v2[0] * (radius + h2 * terrainStrength);
      landColors[landVertCount++] = color[0];
      landPositions[landVertCount] = v2[1] * (radius + h2 * terrainStrength);
      landColors[landVertCount++] = color[1];
      landPositions[landVertCount] = v2[2] * (radius + h2 * terrainStrength);
      landColors[landVertCount++] = color[2];

      landIndices[landIdxCount++] = offset;
      landIndices[landIdxCount++] = offset + 1;
      landIndices[landIdxCount++] = offset + 2;
    }
  }

  return {
    land: {
      positions: landPositions.subarray(0, landVertCount),
      indices: landIndices.subarray(0, landIdxCount),
      colors: landColors.subarray(0, landVertCount),
    },
    water: {
      positions: waterPositions.subarray(0, waterVertCount),
      indices: waterIndices.subarray(0, waterIdxCount),
    },
  };
}
