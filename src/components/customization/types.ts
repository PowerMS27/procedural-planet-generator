export interface VisualSettings {
  detail: number;
  radius: number;
  waterLevel: number;
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
