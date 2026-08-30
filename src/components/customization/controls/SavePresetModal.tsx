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
  const isMobile = useMediaQuery("(max-width: 48em)");

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
      title="Save a new preset"
      size="xs"
      fullScreen={isMobile}
      classNames={{
        close: "modal-close",
      }}
    >
      <TextInput
        data-autofocus={isMobile ? undefined : true}
        size={isMobile ? "md" : "sm"}
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
