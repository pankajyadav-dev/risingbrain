"use client";

import { useState } from "react";
import { Calculator, Sigma, Check, X } from "lucide-react";
import { aptitudeTopics } from "@/lib/data";
import { PageShell, SectionHeader } from "@/components/ui";

export default function AptitudePage() {
  const [active, setActive] = useState(0);
  const topic = aptitudeTopics[active];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Sharpen your speed"
        title="Aptitude"
        subtitle="A short primer on each topic, then practice MCQs to lock it in. Click an option to reveal the answer."
      />

      {/* Topic tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {aptitudeTopics.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
              i === active
                ? "btn-glow text-black"
                : "glass-pill text-white/70 hover:text-white"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Theory */}
        <div className="glass h-fit rounded-3xl p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2 text-rb-green-300">
            <Calculator className="h-5 w-5" />
            <h2 className="text-xl font-bold text-white">{topic.title}</h2>
          </div>
          <p className="leading-relaxed text-white/70">{topic.description}</p>
          <div className="mt-5 rounded-2xl border border-rb-green-500/25 bg-rb-green-500/10 p-4">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rb-green-300">
              <Sigma className="h-4 w-4" /> Key formula
            </div>
            <p className="font-mono text-sm text-white/85">{topic.formula}</p>
          </div>
        </div>

        {/* Practice MCQs */}
        <div className="space-y-4">
          {topic.questions.map((q, qi) => (
            <McqCard key={`${topic.id}-${qi}`} q={q} index={qi} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function McqCard({
  q,
  index,
}: {
  q: { q: string; options: string[]; answer: number };
  index: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-4 flex gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-rb-green-500/15 font-mono text-sm text-rb-green-300">
          {index + 1}
        </span>
        <p className="font-medium">{q.q}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((opt, oi) => {
          const isAnswer = oi === q.answer;
          const isPicked = picked === oi;
          let cls =
            "glass-pill border-white/10 text-white/75 hover:border-rb-green-500/40";
          if (picked !== null) {
            if (isAnswer)
              cls = "border-rb-green-500/60 bg-rb-green-500/15 text-rb-green-200";
            else if (isPicked)
              cls = "border-rose-500/50 bg-rose-500/10 text-rose-200";
            else cls = "border-white/10 text-white/40";
          }
          return (
            <button
              key={oi}
              disabled={picked !== null}
              onClick={() => setPicked(oi)}
              className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm transition ${cls}`}
            >
              <span>{opt}</span>
              {picked !== null && isAnswer && (
                <Check className="h-4 w-4 text-rb-green-400" />
              )}
              {picked !== null && isPicked && !isAnswer && (
                <X className="h-4 w-4 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-3 text-sm font-medium text-rb-green-300">
          {picked === q.answer ? "Correct! Nicely done." : "Not quite — the highlighted option is right."}
        </p>
      )}
    </div>
  );
}
