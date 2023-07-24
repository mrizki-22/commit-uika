"use client";
import { useTheme } from "../context/ThemeProvider";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <html lang="en" data-theme={theme}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
