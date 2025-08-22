"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";

// Generate mock data for the chart
const generateData = () => {
  const dates = [];
  const etfData = [];
  const vitainvestData = [];
  const ishareData = [];
  
  // Generate dates from Aug 25 to Sep 26
  const startDate = new Date(2024, 7, 25); // August 25
  const endDate = new Date(2024, 8, 26); // September 26
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(d.getDate());
    
    // Generate realistic portfolio values with more variation
    const dayIndex = dates.length - 1;
    const baseETF = 95000 + Math.sin(dayIndex * 0.3) * 8000 + Math.random() * 3000;
    const baseVita = 85000 + Math.sin(dayIndex * 0.2) * 7000 + dayIndex * 800 + Math.random() * 2500;
    const baseIshare = 115000 - dayIndex * 500 + Math.sin(dayIndex * 0.25) * 10000 + Math.random() * 4000;
    
    etfData.push(baseETF);
    vitainvestData.push(baseVita);
    ishareData.push(baseIshare);
  }
  
  return { dates, etfData, vitainvestData, ishareData };
};

const { dates, etfData, vitainvestData, ishareData } = generateData();

// Format x-axis labels
const xAxisData = dates.map((_, index) => {
  if (index === 0) return "Aug 25";
  if (index === 4) return "Aug 29";
  if (index === 8) return "Sep 02";
  if (index === 12) return "Sep 06";
  if (index === 16) return "Sep 10";
  if (index === 20) return "Sep 14";
  if (index === 24) return "Sep 18";
  if (index === 28) return "Sep 22";
  if (index === 32) return "Sep 26";
  return "";
});

export default function PortfolioValueChart() {
  return (
    <Card
      sx={theme => ({
        p: 3,
        borderRadius: 2,
        border: `1px solid`,
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: "none",
        ...theme.applyStyles("dark", {
          borderColor: "divider",
        }),
      })}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            Portfolio Value
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            $328,505.10
          </Typography>
        </Box>

        <Stack 
          direction="row" 
          spacing={2.5} 
          sx={{ px: 1 }}
          role="list"
          aria-label="Portfolio legend"
        >
          <Stack direction="row" spacing={1} alignItems="center" role="listitem">
            <Box
              sx={{
                width: 24,
                height: 3,
                bgcolor: "#2196F3",
                borderRadius: 1,
              }}
              aria-hidden="true"
            />
            <Typography variant="body2" color="text.secondary">
              ETF Shares Vital
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" role="listitem">
            <Box
              sx={{
                width: 24,
                height: 3,
                bgcolor: "#00BCD4",
                borderRadius: 1,
              }}
              aria-hidden="true"
            />
            <Typography variant="body2" color="text.secondary">
              Vitainvest Core
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" role="listitem">
            <Box
              sx={{
                width: 24,
                height: 3,
                bgcolor: "#9C27B0",
                borderRadius: 1,
              }}
              aria-hidden="true"
            />
            <Typography variant="body2" color="text.secondary">
              iShares Tech Growth
            </Typography>
          </Stack>
        </Stack>

        <Box 
          sx={{ width: "100%", height: 350 }}
          role="img"
          aria-label="Portfolio performance chart showing ETF Shares Vital, Vitainvest Core, and iShares Tech Growth from August 25 to September 26"
        >
          <LineChart
            series={[
              {
                data: etfData,
                color: "#2196F3",
                curve: "catmullRom",
                showMark: false,
              },
              {
                data: vitainvestData,
                color: "#00BCD4",
                curve: "catmullRom",
                showMark: false,
              },
              {
                data: ishareData,
                color: "#9C27B0",
                curve: "catmullRom",
                showMark: false,
              },
            ]}
            xAxis={[
              {
                data: dates,
                scaleType: "point",
                tickLabelStyle: {
                  fontSize: 12,
                  fill: "var(--mui-palette-text-secondary)",
                },
                tickNumber: 9,
                valueFormatter: (value) => {
                  const index = dates.indexOf(value);
                  return xAxisData[index] || "";
                },
              },
            ]}
            yAxis={[
              {
                position: "none",
                width: 0,
              },
            ]}
            margin={{
              left: 10,
              right: 10,
              top: 30,
              bottom: 40,
            }}
            height={350}
            grid={{
              horizontal: true,
              vertical: false,
            }}
            sx={theme => ({
              "& .MuiChartsAxis-line": {
                stroke: "var(--mui-palette-divider)",
                strokeOpacity: 0.3,
              },
              "& .MuiChartsAxis-tick": {
                stroke: "var(--mui-palette-divider)",
                strokeOpacity: 0.3,
              },
              "& .MuiChartsGrid-line": {
                stroke: "var(--mui-palette-divider)",
                strokeOpacity: 0.15,
              },
              "& .MuiLineElement-root": {
                strokeWidth: 2,
              },
              ...theme.applyStyles("dark", {
                "& .MuiChartsAxis-line": {
                  strokeOpacity: 0.2,
                },
                "& .MuiChartsAxis-tick": {
                  strokeOpacity: 0.2,
                },
                "& .MuiChartsGrid-line": {
                  strokeOpacity: 0.1,
                },
              }),
            })}
          />
        </Box>
      </Stack>
    </Card>
  );
}