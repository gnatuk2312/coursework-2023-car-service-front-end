import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";

import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
