"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeProvider";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { BiLogoBlogger } from "react-icons/bi";
import { BsFillDatabaseFill } from "react-icons/bs";
import { usePathname } from "next/navigation";

function Sidebar() {
  const { theme } = useTheme();
  const currentPath = usePathname();

  let active = "";
  if (theme === "light") {
    active = "bg-white text-neutral";
  } else {
    active = "bg-base-100 text-base-content";
  }

  return (
    <div className={`flex flex-col  fixed h-screen ${theme === "light" ? "bg-neutral text-white" : "bg-primary text-primary-content"}  lg:w-60 md:w-40 w-16 `}>
      <div className="flex items-center space-x-2 lg:justify-around justify-center w-full px-3 py-[22px]">
        <Image src="/logo-shadow.png" alt="logo" width="50" height="50" />
        <div className="flex flex-col space-y-0">
          <p className="text-xs font-semibold lg:block hidden">Community of Information Technology</p>
        </div>
      </div>

      <div>
        <Link
          href="/dashboard"
          className={`flex items-center md:justify-start justify-center space-x-2  px-3 py-3 duration-200 ${theme === "light" ? "hover:bg-white hover:text-neutral " : "hover:bg-base-100 hover:text-base-content"} ${
            currentPath === "/dashboard" ? active : ""
          } `}
        >
          <BiSolidDashboard className="text-2xl" />
          <p className="md:block hidden">Dashboard</p>
        </Link>
        <span className="text-xs text-base-200 px-4 divider divider-horizontal">Menu</span>
        <Link
          href="/admin-blog"
          className={`flex items-center md:justify-start justify-center space-x-2 px-3 py-3 duration-200 ${theme === "light" ? "hover:bg-white hover:text-neutral " : "hover:bg-base-100 hover:text-base-content"} ${
            currentPath === "/admin-blog" ? active : ""
          }`}
        >
          <BiLogoBlogger className="text-2xl" />
          <p className="md:block hidden">Blog</p>
        </Link>
        <Link
          href="/database"
          className={`flex items-center md:justify-start justify-center space-x-2 px-3 py-3 duration-200 ${theme === "light" ? "hover:bg-white hover:text-neutral " : "hover:bg-base-100 hover:text-base-content"} ${
            currentPath === "/database" ? active : ""
          }`}
        >
          <BsFillDatabaseFill className="text-2xl" />
          <p className="md:block hidden">Database</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
