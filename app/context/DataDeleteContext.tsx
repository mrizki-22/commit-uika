"use client";
import React, { createContext, ReactNode } from "react";

const DataDeleteContext = createContext({});

const DataDeleteProvider = ({ children }: { children: ReactNode }) => {
  const [idToDelete, setIdToDelete] = React.useState();
  return <DataDeleteContext.Provider value={{ idToDelete, setIdToDelete }}>{children}</DataDeleteContext.Provider>;
};

export { DataDeleteContext, DataDeleteProvider };
