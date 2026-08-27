import { Button, Modal, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

interface SavePresetModalProps {
  opened: boolean;
  defaultName: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function SavePresetModal({
  opened,
  defaultName,
  onClose,
  onSave,
}: SavePresetModalProps) {
  const [name, setName] = useState("");
  const isMobile = useMediaQuery("(max-width: 50em)");

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleSave = () => {
    onSave(name.trim() || defaultName);
    setName("");
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="New Preset"
      size="xs"
      fullScreen={isMobile}
    >
      <TextInput
        data-autofocus
        label="Name"
        placeholder={defaultName}
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />

      <Button fullWidth mt="sm" onClick={handleSave} className="button--purple">
        Save
      </Button>
    </Modal>
  );
}
