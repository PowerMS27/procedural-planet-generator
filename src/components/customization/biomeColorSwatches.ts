import type { EditableBiome } from "@/components/planet/biome/biomes";

export const BIOME_COLOR_SWATCHES: Record<EditableBiome, string[]> = {
  ocean: [
    "#5482CB",
    "#3A65AB",
    "#1B4484",
    "#4CA6B8",
    "#17816F",
    "#BF9E63",
    "#4A529B",
    "#6E5AD0",
  ],

  grassland: [
    "#477A35",
    "#2F5920",
    "#6FA35B",
    "#A8813B",
    "#A05331",
    "#7C3E2B",
    "#256B5A",
    "#763F9E",
  ],

  beach: [
    "#D9C27A",
    "#ECD99F",
    "#D9D17A",
    "#D9B27A",
    "#8D6328",
    "#C25A3F",
    "#735893",
    "#5C4D6E",
  ],

  desert: [
    "#C47736",
    "#EAA564",
    "#F7CFA6",
    "#914E1B",
    "#E85834",
    "#662837",
    "#3C8691",
    "#371C3F",
  ],

  mountain: [
    "#59616B",
    "#828C99",
    "#AFB9C7",
    "#3C424A",
    "#D9E2EC",
    "#D63F1A",
    "#A84457",
    "#53346B",
  ],
};
