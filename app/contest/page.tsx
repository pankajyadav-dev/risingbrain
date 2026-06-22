"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  Users,
  CalendarClock,
  ArrowRight,
  BellPlus,
  BarChart3,
  Radio,
} from "lucide-react";
import { contests, Contest, ContestStatus } from "@/lib/data";
import { DifficultyBadge, PageShell, SectionHeader } from "@/components/ui";

const filters: ("All" | ContestStatus)[] = ["All", "Live", "Upcoming", "Ended"];

export default function ContestDashboard() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list =
    filter === "All" ? contests : contests.filter((c) => c.status === filter);
  const live = contests.filter((c) => c.status === "Live").length;

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Compete & climb the ranks"
        title="Contests"
        subtitle="Timed, rated rounds with a live leaderboard. Pick a contest to enter the arena."
      />

      {/* Stat strip */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            { label: "Live now", val: String(live), Icon: Radio },
            { label: "This week", val: "3", Icon: CalendarClock },
            { label: "Total hosted", val: "180+", Icon: Trophy },
            { label: "Your best rank", val: "#42", Icon: BarChart3 },
          ] as const
        ).map(({ label, val, Icon }) => (
          <div key={label} className="glass rounded-2xl px-5 py-4">
            <Icon className="mb-2 h-5 w-5 text-rb-green-300" />
            <div className="text-2xl font-bold text-rb-green-200">{val}</div>
            <div className="text-xs text-white/50">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "btn-glow text-black"
                : "glass-pill text-white/70 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {list.map((c) => (
          <ContestCard key={c.id} contest={c} />
        ))}
      </div>
    </PageShell>
  );
}

const statusStyle: Record<ContestStatus, string> = {
  Live: "text-rb-green-300 bg-rb-green-500/15 border-rb-green-500/40",
  Upcoming: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  Ended: "text-white/50 bg-white/5 border-white/15",
};

function ContestCard({ contest: c }: { contest: Contest }) {
  return (
    <div className="glass glass-hover flex flex-col rounded-3xl p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400/90 to-rb-green-600 text-black">
            <Trophy className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-semibold leading-tight">{c.name}</h3>
            <p className="text-xs text-white/50">{c.when}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusStyle[c.status]}`}
        >
          {c.status === "Live" && (
            <span className="h-1.5 w-1.5 rounded-full bg-rb-green-400 pulse-ring" />
          )}
          {c.status}
        </span>
      </div>

      <p className="mb-5 text-sm text-white/60">{c.blurb}</p>

      <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-white/55">
        <span className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4" /> {c.problems} problems
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {c.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" /> {c.participants.toLocaleString()}
        </span>
        <DifficultyBadge level={c.difficulty} />
      </div>

      <div className="mt-auto">
        {c.status === "Live" && (
          <Link
            href={`/contest/${c.id}`}
            className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black"
          >
            Enter Arena <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        {c.status === "Upcoming" && (
          <button className="glass glass-hover inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-rb-green-200">
            <BellPlus className="h-4 w-4" /> Register
          </button>
        )}
        {c.status === "Ended" && (
          <Link
            href={`/contest/${c.id}`}
            className="glass-pill inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white/70 hover:text-white"
          >
            <BarChart3 className="h-4 w-4" /> View Leaderboard
          </Link>
        )}
      </div>
    </div>
  );
}
