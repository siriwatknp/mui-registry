"use client";

import * as React from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  MenuItem,
  Stack,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export function PaymentForm2() {
  const [selectedPayment, setSelectedPayment] = React.useState("credit-card");
  const [formData, setFormData] = React.useState({
    fullName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "Sweden",
    cardholderName: "",
    cardNumber: "",
    expMonth: "12",
    expYear: "18",
    cvc: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
        Payment
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 3, color: "text.secondary", fontWeight: 400 }}
      >
        Choose payment method below
      </Typography>

      <ToggleButtonGroup
        value={selectedPayment}
        exclusive
        onChange={(_, newPayment) => {
          if (newPayment !== null) {
            setSelectedPayment(newPayment);
          }
        }}
        aria-label="payment method"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
          width: "100%",
          "& .MuiToggleButtonGroup-grouped": {
            margin: 0,
            border: 1,
            borderColor: "divider",
            "&:first-of-type": {
              borderRadius: 1,
            },
            "&:last-of-type": {
              borderRadius: 1,
            },
          },
          "& .MuiToggleButton-root": {
            position: "relative",
            p: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "none",
            bgcolor: "background.paper",
            borderRadius: 1,
            borderWidth: 2,
            "&.Mui-selected": {
              borderColor: "primary.main",
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "background.paper",
              },
            },
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "background.paper",
            },
          },
        }}
      >
        <ToggleButton value="credit-card" aria-label="pay with credit card">
          {selectedPayment === "credit-card" && (
            <Box
              sx={{
                position: "absolute",
                top: -12,
                right: -12,
                bgcolor: "background.paper",
                borderRadius: "50%",
              }}
            >
              <CheckCircleIcon sx={{ color: "primary.main", fontSize: 32 }} />
            </Box>
          )}
          <CreditCardIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, textAlign: "center", color: "text.primary" }}
          >
            Pay with Credit Card
          </Typography>
        </ToggleButton>

        <ToggleButton value="paypal" aria-label="pay with PayPal">
          {selectedPayment === "paypal" && (
            <Box
              sx={{
                position: "absolute",
                top: -12,
                right: -12,
                bgcolor: "background.paper",
                borderRadius: "50%",
              }}
            >
              <CheckCircleIcon sx={{ color: "primary.main", fontSize: 32 }} />
            </Box>
          )}
          <Box
            component="img"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt=""
            sx={{ height: 32, mb: 1 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, textAlign: "center", color: "text.primary" }}
          >
            Pay with PayPal
          </Typography>
        </ToggleButton>

        <ToggleButton value="amazon" aria-label="pay with Amazon Payments">
          {selectedPayment === "amazon" && (
            <Box
              sx={{
                position: "absolute",
                top: -12,
                right: -12,
                bgcolor: "background.paper",
                borderRadius: "50%",
              }}
            >
              <CheckCircleIcon sx={{ color: "primary.main", fontSize: 32 }} />
            </Box>
          )}
          <Box
            component="img"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt=""
            sx={{ height: 32, mb: 1 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, textAlign: "center", color: "text.primary" }}
          >
            Pay with Amazon Payments
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: 2,
                borderColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              1
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Billing Info
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <TextField
              fullWidth
              required
              label="Full Name"
              placeholder="John Doe"
              variant="outlined"
              value={formData.fullName}
              onChange={handleInputChange("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName}
              slotProps={{
                inputLabel: {
                  sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                },
              }}
            />

            <TextField
              fullWidth
              required
              label="Billing Address"
              placeholder="Enter your billing address"
              variant="outlined"
              value={formData.billingAddress}
              onChange={handleInputChange("billingAddress")}
              error={!!errors.billingAddress}
              helperText={errors.billingAddress}
              slotProps={{
                inputLabel: {
                  sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationOnIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                required
                label="City"
                placeholder="Stockholm"
                variant="outlined"
                value={formData.city}
                onChange={handleInputChange("city")}
                error={!!errors.city}
                helperText={errors.city}
                slotProps={{
                  inputLabel: {
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      color: "text.secondary",
                      "&.Mui-focused": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                required
                label="ZIP Code"
                placeholder="12804"
                variant="outlined"
                value={formData.zipCode}
                onChange={handleInputChange("zipCode")}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
                slotProps={{
                  inputLabel: {
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      color: "text.secondary",
                      "&.Mui-focused": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              />
            </Stack>

            <TextField
              fullWidth
              required
              select
              label="Country"
              value={formData.country}
              onChange={handleInputChange("country")}
              variant="outlined"
              slotProps={{
                inputLabel: {
                  sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                },
              }}
            >
              <MenuItem value="Sweden">Sweden</MenuItem>
              <MenuItem value="Norway">Norway</MenuItem>
              <MenuItem value="Denmark">Denmark</MenuItem>
              <MenuItem value="Finland">Finland</MenuItem>
            </TextField>
          </Stack>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: 2,
                borderColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              2
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Credit Card Info
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <TextField
              fullWidth
              required
              label="Cardholder's Name"
              placeholder="John Doe"
              variant="outlined"
              value={formData.cardholderName}
              onChange={handleInputChange("cardholderName")}
              error={!!errors.cardholderName}
              helperText={errors.cardholderName}
              slotProps={{
                inputLabel: {
                  sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                },
              }}
            />

            <TextField
              fullWidth
              required
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              variant="outlined"
              value={formData.cardNumber}
              onChange={handleInputChange("cardNumber")}
              error={!!errors.cardNumber}
              helperText={
                errors.cardNumber || "Enter your 16-digit card number"
              }
              slotProps={{
                htmlInput: {
                  maxLength: 19,
                  pattern: "[0-9s]{13,19}",
                },
                inputLabel: {
                  sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                },
              }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                required
                select
                label="Exp. Month"
                value={formData.expMonth}
                onChange={handleInputChange("expMonth")}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      color: "text.secondary",
                      "&.Mui-focused": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <MenuItem
                    key={month}
                    value={month.toString().padStart(2, "0")}
                  >
                    {month.toString().padStart(2, "0")}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                required
                select
                label="Exp. Year"
                value={formData.expYear}
                onChange={handleInputChange("expYear")}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      color: "text.secondary",
                      "&.Mui-focused": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              >
                {Array.from({ length: 20 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <MenuItem key={year} value={year.toString().slice(-2)}>
                      {year}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Stack>

            <TextField
              fullWidth
              required
              label="CVC Number"
              placeholder="123"
              variant="outlined"
              value={formData.cvc}
              onChange={handleInputChange("cvc")}
              error={!!errors.cvc}
              helperText={errors.cvc || "3-digit security code on back of card"}
              slotProps={{
                htmlInput: {
                  maxLength: 4,
                  pattern: "[0-9]{3,4}",
                },
                inputLabel: {
                  sx: {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                },
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
