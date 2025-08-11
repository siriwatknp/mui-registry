"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";

export interface ProductCard03Props {
  title: string;
  image?: string;
  tags?: string[];
  rating?: number;
  topRated?: boolean;
  metaInfo?: string;
  description: string;
  price: string;
  onBookNow?: () => void;
  carouselIndicators?: boolean;
}

export function ProductCard03({
  title,
  image = "https://placehold.co/400x240",
  tags = [],
  rating = 0,
  topRated = false,
  metaInfo,
  description,
  price,
  onBookNow,
  carouselIndicators = true,
}: ProductCard03Props) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={title}
          sx={{ borderRadius: "12px 12px 0 0" }}
        />
        
        {/* Tags and Rating Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                }}
              />
            ))}
          </Box>
          
          {rating > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              <StarIcon sx={{ color: "#FFD700", fontSize: "1rem" }} />
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {rating}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Carousel Indicators */}
        {carouselIndicators && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.5,
            }}
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: index === 0 ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        {/* Title and Badge */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          
          {topRated && (
            <Chip
              label="Top rated"
              size="small"
              variant="outlined"
              sx={{
                borderColor: "text.secondary",
                color: "text.secondary",
                fontSize: "0.75rem",
                ml: 1,
              }}
            />
          )}
        </Box>

        {/* Meta Info */}
        {metaInfo && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.5 }}
          >
            {metaInfo}
          </Typography>
        )}

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.4,
          }}
        >
          {description}
        </Typography>

        {/* Price and Book Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            {price}
          </Typography>
          
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={onBookNow}
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: "20px",
              px: 2.5,
              py: 1,
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: "medium",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}