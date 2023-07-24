import "./globals.css";
import { Poppins } from "next/font/google";
import NextAuthProvider from "./context/NextAuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata = {
  title: "Commit UIKA | Community Of Information Technology",
  description: "UKM Community Of Information Technology (COMMIT) Universitas Ibn Khaldun Bogor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ThemeProvider>
        <html lang="en">
          <body className={poppins.className}>{children}</body>
        </html>
      </ThemeProvider>
    </NextAuthProvider>
  );
}
