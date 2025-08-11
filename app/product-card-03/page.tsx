import { ProductCard03 } from "@/registry/new-york/components/product-card-03/product-card-03";

export default function ProductCard03Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ProductCard03
        title="Petra, Jordan"
        image="https://placehold.co/400x240/8B4513/FFFFFF?text=Ancient+Monuments"
        tags={["Adventure", "Ancient Monuments"]}
        rating={4.8}
        topRated={true}
        metaInfo="May 1 · 6 · Business host"
        description="A lost city carved in rose-colored stone, hidden in majestic desert canyons."
        price="$139 / night"
        onBookNow={() => alert("Book Now clicked!")}
      />
    </div>
  );
}