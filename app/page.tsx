import Link from "next/link";
import {
  Brain,
  ListChecks,
  Database,
  Calculator,
  Code2,
  Trophy,
  MessageSquareQuote,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/ui";

const features = [
  {
    href: "/sheet",
    icon: ListChecks,
    title: "DSA Sheets",
    desc: "The curated SWE Sheet and a focused Last-Minute 100 for revision day.",
    tag: "Pattern-first",
  },
  {
    href: "/sql",
    icon: Database,
    title: "SQL Queries",
    desc: "Problem, best approach and the clean query — side by side.",
    tag: "Window funcs",
  },
  {
    href: "/aptitude",
    icon: Calculator,
    title: "Aptitude",
    desc: "Crisp topic theory plus MCQ practice to sharpen your speed.",
    tag: "MCQ drills",
  },
  {
    href: "/practice",
    icon: Code2,
    title: "DSA Practice",
    desc: "A LeetCode-style arena with editor, timer, results and discussion.",
    tag: "Monaco editor",
  },
  {
    href: "/contest",
    icon: Trophy,
    title: "Contests",
    desc: "Timed rounds, a live leaderboard and zero distractions.",
    tag: "Live ranks",
  },
  {
    href: "/interview",
    icon: MessageSquareQuote,
    title: "Interview Stories",
    desc: "Real experiences from real candidates — wins and lessons.",
    tag: "Community",
  },
];

const stats = [
  ["1,200+", "Curated problems"],
  ["28", "DSA patterns"],
  ["50k", "Learners"],
  ["180+", "Contests hosted"],
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[var(--app-max)] px-4 sm:px-6 lg:px-10">
      {/* Hero */}
      <section className="relative py-16 text-center sm:py-24">
        <span className="glass-pill animate-in mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-rb-green-300">
          <Sparkles className="h-4 w-4" />
          Liquid-glass learning, pattern-first mastery
        </span>
        <h1 className="animate-in mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Master <span className="text-gradient">DSA, SQL &amp; Aptitude</span>
          <br />
          the way interviews actually test you.
        </h1>
        <p className="animate-in mx-auto mt-6 max-w-2xl text-lg text-white/60">
          One glassy home for curated sheets, a real coding arena, live contests
          and the interview stories that got people hired.
        </p>
        <div className="animate-in mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sheet"
            className="btn-glow inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
          >
            Start with the Sheet <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/practice"
            className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
          >
            <Code2 className="h-4 w-4" /> Open the arena
          </Link>
        </div>

        {/* Floating brand orb */}
        <div className="glass pointer-events-none mx-auto mt-16 grid h-24 w-24 place-items-center rounded-3xl">
          <Brain className="h-11 w-11 text-rb-green-400" strokeWidth={1.75} />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([num, label]) => (
          <GlassCard key={label} className="px-5 py-6 text-center">
            <div className="text-2xl font-bold text-rb-green-300 sm:text-3xl">
              {num}
            </div>
            <div className="mt-1 text-xs text-white/55 sm:text-sm">{label}</div>
          </GlassCard>
        ))}
      </section>

      {/* Feature grid */}
      <section className="py-16">
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
          Everything in <span className="text-gradient">one place</span>
        </h2>
        <p className="mb-8 text-white/55">
          Six tightly-built sections, one consistent glass theme.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.href} href={f.href}>
              <GlassCard hover className="h-full p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rb-green-500/15 text-rb-green-300">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="glass-pill rounded-full px-2.5 py-1 text-xs text-white/60">
                    {f.tag}
                  </span>
                </div>
                <h3 className="mb-1.5 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-white/55">{f.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rb-green-300">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
