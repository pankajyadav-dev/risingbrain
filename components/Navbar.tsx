"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brain, Menu, X, Search } from "lucide-react";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/sheet", label: "DSA Sheets" },
  { href: "/sql", label: "SQL" },
  { href: "/aptitude", label: "Aptitude" },
  { href: "/practice", label: "Practice" },
  { href: "/contest", label: "Contests" },
  { href: "/interview", label: "Interviews" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-[var(--app-max)] items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-rb-green-500">
            <Brain className="h-5 w-5 text-black" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Rising<span className="text-rb-green-400">Brain</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-rb-green-500/15 text-rb-green-300"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button className="glass-pill hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/60 transition-colors hover:text-white sm:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="rounded-md border border-white/15 bg-black/30 px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
          <Link
            href="/login"
            className="btn-glow hidden rounded-xl px-4 py-2 text-sm font-semibold text-black sm:block"
          >
            Sign in
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="glass-pill grid h-9 w-9 place-items-center rounded-xl lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass animate-in mx-auto mt-2 max-w-[var(--app-max)] rounded-2xl p-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="btn-glow mt-1 block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-black"
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}
