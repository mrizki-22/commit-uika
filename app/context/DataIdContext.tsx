"use client";
import React, { createContext, ReactNode } from "react";

// untuk mengirim data id & jenis action ke komponen lain (untuk modal dialog)

const DataIdContext = createContext({});

const DataIdProvider = ({ children }: { children: ReactNode }) => {
  const [dataId, setDataId] = React.useState();
  const [action, setAction] = React.useState();
  return <DataIdContext.Provider value={{ dataId, setDataId, action, setAction }}>{children}</DataIdContext.Provider>;
};

export { DataIdContext, DataIdProvider };
