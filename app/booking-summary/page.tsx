import { BookingSummary } from "@/registry/new-york/components/booking-summary/booking-summary";

export default function BookingSummaryPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <BookingSummary />
    </div>
  );
}
