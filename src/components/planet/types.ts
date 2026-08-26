import type {
  GenerationSettings,
  VisualSettings,
} from "@/components/customization/types";

export interface PlanetGenerationOptions {
  detail: VisualSettings["detail"];
  radius: VisualSettings["radius"];
  waterLevel: VisualSettings["waterLevel"];
  terrainStrength: GenerationSettings["terrainStrength"];
  noiseFrequency: GenerationSettings["noiseFrequency"];
  noiseOctaves: GenerationSettings["noiseOctaves"];
  seed: number;
}

export interface GeneratedPlanetGeometry {
  land: {
    positions: Float32Array;
    indices: Uint32Array;
    colors: Float32Array;
  };

  water: {
    positions: Float32Array;
    indices: Uint32Array;
  };
}
