import { ActionIcon, Button, Group, Menu, Stack } from "@mantine/core";
import type { PlanetPreset } from "../types";

interface PresetMenuProps {
  presets: PlanetPreset[];
  onSelect: (preset: PlanetPreset) => void;
  onDelete: (id: string) => void;
}

export function PresetMenu({ presets, onSelect, onDelete }: PresetMenuProps) {
  return (
    <Menu
      shadow="md"
      position="left-start"
      offset={20}
      transitionProps={{ transition: "fade-down", duration: 300 }}
    >
      <Menu.Target>
        <Button fullWidth className="button--purple">
          Show Presets
        </Button>
      </Menu.Target>

      <Menu.Dropdown className="presets-dropdown">
        <Stack gap={4}>
          {presets.map((preset) => (
            <Group key={preset.id} gap={4} wrap="nowrap">
              <Menu.Item flex={1} onClick={() => onSelect(preset)}>
                {preset.name}
              </Menu.Item>

              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                aria-label={`Delete ${preset.name}`}
                onClick={() => onDelete(preset.id)}
              >
                x
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
