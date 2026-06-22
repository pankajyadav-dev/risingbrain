"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleCheck,
  Circle,
  Filter,
  ExternalLink,
} from "lucide-react";
import {
  sweSheet,
  lastMin100,
  SheetGroup,
} from "@/lib/data";
import { DifficultyBadge, PageShell, SectionHeader } from "@/components/ui";

const sheets = {
  swe: { label: "SWE Sheet", data: sweSheet, blurb: "The complete pattern-wise roadmap." },
  lastmin: { label: "Last Minute 100", data: lastMin100, blurb: "Crash revision for the night before." },
};

export default function SheetPage() {
  const [active, setActive] = useState<keyof typeof sheets>("swe");
  const groups = sheets[active].data;

  return (
    <PageShell>
      <SectionHeader
        eyebrow="RB Sheet for DSA Mastery"
        title="DSA Sheets"
        subtitle="Learn reusable patterns, not random problems. Track your solved count as you go."
      />

      {/* Sheet toggle */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="glass inline-flex rounded-2xl p-1">
          {(Object.keys(sheets) as (keyof typeof sheets)[]).map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition-colors ${
                active === k
                  ? "btn-glow text-black"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {sheets[k].label}
            </button>
          ))}
        </div>
        <button className="glass-pill inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/70">
          <Filter className="h-4 w-4" /> Difficulty · Topic
        </button>
      </div>

      <p className="mb-6 text-sm text-white/45">{sheets[active].blurb}</p>

      <div className="space-y-4">
        {groups.map((group, i) => (
          <TopicGroup key={group.topic} group={group} defaultOpen={i === 0} />
        ))}
      </div>
    </PageShell>
  );
}

function TopicGroup({
  group,
  defaultOpen,
}: {
  group: SheetGroup;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  const total = group.patterns.reduce((s, p) => s + p.problems.length, 0);
  const done = group.patterns.reduce(
    (s, p) => s + p.problems.filter((x) => x.done).length,
    0
  );
  const pct = Math.round((done / total) * 100);

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">{group.topic}</span>
          <span className="glass-pill rounded-full px-2.5 py-0.5 font-mono text-xs text-rb-green-300">
            {done}/{total}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-white/10 sm:block">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rb-green-500 to-rb-green-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <ChevronDown
            className={`h-5 w-5 text-white/50 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/8 px-4 pb-5 pt-4 sm:px-6">
          {group.patterns.map((pat) => (
            <div key={pat.name}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <h4 className="font-semibold text-rb-green-300">{pat.name}</h4>
                <span className="font-mono text-xs text-white/40">
                  {pat.problems.filter((p) => p.done).length}/
                  {pat.problems.length}
                </span>
              </div>
              <p className="mb-3 text-sm text-white/50">{pat.blurb}</p>
              <ul className="space-y-1.5">
                {pat.problems.map((p) => (
                  <li
                    key={p.name}
                    className="glass-pill flex items-center justify-between rounded-xl px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      {p.done ? (
                        <CircleCheck className="h-4 w-4 text-rb-green-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-white/25" />
                      )}
                      <span
                        className={`text-sm ${
                          p.done ? "text-white/45 line-through" : "text-white/85"
                        }`}
                      >
                        {p.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DifficultyBadge level={p.difficulty} />
                      <ExternalLink className="h-3.5 w-3.5 text-white/30" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
