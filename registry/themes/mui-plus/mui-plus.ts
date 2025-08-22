"use client";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import { buttonTheme } from "./components/button";
import { textFieldTheme } from "./components/text-field";
import { selectTheme } from "./components/select";
import { autocompleteTheme } from "./components/autocomplete";
import { chipTheme } from "./components/chip";
import { avatarTheme } from "./components/avatar";
import { menuTheme } from "./components/menu";
import { tableTheme } from "./components/table";
import { cardTheme } from "./components/card";
import { dialogTheme } from "./components/dialog";
import { datePickerTheme } from "./components/date-picker";
import { svgIconTheme } from "./components/svg-icon";
import { dataGridTheme } from "./components/data-grid";
import { alertTheme } from "./components/alert";
import { treeViewTheme } from "./components/tree-view";
import { layoutTheme } from "./components/layout";

// Augment the palette to include custom 'text' property
declare module "@mui/material/styles" {
  interface PaletteColor {
    text?: string;
  }

  interface SimplePaletteColorOptions {
    text?: string;
  }

  interface TypeText {
    icon?: string;
  }
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
    cssVarPrefix: "plus",
  },
  colorSchemes: {
    light: {
      palette: {
        text: {
          icon: "rgb(0 0 0 / 0.48)", // systemGray for icons
        },
        action: {
          activatedOpacity: 0.38, // Reduced from 0.54
          selectedOpacity: 0.06, // Reduced from 0.08
          disabledOpacity: 0.2, // Reduced from 0.38
          focusOpacity: 0.08, // Reduced from 0.12
        },
        primary: {
          main: "#000",
          text: "#212121",
        },
        secondary: {
          main: "rgb(229, 229, 234)", // systemGray
          text: "rgb(108, 108, 112)", // systemGray increased contrast
        },
        success: {
          main: "rgb(52, 199, 89)", // green
          text: "rgb(0, 137, 50)", // green increased contrast
        },
        error: {
          main: "rgb(255, 56, 60)", // red
          text: "rgb(233, 21, 45)", // red increased contrast
        },
        warning: {
          main: "rgb(255, 204, 0)", // yellow
          text: "rgb(161, 106, 0)", // yellow increased contrast
        },
        info: {
          main: "rgb(0, 136, 255)", // blue
          text: "rgb(30, 110, 244)", // blue increased contrast
        },
        background: {
          default: "rgb(248, 248, 248)",
        },
      },
    },
    dark: {
      palette: {
        text: {
          icon: "rgb(255 255 255 / 0.6)", // systemGray for icons in dark mode
        },
        action: {
          activatedOpacity: 0.38, // Reduced intensity
          selectedOpacity: 0.06, // Subtle selection
          disabledOpacity: 0.2, // Reduced opacity
          focusOpacity: 0.08, // Subtle focus
        },
        primary: {
          main: "#fff",
          text: "#f5f5f5",
        },
        secondary: {
          main: "rgb(142, 142, 147)", // systemGray
          text: "rgb(174, 174, 178)", // systemGray for dark mode
        },
        success: {
          main: "rgb(48, 209, 88)", // green for dark
          text: "rgb(71, 217, 104)", // green for dark
        },
        error: {
          main: "rgb(255, 69, 58)", // red for dark
          text: "rgb(255, 97, 101)", // red for dark
        },
        warning: {
          main: "rgb(255, 214, 10)", // yellow for dark
          text: "rgb(254, 223, 67)", // yellow for dark
        },
        info: {
          main: "rgb(0, 145, 255)", // blue for dark
          text: "rgb(92, 184, 255)", // blue for dark
        },
        background: {
          default: "rgb(0, 0, 0)", // systemGrayDark
          paper: "rgb(18, 18, 18)", // systemGrayDark
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    ...buttonTheme,
    ...textFieldTheme,
    ...selectTheme,
    ...menuTheme,
    ...autocompleteTheme,
    ...chipTheme,
    ...avatarTheme,
    ...tableTheme,
    ...cardTheme,
    ...dialogTheme,
    ...datePickerTheme,
    ...svgIconTheme,
    ...dataGridTheme,
    ...alertTheme,
    ...treeViewTheme,
    ...layoutTheme,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    body2: {
      lineHeight: "1.4285714286",
    },
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 2px 4px 0 rgb(0 0 0 / 0.06)",
    "0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
    "0 3px 5px -1px rgb(0 0 0 / 0.07), 0 1px 3px -1px rgb(0 0 0 / 0.05)",
    "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.05)",
    "0 5px 8px -2px rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.05)",
    "0 6px 10px -2px rgb(0 0 0 / 0.08), 0 3px 5px -2px rgb(0 0 0 / 0.06)",
    "0 8px 12px -3px rgb(0 0 0 / 0.09), 0 3px 6px -2px rgb(0 0 0 / 0.06)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 7px -3px rgb(0 0 0 / 0.07)",
    "0 12px 18px -4px rgb(0 0 0 / 0.11), 0 5px 9px -3px rgb(0 0 0 / 0.08)",
    "0 15px 22px -4px rgb(0 0 0 / 0.12), 0 6px 11px -4px rgb(0 0 0 / 0.09)",
    "0 18px 28px -5px rgb(0 0 0 / 0.13), 0 7px 13px -4px rgb(0 0 0 / 0.1)",
    "0 22px 34px -6px rgb(0 0 0 / 0.14), 0 8px 16px -5px rgb(0 0 0 / 0.11)",
    "0 26px 40px -7px rgb(0 0 0 / 0.15), 0 10px 19px -5px rgb(0 0 0 / 0.12)",
    "0 31px 47px -8px rgb(0 0 0 / 0.16), 0 12px 23px -6px rgb(0 0 0 / 0.13)",
    "0 36px 54px -9px rgb(0 0 0 / 0.17), 0 14px 27px -7px rgb(0 0 0 / 0.14)",
    "0 42px 62px -10px rgb(0 0 0 / 0.18), 0 16px 31px -8px rgb(0 0 0 / 0.15)",
    "0 48px 70px -11px rgb(0 0 0 / 0.2), 0 18px 36px -9px rgb(0 0 0 / 0.16)",
    "0 54px 78px -12px rgb(0 0 0 / 0.21), 0 20px 41px -10px rgb(0 0 0 / 0.17)",
    "0 60px 86px -13px rgb(0 0 0 / 0.22), 0 23px 46px -11px rgb(0 0 0 / 0.18)",
    "0 66px 94px -14px rgb(0 0 0 / 0.23), 0 26px 52px -12px rgb(0 0 0 / 0.19)",
    "0 72px 102px -15px rgb(0 0 0 / 0.24), 0 29px 58px -13px rgb(0 0 0 / 0.2)",
    "0 58px 82px -11px rgb(0 0 0 / 0.26), 0 21px 40px -11px rgb(0 0 0 / 0.22)",
  ],
});

export default theme;
