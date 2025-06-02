"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const [pending, setPending] = React.useState(false);
  const [state, setState] = React.useState({
    defaultValues: {
      email: "",
      password: "",
    },
    success: false,
    errors: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPending(true);

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      const result = loginFormSchema.safeParse(data);

      if (!result.success) {
        setState({
          ...state,
          errors: Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value?.[0] ?? ""]
            )
          ) as Record<keyof typeof state.errors, string>,
        });
        setPending(false);
        return;
      }

      // Simulate login success
      setState({
        ...state,
        success: true,
        errors: {
          email: "",
          password: "",
        },
      });
      setPending(false);
    },
    [state]
  );

  if (state.success) {
    return (
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="success.main" gutterBottom>
              Login Successful!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! You have been successfully logged in.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardHeader
          title={<Typography variant="h5">Login</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Please enter your credentials to continue
            </Typography>
          }
        />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              id="field-email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
              defaultValue={state.defaultValues.email}
              disabled={pending}
              error={!!state.errors.email}
              helperText={state.errors.email}
              fullWidth
              margin="normal"
            />
            <TextField
              id="field-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
              defaultValue={state.defaultValues.password}
              disabled={pending}
              error={!!state.errors.password}
              helperText={state.errors.password}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={pending}
              sx={{ mt: 2 }}
              fullWidth
            >
              {pending ? "Signing in..." : "Sign In"}
            </Button>
            <Box mt={2} textAlign="right">
              <Button
                href="#"
                size="small"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Forgot password?
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
