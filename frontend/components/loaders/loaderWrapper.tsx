"use client";

import { useState, useEffect } from "react";
import MainLoader from "./mainLoader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 10000);
//     return () => clearTimeout(timer);
//   }, []);

  if (isLoading) return <MainLoader />;
  return <>{children}</>;
}
