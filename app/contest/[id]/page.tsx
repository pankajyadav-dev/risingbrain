"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Trophy,
  Send,
  Play,
  AlarmClock,
  Crown,
  Medal,
  Lock,
  CircleCheck,
  Users,
  ChevronLeft,
} from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import ProblemStatement from "@/components/ProblemStatement";
import { contestProblems, leaderboard, contests } from "@/lib/data";

export default function ContestArenaPage() {
  const params = useParams<{ id: string }>();
  const meta = contests.find((c) => c.id === params.id);
  const contestName = meta?.name ?? "Live Contest";

  const problem = contestProblems[0];
  const [code, setCode] = useState(problem.starter);
  const [view, setView] = useState<"problem" | "leaderboard">("problem");
  const [submitted, setSubmitted] = useState(false);
  // strict countdown — starts at 45:00
  const [left, setLeft] = useState(45 * 60);

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [left]);

  const danger = left < 5 * 60;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="flex h-[calc(100dvh-var(--nav-h))] flex-col gap-4 px-3 pb-3 pt-3 sm:px-5">
      {/* Strict contest header bar */}
      <div className="glass flex shrink-0 flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/contest"
            className="glass-pill grid h-9 w-9 place-items-center rounded-xl text-white/60 hover:text-white"
            title="Back to contests"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-rb-green-600 text-black">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-bold leading-tight">{contestName}</h1>
            <p className="text-xs text-white/50">
              {meta?.problems ?? 4} problems · Live · No discussion until contest
              ends
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 text-sm text-white/50 md:flex">
            <Users className="h-4 w-4" /> {(meta?.participants ?? 1284).toLocaleString()} competing
          </div>
          <div
            className={`glass-pill inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-mono text-lg font-semibold ${
              danger ? "text-rose-300 pulse-ring" : "text-rb-green-300"
            }`}
          >
            <AlarmClock className="h-5 w-5" />
            {mm}:{ss}
          </div>
          <div className="glass inline-flex overflow-hidden rounded-2xl p-1">
            <button
              onClick={() => setView("problem")}
              className={`rounded-xl px-4 py-1.5 text-sm font-medium transition ${
                view === "problem" ? "btn-glow text-black" : "text-white/60"
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setView("leaderboard")}
              className={`rounded-xl px-4 py-1.5 text-sm font-medium transition ${
                view === "leaderboard" ? "btn-glow text-black" : "text-white/60"
              }`}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      {view === "leaderboard" ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Leaderboard />
        </div>
      ) : (
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Problem panel */}
          <div className="glass flex min-h-0 flex-col overflow-hidden rounded-2xl">
            <div className="flex shrink-0 items-center gap-2 border-b border-white/10 p-3">
              {contestProblems.map((p, i) => (
                <span
                  key={p.id}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
                    i === 0
                      ? "bg-rb-green-500/15 text-rb-green-300"
                      : "glass-pill text-white/35"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
              ))}
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className="glass-pill inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm text-white/30"
                >
                  <Lock className="h-3 w-3" /> {String.fromCharCode(65 + n)}
                </span>
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <ProblemStatement problem={problem} />
            </div>
          </div>

          {/* Editor column — fills the screen */}
          <div className="flex min-h-0 flex-col gap-3">
            <div className="glass flex shrink-0 items-center justify-between rounded-2xl px-4 py-2.5">
              <span className="font-mono text-sm text-white/60">contest.js</span>
              <span className="text-xs text-amber-300/80">
                ⚠ Strict mode · tab-switch is logged
              </span>
            </div>

            <div className="glass min-h-0 flex-1 overflow-hidden rounded-2xl">
              <CodeEditor value={code} onChange={setCode} />
            </div>

            {submitted && (
              <div className="glass inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm text-rb-green-300">
                <CircleCheck className="h-5 w-5" /> Accepted · +100 points · rank
                updated on the leaderboard
              </div>
            )}

            <div className="flex shrink-0 items-center justify-between gap-3">
              <span className="text-xs text-white/40">
                Language: JavaScript (Node 20)
              </span>
              <div className="flex items-center gap-3">
                <button className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold">
                  <Play className="h-4 w-4" /> Run
                </button>
                <button
                  onClick={() => setSubmitted(true)}
                  className="btn-glow inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-semibold text-black"
                >
                  <Send className="h-4 w-4" /> Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Leaderboard() {
  const medal = [
    <Crown key="1" className="h-4 w-4 text-amber-300" />,
    <Medal key="2" className="h-4 w-4 text-white/70" />,
    <Medal key="3" className="h-4 w-4 text-amber-600" />,
  ];
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="grid grid-cols-[60px_1fr_90px_120px_90px] gap-2 border-b border-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/45">
        <span>Rank</span>
        <span>User</span>
        <span className="text-center">Solved</span>
        <span className="text-center">Penalty</span>
        <span className="text-right">Score</span>
      </div>
      {leaderboard.map((row) => {
        const you = row.user === "you";
        return (
          <div
            key={row.rank}
            className={`grid grid-cols-[60px_1fr_90px_120px_90px] items-center gap-2 border-b border-white/5 px-6 py-3.5 text-sm transition-colors ${
              you ? "bg-rb-green-500/10" : "hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-1.5 font-mono">
              {row.rank <= 3 ? medal[row.rank - 1] : null}
              {row.rank}
            </span>
            <span className={`font-medium ${you ? "text-rb-green-300" : ""}`}>
              {row.user}
              {you && (
                <span className="ml-2 rounded-full bg-rb-green-500/20 px-2 py-0.5 text-xs">
                  you
                </span>
              )}
            </span>
            <span className="text-center font-mono text-rb-green-200">
              {row.solved}
            </span>
            <span className="text-center font-mono text-white/55">
              {row.penalty}
            </span>
            <span className="text-right font-mono font-semibold text-rb-green-300">
              {row.score}
            </span>
          </div>
        );
      })}
    </div>
  );
}
