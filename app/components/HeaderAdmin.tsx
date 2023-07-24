import React from "react";
import { FiLogOut } from "react-icons/fi";
import { BiSun, BiMoon } from "react-icons/bi";
import { useTheme } from "../context/ThemeProvider";
import { signOut } from "next-auth/react";

export default function HeaderAdmin() {
  const { theme, toggleTheme } = useTheme();

  let date = getFormattedDate();

  return (
    // <nav className="fixed w-full">
    <div className={` ${theme === "light" ? "bg-white" : ""} w-full drop-shadow-lg px-3 py-4 flex justify-between text-base-content`}>
      <div className="items-center flex">
        <p className="leading-none">{date}</p>
      </div>
      <div className="flex">
        <div className="flex items-center tooltip tooltip-left" data-tip={`${theme === "light" ? "Dark mode" : "Light mode"}`}>
          <label className="swap swap-rotate">
            <input type="checkbox" id="swap" onChange={toggleTheme} checked={theme === "night" ? true : false} />
            <BiSun className="swap-on fill-current w-7 h-7" />
            <BiMoon className="swap-off fill-current w-7 h-7" />
          </label>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex items-center">
          <div className="tooltip tooltip-left" data-tip="Logout">
            <button className="btn btn-ghost btn-circle" onClick={() => signOut()}>
              <FiLogOut className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
    // </nav>
  );
}

function getFormattedDate() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const currentDate = new Date();
  const dayOfWeek = days[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  return formattedDate;
}
