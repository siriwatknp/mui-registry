"use client";
import * as React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { TextField, Button, Typography, Box } from "@mui/material";
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
    <Card sx={{ maxWidth: 400, width: "100%" }}>
      <CardHeader>
        <Typography variant="h5" component="h1" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your credentials to access your account
        </Typography>
      </CardHeader>
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
            defaultValue={state.defaultValues.email}
            error={!!state.errors.email}
            helperText={state.errors.email}
            disabled={pending}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
            defaultValue={state.defaultValues.password}
            error={!!state.errors.password}
            helperText={state.errors.password}
            disabled={pending}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={pending}
            sx={{ mt: 2 }}
          >
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
