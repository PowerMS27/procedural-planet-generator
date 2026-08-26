import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import PlanetMesh from "./PlanetMesh";

import type {
  GenerationSettings,
  VisualSettings,
} from "@/components/customization/types";

interface ProceduralPlanetProps {
  visualSettings: VisualSettings;
  generationSettings: GenerationSettings;
  seed: number;
}

export default function ProceduralPlanet({
  visualSettings,
  generationSettings,
  seed,
}: ProceduralPlanetProps) {
  const sunPosition: [number, number, number] = [12.5, 12.5, 120];

  return (
    <div className="space-scene">
      <Canvas camera={{ position: [30, 30, 30], fov: 5 }}>
        {/* sun */}
        <directionalLight
          position={sunPosition}
          intensity={3.0}
          color="#fcf3e3"
        />

        {/* makes the dark side not pitch blakc */}
        <ambientLight intensity={4.0} color="#383d66" />

        <PlanetMesh
          detail={visualSettings.detail}
          waterLevel={visualSettings.waterLevel}
          terrainStrength={generationSettings.terrainStrength}
          noiseFrequency={generationSettings.noiseFrequency}
          noiseOctaves={generationSettings.noiseOctaves}
          seed={seed}
          radius={visualSettings.radius}
        />

        <OrbitControls
          enablePan={false}
          minDistance={10}
          maxDistance={190}
          zoomSpeed={3}
        />
      </Canvas>
    </div>
  );
}
