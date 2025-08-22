import { HeaderNav } from "@/components/header-nav";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b px-6 py-3 sticky top-0 bg-background z-[9999]">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold hover:opacity-80">
          MUI+
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
