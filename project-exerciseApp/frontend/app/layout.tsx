import type { Metadata } from "next";
import "@/app/styles/globals.css";
import React from "react";
import { Providers } from "./providers";

import { ChildrenProp } from "@/app/lib/interface";

export const metadata: Metadata = {
  title: "exerciseApp",
  description: "Guide for exercise",
};

export default function RootLayout({ children }: ChildrenProp) {
  return (
    <html lang="ko" className="dark">
      <body className="flex flex-col justify-between h-[100vh] bg-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
