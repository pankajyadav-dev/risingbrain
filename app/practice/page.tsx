"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CircleCheck,
  CircleDot,
  Circle,
  Search,
  ChevronRight,
} from "lucide-react";
import {
  practiceProblems,
  Difficulty,
  ProblemStatus,
} from "@/lib/data";
import { DifficultyBadge, PageShell, SectionHeader, Tag } from "@/components/ui";

const diffFilters: ("All" | Difficulty)[] = ["All", "Easy", "Medium", "Hard"];

const statusIcon: Record<ProblemStatus, React.ReactNode> = {
  Solved: <CircleCheck className="h-5 w-5 text-rb-green-400" />,
  Attempted: <CircleDot className="h-5 w-5 text-amber-400" />,
  Todo: <Circle className="h-5 w-5 text-white/25" />,
};

export default function PracticeListPage() {
  const [diff, setDiff] = useState<(typeof diffFilters)[number]>("All");
  const [query, setQuery] = useState("");

  const list = practiceProblems.filter((p) => {
    const okDiff = diff === "All" || p.difficulty === diff;
    const okQuery = p.title.toLowerCase().includes(query.toLowerCase());
    return okDiff && okQuery;
  });

  const solved = practiceProblems.filter((p) => p.status === "Solved").length;

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Sharpen your skills"
        title="Problem Set"
        subtitle="Pick a problem to open the coding arena — statement, editor, timer and discussion."
      />

      {/* progress + search */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="glass inline-flex items-center gap-3 rounded-2xl px-5 py-3">
          <span className="font-mono text-2xl font-bold text-rb-green-300">
            {solved}
            <span className="text-base text-white/40">
              /{practiceProblems.length}
            </span>
          </span>
          <span className="text-sm text-white/55">solved</span>
          <div className="ml-2 h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-rb-green-500"
              style={{
                width: `${(solved / practiceProblems.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="glass-pill flex items-center gap-2 rounded-2xl px-4 py-2.5">
          <Search className="h-4 w-4 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems…"
            className="w-44 bg-transparent text-sm outline-none placeholder:text-white/30"
          />
        </div>
      </div>

      {/* difficulty filter */}
      <div className="mb-5 flex flex-wrap gap-2">
        {diffFilters.map((f) => (
          <button
            key={f}
            onClick={() => setDiff(f)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              diff === f
                ? "btn-glow text-black"
                : "glass-pill text-white/70 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* problem table */}
      <div className="glass overflow-hidden rounded-3xl">
        <div className="hidden grid-cols-[44px_1fr_140px_110px_44px] items-center gap-3 border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white/40 sm:grid">
          <span>#</span>
          <span>Title</span>
          <span>Difficulty</span>
          <span className="text-right">Acceptance</span>
          <span />
        </div>

        {list.map((p, i) => (
          <Link
            key={p.id}
            href={`/practice/${p.id}`}
            className="group grid grid-cols-[44px_1fr_44px] items-center gap-3 border-b border-white/5 px-5 py-4 transition-colors last:border-0 hover:bg-white/[0.03] sm:grid-cols-[44px_1fr_140px_110px_44px]"
          >
            <span>{statusIcon[p.status ?? "Todo"]}</span>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium group-hover:text-rb-green-200">
                  {i + 1}. {p.title}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
                <span className="sm:hidden">
                  <DifficultyBadge level={p.difficulty} />
                </span>
              </div>
            </div>

            <span className="hidden sm:block">
              <DifficultyBadge level={p.difficulty} />
            </span>
            <span className="hidden text-right font-mono text-sm text-white/55 sm:block">
              {p.acceptance}
            </span>
            <ChevronRight className="h-4 w-4 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-rb-green-300" />
          </Link>
        ))}

        {list.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-white/40">
            No problems match your filters.
          </div>
        )}
      </div>
    </PageShell>
  );
}
