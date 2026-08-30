import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import ProceduralPlanet from "@/components/ProceduralPlanet";
import { PlanetCustomization } from "@/components/customization/PlanetCustomization";
import { usePlanetPresets } from "@/components/customization/usePlanetPresets";
import type { EditableBiome } from "@/components/planet/biome/biomes";

import {
  DEFAULT_GENERATION_SETTINGS,
  DEFAULT_VISUAL_SETTINGS,
  INITIAL_SEED,
} from "@/components/customization/planetDefaults";

import type {
  GenerationSettings,
  PlanetPreset,
  PlanetState,
  VisualSettings,
} from "@/components/customization/types";

import { theme } from "@/components/ui/theme";
import "./styles/main.scss";

function createSeed(): number {
  return Math.floor(Math.random() * 2 ** 32);
}

function App() {
  const [isCustomizationHidden, setIsCustomizationHidden] = useState(false);
  const [planet, setPlanet] = useState<PlanetState>({
    seed: INITIAL_SEED,
    visual: DEFAULT_VISUAL_SETTINGS,
    generation: DEFAULT_GENERATION_SETTINGS,
  });

  const handleColorChange = (biome: EditableBiome, color: string) => {
    setPlanet((current) => ({
      ...current,
      visual: {
        ...current.visual,
        colors: {
          ...current.visual.colors,
          [biome]: color,
        },
      },
    }));
  };

  const [debouncedVisual, setDebouncedVisual] = useState<VisualSettings>(
    planet.visual,
  );

  const [debouncedGeneration, setDebouncedGeneration] =
    useState<GenerationSettings>(planet.generation);

  const { presets, savePreset, deletePreset } = usePlanetPresets();

  useEffect(() => {
    // debounce for sliders
    const timer = setTimeout(() => {
      setDebouncedVisual(planet.visual);
      setDebouncedGeneration(planet.generation);
    }, 150);

    return () => clearTimeout(timer);
  }, [planet.visual, planet.generation]);

  const handleVisualChange = <K extends keyof VisualSettings>(
    key: K,
    value: VisualSettings[K],
  ) => {
    setPlanet((current) => ({
      ...current,
      visual: {
        ...current.visual,
        [key]: value,
      },
    }));
  };

  const handleGenerationChange = <K extends keyof GenerationSettings>(
    key: K,
    value: GenerationSettings[K],
  ) => {
    setPlanet((current) => ({
      ...current,
      generation: {
        ...current.generation,
        [key]: value,
      },
    }));
  };

  const handlePresetSelect = (preset: PlanetPreset) => {
    setPlanet({
      seed: preset.seed,
      visual: preset.visual,
      generation: preset.generation,
    });

    setDebouncedVisual(preset.visual);
    setDebouncedGeneration(preset.generation);
  };

  const handleGenerateNew = () => {
    // New seed while keeping settings the same
    setPlanet((current) => ({
      ...current,
      seed: createSeed(),
    }));
  };

  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-center" />

      <div
        className={`main-screen${
          isCustomizationHidden ? " main-screen--customization-hidden" : ""
        }`}
      >
        <ProceduralPlanet
          visualSettings={debouncedVisual}
          generationSettings={debouncedGeneration}
          seed={planet.seed}
        />

        <div className="customization-panel">
          <button
            type="button"
            className="customization-toggle"
            aria-label={
              isCustomizationHidden
                ? "Show planet customization"
                : "Hide planet customization"
            }
            aria-expanded={!isCustomizationHidden}
            aria-controls="planet-customization"
            onClick={() => setIsCustomizationHidden((current) => !current)}
          >
            <span className="customization-toggle__icon" aria-hidden="true">
              <svg width="16" height="16" aria-hidden="true">
                <use href="/icons.svg#chevron" />
              </svg>
            </span>
          </button>

          <PlanetCustomization
            seed={planet.seed}
            visualSettings={planet.visual}
            generationSettings={planet.generation}
            onVisualChange={handleVisualChange}
            onGenerationChange={handleGenerationChange}
            onGenerateNew={handleGenerateNew}
            presets={presets}
            onPresetSelect={handlePresetSelect}
            onSavePreset={savePreset}
            onDeletePreset={deletePreset}
            onColorChange={handleColorChange}
          />
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
