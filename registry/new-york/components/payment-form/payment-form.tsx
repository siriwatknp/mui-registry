"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  CardActions,
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
  Check as CheckIcon,
  AccountCircle as AccountCircleIcon,
  Smartphone as SmartphoneIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

export function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = React.useState("credit-card");

  const handlePaymentMethodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMethod: string | null
  ) => {
    if (newMethod !== null) {
      setPaymentMethod(newMethod);
    }
  };

  return (
    <Card
      sx={(theme) => ({
        maxWidth: 600,
        mx: "auto",
        borderRadius: 3,
        bgcolor: "background.paper",
        ...theme.applyStyles("dark", {
          bgcolor: "grey.900",
        }),
      })}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
          Payment Information
        </Typography>

        <ToggleButtonGroup
          value={paymentMethod}
          exclusive
          onChange={handlePaymentMethodChange}
          aria-label="payment method"
          fullWidth
          sx={{ mb: 4 }}
        >
          <ToggleButton
            value="credit-card"
            aria-label="credit card"
            sx={{
              textTransform: "none",
              "&.Mui-selected": {
                borderColor: "warning.main",
              },
            }}
          >
            <Stack direction="column" spacing={0.5} alignItems="center">
              <CreditCardIcon />
              <Typography variant="body2">Credit Card</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton
            value="paypal"
            aria-label="paypal"
            sx={{
              textTransform: "none",
              "&.Mui-selected": {
                borderColor: "warning.main",
              },
            }}
          >
            <Stack direction="column" spacing={0.5} alignItems="center">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: "primary.main",
                  borderRadius: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.contrastText",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                P
              </Box>
              <Typography variant="body2">PayPal</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton
            value="apple-pay"
            aria-label="apple pay"
            sx={{
              textTransform: "none",
              "&.Mui-selected": {
                borderColor: "warning.main",
              },
            }}
          >
            <Stack direction="column" spacing={0.5} alignItems="center">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: "text.primary",
                  borderRadius: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              ></Box>
              <Typography variant="body2">Apple Pay</Typography>
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>

        {paymentMethod === "credit-card" && (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                fullWidth
                label="CVV"
                placeholder="123"
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>

            <TextField
              fullWidth
              label="Cardholder Name"
              placeholder="John Doe"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Email"
                placeholder="john@example.com"
                type="email"
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                fullWidth
                label="Phone"
                placeholder="+1 (555) 123-4567"
                type="tel"
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>

            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                borderRadius: 1,
                bgcolor: "background.default",
                ...theme.applyStyles("dark", {
                  bgcolor: "grey.800",
                }),
              })}
            >
              <LockIcon sx={{ color: "warning.main", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Your payment information is encrypted and secure. We do not
                store your card details.
              </Typography>
            </Box>
          </Stack>
        )}

        {paymentMethod === "paypal" && (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="PayPal Email"
              placeholder="your-email@example.com"
              type="email"
              variant="outlined"
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <AccountCircleIcon
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                  ),
                },
              }}
            />

            <Box
              sx={(theme) => ({
                p: 3,
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
                textAlign: "center",
                bgcolor: "background.default",
                ...theme.applyStyles("dark", {
                  bgcolor: "grey.800",
                  borderColor: "grey.700",
                }),
              })}
            >
              <Box
                component="img"
                src="https://placehold.co/200x50/1e88e5/ffffff?text=PayPal"
                alt="PayPal Logo"
                sx={{ height: 40, mb: 2 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                You will be redirected to PayPal to complete your purchase
                securely.
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Log in to your PayPal account to review and confirm your
                payment.
              </Typography>
            </Box>

            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                borderRadius: 1,
                bgcolor: "background.default",
                ...theme.applyStyles("dark", {
                  bgcolor: "grey.800",
                }),
              })}
            >
              <LockIcon sx={{ color: "primary.main", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                PayPal Buyer Protection covers your purchase.
              </Typography>
            </Box>
          </Stack>
        )}

        {paymentMethod === "apple-pay" && (
          <Stack spacing={3}>
            <Box
              sx={(theme) => ({
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "background.default",
                ...theme.applyStyles("dark", {
                  bgcolor: "grey.800",
                }),
              })}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "text.primary",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SmartphoneIcon
                  sx={{ fontSize: 30, color: "background.paper" }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                Use Touch ID or Face ID
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Authenticate with your device to complete the payment
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Box
                sx={(theme) => ({
                  p: 2,
                  borderRadius: 1,
                  border: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ...theme.applyStyles("dark", {
                    borderColor: "grey.700",
                  }),
                })}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CreditCardIcon sx={{ color: "text.secondary" }} />
                  <Box>
                    <Typography variant="body2">Visa •••• 4242</Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      Default Card
                    </Typography>
                  </Box>
                </Box>
                <CheckIcon sx={{ color: "success.main" }} />
              </Box>

              <Typography
                variant="caption"
                sx={{ color: "text.secondary", textAlign: "center" }}
              >
                You can manage your cards in Wallet app
              </Typography>
            </Stack>

            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                borderRadius: 1,
                bgcolor: "background.default",
                ...theme.applyStyles("dark", {
                  bgcolor: "grey.800",
                }),
              })}
            >
              <LockIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Payment secured with biometric authentication.
              </Typography>
            </Box>
          </Stack>
        )}
      </CardContent>
      <CardActions sx={{ p: 4, pt: 0 }}>
        {paymentMethod === "credit-card" && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<CheckIcon />}
            sx={{
              py: 1.5,
              bgcolor: "warning.main",
              color: "grey.900",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "warning.dark",
              },
            }}
          >
            Complete Payment
          </Button>
        )}
        {paymentMethod === "paypal" && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 1.5,
              bgcolor: "primary.main",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Continue with PayPal
          </Button>
        )}
        {paymentMethod === "apple-pay" && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              bgcolor: "text.primary",
              color: "background.paper",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "text.secondary",
              },
            }}
          >
            Pay with Apple Pay
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
