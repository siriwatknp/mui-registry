import type { ThemeOptions } from "@mui/material/styles";

export const selectTheme: ThemeOptions["components"] = {
  MuiSelect: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      select: {
        "&.MuiOutlinedInput-input": {
          padding: "8px 14px",
        },
        "&.MuiFilledInput-input": {
          padding: "25px 12px 8px",
        },
        "&.MuiInputBase-input": {
          paddingRight: 32,
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
};
