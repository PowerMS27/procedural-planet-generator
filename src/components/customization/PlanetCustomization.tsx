import { Accordion, Button, Stack, Text } from "@mantine/core";
import type { SliderProps } from "@mantine/core";
import { CustomizationSectionHeader } from "./controls/CustomizationSectionHeader";
import { SettingSlider } from "./controls/SettingSlider";

import type { GenerationSettings, VisualSettings } from "./types";

interface PlanetCustomizationProps {
  seed: number;
  visualSettings: VisualSettings;
  generationSettings: GenerationSettings;

  onVisualChange: <K extends keyof VisualSettings>(
    key: K,
    value: VisualSettings[K],
  ) => void;

  onGenerationChange: <K extends keyof GenerationSettings>(
    key: K,
    value: GenerationSettings[K],
  ) => void;

  onGenerateNew: () => void;
}

function createSliderMarks(
  min: number,
  max: number,
  step: number,
): SliderProps["marks"] {
  const count = Math.floor((max - min) / step);

  return Array.from({ length: count + 1 }, (_, index) => ({
    value: min + index * step,
    label: "",
  }));
}

export function PlanetCustomization({
  seed,
  visualSettings,
  generationSettings,
  onVisualChange,
  onGenerationChange,
  onGenerateNew,
}: PlanetCustomizationProps) {
  return (
    <aside className="planet-customization">
      <Stack gap="md">
        <Text size="xs" c="dimmed" ta="left">
          Seed: {seed}
        </Text>

        <Accordion multiple defaultValue={["visual", "generation"]}>
          <Accordion.Item value="visual">
            <Accordion.Control>
              <CustomizationSectionHeader
                label="Appearance"
                tooltip="Current body visual features"
              />
            </Accordion.Control>

            <Accordion.Panel>
              <Stack gap="xs" ml="md">
                <SettingSlider
                  label="Planet detail"
                  value={visualSettings.detail}
                  onChange={(value) => onVisualChange("detail", value)}
                  min={1}
                  max={5}
                  step={1}
                  toSliderValue={(value) => value - 2}
                  fromSliderValue={(value) => value + 2}
                  marks={createSliderMarks(1, 5, 1)}
                />

                <SettingSlider
                  label="Water level"
                  value={visualSettings.waterLevel}
                  onChange={(value) => onVisualChange("waterLevel", value)}
                  min={0}
                  max={3}
                  step={0.1}
                  toSliderValue={(value) => value + 1.5}
                  fromSliderValue={(value) => value - 1.5}
                  formatValue={(value) => Number(value.toFixed(1)).toString()}
                  sliderLabel={(value) => Number(value.toFixed(1)).toString()}
                  marks={createSliderMarks(0, 3, 0.1)}
                />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="generation">
            <Accordion.Control>
              <CustomizationSectionHeader
                label="Generation"
                tooltip="Procedural generation controls"
              />
            </Accordion.Control>

            <Accordion.Panel>
              <Stack gap="xs" ml="md">
                <SettingSlider
                  label="Terrain elevation"
                  value={generationSettings.terrainStrength}
                  onChange={(value) =>
                    onGenerationChange("terrainStrength", value)
                  }
                  min={0}
                  max={5}
                  step={1}
                  toSliderValue={(value) => value * 10}
                  fromSliderValue={(value) => value / 10}
                  marks={createSliderMarks(0, 5, 1)}
                />

                <SettingSlider
                  label="Elevation variety"
                  value={generationSettings.noiseOctaves}
                  onChange={(value) =>
                    onGenerationChange("noiseOctaves", value)
                  }
                  min={1}
                  max={10}
                  step={1}
                  marks={createSliderMarks(1, 10, 1)}
                />

                <SettingSlider
                  label="Elevation frequency"
                  value={generationSettings.noiseFrequency}
                  onChange={(value) =>
                    onGenerationChange("noiseFrequency", value)
                  }
                  min={0.5}
                  max={2}
                  step={0.1}
                  formatValue={(value) => value.toFixed(1)}
                  marks={createSliderMarks(0.5, 2, 0.1)}
                />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Button onClick={onGenerateNew} className="button--purple">
          Generate New
        </Button>
      </Stack>
    </aside>
  );
}
