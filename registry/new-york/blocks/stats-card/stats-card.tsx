"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export interface StatsCardProps {
  label: string;
  value: number | string;
  positive?: boolean;
}

export function StatsCard({ label, value, positive }: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h2"
            component="span"
            sx={{ fontWeight: "bold", fontSize: "2.5rem" }}
          >
            {value}
          </Typography>
          {positive === true && (
            <ArrowUpwardIcon color="success" fontSize="large" />
          )}
          {positive === false && (
            <ArrowDownwardIcon color="error" fontSize="large" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
