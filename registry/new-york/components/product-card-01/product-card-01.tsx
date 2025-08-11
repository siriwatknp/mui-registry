"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export interface ProductCard01Props {
  title: string;
  brand: string;
  price: string;
  image: string;
  imageAlt?: string;
  onAddToCart?: () => void;
}

export function ProductCard01({
  title,
  brand,
  price,
  image,
  imageAlt = "",
  onAddToCart,
}: ProductCard01Props) {
  return (
    <Card sx={{ maxWidth: 320, borderRadius: 3, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height={240}
        image={image}
        alt={imageAlt || title}
        sx={{
          borderRadius: "12px 12px 0 0",
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
                mb: 0.5,
                color: "text.primary",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: 0.5,
                mb: 1,
              }}
            >
              {brand}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "text.primary",
              }}
            >
              {price}
            </Typography>
          </Box>
          <Button
            onClick={onAddToCart}
            sx={{
              borderRadius: 99,
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
