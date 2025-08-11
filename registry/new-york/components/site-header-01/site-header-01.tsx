"use client";

import { 
  AppBar, 
  Box, 
  Button, 
  IconButton, 
  Stack, 
  Toolbar, 
  Typography 
} from "@mui/material";
import { 
  Home as HomeIcon,
  Widgets as WidgetsIcon,
  LocalOffer as LocalOfferIcon,
  Star as StarIcon,
  AccountCircle as AccountCircleIcon
} from "@mui/icons-material";

export function SiteHeader01() {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={theme => ({
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        ...theme.applyStyles('dark', {
          bgcolor: "grey.900",
          borderColor: "grey.800",
        }),
      })}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          <Box
            sx={theme => ({
              width: 32,
              height: 32,
              bgcolor: "text.primary",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...theme.applyStyles('dark', {
                bgcolor: "primary.main",
              }),
            })}
          >
            <Typography
              variant="h6"
              sx={{
                color: "background.paper",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              N
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            Banking
          </Typography>
        </Stack>

        {/* Navigation Menu */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Button
            startIcon={<HomeIcon />}
            sx={{
              color: "text.primary",
              textTransform: "none",
              fontWeight: "normal",
            }}
          >
            Home
          </Button>
          <Button
            startIcon={<WidgetsIcon />}
            sx={{
              color: "text.primary",
              textTransform: "none",
              fontWeight: "normal",
            }}
          >
            Services
          </Button>
          <Button
            startIcon={<LocalOfferIcon />}
            sx={{
              color: "text.primary",
              textTransform: "none",
              fontWeight: "normal",
            }}
          >
            Pricing
          </Button>
          <Button
            startIcon={<StarIcon />}
            sx={{
              color: "text.primary",
              textTransform: "none",
              fontWeight: "normal",
            }}
          >
            Features
          </Button>
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              display: { xs: "none", sm: "flex" },
            }}
          >
            Open Account
          </Button>
          <IconButton
            sx={theme => ({
              bgcolor: "text.primary",
              color: "background.paper",
              width: 40,
              height: 40,
              "&:hover": {
                bgcolor: "text.secondary",
              },
              ...theme.applyStyles('dark', {
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }),
            })}
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}