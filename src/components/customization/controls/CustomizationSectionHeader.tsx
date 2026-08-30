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
        events={{ hover: true, focus: false, touch: true }}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Text
          component="span"
          className="customization-section-header__info"
          mt={5}
          onClick={(event) => event.stopPropagation()}
        >
          <svg width="16" height="16" aria-hidden="true">
            <use href="/icons.svg#info" />
          </svg>
        </Text>
      </Tooltip>
    </Group>
  );
}
