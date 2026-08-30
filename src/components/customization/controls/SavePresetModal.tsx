import { Button, Modal, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import type { SubmitEvent } from "react";

const MAX_PRESET_NAME_LENGTH = 25;

interface SavePresetModalProps {
  opened: boolean;
  defaultName: string;
  onClose: () => void;
  onSave: (name: string) => boolean;
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

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSave(name.trim() || defaultName)) {
      setName("");
    }
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
      <form onSubmit={handleSubmit}>
        <TextInput
          data-autofocus={isMobile ? undefined : true}
          size={isMobile ? "md" : "sm"}
          label="Name"
          description={`Up to ${MAX_PRESET_NAME_LENGTH} characters`}
          placeholder={defaultName}
          value={name}
          maxLength={MAX_PRESET_NAME_LENGTH}
          onChange={(event) => setName(event.currentTarget.value)}
        />

        <Button fullWidth mt="lg" type="submit" className="button--purple">
          Save
        </Button>
      </form>
    </Modal>
  );
}
