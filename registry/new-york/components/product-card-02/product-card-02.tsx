"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Badge from "@mui/material/Badge";
import BalanceIcon from "@mui/icons-material/Balance";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";

export interface ProductCard02Props {
  id?: string;
  title?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  discountPercent?: number;
  finalPrice?: number;
  isFavorited?: boolean;
  onFavoriteToggle?: (favorited: boolean) => void;
  onCompare?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard02({
  id = "12345689",
  title = "Apple iPhone 15 Pro",
  image,
  rating = 5,
  reviewCount = 97,
  originalPrice = 999.00,
  discountPercent = 10,
  finalPrice = 899.00,
  isFavorited = false,
  onFavoriteToggle,
  onCompare,
  onAddToCart,
}: ProductCard02Props) {
  const [favorited, setFavorited] = React.useState(isFavorited);

  const handleFavoriteClick = () => {
    const newFavorited = !favorited;
    setFavorited(newFavorited);
    onFavoriteToggle?.(newFavorited);
  };

  return (
    <Card
      sx={{
        maxWidth: 280,
        borderRadius: 3,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        overflow: "visible",
        position: "relative",
      }}
    >
      {/* Product ID */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "text.secondary",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          backdropFilter: "blur(4px)",
          zIndex: 1,
        }}
      >
        id: {id}
      </Typography>

      {/* Product Image with Action Icons */}
      <Box sx={{ position: "relative", p: 2, pt: 3 }}>
        <Box
          component="img"
          src={image || "https://placehold.co/240x280"}
          alt={title}
          sx={{
            width: "100%",
            height: 280,
            objectFit: "cover",
            borderRadius: 2,
            backgroundColor: "grey.100",
          }}
        />
        
        {/* Action Icons */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={onCompare}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(4px)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
            }}
          >
            <BalanceIcon fontSize="small" />
          </IconButton>
          
          <IconButton
            size="small"
            onClick={handleFavoriteClick}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(4px)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
            }}
          >
            {favorited ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ pt: 0, pb: 1 }}>
        {/* Product Title */}
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontSize: "1.1rem",
            fontWeight: 600,
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
            sx={{ fontSize: "1rem" }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CommentIcon
              fontSize="small"
              sx={{ color: "text.secondary", fontSize: "16px" }}
            />
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              {reviewCount}
            </Typography>
          </Box>
        </Box>

        {/* Pricing */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.5 }}>
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "text.secondary",
                fontSize: "0.9rem",
              }}
            >
              ${originalPrice.toFixed(2)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "error.main",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              -{discountPercent}%
            </Typography>
          </Box>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: "1.8rem",
              color: "text.primary",
            }}
          >
            ${finalPrice.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={onAddToCart}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            py: 1.2,
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}