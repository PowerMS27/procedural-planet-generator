import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import type { PlanetPreset } from "../types";

interface PresetMenuProps {
  presets: PlanetPreset[];
  onSelect: (preset: PlanetPreset) => void;
  onDelete: (id: string) => void;
}

function PresetList({ presets, onSelect, onDelete }: PresetMenuProps) {
  return (
    <Stack gap={4}>
      {presets.map((preset) => (
        <Group key={preset.id} gap={4} wrap="nowrap">
          <UnstyledButton
            className="preset-list__item"
            onClick={() => onSelect(preset)}
          >
            {preset.name}
          </UnstyledButton>

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
  );
}

export function PresetMenu({ presets, onSelect, onDelete }: PresetMenuProps) {
  const isMobile = useMediaQuery("(max-width: 48em)");
  const [isModalOpen, modal] = useDisclosure(false);
  const [isMenuOpen, menu] = useDisclosure(false);

  if (isMobile) {
    return (
      <>
        <Button fullWidth className="button--purple" onClick={modal.open}>
          Show Presets
        </Button>

        <Modal
          opened={isModalOpen}
          onClose={modal.close}
          title="Presets"
          fullScreen
        >
          <PresetList
            presets={presets}
            onSelect={(preset) => {
              onSelect(preset);
              modal.close();
            }}
            onDelete={onDelete}
          />
        </Modal>
      </>
    );
  }

  return (
    <Menu
      opened={isMenuOpen}
      onChange={(opened) => (opened ? menu.open() : menu.close())}
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
        <PresetList
          presets={presets}
          onSelect={(preset) => {
            onSelect(preset);
            menu.close();
          }}
          onDelete={onDelete}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
