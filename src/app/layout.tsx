"use client";
import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { setDefaultOptions } from "date-fns";
import { uk } from "date-fns/locale";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/common/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
setDefaultOptions({ locale: uk });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
      <AuthProvider>
        <html lang="en">
          <body
            className={inter.className}
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CssBaseline />
            <Navigation />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </LocalizationProvider>
  );
}
