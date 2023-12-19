"use client";
import { ReactNode } from "react";
import { PrimeReactProvider } from "primereact/api";
const PrimeProvider = ({ children }: { children: ReactNode }) => {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
};

export default PrimeProvider;
