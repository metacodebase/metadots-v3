"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/LandingLayout/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname?.startsWith("/meta-admin")) {
    return null;
  }

  return <Header />;
}
