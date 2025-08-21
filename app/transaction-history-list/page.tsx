import { PreviewComponent } from "@/components/preview-page";
import TransactionHistoryList from "@/registry/new-york/blocks/transaction-history-list/transaction-history-list";

export default function Page() {
  return (
    <PreviewComponent>
      <TransactionHistoryList />
    </PreviewComponent>
  );
}