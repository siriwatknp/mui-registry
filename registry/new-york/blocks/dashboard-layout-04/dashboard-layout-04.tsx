"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 80;

const menuItems = [
  { label: "Home", icon: <HomeIcon />, active: true },
  { label: "Jobs", icon: <WorkIcon /> },
  { label: "Saved", icon: <BookmarkBorderIcon /> },
  { label: "Messages", icon: <ChatBubbleOutlineIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

export function DashboardLayout04() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f7f8fa" }}>
      <Drawer
        variant="permanent"
        slotProps={{
          paper: {
            sx: {
              width: drawerWidth,
              bgcolor: "#fff",
              color: "#222",
              border: 0,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            },
          },
        }}
        sx={{ width: drawerWidth, flexShrink: 0 }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Logo */}
          <Avatar
            sx={{
              bgcolor: "#2563eb",
              color: "#fff",
              width: 48,
              height: 48,
              fontWeight: 700,
              fontSize: 28,
              mb: 2,
            }}
          >
            <WorkIcon fontSize="large" />
          </Avatar>
          <Divider sx={{ bgcolor: "#e5e7eb", width: 40, mb: 2 }} />
          {/* Menu */}
          <List sx={{ p: 0, width: "100%", flex: 1 }}>
            {menuItems.map((item) => (
              <Tooltip
                key={item.label}
                title={item.label}
                placement="right"
                arrow
              >
                <ListItem
                  disablePadding
                  sx={{ justifyContent: "center", mb: 1 }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: "center",
                      borderRadius: 2,
                      bgcolor: item.active ? "#f1f5f9" : "transparent",
                      color: item.active ? "#2563eb" : "#9ca3af",
                      "&:hover": { bgcolor: "#f1f5f9", color: "#2563eb" },
                      transition: "all 0.2s",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Divider sx={{ bgcolor: "#e5e7eb", width: 40, mb: 2 }} />
          <Tooltip title="Logout" placement="right" arrow>
            <ListItem disablePadding sx={{ justifyContent: "center" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  borderRadius: 2,
                  color: "#9ca3af",
                  "&:hover": { bgcolor: "#f1f5f9", color: "#2563eb" },
                  transition: "all 0.2s",
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>
                  <LogoutIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Box>
      </Drawer>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f7f8fa",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{ bgcolor: "#fff", color: "#222", boxShadow: 1, zIndex: 1201 }}
        >
          <Toolbar
            sx={{
              minHeight: 80,
              px: 4,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#2563eb",
                  color: "#fff",
                  width: 40,
                  height: 40,
                  fontWeight: 700,
                  fontSize: 24,
                }}
              >
                <WorkIcon fontSize="medium" />
              </Avatar>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, letterSpacing: 0.5 }}
              >
                Find Job
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  boxShadow: 0,
                  bgcolor: "#f1f5f9",
                  px: 1,
                  mr: 1,
                }}
              >
                <IconButton sx={{ p: 1, color: "#2563eb" }}>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, minWidth: 120 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                />
              </Paper>
              <IconButton
                sx={{
                  color: "#2563eb",
                  bgcolor: "#f1f5f9",
                  borderRadius: 2,
                  mr: 1,
                }}
              >
                <HistoryIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "#2563eb",
                  bgcolor: "#f1f5f9",
                  borderRadius: 2,
                  mr: 1,
                }}
              >
                <NotificationsNoneIcon />
              </IconButton>
              <Avatar
                sx={{ width: 40, height: 40, ml: 1 }}
                src="https://randomuser.me/api/portraits/men/32.jpg"
              />
            </Box>
          </Toolbar>
        </AppBar>
        {/* Empty main content area for layout only */}
        <Box sx={{ flex: 1 }} />
      </Box>
    </Box>
  );
}
