import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

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

const CAMERA_FOV = 5;
const NARROW_SCREEN_PADDING = 1.3;

function ResponsiveCamera() {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const baseFovRadians = THREE.MathUtils.degToRad(CAMERA_FOV);
  const fov =
    aspect < 1
      ? THREE.MathUtils.radToDeg(
          2 *
            Math.atan(
              (Math.tan(baseFovRadians / 2) * NARROW_SCREEN_PADDING) / aspect,
            ),
        )
      : CAMERA_FOV;

  return <PerspectiveCamera makeDefault position={[40, 40, 40]} fov={fov} />;
}

function getSunColor(temperature: number) {
  // Changes biomes temperature colors visually without changing colors directly
  const temperatureFactor = Math.max(0, Math.min(1, (temperature + 30) / 130));

  return temperatureFactor < 0.5
    ? new THREE.Color("#fcf3e3")
        .lerp(new THREE.Color("#b0d8ff"), 1 - temperatureFactor * 2)
        .getHexString()
    : new THREE.Color("#fcf3e3")
        .lerp(new THREE.Color("#ffe8bf"), (temperatureFactor - 0.5) * 2)
        .getHexString();
}

export default function ProceduralPlanet({
  visualSettings,
  generationSettings,
  seed,
}: ProceduralPlanetProps) {
  const sunPosition: [number, number, number] = [12.5, 12.5, 120];
  const sunColor = getSunColor(visualSettings.temperature);

  return (
    <div className="space-scene">
      <Canvas>
        <ResponsiveCamera />

        {/* sun */}
        <directionalLight
          position={sunPosition}
          intensity={3.0}
          color={`#${sunColor}`}
        />

        {/* makes the dark side not pitch blakc */}
        <ambientLight intensity={4.0} color="#383d66" />

        <PlanetMesh
          detail={visualSettings.detail}
          waterLevel={visualSettings.waterLevel}
          temperature={visualSettings.temperature}
          terrainStrength={generationSettings.terrainStrength}
          noiseFrequency={generationSettings.noiseFrequency}
          noiseOctaves={generationSettings.noiseOctaves}
          seed={seed}
          radius={visualSettings.radius}
          colors={visualSettings.colors}
        />

        <OrbitControls
          enablePan={false}
          minDistance={30}
          maxDistance={100}
          zoomSpeed={3}
        />
      </Canvas>
    </div>
  );
}
