import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ProductCard02 } from "../../registry/new-york/components/product-card-02/product-card-02";

export default function ProductCard02Demo() {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        Product Card 02 Demo
      </Typography>
      
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <ProductCard02
          title="Apple iPhone 15 Pro"
          image="https://placehold.co/400x400/f5f5f5/666666?text=iPhone+15+Pro"
          originalPrice={999.00}
          currentPrice={899.00}
          discountPercentage={10}
          rating={5}
          reviewCount={97}
          isFavorite={isFavorite}
          onFavoriteToggle={() => setIsFavorite(!isFavorite)}
          onCompare={() => console.log("Compare clicked")}
          onAddToCart={() => console.log("Add to cart clicked")}
        />
      </Box>
    </Container>
  );
}