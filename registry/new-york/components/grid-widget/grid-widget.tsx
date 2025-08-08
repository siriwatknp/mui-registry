"use client";

import * as React from "react";
import Box from "@mui/material/Box";

export interface GridWidgetProps extends React.ComponentProps<typeof Box> {
  children?: React.ReactNode;
  /**
   * Responsive strategy
   * container: uses container queries
   * media: uses media queries
   * @default 'container'
   */
  responsive?: "container" | "media";
  /**
   * Column layout pattern for the grid items on md+ breakpoints
   * - "5/7": Creates a 5-column and 7-column layout pattern (default)
   *   Use when: Composing data visualization widgets, analytics cards, charts with stats,
   *   or any asymmetric widget arrangement where you need varied content sizes
   * - "1/2": Creates a 4-column and 8-column layout pattern
   *   Use when: Creating widgets with a 1:2 ratio, metric cards with detailed content,
   *   KPI widgets with supporting data, or compact stats alongside larger visualizations
   * @default '5/7'
   */
  columns?: "1/2" | "5/7";
}

export function GridWidget({
  children,
  sx,
  responsive = "container",
  columns = "5/7",
  style,
  ...props
}: GridWidgetProps) {
  return (
    <Box
      sx={[
        {
          "--cols": "var(--5_7,)",
          "--1_3": "var(--cols,)",
          "--5_7": "var(--cols,)",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 2,
          containerType: "inline-size",
          "&[data-style-responsive='media']": {
            containerType: "unset",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...(responsive === "media" && {
        "data-style-responsive": "media",
      })}
      style={{
        ...(columns === "1/2" && {
          "--cols": "var(--1_3,)",
        }),
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export interface GridWidgetItemProps extends React.ComponentProps<typeof Box> {
  /**
   * Ratio of the item
   * wide: 7 columns on md and up
   * normal: 5 columns on md and up
   * full: 12 columns on all breakpoints
   * narrow: 5 columns on md and up, spans 2 rows
   * @default 'normal'
   */
  ratio?: "wide" | "normal" | "full" | "narrow";
  children?: React.ReactNode;
}

export function GridWidgetItem({
  ratio = "normal",
  children,
  sx,
  className = "",
  ...props
}: GridWidgetItemProps) {
  return (
    <Box
      data-style-ratio={ratio}
      sx={[
        (theme) => ({
          display: "flex",
          flexDirection: "column",
          gridColumn: "span 12",
          [theme.containerQueries?.up("sm") || "@container (min-width: 600px)"]:
            {
              gridColumn: "var(--col-sm, span 6)",
            },
          [theme.containerQueries?.up("md") || "@container (min-width: 900px)"]:
            {
              gridColumn:
                "var(--col-md, var(--5_7, span 5) var(--1_3, span 4))",
            },
          "[data-style-responsive='media'] > &": {
            [theme.breakpoints.up("sm")]: {
              gridColumn: "var(--col-sm, span 6)",
            },
            [theme.breakpoints.up("md")]: {
              gridColumn:
                "var(--col-md, var(--5_7, span 5) var(--1_3, span 4))",
            },
          },
          "&[data-style-ratio='full']": {
            "--col-sm": "span 12",
            "--col-md": "span 12",
          },
          "&[data-style-ratio='wide']": {
            "--col-sm": "span 6",
            "--col-md": "var(--5_7, span 7) var(--1_3, span 8)",
          },
          "&[data-style-ratio='narrow']": {
            "--col-sm": "span 6",
            "--col-md": "var(--5_7, span 5) var(--1_3, span 4)",
            gridRow: "span 2",
          },
          "& > *": {
            flexGrow: 1,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}
