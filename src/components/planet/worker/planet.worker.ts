import { generatePlanetGeometry } from "../generatePlanetGeometry";
import type { PlanetGenerationOptions } from "../types";

declare const postMessage: (
  message: unknown,
  transfer?: Transferable[],
) => void;

self.onmessage = (event: MessageEvent<PlanetGenerationOptions>) => {
  const geometry = generatePlanetGeometry(event.data);

  postMessage(geometry, [
    geometry.land.positions.buffer,
    geometry.land.indices.buffer,
    geometry.land.colors.buffer,
    geometry.water.positions.buffer,
    geometry.water.indices.buffer,
  ]);
};
