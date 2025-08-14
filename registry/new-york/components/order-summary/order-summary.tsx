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
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 3, mb: 3 }}>
          <Box
            component="img"
            src="https://placehold.co/400"
            alt="Cosmic Adventure movie poster"
            sx={{
              width: 120,
              aspectRatio: "1",
              borderRadius: 1,
              objectFit: "cover",
            }}
          />
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

        <Divider sx={{ my: 2.5 }} />

        <Stack spacing={1.5}>
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
          sx={{
            mt: 3,
            pt: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
            color="error"
            sx={{
              textTransform: "none",
            }}
          >
            Pay $35
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
