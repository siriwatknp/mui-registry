import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

/**
 * Use this layout in your app/layout.tsx file to enable MUI Next.js App Router integration.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider
          options={{
            enableCssLayer: true,
          }}
        >
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
