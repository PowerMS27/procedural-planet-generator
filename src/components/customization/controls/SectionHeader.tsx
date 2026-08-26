import { Group, Text, Tooltip } from "@mantine/core";

interface SectionHeaderProps {
  label: string;
  tooltip: string;
}

export function SectionHeader({ label, tooltip }: SectionHeaderProps) {
  return (
    <Group gap={6} wrap="nowrap">
      <Text className="customization-section-header__title">{label}</Text>

      <Tooltip
        label={tooltip}
        withArrow
        position="top"
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Text className="customization-section-header__info">i</Text>
      </Tooltip>
    </Group>
  );
}
