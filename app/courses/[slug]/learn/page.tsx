"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  CircleCheck,
  Circle,
  HelpCircle,
  FileText,
  PlayCircle,
} from "lucide-react";
import {
  getCourseBySlug,
  getCurriculum,
  type CourseLesson,
} from "@/lib/data";

type FlatLesson = CourseLesson & { section: string; index: number };

function lessonIcon(type: CourseLesson["type"]) {
  if (type === "quiz") return HelpCircle;
  if (type === "article") return FileText;
  return PlayCircle;
}

export default function CourseLearnPage() {
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug);

  const sections = useMemo(
    () => (course ? getCurriculum(course) : []),
    [course]
  );

  const flat = useMemo<FlatLesson[]>(() => {
    let i = 0;
    return sections.flatMap((s) =>
      s.lessons.map((l) => ({ ...l, section: s.title, index: i++ }))
    );
  }, [sections]);

  // Seed completed lessons from the course's saved progress.
  const seedCount = course?.progress
    ? Math.round((course.progress / 100) * flat.length)
    : 0;

  const [completed, setCompleted] = useState<Set<number>>(
    () => new Set(Array.from({ length: seedCount }, (_, i) => i))
  );
  const [current, setCurrent] = useState(Math.min(seedCount, flat.length - 1));

  if (!course) return notFound();

  const total = flat.length;
  const done = completed.size;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const lesson = flat[current];

  const toggleComplete = (i: number) =>
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const markAndNext = () => {
    setCompleted((prev) => new Set(prev).add(current));
    if (current < total - 1) setCurrent(current + 1);
  };

  return (
    <div className="flex h-[calc(100dvh-var(--nav-h))] flex-col gap-3 px-3 pb-3 pt-3 sm:px-5">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="glass-pill inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/65 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" /> Overview
          </Link>
          <h1 className="truncate font-semibold">{course.title}</h1>
        </div>
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-rb-green-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-sm text-rb-green-300">{pct}%</span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[320px_1fr]">
        {/* LEFT: curriculum */}
        <aside className="glass order-2 flex min-h-0 flex-col overflow-hidden rounded-2xl lg:order-1">
          <div className="shrink-0 border-b border-white/10 px-5 py-4">
            <div className="text-sm font-semibold">Course content</div>
            <div className="text-xs text-white/45">
              {done} / {total} lessons complete
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {sections.map((section) => (
              <div key={section.title} className="mb-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                  {section.title}
                </div>
                <ul className="space-y-1">
                  {section.lessons.map((l) => {
                    const fl = flat.find(
                      (f) => f.section === section.title && f.title === l.title
                    )!;
                    const isDone = completed.has(fl.index);
                    const active = current === fl.index;
                    const L = lessonIcon(l.type);
                    return (
                      <li
                        key={l.title}
                        className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition ${
                          active
                            ? "bg-rb-green-500/15 text-rb-green-200"
                            : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <button
                          onClick={() => toggleComplete(fl.index)}
                          className="shrink-0"
                          title={isDone ? "Mark as not done" : "Mark as done"}
                        >
                          {isDone ? (
                            <CircleCheck className="h-4 w-4 text-rb-green-300" />
                          ) : (
                            <Circle className="h-4 w-4 text-white/25" />
                          )}
                        </button>
                        <button
                          onClick={() => setCurrent(fl.index)}
                          className="flex flex-1 items-center gap-2.5 truncate text-left"
                        >
                          <L className="h-3.5 w-3.5 shrink-0 text-white/35" />
                          <span className="flex-1 truncate">{l.title}</span>
                          <span className="shrink-0 font-mono text-[11px] text-white/35">
                            {l.duration}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT: player + lesson */}
        <main className="order-1 flex min-h-0 flex-col gap-3 lg:order-2">
          {/* Video placeholder */}
          <div className="glass relative grid aspect-video min-h-0 shrink-0 place-items-center overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-rb-green-900/40 to-transparent" />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-rb-green-500/20 text-rb-green-200 ring-1 ring-rb-green-500/30">
                <Play className="h-7 w-7 translate-x-0.5" />
              </span>
              <span className="text-sm text-white/55">
                {lesson.type === "quiz" ? "Start quiz" : "Play lesson"}
              </span>
            </div>
          </div>

          {/* Lesson detail */}
          <div className="glass min-h-0 flex-1 overflow-y-auto rounded-2xl p-6">
            <div className="mb-1 text-xs uppercase tracking-wide text-white/40">
              Lesson {current + 1} of {total} · {lesson.section}
            </div>
            <h2 className="text-xl font-bold">{lesson.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              In this lesson we break down{" "}
              <span className="text-white/80">{lesson.title.toLowerCase()}</span>{" "}
              step by step. Follow along with the video, then test yourself with
              the exercises at the end. You can mark the lesson complete once
              you&apos;re confident with the material.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/45">
              <span className="glass-pill rounded-full px-3 py-1">
                {course.tag}
              </span>
              <span className="glass-pill rounded-full px-3 py-1">
                {course.level}
              </span>
              <span className="glass-pill rounded-full px-3 py-1">
                {lesson.duration === "Quiz" ? "Quiz" : `${lesson.duration} min`}
              </span>
            </div>
          </div>

          {/* Footer controls */}
          <div className="flex shrink-0 items-center justify-between gap-3">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            <button
              onClick={() => toggleComplete(current)}
              className="glass glass-hover hidden items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold sm:inline-flex"
            >
              {completed.has(current) ? (
                <>
                  <CircleCheck className="h-4 w-4 text-rb-green-300" /> Completed
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4" /> Mark complete
                </>
              )}
            </button>

            <button
              onClick={markAndNext}
              disabled={current === total - 1 && completed.has(current)}
              className="btn-glow inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {current === total - 1 ? "Finish" : "Next lesson"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
