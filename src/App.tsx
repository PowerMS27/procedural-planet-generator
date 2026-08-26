import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";

import ProceduralPlanet from "@/components/ProceduralPlanet";
import { PlanetCustomization } from "@/components/customization/PlanetCustomization";

import {
  DEFAULT_GENERATION_SETTINGS,
  DEFAULT_VISUAL_SETTINGS,
  INITIAL_SEED,
} from "@/components/customization/planetDefaults";

import type {
  GenerationSettings,
  PlanetState,
  VisualSettings,
} from "@/components/customization/types";

import { theme } from "@/components/ui/theme";
import "./styles/main.scss";

function createSeed(): number {
  return Math.floor(Math.random() * 2 ** 32);
}

function App() {
  const [planet, setPlanet] = useState<PlanetState>({
    seed: INITIAL_SEED,
    visual: DEFAULT_VISUAL_SETTINGS,
    generation: DEFAULT_GENERATION_SETTINGS,
  });

  const [debouncedVisual, setDebouncedVisual] = useState<VisualSettings>(
    planet.visual,
  );

  const [debouncedGeneration, setDebouncedGeneration] =
    useState<GenerationSettings>(planet.generation);

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

  const handleGenerateNew = () => {
    // New seed while keeping settings the same
    setPlanet((current) => ({
      ...current,
      seed: createSeed(),
    }));
  };

  return (
    <MantineProvider theme={theme}>
      <div className="main-screen">
        <ProceduralPlanet
          visualSettings={debouncedVisual}
          generationSettings={debouncedGeneration}
          seed={planet.seed}
        />

        <PlanetCustomization
          seed={planet.seed}
          visualSettings={planet.visual}
          generationSettings={planet.generation}
          onVisualChange={handleVisualChange}
          onGenerationChange={handleGenerationChange}
          onGenerateNew={handleGenerateNew}
        />
      </div>
    </MantineProvider>
  );
}

export default App;
