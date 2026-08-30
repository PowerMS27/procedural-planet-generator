import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Accordion, Button, Stack, Text } from "@mantine/core";
import type { SliderProps } from "@mantine/core";
import { BiomeColorSettings } from "./controls/BiomeColorSettings";
import { CustomizationSectionHeader } from "./controls/CustomizationSectionHeader";
import { PresetMenu } from "./controls/PresetMenu";
import { SavePresetModal } from "./controls/SavePresetModal";
import { SettingSlider } from "./controls/SettingSlider";
import { useScrollIndicators } from "./useScrollIndicators";
import {
  MAX_CUSTOM_PRESETS,
  type PresetActionResult,
} from "./usePlanetPresets";
import type { EditableBiome } from "@/components/planet/biome/biomes";
import { BIOME_COLOR_SWATCHES } from "./biomeColorSwatches";

import type { GenerationSettings, PlanetPreset, VisualSettings } from "./types";

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

  presets: PlanetPreset[];
  onPresetSelect: (preset: PlanetPreset) => void;
  onSavePreset: (preset: PlanetPreset) => PresetActionResult;
  onDeletePreset: (id: string) => PresetActionResult;
  onColorChange: (biome: EditableBiome, color: string) => void;
}

const COLOR_OPTIONS: { key: EditableBiome; label: string }[] = [
  { key: "ocean", label: "Water" },
  { key: "grassland", label: "Grass" },
  { key: "beach", label: "Sand" },
  { key: "desert", label: "Desert" },
  { key: "mountain", label: "Mountain" },
];

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

function createPresetId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
  );
}

export function PlanetCustomization({
  seed,
  visualSettings,
  generationSettings,
  onVisualChange,
  onGenerationChange,
  onGenerateNew,
  presets,
  onPresetSelect,
  onSavePreset,
  onDeletePreset,
  onColorChange,
}: PlanetCustomizationProps) {
  const [isSaveModalOpen, saveModal] = useDisclosure(false);
  const scrollAreaRef = useScrollIndicators();
  const currentPlanet = JSON.stringify({
    seed,
    visual: visualSettings,
    generation: generationSettings,
  });
  const selectedPreset = presets.find(
    (preset) =>
      JSON.stringify({
        seed: preset.seed,
        visual: preset.visual,
        generation: preset.generation,
      }) === currentPlanet,
  );

  const handleSavePreset = (name: string) => {
    if (selectedPreset) {
      notifications.show({
        title: "Preset already saved",
        message: `These settings are already saved as "${selectedPreset.name}"`,
        color: "red",
      });
      return false;
    }

    const result = onSavePreset({
      id: createPresetId(),
      name,
      seed,
      visual: visualSettings,
      generation: generationSettings,
    });

    if (result === "limit-reached") {
      notifications.show({
        title: "Preset limit reached",
        message: `You can save up to ${MAX_CUSTOM_PRESETS} custom presets`,
        color: "red",
      });
      return false;
    }

    if (result === "storage-error") {
      notifications.show({
        title: "Could not save preset",
        message: "Browser storage is unavailable. Please try again",
        color: "red",
      });
      return false;
    }

    notifications.show({
      title: "Preset saved",
      message: `"${name}" has been added to presets`,
      autoClose: 2000,
    });

    saveModal.close();
    return true;
  };

  const handleDeletePreset = (id: string) => {
    if (onDeletePreset(id) === "storage-error") {
      notifications.show({
        title: "Could not delete preset",
        message: "Browser storage is unavailable. Please try again",
        color: "red",
      });
    }
  };

  return (
    <aside id="planet-customization" className="planet-customization">
      <Stack className="customization-layout" gap="md">
        <Text size="xs" c="dimmed" ta="left">
          Seed: {seed}
        </Text>

        <div className="presets-buttons">
          <PresetMenu
            presets={presets}
            selectedPresetId={selectedPreset?.id ?? null}
            onSelect={onPresetSelect}
            onDelete={handleDeletePreset}
          />

          <Button
            bd="2px solid ice.5"
            onClick={saveModal.open}
            className="button--ice"
          >
            Save Preset
          </Button>
        </div>

        <SavePresetModal
          opened={isSaveModalOpen}
          defaultName={`Planet ${presets.length + 1}`}
          onClose={saveModal.close}
          onSave={handleSavePreset}
        />

        <div className="customization-accordion-container">
          <div ref={scrollAreaRef} className="customization-accordion-scroll">
            <Accordion multiple defaultValue={["visual", "generation"]}>
              <Accordion.Item value="visual">
                <Accordion.Control>
                  <CustomizationSectionHeader
                    label="Appearance"
                    tooltip="Planet appearance settings"
                  />
                </Accordion.Control>

                <Accordion.Panel>
                  <Stack gap="xs" ml={{ base: 0, sm: "md" }}>
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
                      label="Temperature"
                      value={visualSettings.temperature}
                      onChange={(value) => onVisualChange("temperature", value)}
                      min={-30}
                      max={100}
                      step={10}
                      marks={createSliderMarks(-20, 100, 10)}
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
                      formatValue={(value) =>
                        Number(value.toFixed(1)).toString()
                      }
                      sliderLabel={(value) =>
                        Number(value.toFixed(1)).toString()
                      }
                      marks={createSliderMarks(0, 3, 0.1)}
                    />

                    <BiomeColorSettings
                      colors={COLOR_OPTIONS.map(({ key, label }) => ({
                        key,
                        label,
                        value: visualSettings.colors[key],
                        swatches: BIOME_COLOR_SWATCHES[key],
                      }))}
                      onChange={onColorChange}
                    />
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="generation">
                <Accordion.Control>
                  <CustomizationSectionHeader
                    label="Generation"
                    tooltip="Terrain generation settings"
                  />
                </Accordion.Control>

                <Accordion.Panel>
                  <Stack gap="xs" ml={{ base: 0, sm: "md" }}>
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
          </div>
        </div>

        <Button
          onClick={onGenerateNew}
          className="button--purple customization-generate-button"
        >
          Generate New
        </Button>
      </Stack>
    </aside>
  );
}
