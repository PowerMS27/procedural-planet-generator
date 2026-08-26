const normalize = (v: number[]): number[] => {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
};

export function generateIcosphere(detail: number): {
  vertices: number[][];
  indices: number[];
} {
  const goldenRatio = (1.0 + Math.sqrt(5.0)) / 2.0;

  // Start with a basic icosahedron
  const baseVertices = [
    [-1, goldenRatio, 0],
    [1, goldenRatio, 0],
    [-1, -goldenRatio, 0],
    [1, -goldenRatio, 0],
    [0, -1, goldenRatio],
    [0, 1, goldenRatio],
    [0, -1, -goldenRatio],
    [0, 1, -goldenRatio],
    [goldenRatio, 0, -1],
    [goldenRatio, 0, 1],
    [-goldenRatio, 0, -1],
    [-goldenRatio, 0, 1],
  ];

  // Every three numbers make one triangle
  const baseIndices = [
    0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10,
    2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5,
    2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
  ];

  const vertices = baseVertices.map(normalize);
  let indices = [...baseIndices];

  // Shared edges reuse the same midpoint vertex
  const midPointCache = new Map<string, number>();

  const getMidPoint = (p1: number, p2: number): number => {
    // Edge direction does not matter for the cache
    const key = p1 < p2 ? `${p1}_${p2}` : `${p2}_${p1}`;
    if (midPointCache.has(key)) return midPointCache.get(key)!;

    const v1 = vertices[p1];
    const v2 = vertices[p2];
    const mid = normalize([
      (v1[0] + v2[0]) / 2,
      (v1[1] + v2[1]) / 2,
      (v1[2] + v2[2]) / 2,
    ]);

    vertices.push(mid);
    const index = vertices.length - 1;
    midPointCache.set(key, index);
    return index;
  };

  // Each level splits every triangle into four smaller ones
  for (let i = 0; i < detail; i++) {
    const nextIndices: number[] = [];
    for (let j = 0; j < indices.length; j += 3) {
      const a = indices[j];
      const b = indices[j + 1];
      const c = indices[j + 2];

      const ab = getMidPoint(a, b);
      const bc = getMidPoint(b, c);
      const ca = getMidPoint(c, a);

      nextIndices.push(a, ab, ca);
      nextIndices.push(b, bc, ab);
      nextIndices.push(c, ca, bc);
      nextIndices.push(ab, bc, ca);
    }
    indices = nextIndices;
  }

  return { vertices, indices };
}
