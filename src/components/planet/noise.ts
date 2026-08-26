import { createNoise3D } from "simplex-noise";
import { createSeededRandom } from "./generation/seededRandom";

interface TerrainNoiseOptions {
  seed: number;
  frequency: number;
  octaves: number;
}

export function createTerrainHeight({
  seed,
  frequency,
  octaves,
}: TerrainNoiseOptions) {
  const noise3D = createNoise3D(createSeededRandom(seed));

  return (x: number, y: number, z: number) => {
    let height = 0;
    let currentFrequency = frequency;
    let amplitude = 1;

    // Octaves - extra noise layers that add smaller terrain details
    for (let i = 0; i < octaves; i++) {
      height +=
        noise3D(
          x * currentFrequency,
          y * currentFrequency,
          z * currentFrequency,
        ) * amplitude;

      currentFrequency *= 2;
      amplitude *= 0.5;
    }

    return height;
  };
}
