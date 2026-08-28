import { Slider, Stack, Text } from "@mantine/core";
import type { SliderProps } from "@mantine/core";
import type { ReactNode } from "react";

interface SettingSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  toSliderValue?: (value: number) => number;
  fromSliderValue?: (value: number) => number;
  marks?: SliderProps["marks"];
  formatValue?: (value: number) => ReactNode;
  sliderLabel?: string | ((value: number) => ReactNode);
}

const roundSliderValue = (value: number) => Number(value.toFixed(10));

export function SettingSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  toSliderValue = (value) => value,
  fromSliderValue = (value) => value,
  marks,
  formatValue = String,
  sliderLabel,
}: SettingSliderProps) {
  const sliderValue = roundSliderValue(toSliderValue(value));

  const handleSliderChange = (nextSliderValue: number) => {
    onChange(roundSliderValue(fromSliderValue(nextSliderValue)));
  };

  const renderSliderLabel = (val: number) => {
    if (typeof sliderLabel === "function") return sliderLabel(val);
    if (typeof sliderLabel === "string") return sliderLabel;

    return roundSliderValue(val).toString();
  };

  return (
    <Stack className="setting-slider" gap="xs" mb={6}>
      <Text ta="left" mb={-6}>
        {label}:{" "}
        <Text span className="setting-slider__value" c="ice.5">
          {formatValue(sliderValue)}
        </Text>
      </Text>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        marks={marks}
        label={renderSliderLabel}
      />
    </Stack>
  );
}
