import { createTheme } from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";

const colors = {
  ice: [
    "#edf7fc",
    "#daeff8",
    "#b3def1",
    "#8bceea",
    "#6bbcdc",
    "#40a6ce",
    "#3090bc",
    "#206d91",
    "#104963",
    "#052636",
  ] satisfies MantineColorsTuple,

  snow: [
    "#ffffff",
    "#fbfbfc",
    "#f6f7fc",
    "#f0f2fa",
    "#e4e8f5",
    "#c9d1e8",
    "#abb6d6",
    "#8796be",
    "#5e6fa1",
    "#3d4b75",
  ] satisfies MantineColorsTuple,

  purple: [
    "#f6edff",
    "#e9d5ff",
    "#d1a8ff",
    "#b778ff",
    "#a14eff",
    "#9431fe",
    "#9b51e0",
    "#7a21cc",
    "#561499",
    "#350866",
  ] satisfies MantineColorsTuple,

  space: [
    "#e8e7ec",
    "#cfcbd9",
    "#b5afc5",
    "#9b93b2",
    "#81779e",
    "#665b89",
    "#1c1836",
    "#17142d",
    "#131024",
    "#0e0c1b",
  ] satisfies MantineColorsTuple,
};

export const theme = createTheme({
  fontFamily:
    'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontFamilyMonospace: "Monaco, Courier, monospace",

  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "22px",
  },

  colors,

  primaryColor: "ice",

  components: {
    Text: {
      defaultProps: {
        size: "sm",
        c: "snow.4",
      },
    },

    Button: {
      defaultProps: {
        radius: "md",
        c: "snow.4",
      },
      styles: {
        root: {
          background: "transparent",
          border: "2px solid var(--mantine-color-purple-6)",
          "&:hover": {
            background: "transparent",
          },
        },
      },
    },

    Accordion: {
      defaultProps: {
        multiple: true,
      },
      styles: {
        item: {
          borderBottom: "none",
        },
        control: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        content: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },

    AccordionControl: {
      defaultProps: {
        c: "snow.4",
        bg: "none",
      },
    },

    Slider: {
      defaultProps: {
        showLabelOnHover: false,
        size: "sm",
        radius: "xs",
      },
    },

    Menu: {
      styles: {
        dropdown: {
          background: "rgba(28, 24, 54, 0.8)",
          border: "none",
          borderRadius: "8px 0 0 8px",
          backdropFilter: "blur(8px)",
        },
        item: {
          color: "var(--mantine-color-snow-4)",
        },
      },
    },

    Tooltip: {
      defaultProps: {
        color: "space.2",
      },
    },

    Modal: {
      defaultProps: {
        c: "snow.4",
        transitionProps: { transition: "fade", duration: 200 },
      },
      styles: {
        content: {
          backgroundColor: "var(--mantine-color-space-7)",
        },
        header: {
          backgroundColor: "var(--mantine-color-space-7)",
          fontWeight: 800,
        },
      },
    },

    TextInput: {
      styles: {
        input: {
          backgroundColor: "var(--mantine-color-space-7)",
          caretColor: "var(--mantine-color-ice-5)",
          color: "var(--mantine-color-snow-4)",
        },
      },
    },
    Notification: {
      defaultProps: {
        color: "purple.6",
        bg: "space.7",
      },
      styles: {
        title: {
          color: "var(--mantine-color-snow-2)",
          fontWeight: 700,
        },
        description: {
          color: "var(--mantine-color-snow-5)",
        },
      },
    },
    ColorPicker: {
      defaultProps: {
        size: "sm",
        bg: "space.7",
      },
    },
    CloseButton: {
      styles: {
        root: {
          transition: "all 0.2s",
          "&:hover": {
            background: "var(--mantine-color-dimmed)",
          },
        },
      },
    },
    Popover: {
      styles: {
        dropdown: {
          backgroundColor: "var(--mantine-color-space-7)",
          boxShadow: "4px 4px 12px var(--mantine-color-space-9)",
          border: "1px solid var(--mantine-color-ice-5)",
        },
        arrow: {
          backgroundColor: "var(--mantine-color-space-7)",
          borderTopColor: "var(--mantine-color-ice-5)",
          borderRightColor: "var(--mantine-color-ice-5)",
          borderBottomColor: "var(--mantine-color-ice-5)",
          borderLeftColor: "var(--mantine-color-ice-5)",
        },
      },
    },
  },
});
