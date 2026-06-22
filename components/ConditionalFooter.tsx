"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

// Full-screen IDE-style and auth pages don't show the footer.
// Exact matches: practice + auth pages. Prefix match: the live contest arena
// (/contest/<id>) — but NOT the /contest dashboard itself.
const HIDE_EXACT = ["/practice", "/login", "/signup"];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const inArena = pathname.startsWith("/contest/"); // arena, not the dashboard
  if (HIDE_EXACT.includes(pathname) || inArena) return null;
  return <Footer />;
}
