"use client";

import Nav from "../components/Nav";
import { useTheme } from "../context/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    // <ThemeProvider>
    <html lang="en" data-theme={theme}>
      <body>
        <Nav />

        <div className="lg:px-30 md:px-20 px-5">{children}</div>
      </body>
    </html>
    // </ThemeProvider>
  );
}
