import {
  ColorPicker,
  ColorSwatch,
  Group,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import type { EditableBiome } from "@/components/planet/biome/biomes";

interface ColorOption {
  key: EditableBiome;
  label: string;
  value: string;
  swatches: string[];
}

interface BiomeColorSettingsProps {
  colors: ColorOption[];
  onChange: (key: EditableBiome, color: string) => void;
}

export function BiomeColorSettings({
  colors,
  onChange,
}: BiomeColorSettingsProps) {
  return (
    <Stack gap="md" mb={6}>
      <Group gap="md" wrap="wrap" justify="space-between">
        {colors.map((color) => (
          <Stack key={color.key}>
            <Popover
              width="auto"
              position="bottom"
              withArrow
              shadow="md"
              arrowSize={8}
            >
              <Popover.Target>
                <Stack
                  gap="6"
                  style={{ cursor: "pointer", border: 0 }}
                  align="center"
                >
                  <ColorSwatch
                    component="button"
                    type="button"
                    color={color.value}
                    size={21}
                    radius="sm"
                    style={{ cursor: "pointer", border: 0 }}
                  />
                  <Text size="xs">{color.label}</Text>
                </Stack>
              </Popover.Target>

              <Popover.Dropdown>
                <ColorPicker
                  format="hex"
                  value={color.value}
                  onChange={(value) => onChange(color.key, value)}
                  swatches={color.swatches}
                  swatchesPerRow={8}
                />
                <Text size="xs" ta="center" mt="xs" c="dimmed">
                  {color.value}
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Stack>
        ))}
      </Group>
    </Stack>
  );
}
