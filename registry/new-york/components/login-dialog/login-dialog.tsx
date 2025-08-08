"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function LoginDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // handle login logic here
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            "--_spacing-row": "32px",
            "--_spacing-col": "32px",
          },
        })}
      >
        <DialogTitle sx={{ pb: 0, fontWeight: 600, fontSize: 24 }}>
          Login
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2, color: "text.secondary" }}>
            Please enter your credentials to continue
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              autoFocus
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <Button
                size="small"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Forgot password?
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
