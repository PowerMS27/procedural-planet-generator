import { useEffect, useMemo, useState } from "react";
import type { GeneratedPlanetGeometry, PlanetGenerationOptions } from "./types";

interface GeometryResult {
  key: string;
  data: GeneratedPlanetGeometry;
}

export function usePlanetGeometry({
  detail,
  radius,
  waterLevel,
  temperature,
  terrainStrength,
  noiseFrequency,
  noiseOctaves,
  seed,
  colors,
}: PlanetGenerationOptions) {
  const [geometryResult, setGeometryResult] = useState<GeometryResult | null>(
    null,
  );
  const generationRequest = useMemo(
    () => ({
      detail,
      radius,
      waterLevel,
      temperature,
      terrainStrength,
      noiseFrequency,
      noiseOctaves,
      seed,
      colors,
    }),
    [
      detail,
      radius,
      waterLevel,
      temperature,
      terrainStrength,
      noiseFrequency,
      noiseOctaves,
      seed,
      colors,
    ],
  );
  const requestKey = JSON.stringify(generationRequest);

  // hide planet while a newer generation is loading
  const geometry =
    geometryResult?.key === requestKey ? geometryResult.data : null;

  useEffect(() => {
    const worker = new Worker(
      new URL("./worker/planet.worker.ts", import.meta.url),
      { type: "module" },
    );

    worker.onmessage = (event: MessageEvent<GeneratedPlanetGeometry>) => {
      setGeometryResult({ key: requestKey, data: event.data });
    };

    worker.postMessage(generationRequest);

    return () => worker.terminate();
  }, [generationRequest, requestKey]);

  return {
    geometry,
    isLoading: !geometry,
  };
}
