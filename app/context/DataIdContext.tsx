"use client";
import React, { createContext, ReactNode } from "react";

// untuk mengirim data id ke komponen lain

const DataIdContext = createContext({});

const DataIdProvider = ({ children }: { children: ReactNode }) => {
  const [dataId, setDataId] = React.useState();
  return <DataIdContext.Provider value={{ dataId, setDataId }}>{children}</DataIdContext.Provider>;
};

export { DataIdContext, DataIdProvider };
