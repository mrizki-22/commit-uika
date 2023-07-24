"use client";
import React, { ReactNode } from "react";

//create theme context
const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});
//create theme provider
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "night" : "light");
  };
  return React.createElement(ThemeContext.Provider, { value: { theme, toggleTheme } }, children);
};
//create theme consumer
const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
//export all
export { ThemeProvider, useTheme };
