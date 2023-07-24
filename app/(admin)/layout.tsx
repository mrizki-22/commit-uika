"use client";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import HeaderAdmin from "../components/HeaderAdmin";
import { redirect } from "next/navigation";
import { Poppins } from "next/font/google";
import { useTheme } from "../context/ThemeProvider";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata = {
  title: "Admin | Commit UIKA",
  description: "Dashboard Admin UKM Community Of Information Technology (COMMIT) Universitas Ibn Khaldun Bogor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // redirect to auth/signin if not logged in
  const { data: session, status } = useSession();

  const { theme } = useTheme();

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  return (
    <html lang="en" data-theme={theme}>
      <body className={poppins.className}>
        <Sidebar />
        <div className="lg:ml-60 md:ml-40 ml-16">
          <div className="">
            <HeaderAdmin />
          </div>
          <div className="p-3">{children}</div>
        </div>
      </body>
    </html>
  );
}
