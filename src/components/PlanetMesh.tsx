import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { generatePlanetGeometry } from "@/components/planet/generatePlanetGeometry";
import type { PlanetGenerationOptions } from "@/components/planet/types";

function PlanetMesh(props: PlanetGenerationOptions) {
  const meshRef = useRef<THREE.Group>(null);
  const {
    detail,
    radius,
    waterLevel,
    terrainStrength,
    noiseFrequency,
    noiseOctaves,
    seed,
  } = props;

  const geometry = useMemo(
    () =>
      generatePlanetGeometry({
        detail,
        radius,
        waterLevel,
        terrainStrength,
        noiseFrequency,
        noiseOctaves,
        seed,
      }),
    [
      detail,
      radius,
      waterLevel,
      terrainStrength,
      noiseFrequency,
      noiseOctaves,
      seed,
    ],
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[geometry.land.positions, 3]}
          />

          <bufferAttribute attach="index" args={[geometry.land.indices, 1]} />

          <bufferAttribute
            attach="attributes-color"
            args={[geometry.land.colors, 3]}
          />
        </bufferGeometry>

        <meshStandardMaterial vertexColors roughness={0.8} />
      </mesh>

      {geometry.water.positions.length > 0 && (
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[geometry.water.positions, 3]}
            />

            <bufferAttribute
              attach="index"
              args={[geometry.water.indices, 1]}
            />
          </bufferGeometry>

          <meshStandardMaterial
            color="#5482cb"
            roughness={0.05}
            metalness={0.05}
          />
        </mesh>
      )}
    </group>
  );
}

export default PlanetMesh;
