import {
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  UnstyledButton,
  CloseButton,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import type { PlanetPreset } from "../types";

interface PresetMenuProps {
  presets: PlanetPreset[];
  onSelect: (preset: PlanetPreset) => void;
  onDelete: (id: string) => void;
}

function PresetList({ presets, onSelect, onDelete }: PresetMenuProps) {
  if (presets.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="sm">
        No saved presets yet
      </Text>
    );
  }

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

          <CloseButton
            size="sm"
            c="purple.6"
            aria-label={`Delete ${preset.name}`}
            onClick={() => onDelete(preset.id)}
          />
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
          title="Select or delete a preset"
          fullScreen
          classNames={{
            content: "presets-modal__content",
            body: "presets-modal__body",
            close: "modal-close",
          }}
        >
          <Stack mt={8} mx={-2}>
            <PresetList
              presets={presets}
              onSelect={(preset) => {
                onSelect(preset);
                modal.close();
              }}
              onDelete={onDelete}
            />
          </Stack>
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
