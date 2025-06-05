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
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 80;

const menuItems = [
  { label: "Home", icon: <HomeIcon />, active: true },
  { label: "Courses", icon: <SchoolIcon /> },
  { label: "Messages", icon: <MailIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

export function DashboardLayout03() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f7f7fa" }}>
      <Drawer
        variant="permanent"
        slotProps={{
          paper: {
            sx: {
              width: drawerWidth,
              bgcolor: "#18181b",
              color: "#fff",
              border: 0,
              boxShadow: 3,
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
              bgcolor: "#fff",
              color: "#18181b",
              width: 48,
              height: 48,
              fontWeight: 700,
              fontSize: 28,
              mb: 2,
            }}
          >
            F
          </Avatar>
          <Divider sx={{ bgcolor: "#23232a", width: 40, mb: 2 }} />
          {/* Menu */}
          <List sx={{ p: 0, width: "100%", flex: 1 }}>
            {menuItems.map((item, idx) => (
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
                      bgcolor: item.active ? "#23232a" : "transparent",
                      color: item.active ? "#fff" : "#bdbdbd",
                      "&:hover": { bgcolor: "#23232a", color: "#fff" },
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
          <Divider sx={{ bgcolor: "#23232a", width: 40, mb: 2 }} />
          <Tooltip title="Logout" placement="right" arrow>
            <ListItem disablePadding sx={{ justifyContent: "center" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  borderRadius: 2,
                  color: "#bdbdbd",
                  "&:hover": { bgcolor: "#23232a", color: "#fff" },
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
      {/* Empty main content area for layout only */}
      <Box sx={{ flex: 1, bgcolor: "#f7f7fa" }} />
    </Box>
  );
}
