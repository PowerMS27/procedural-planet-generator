import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { PlanetGenerationOptions } from "@/components/planet/types";
import { usePlanetGeometry } from "@/components/planet/usePlanetGeometry";

function PlanetLoader({ radius }: { radius: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

function PlanetMesh(props: PlanetGenerationOptions) {
  const { radius } = props;
  const meshRef = useRef<THREE.Group>(null);
  const { geometry, isLoading } = usePlanetGeometry(props);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {isLoading && <PlanetLoader radius={radius} />}

      {geometry && !isLoading && (
        <>
          <mesh>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[geometry.land.positions, 3]}
              />

              <bufferAttribute
                attach="index"
                args={[geometry.land.indices, 1]}
              />

              <bufferAttribute
                attach="attributes-color"
                args={[geometry.land.colors, 3]}
              />
            </bufferGeometry>

            {/* land mesh */}
            <meshStandardMaterial vertexColors roughness={0.8} flatShading />
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

              {/* water mesh */}
              <meshStandardMaterial
                color="#5482cb"
                roughness={0.15}
                metalness={0.05}
                flatShading
              />
            </mesh>
          )}
        </>
      )}
    </group>
  );
}

export default PlanetMesh;
