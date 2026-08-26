import { Group, Text, Tooltip } from "@mantine/core";

interface CustomizationSectionHeaderProps {
  label: string;
  tooltip: string;
}

export function CustomizationSectionHeader({
  label,
  tooltip,
}: CustomizationSectionHeaderProps) {
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
