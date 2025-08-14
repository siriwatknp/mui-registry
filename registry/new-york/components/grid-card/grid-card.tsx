"use client";

import * as React from "react";
import Box from "@mui/material/Box";

export interface GridCardProps extends React.ComponentProps<typeof Box> {
  /**
   * The ideal width for each card. Can be a number (px) or any valid CSS width string.
   * Example: 320, '320px', '20rem', '25%'
   */
  idealWidth?: number | string;
}

export function GridCard({
  idealWidth = 320,
  children,
  sx,
  ...props
}: GridCardProps) {
  // Convert number to px string
  const minWidth =
    typeof idealWidth === "number" ? `${idealWidth}px` : idealWidth;
  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}), 1fr))`,
          gap: {
            xs: 2,
            md: 4,
            xl: 6,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}
