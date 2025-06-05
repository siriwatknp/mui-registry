"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DescriptionIcon from "@mui/icons-material/Description";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SettingsIcon from "@mui/icons-material/Settings";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const drawerWidth = 260;

const navItems = [
  { label: "Home", icon: <HomeIcon />, active: true },
  { label: "Visitors", icon: <PeopleIcon />, badge: true },
  { label: "Analytics", icon: <BarChartIcon /> },
  { label: "Customer Service", icon: <SupportAgentIcon /> },
  { label: "Reports", icon: <DescriptionIcon /> },
  { label: "Billing", icon: <CreditCardIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

export function DashboardLayout02() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#181c23" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#181c23",
            color: "#fff",
            border: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 0,
          },
        }}
        slotProps={{
          paper: { elevation: 0 },
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", height: 80, px: 3 }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#23272f",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
            </Box>
          </Box>
          {/* Navigation */}
          <List sx={{ flex: 1, mt: 2 }}>
            {navItems.map((item, idx) => (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={item.active}
                  sx={{
                    mx: 2,
                    borderRadius: 2,
                    bgcolor: item.active ? "#23272f" : "transparent",
                    color: item.active ? "#fff" : "#b0b4ba",
                    "&:hover": { bgcolor: "#23272f" },
                    minHeight: 44,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: item.active ? "#fff" : "#b0b4ba",
                      minWidth: 36,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: item.active ? 600 : 400,
                          fontSize: 16,
                        },
                      },
                    }}
                  />
                  {item.badge && (
                    <FiberManualRecordIcon
                      sx={{ color: "#4ade80", fontSize: 14, ml: 1 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        {/* User Profile */}
        <Box sx={{ px: 3, py: 2, bgcolor: "#181c23" }}>
          <Divider sx={{ bgcolor: "#23272f", mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Watson"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box>
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontWeight: 500, fontSize: 15 }}
              >
                Jane Watson
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#b0b4ba", fontSize: 13 }}
              >
                jane.watson@mydesk.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
      {/* Main content placeholder (empty) */}
      <Box sx={{ flex: 1, p: 1 }}>
        <Box sx={{ bgcolor: "#f5f6fa", height: "100%", borderRadius: 2 }}></Box>
      </Box>
    </Box>
  );
}
