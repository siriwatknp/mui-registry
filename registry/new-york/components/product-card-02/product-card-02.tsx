"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export interface ProductCard02Props {
  id?: string;
  title: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  originalPrice: number;
  currentPrice: number;
  discountPercentage?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onCompare?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard02({
  id = "12345689",
  title,
  image,
  rating = 5,
  reviewCount = 97,
  originalPrice,
  currentPrice,
  discountPercentage,
  isFavorite = false,
  onFavoriteToggle,
  onCompare,
  onAddToCart,
}: ProductCard02Props) {
  return (
    <Card
      sx={theme => ({
        maxWidth: 280,
        borderRadius: 4,
        position: "relative",
        boxShadow: theme.shadows[1],
        ...theme.applyStyles('dark', {
          bgcolor: "grey.900",
        }),
      })}
    >
      {/* Product ID */}
      <Typography
        variant="caption"
        sx={theme => ({
          position: "absolute",
          top: 16,
          right: 16,
          color: "text.secondary",
          fontSize: "0.75rem",
          zIndex: 1,
          ...theme.applyStyles('dark', {
            color: "grey.400",
          }),
        })}
      >
        id: {id}
      </Typography>

      {/* Product Image Container */}
      <Box
        sx={{
          position: "relative",
          p: 3,
          pt: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Product Image */}
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            maxWidth: 160,
            height: "auto",
            aspectRatio: "1",
            objectFit: "contain",
            borderRadius: 2,
          }}
        />

        {/* Action Icons */}
        <Box
          sx={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={onCompare}
            sx={theme => ({
              bgcolor: "primary.main",
              color: "white",
              width: 36,
              height: 36,
              "&:hover": {
                bgcolor: "primary.dark",
              },
              ...theme.applyStyles('dark', {
                bgcolor: "primary.main",
              }),
            })}
          >
            <CompareArrowsIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={onFavoriteToggle}
            sx={theme => ({
              bgcolor: "grey.800",
              color: "white",
              width: 36,
              height: 36,
              "&:hover": {
                bgcolor: "grey.700",
              },
              ...theme.applyStyles('dark', {
                bgcolor: "grey.700",
                "&:hover": {
                  bgcolor: "grey.600",
                },
              }),
            })}
          >
            {isFavorite ? (
              <FavoriteIcon fontSize="small" sx={{ color: "error.main" }} />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ pt: 0, pb: 3 }}>
        {/* Product Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: "1.125rem",
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        {/* Rating and Reviews */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{
              fontSize: "1rem",
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ChatBubbleOutlineIcon
              sx={theme => ({
                fontSize: "0.875rem",
                color: "text.secondary",
                ...theme.applyStyles('dark', {
                  color: "grey.400",
                }),
              })}
            />
            <Typography
              variant="caption"
              sx={theme => ({
                color: "text.secondary",
                fontSize: "0.875rem",
                ...theme.applyStyles('dark', {
                  color: "grey.400",
                }),
              })}
            >
              {reviewCount}
            </Typography>
          </Box>
        </Box>

        {/* Pricing */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              variant="body2"
              sx={theme => ({
                textDecoration: "line-through",
                color: "text.secondary",
                fontSize: "0.875rem",
                ...theme.applyStyles('dark', {
                  color: "grey.400",
                }),
              })}
            >
              ${originalPrice.toFixed(2)}
            </Typography>
            {discountPercentage && (
              <Typography
                variant="caption"
                sx={theme => ({
                  color: "error.main",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  ...theme.applyStyles('dark', {
                    color: "error.light",
                  }),
                })}
              >
                -{discountPercentage}%
              </Typography>
            )}
          </Box>
          <Typography
            variant="h4"
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: "2rem",
              lineHeight: 1,
            }}
          >
            ${currentPrice.toFixed(2)}
          </Typography>
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={onAddToCart}
          sx={{
            borderRadius: 3,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
          }}
          startIcon={<ShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}