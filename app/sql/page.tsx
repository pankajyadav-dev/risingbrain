"use client";

import { useState } from "react";
import { Database, Lightbulb, Terminal, Copy, Check } from "lucide-react";
import { sqlProblems } from "@/lib/data";
import { DifficultyBadge, PageShell, SectionHeader, Tag } from "@/components/ui";

export default function SqlPage() {
  const [active, setActive] = useState(0);
  const p = sqlProblems[active];
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(p.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Query like a pro"
        title="SQL Queries"
        subtitle="Each problem comes with a plain-English description, the best approach, and a clean, copy-ready query."
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Problem list */}
        <aside className="space-y-2">
          {sqlProblems.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setActive(i)}
              className={`glass glass-hover w-full rounded-2xl p-4 text-left ${
                i === active ? "border-rb-green-500/50" : ""
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-rb-green-300" />
                <span className="font-semibold">{q.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <DifficultyBadge level={q.difficulty} />
                {q.tags.slice(0, 1).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </button>
          ))}
        </aside>

        {/* Detail */}
        <div className="space-y-5">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <h2 className="mr-2 text-2xl font-bold">{p.title}</h2>
              <DifficultyBadge level={p.difficulty} />
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <p className="leading-relaxed text-white/70">{p.description}</p>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 text-amber-300">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-semibold">Best Approach</h3>
            </div>
            <p className="leading-relaxed text-white/70">{p.approach}</p>
          </div>

          <div className="glass overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2 text-rb-green-300">
                <Terminal className="h-4 w-4" />
                <span className="font-mono text-sm">solution.sql</span>
              </div>
              <button
                onClick={copy}
                className="glass-pill inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-white/70 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-rb-green-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto bg-black/40 p-5 font-mono text-sm leading-relaxed text-rb-green-100">
              <code className="text-rb-green-200">{p.query}</code>
            </pre>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
