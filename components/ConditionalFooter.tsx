"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

// Full-screen IDE-style and auth pages don't show the footer.
// Auth pages are exact matches. The live arenas are prefix matches
// (/contest/<id>, /practice/<id>) — but NOT the dashboard list pages.
const HIDE_EXACT = ["/login", "/signup"];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const inArena =
    pathname.startsWith("/contest/") || pathname.startsWith("/practice/");
  if (HIDE_EXACT.includes(pathname) || inArena) return null;
  return <Footer />;
}
