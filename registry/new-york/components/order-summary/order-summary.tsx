"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";

export function OrderSummary() {
  return (
    <Card
      sx={{
        maxWidth: 480,
        mx: "auto",
        borderRadius: 3,
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>

        <Box sx={{ display: "flex", gap: 3, mt: 4, mb: 4 }}>
          <Box
            sx={{
              width: 120,
              height: 160,
              bgcolor: "#e5e5e5",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="span"
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#d4d4d4",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Cosmic Adventure
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Sci-Fi, Adventure
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2h 15m
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={2.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Theater:</Typography>
            <Typography variant="body1" fontWeight="medium">
              Star Theater
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Date & Time:</Typography>
            <Typography variant="body1" fontWeight="medium">
              1:30 PM
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Seats:</Typography>
            <Typography variant="body1" fontWeight="medium">
              E5, D5
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Tickets (2):</Typography>
            <Typography variant="body1" fontWeight="medium">
              $35
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Total Amount:
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              $35
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              bgcolor: "#dc2626",
              color: "white",
              py: 1.5,
              borderRadius: 2,
              fontSize: "1.125rem",
              fontWeight: "medium",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#b91c1c",
              },
            }}
          >
            Pay $35
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
