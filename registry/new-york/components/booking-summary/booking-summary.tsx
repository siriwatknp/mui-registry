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
  Chip,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PaymentIcon from "@mui/icons-material/Payment";

export function BookingSummary() {
  return (
    <Card
      sx={(theme) => ({
        bgcolor: "background.paper",
        borderRadius: 2,
        ...theme.applyStyles("dark", {
          bgcolor: "grey.900",
        }),
      })}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Booking Details
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 3, mb: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              bgcolor: "primary.dark",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MovieIcon sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Quantum Strike
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Action/Sci-Fi • 2h 15m • Rated PG-13
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2} mb={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LocationOnIcon sx={{ color: "warning.main" }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Theater
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CineMax IMAX Downtown
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AccessTimeIcon sx={{ color: "warning.main" }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Showtime
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Friday, August 8, 2025 at 10:30 AM
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EventSeatIcon sx={{ color: "warning.main" }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Selected Seats
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label="A6"
                  size="small"
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Price Breakdown
          </Typography>

          <Stack spacing={1.5} mt={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" color="text.secondary">
                Tickets (1 × $15.00)
              </Typography>
              <Typography variant="body1">$15.00</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" color="text.secondary">
                Convenience Fee
              </Typography>
              <Typography variant="body1">$2.50</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" color="text.secondary">
                Taxes & Fees
              </Typography>
              <Typography variant="body1">$1.75</Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h5" fontWeight="bold">
                Total Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="warning.main">
                $19.25
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              color="warning"
              startIcon={<PaymentIcon />}
              sx={{
                textTransform: "none",
                py: 1.5,
                fontSize: "1.125rem",
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
