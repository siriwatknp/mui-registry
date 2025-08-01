import { createTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";

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
    cssVarPrefix: "minimal",
  },
  colorSchemes: {
    light: {
      palette: {
        text: {
          icon: "rgb(142, 142, 147)", // systemGray for icons
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
      },
    },
    dark: {
      palette: {
        text: {
          icon: "rgb(174, 174, 178)", // systemGray for icons in dark mode
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
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&& .MuiTouchRipple-child": {
            background: "color-mix(in oklch, currentColor, transparent 60%)",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: "unset",
          textTransform: "capitalize",
          "@media (hover: hover)": {
            "&:disabled": {
              pointerEvents: "auto",
              cursor: "not-allowed",
            },
          },
          // When button contains only an icon (with or without TouchRipple)
          "&:has(> svg:first-of-type):not(:has(> :not(svg):not(.MuiTouchRipple-root)))":
            {
              "&.MuiButton-sizeSmall": {
                padding: "4px",
                minWidth: "28px",
              },
              "&.MuiButton-sizeMedium": {
                padding: "8px",
                minWidth: "36px",
              },
              "&.MuiButton-sizeLarge": {
                padding: "12px",
                minWidth: "48px",
              },
              // Outlined variant needs to compensate for border
              "&.MuiButton-outlined": {
                "&.MuiButton-sizeSmall": {
                  padding: "3px",
                },
                "&.MuiButton-sizeMedium": {
                  padding: "7px",
                },
                "&.MuiButton-sizeLarge": {
                  padding: "11px",
                },
              },
            },
          variants: [
            // Size variants
            {
              props: { size: "small" },
              style: {
                padding: "4px 12px",
                lineHeight: "20px",
              },
            },
            {
              props: { size: "medium" },
              style: {
                padding: "8px 16px",
                lineHeight: "20px",
              },
            },
            {
              props: { size: "large" },
              style: {
                padding: "12px 24px",
                lineHeight: "24px",
              },
            },
            // Outlined border compensation for all sizes
            {
              props: { variant: "outlined" },
              style: {
                "&.MuiButton-sizeSmall": {
                  padding: "3px 12px",
                },
                "&.MuiButton-sizeMedium": {
                  padding: "7px 16px",
                },
                "&.MuiButton-sizeLarge": {
                  padding: "11px 24px",
                },
                "& .MuiTouchRipple-root": {
                  inset: "-1px",
                },
              },
            },
            // Text variant uses custom text colors
            {
              props: { variant: "text" },
              style: {
                "&.MuiButton-colorSecondary": {
                  "--variant-textColor": (theme.vars || theme).palette.secondary
                    .text,
                },
                "&.MuiButton-colorSuccess": {
                  "--variant-textColor": (theme.vars || theme).palette.success
                    .text,
                },
                "&.MuiButton-colorError": {
                  "--variant-textColor": (theme.vars || theme).palette.error
                    .text,
                },
                "&.MuiButton-colorWarning": {
                  "--variant-textColor": (theme.vars || theme).palette.warning
                    .text,
                },
                "&.MuiButton-colorInfo": {
                  "--variant-textColor": (theme.vars || theme).palette.info
                    .text,
                },
                color: "var(--variant-textColor)",
              },
            },
            // Outlined variant uses custom text colors and subtle borders
            {
              props: { variant: "outlined" },
              style: {
                "&.MuiButton-colorPrimary": {
                  "--variant-outlinedBorder": `color-mix(in srgb, ${
                    (theme.vars || theme).palette.primary.main
                  } 28%, transparent)`,
                },
                "&.MuiButton-colorSecondary": {
                  "--variant-outlinedColor": (theme.vars || theme).palette
                    .secondary.text,
                  "--variant-outlinedBorder": `color-mix(in srgb, ${
                    (theme.vars || theme).palette.secondary.text
                  } 28%, transparent)`,
                },
                "&.MuiButton-colorSuccess": {
                  "--variant-outlinedColor": (theme.vars || theme).palette
                    .success.text,
                  "--variant-outlinedBorder": `color-mix(in srgb, ${
                    (theme.vars || theme).palette.success.text
                  } 28%, transparent)`,
                },
                "&.MuiButton-colorError": {
                  "--variant-outlinedColor": (theme.vars || theme).palette.error
                    .text,
                  "--variant-outlinedBorder": `color-mix(in srgb, ${
                    (theme.vars || theme).palette.error.text
                  } 28%, transparent)`,
                },
                "&.MuiButton-colorWarning": {
                  "--variant-outlinedColor": (theme.vars || theme).palette
                    .warning.text,
                  "--variant-outlinedBorder": `color-mix(in srgb, ${
                    (theme.vars || theme).palette.warning.text
                  } 28%, transparent)`,
                },
                "&.MuiButton-colorInfo": {
                  "--variant-outlinedColor": (theme.vars || theme).palette.info
                    .text,
                  "--variant-outlinedBorder": `color-mix(in srgb, ${
                    (theme.vars || theme).palette.info.text
                  } 28%, transparent)`,
                },
                color: "var(--variant-outlinedColor)",
                borderColor: "var(--variant-outlinedBorder)",
              },
            },
            // Contained variant for success, error, warning, info
            {
              props: { variant: "contained", color: "success" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.success.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.success.main
                }, ${(theme.vars || theme).palette.common.background} 60%)`,
              },
            },
            {
              props: { variant: "contained", color: "error" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.error.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.error.main
                }, ${(theme.vars || theme).palette.common.background} 60%)`,
              },
            },
            {
              props: { variant: "contained", color: "warning" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.warning.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.warning.main
                }, ${(theme.vars || theme).palette.common.background} 60%)`,
              },
            },
            {
              props: { variant: "contained", color: "info" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.info.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.info.main
                }, ${(theme.vars || theme).palette.common.background} 60%)`,
              },
            },
          ],
        }),
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          variants: [
            {
              props: { variant: "outlined" },
              style: {
                "& .MuiFormLabel-root, & .MuiInputLabel-root.MuiInputLabel-shrink":
                  {
                    position: "static",
                    transform: "none",
                    pointerEvents: "auto",
                    marginBottom: "0.25rem",
                    maxWidth: "unset",
                    fontWeight: 500,
                    color: (theme.vars || theme).palette.text.primary,
                  },
                "& .MuiOutlinedInput-input:where(input)": {
                  paddingBlock: "9.5px",
                },
                "&&& .MuiInputBase-input": {
                  "&::-webkit-input-placeholder": {
                    opacity: "0.42 !important",
                  },
                  "&::-moz-placeholder": {
                    opacity: "0.42 !important",
                  },
                  "&::-ms-input-placeholder": {
                    opacity: "0.42 !important",
                  },
                },
                "&& .MuiOutlinedInput-notchedOutline": {
                  transition: "none",
                  "& legend": {
                    width: 0,
                  },
                },
              },
            },
            {
              props: { variant: "outlined", size: "small" },
              style: {
                "& .MuiInputBase-input:where(input)": {
                  paddingBlock: "6.5px",
                  paddingInline: "12px",
                },
              },
            },
          ],
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          variants: [
            {
              props: { size: "small" },
              style: {
                fontSize: theme.typography.body2.fontSize,
              },
            },
          ],
        }),
        input: () => ({
          padding: "8px 12px",
          minHeight: "1.5em",
          variants: [
            {
              props: { size: "small" },
              style: {
                padding: "4px 10px",
              },
            },
            {
              props: { multiline: true },
              style: {
                padding: 0,
              },
            },
          ],
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-notchedOutline": {
            transition: theme.transitions.create(["border-color"], {
              duration: theme.transitions.duration.shorter,
            }),
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme.vars || theme).palette.text.primary,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: (theme.vars || theme).palette.primary.main,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme.vars || theme).palette.error.main,
          },
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme.vars || theme).palette.action.disabled,
            },
          },
          variants: [
            {
              props: { multiline: true },
              style: {
                padding: "8px 12px",
              },
            },
            {
              props: { size: "small", multiline: true },
              style: {
                padding: "4px 10px",
              },
            },
          ],
        }),
        notchedOutline: {
          borderRadius: 8,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: (theme.vars || theme).palette.action.hover,
          borderRadius: "8px 8px 0 0",
          "&:hover": {
            backgroundColor: (theme.vars || theme).palette.action.selected,
          },
          "&.Mui-focused": {
            backgroundColor: (theme.vars || theme).palette.action.selected,
          },
          "&.Mui-disabled": {
            backgroundColor: (theme.vars || theme).palette.action
              .disabledBackground,
          },
          "&::before": {
            transition: theme.transitions.create(["border-bottom-color"], {
              duration: theme.transitions.duration.shorter,
            }),
          },
          "&:hover::before": {
            borderBottom: `2px solid ${
              (theme.vars || theme).palette.text.primary
            }`,
          },
          "&::after": {
            borderBottom: `2px solid ${
              (theme.vars || theme).palette.primary.main
            }`,
          },
          "&.Mui-error::after": {
            borderBottomColor: (theme.vars || theme).palette.error.main,
          },
        }),
        input: () => ({
          "&:where(input)": {
            padding: "25px 12px 8px",
          },
          variants: [
            {
              props: { size: "small" },
              style: {
                "&:where(input)": {
                  padding: "21px 10px 4px",
                },
              },
            },
          ],
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&::before": {
            transition: theme.transitions.create(["border-bottom-color"], {
              duration: theme.transitions.duration.shorter,
            }),
          },
          "&:hover:not(.Mui-disabled)::before": {
            borderBottom: `2px solid ${
              (theme.vars || theme).palette.text.primary
            }`,
          },
          "&::after": {
            borderBottom: `2px solid ${
              (theme.vars || theme).palette.primary.main
            }`,
          },
          "&.Mui-error::after": {
            borderBottomColor: (theme.vars || theme).palette.error.main,
          },
        }),
        input: {
          padding: "4px 0 5px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          "&.Mui-focused": {
            color: (theme.vars || theme).palette.primary.main,
          },
          "&.Mui-error": {
            color: (theme.vars || theme).palette.error.main,
          },
        }),
        outlined: {
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
          variants: [
            {
              props: { size: "small" },
              style: {
                transform: "translate(14px, 7px) scale(1)",
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              },
            },
          ],
        },
        filled: {
          transform: "translate(12px, 16px) scale(1)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(12px, 7px) scale(0.75)",
          },
          variants: [
            {
              props: { size: "small" },
              style: {
                transform: "translate(12px, 13px) scale(1)",
                "&.MuiInputLabel-shrink": {
                  transform: "translate(12px, 4px) scale(0.75)",
                },
              },
            },
          ],
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: 4,
          fontSize: theme.typography.caption.fontSize,
          "&.Mui-error": {
            color: (theme.vars || theme).palette.error.text,
          },
        }),
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: (theme.vars || theme).palette.text.secondary,
          variants: [
            {
              props: { position: "start" },
              style: {
                marginRight: 8,
              },
            },
            {
              props: { position: "end" },
              style: {
                marginLeft: 8,
              },
            },
          ],
        }),
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        select: {
          "&.MuiInputBase-input": {
            paddingRight: 32,
          },
          "&.MuiOutlinedInput-input": {
            padding: "8px 14px",
          },
          "&.MuiFilledInput-input": {
            padding: "25px 12px 8px",
          },
          variants: [
            {
              props: { size: "small" },
              style: {
                "&.MuiOutlinedInput-input": {
                  padding: "4px 14px",
                },
                "&.MuiFilledInput-input": {
                  padding: "21px 10px 4px",
                },
              },
            },
          ],
        },
        icon: ({ theme }) => ({
          color: (theme.vars || theme).palette.text.secondary,
          right: 8,
          transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.shorter,
          }),
        }),
        iconOpen: {
          transform: "rotate(180deg)",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
          variant: "outlined",
        },
      },
      styleOverrides: {
        paper: ({ theme }) => ({
          marginTop: 4,
          borderRadius: 8,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
        }),
        list: {
          padding: "6px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          padding: "6px",
          borderRadius: 4,
          margin: 0,
          transition: theme.transitions.create(["background-color"], {
            duration: theme.transitions.duration.shortest,
          }),
          "&:hover": {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          "&.Mui-selected": {
            backgroundColor: (theme.vars || theme).palette.action.selected,
            "&:hover": {
              backgroundColor: (theme.vars || theme).palette.action.selected,
            },
          },
          "&.Mui-focusVisible": {
            backgroundColor: (theme.vars || theme).palette.action.focus,
          },
          variants: [
            {
              props: { dense: true },
              style: {
                padding: "4px 8px",
              },
            },
          ],
        }),
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 8,
          },
        },
      },
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-inputRoot": {
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 40,
            "&:has(.MuiChip-root)": {
              paddingLeft: "6px",
            },
            "& .MuiAutocomplete-input": {
              paddingBlock: 7.5,
            },
          },
          "& .MuiAutocomplete-inputRoot.MuiInputBase-sizeSmall": {
            paddingTop: 4,
            paddingBottom: 4,
            "&:has(.MuiChip-root)": {
              paddingLeft: 4,
            },
            "& .MuiAutocomplete-input": {
              paddingBlock: 4.5,
            },
          },
        },
        tag: {
          margin: 2,
        },
        option: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          padding: "6px",
          borderRadius: 4,
        }),
        paper: ({ theme }) => ({
          marginTop: 4,
          borderRadius: 8,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
        }),
        listbox: {
          padding: "6px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        },
        noOptions: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          color: (theme.vars || theme).palette.text.secondary,
        }),
        loading: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          color: (theme.vars || theme).palette.text.secondary,
        }),
        clearIndicator: {
          borderRadius: 4,
        },
        popupIndicator: {
          borderRadius: 4,
          variants: [
            {
              props: { size: "small" },
              style: {
                marginRight: -5,
              },
            },
          ],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          fontWeight: 400,
          fontSize: theme.typography.body2.fontSize,
          variants: [
            {
              props: { variant: "outlined", color: "primary" },
              style: {
                color: (theme.vars || theme).palette.primary.text,
              },
            },
            {
              props: { variant: "outlined", color: "secondary" },
              style: {
                color: (theme.vars || theme).palette.secondary.text,
              },
            },
            {
              props: { variant: "outlined", color: "success" },
              style: {
                color: (theme.vars || theme).palette.success.text,
              },
            },
            {
              props: { variant: "outlined", color: "error" },
              style: {
                color: (theme.vars || theme).palette.error.text,
              },
            },
            {
              props: { variant: "outlined", color: "warning" },
              style: {
                color: (theme.vars || theme).palette.warning.text,
              },
            },
            {
              props: { variant: "outlined", color: "info" },
              style: {
                color: (theme.vars || theme).palette.info.text,
              },
            },
            // Filled variant for success, error, warning, info
            {
              props: { variant: "filled" },
              style: {
                ...theme.applyStyles("dark", {
                  "--_p": "60%",
                }),
              },
            },
            {
              props: { variant: "filled", color: "success" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.success.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.success.main
                }, ${
                  (theme.vars || theme).palette.common.background
                } var(--_p, 80%))`,
              },
            },
            {
              props: { variant: "filled", color: "error" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.error.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.error.main
                }, ${
                  (theme.vars || theme).palette.common.background
                } var(--_p, 80%))`,
              },
            },
            {
              props: { variant: "filled", color: "warning" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.warning.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.warning.main
                }, ${
                  (theme.vars || theme).palette.common.background
                } var(--_p, 80%))`,
              },
            },
            {
              props: { variant: "filled", color: "info" },
              style: {
                color: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.info.text
                }, ${(theme.vars || theme).palette.common.onBackground} 30%)`,
                backgroundColor: `color-mix(in oklch, ${
                  (theme.vars || theme).palette.info.main
                }, ${
                  (theme.vars || theme).palette.common.background
                } var(--_p, 80%))`,
              },
            },
          ],
        }),
        icon: {
          fontSize: "1.125rem",
          variants: [
            {
              props: { size: "small" },
              style: {
                fontSize: "1rem",
              },
            },
          ],
        },
        deleteIcon: ({ theme }) => ({
          variants: [
            {
              props: { color: "default" },
              style: {
                color: (theme.vars || theme).palette.text.icon,
                "&:hover": {
                  color: (theme.vars || theme).palette.text.secondary,
                },
              },
            },
          ],
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          fontSize: theme.typography.body2.fontSize,
          backgroundColor: (theme.vars || theme).palette.secondary.light,
          color: (theme.vars || theme).palette.text.secondary,
          ...theme.applyStyles("dark", {
            backgroundColor: (theme.vars || theme).palette.secondary.dark,
          }),
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          tableLayout: "fixed",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottomColor: (theme.vars || theme).palette.divider,
          fontSize: theme.typography.body2.fontSize,
          padding: "14px 24px 14px 12px",
        }),
        head: ({ theme }) => ({
          fontWeight: 600,
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: `color-mix(in srgb, ${
            (theme.vars || theme).palette.secondary.main
          }, ${(theme.vars || theme).palette.common.background} 60%)`,
        }),
        sizeSmall: {
          padding: "6px 16px 6px 12px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          "tbody > &:last-child td, tbody > &:last-child th": {
            borderBottom: 0,
          },
          "&.MuiTableRow-hover:hover": {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          "&.Mui-selected": {
            backgroundColor: (theme.vars || theme).palette.action.selected,
            "&:hover": {
              backgroundColor: (theme.vars || theme).palette.action.selected,
            },
          },
        }),
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
        }),
        select: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
        selectLabel: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
        displayedRows: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 600,
          "&:hover": {
            color: (theme.vars || theme).palette.text.primary,
          },
          "&.Mui-active": {
            color: (theme.vars || theme).palette.text.primary,
          },
        }),
        icon: ({ theme }) => ({
          fontSize: "1.125rem",
          color: (theme.vars || theme).palette.text.secondary,
        }),
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          transition: theme.transitions.create(["box-shadow", "border-color"], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover": {
            boxShadow: theme.shadows[4],
          },
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 16,
        },
        title: ({ theme }) => ({
          ...theme.typography.subtitle1,
          fontWeight: 500,
        }),
        subheader: ({ theme }) => ({
          ...theme.typography.body2,
        }),
        action: {
          marginTop: 0,
          marginRight: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiCardActions: {
      defaultProps: {
        disableSpacing: true,
      },
      styleOverrides: {
        root: {
          padding: 16,
          gap: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--_spacing-row": "16px",
          "--_spacing-col": "20px",
          "--_edge": "16px",
          [theme.breakpoints.up("md")]: {
            "--_spacing-row": "20px",
            "--_spacing-col": "24px",
          },
        }),
        paper: ({ theme }) => ({
          "&:not(.MuiDialog-paperFullScreen)": {
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[8],
            width: "calc(100% - var(--_edge))",
            margin: "var(--_edge)",
          },
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "var(--_spacing-row) var(--_spacing-col)",
          fontSize: "1.25rem",
          fontWeight: 500,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0 var(--_spacing-col) var(--_spacing-row)",
        },
        dividers: {
          padding: "var(--_spacing-row) var(--_spacing-col)",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "0px var(--_spacing-col) var(--_spacing-row)",
          gap: 8,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.text.secondary,
          marginBottom: 0,
        }),
      },
    },
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
