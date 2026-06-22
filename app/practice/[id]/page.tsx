"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Play,
  Send,
  RotateCcw,
  Timer as TimerIcon,
  CircleCheck,
  MessageSquare,
  FileText,
  ThumbsUp,
  ChevronLeft,
} from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import ProblemStatement from "@/components/ProblemStatement";
import { practiceProblems, discussion } from "@/lib/data";

type Tab = "description" | "discussion";
type Result = null | "running" | "passed";

export default function ProblemEditorPage() {
  const params = useParams<{ id: string }>();
  const problem = practiceProblems.find((p) => p.id === params.id);

  const [code, setCode] = useState(problem?.starter ?? "");
  const [tab, setTab] = useState<Tab>("description");
  const [result, setResult] = useState<Result>(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  if (!problem) return notFound();

  const submit = () => {
    setResult("running");
    setTab("description");
    setTimeout(() => setResult("passed"), 1300);
  };

  return (
    <div className="flex h-[calc(100dvh-var(--nav-h))] flex-col gap-3 px-3 pb-3 pt-3 sm:px-5">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/practice"
            className="glass-pill inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/65 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" /> Problems
          </Link>
          <h1 className="font-semibold">{problem.title}</h1>
        </div>
        <Timer
          seconds={seconds}
          running={running}
          onToggle={() => setRunning((r) => !r)}
        />
      </div>

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
        {/* LEFT: statement / discussion */}
        <div className="glass flex min-h-0 flex-col overflow-hidden rounded-2xl">
          <div className="flex shrink-0 gap-1 border-b border-white/10 p-2">
            <TabButton
              active={tab === "description"}
              onClick={() => setTab("description")}
              icon={FileText}
              label="Description"
            />
            <TabButton
              active={tab === "discussion"}
              onClick={() => setTab("discussion")}
              icon={MessageSquare}
              label={`Discussion (${discussion.length})`}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            {tab === "description" ? (
              <ProblemStatement problem={problem} />
            ) : (
              <Discussion />
            )}
          </div>
        </div>

        {/* RIGHT: editor + console */}
        <div className="flex min-h-0 flex-col gap-3">
          <div className="glass flex shrink-0 items-center justify-between rounded-2xl px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-white/60">solution.js</span>
              <button
                onClick={() => setCode(problem.starter)}
                className="glass-pill inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-white/60 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
            <span className="text-xs text-white/40">JavaScript (Node 20)</span>
          </div>

          <div className="glass min-h-0 flex-1 overflow-hidden rounded-2xl">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          <ResultPanel result={result} time={seconds} />

          <div className="flex shrink-0 items-center justify-end gap-3">
            <button
              onClick={submit}
              className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold"
            >
              <Play className="h-4 w-4" /> Run
            </button>
            <button
              onClick={submit}
              className="btn-glow inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-semibold text-black"
            >
              <Send className="h-4 w-4" /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
        active ? "bg-rb-green-500/15 text-rb-green-300" : "text-white/55 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function Timer({
  seconds,
  running,
  onToggle,
}: {
  seconds: number;
  running: boolean;
  onToggle: () => void;
}) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <button
      onClick={onToggle}
      className="glass-pill inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-sm text-rb-green-300"
      title={running ? "Pause timer" : "Resume timer"}
    >
      <TimerIcon className="h-4 w-4" />
      {mm}:{ss}
    </button>
  );
}

function ResultPanel({ result, time }: { result: Result; time: number }) {
  if (result === null)
    return (
      <div className="glass shrink-0 rounded-2xl px-5 py-4 text-sm text-white/45">
        Run or submit your code to see results here.
      </div>
    );
  if (result === "running")
    return (
      <div className="glass shrink-0 rounded-2xl px-5 py-4 text-sm text-rb-green-300">
        <span className="mr-1 inline-block h-3 w-3 animate-pulse rounded-full bg-rb-green-400" />{" "}
        Running test cases…
      </div>
    );
  return (
    <div className="glass shrink-0 rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-2 text-rb-green-300">
        <CircleCheck className="h-5 w-5" />
        <span className="font-semibold">Accepted</span>
        <span className="ml-auto font-mono text-xs text-white/50">
          Solved in {Math.floor(time / 60)}m {time % 60}s
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Test cases", "12 / 12"],
          ["Runtime", "64 ms"],
          ["Memory", "42.1 MB"],
        ].map(([k, v]) => (
          <div key={k} className="glass-pill rounded-2xl p-3 text-center">
            <div className="font-mono text-lg text-rb-green-200">{v}</div>
            <div className="text-xs text-white/45">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Discussion() {
  return (
    <div className="space-y-4">
      <div className="glass-pill rounded-2xl p-4">
        <textarea
          rows={2}
          placeholder="Share your approach or ask a question…"
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-white/30"
        />
        <div className="flex justify-end">
          <button className="btn-glow rounded-lg px-4 py-1.5 text-xs font-semibold text-black">
            Post
          </button>
        </div>
      </div>
      {discussion.map((d, i) => (
        <div key={i} className="glass-pill rounded-2xl p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-rb-green-300">
              {d.author}
            </span>
            <span className="text-xs text-white/40">{d.time}</span>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-white/70">{d.body}</p>
          <button className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-rb-green-300">
            <ThumbsUp className="h-3.5 w-3.5" /> {d.votes}
          </button>
        </div>
      ))}
    </div>
  );
}
