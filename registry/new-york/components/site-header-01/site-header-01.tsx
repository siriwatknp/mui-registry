"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { HelpOutline as SupportIcon } from "@mui/icons-material";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
];

export function SiteHeader01() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={(theme) => ({
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        ...theme.applyStyles("dark", {
          bgcolor: "grey.900",
        }),
      })}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1,
          }}
        >
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            N Banking
          </Typography>

          {/* Navigation Links - Hidden on mobile */}
          <Box
            component="nav"
            role="navigation"
            aria-label="Main navigation"
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              component="ul"
              sx={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navigationLinks.map((link) => (
                <Box component="li" key={link.label}>
                  <Link
                    href={link.href}
                    underline="none"
                    sx={(theme) => ({
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      color: "text.secondary",
                      fontWeight: 500,
                      transition: theme.transitions.create(
                        ["color", "background-color"],
                        {
                          duration: theme.transitions.duration.short,
                        }
                      ),
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: "action.hover",
                      },
                      "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: 2,
                      },
                    })}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* CTA and Support */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Open Account Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Open Account
            </Button>

            {/* Support Icon Button */}
            <IconButton
              aria-label="Contact support"
              sx={(theme) => ({
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "action.hover",
                },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                },
              })}
            >
              <SupportIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
