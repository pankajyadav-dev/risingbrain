"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronDown,
  Star,
  Clock,
  PlayCircle,
  Users,
  Lock,
  Check,
  CircleCheck,
  FileText,
  HelpCircle,
  Award,
  Infinity as InfinityIcon,
  ArrowRight,
  X,
  CreditCard,
  ShieldCheck,
  LoaderCircle,
  Sparkles,
  ListChecks,
  Database,
  Calculator,
  Rocket,
  Network,
  Boxes,
  Cpu,
  MessageSquareQuote,
  Brain,
} from "lucide-react";
import {
  getCourseBySlug,
  getCurriculum,
  getCourseOutcomes,
  type CourseLesson,
} from "@/lib/data";

const iconMap: Record<string, typeof Brain> = {
  ListChecks,
  Database,
  Calculator,
  Rocket,
  Network,
  Boxes,
  Cpu,
  MessageSquareQuote,
};

const levelStyles: Record<string, string> = {
  Beginner: "text-rb-green-300 bg-rb-green-500/15 border-rb-green-500/30",
  Intermediate: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  Advanced: "text-rose-300 bg-rose-400/10 border-rose-400/30",
};

function lessonIcon(type: CourseLesson["type"]) {
  if (type === "quiz") return HelpCircle;
  if (type === "article") return FileText;
  return PlayCircle;
}

type EnrollStep = null | "summary" | "processing" | "done";

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug);
  const [open, setOpen] = useState(0);
  const [enrollStep, setEnrollStep] = useState<EnrollStep>(null);

  if (!course) return notFound();

  const Icon = iconMap[course.icon] ?? Brain;
  const sections = getCurriculum(course);
  const outcomes = getCourseOutcomes(course);
  const totalLessons = sections.reduce((s, sec) => s + sec.lessons.length, 0);

  const isFree = course.price === 0;
  const owned = !!course.owned;

  const confirmEnroll = () => {
    setEnrollStep("processing");
    setTimeout(() => setEnrollStep("done"), 1400);
  };

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 lg:py-12">
      <Link
        href="/courses"
        className="glass-pill mb-6 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/65 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" /> All courses
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* ---------- MAIN ---------- */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="glass-pill rounded-full px-2.5 py-0.5 text-[11px] text-white/55">
              {course.tag}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelStyles[course.level]}`}
            >
              {course.level}
            </span>
            {isFree && (
              <span className="rounded-full bg-rb-green-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-rb-green-300">
                Free
              </span>
            )}
          </div>

          <div className="mb-4 flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-rb-green-500/15 text-rb-green-300">
              <Icon className="h-7 w-7" />
            </span>
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              <span className="text-gradient">{course.title}</span>
            </h1>
          </div>

          <p className="text-white/60">{course.blurb}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-rb-green-300 text-rb-green-300" />
              {course.rating} rating
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {course.learners} learners
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PlayCircle className="h-4 w-4" /> {course.lessons} lessons
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {course.hours}h content
            </span>
          </div>

          <div className="mt-3 text-sm text-white/45">
            Created by{" "}
            <span className="text-white/70">{course.instructor}</span>
          </div>

          {/* What you'll learn */}
          <section className="glass mt-8 rounded-3xl p-6 sm:p-7">
            <h2 className="mb-4 text-lg font-bold">What you&apos;ll learn</h2>
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {outcomes.map((o) => (
                <div key={o} className="flex items-start gap-2.5 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-rb-green-300" />
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-lg font-bold">Course content</h2>
              <span className="text-xs text-white/45">
                {sections.length} sections · {totalLessons} lessons
              </span>
            </div>

            <div className="space-y-3">
              {sections.map((section, si) => {
                const isOpen = open === si;
                return (
                  <div key={section.title} className="glass overflow-hidden rounded-2xl">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : si)}
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/[0.03]"
                    >
                      <span className="flex items-center gap-3">
                        <ChevronDown
                          className={`h-4 w-4 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                        <span className="font-semibold">{section.title}</span>
                      </span>
                      <span className="shrink-0 text-xs text-white/45">
                        {section.lessons.length} lessons
                      </span>
                    </button>

                    {isOpen && (
                      <ul className="border-t border-white/10">
                        {section.lessons.map((lesson) => {
                          const L = lessonIcon(lesson.type);
                          const locked = !owned && !lesson.preview;
                          return (
                            <li
                              key={lesson.title}
                              className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
                            >
                              <span className="flex items-center gap-3 text-white/70">
                                <L className="h-4 w-4 text-white/40" />
                                {lesson.title}
                                {lesson.preview && (
                                  <span className="rounded-full bg-rb-green-500/15 px-2 py-0.5 text-[10px] font-semibold text-rb-green-300">
                                    Preview
                                  </span>
                                )}
                              </span>
                              <span className="flex shrink-0 items-center gap-2 text-xs text-white/40">
                                {locked && <Lock className="h-3.5 w-3.5" />}
                                {lesson.duration}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ---------- SIDEBAR ---------- */}
        <aside className="lg:sticky lg:top-[calc(var(--nav-h)+1rem)] lg:self-start">
          <div className="glass rounded-3xl p-6">
            {owned ? (
              <>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-white/60">
                    {course.progress === 100
                      ? "Completed"
                      : `${course.progress}% complete`}
                  </span>
                  <span className="font-medium text-rb-green-300">Enrolled</span>
                </div>
                <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-rb-green-500"
                    style={{ width: `${course.progress ?? 0}%` }}
                  />
                </div>
                <Link
                  href={`/courses/${course.slug}/learn`}
                  className="btn-glow flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
                >
                  {course.progress === 100 ? "Review course" : "Continue learning"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <>
                <div className="mb-4 text-3xl font-bold">
                  {isFree ? (
                    <span className="text-rb-green-300">Free</span>
                  ) : (
                    <>₹{course.price.toLocaleString("en-IN")}</>
                  )}
                </div>
                <button
                  onClick={() => setEnrollStep("summary")}
                  className="btn-glow flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
                >
                  {isFree ? "Start free" : "Enroll now"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs text-white/40">
                  {isFree
                    ? "No card required — start instantly."
                    : "30-day money-back guarantee."}
                </p>
              </>
            )}

            <div className="mt-6 border-t border-white/10 pt-5">
              <h3 className="mb-3 text-sm font-semibold text-white/70">
                This course includes
              </h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li className="flex items-center gap-2.5">
                  <PlayCircle className="h-4 w-4 text-rb-green-300" />
                  {course.lessons} on-demand lessons
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-rb-green-300" />
                  {course.hours} hours of video
                </li>
                <li className="flex items-center gap-2.5">
                  <CircleCheck className="h-4 w-4 text-rb-green-300" />
                  Hands-on exercises &amp; quizzes
                </li>
                <li className="flex items-center gap-2.5">
                  <InfinityIcon className="h-4 w-4 text-rb-green-300" />
                  Full lifetime access
                </li>
                <li className="flex items-center gap-2.5">
                  <Award className="h-4 w-4 text-rb-green-300" />
                  Certificate of completion
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- ENROLL DEMO MODAL ---------- */}
      {enrollStep && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => enrollStep !== "processing" && setEnrollStep(null)}
          />

          <div className="glass relative w-full max-w-md rounded-3xl p-6 sm:p-7">
            {enrollStep !== "processing" && (
              <button
                onClick={() => setEnrollStep(null)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* ---- Order summary ---- */}
            {enrollStep === "summary" && (
              <>
                <div className="mb-1 flex items-center gap-2 text-xs font-medium text-rb-green-300">
                  <Sparkles className="h-4 w-4" /> Enrollment
                </div>
                <h2 className="text-lg font-bold leading-snug">{course.title}</h2>
                <p className="mt-1 text-sm text-white/50">
                  By {course.instructor} · {course.lessons} lessons · {course.hours}h
                </p>

                <div className="mt-5 space-y-2.5 border-y border-white/10 py-4 text-sm">
                  <div className="flex items-center justify-between text-white/60">
                    <span>Course price</span>
                    <span>{isFree ? "Free" : `₹${course.price.toLocaleString("en-IN")}`}</span>
                  </div>
                  {!isFree && (
                    <div className="flex items-center justify-between text-white/60">
                      <span>Launch discount</span>
                      <span className="text-rb-green-300">− ₹0</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1 text-base font-bold">
                    <span>Total</span>
                    <span>
                      {isFree ? (
                        <span className="text-rb-green-300">₹0</span>
                      ) : (
                        <>₹{course.price.toLocaleString("en-IN")}</>
                      )}
                    </span>
                  </div>
                </div>

                {!isFree && (
                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-white/65">
                    <CreditCard className="h-4 w-4 text-rb-green-300" />
                    <span>Card ending 4242</span>
                    <span className="ml-auto text-xs text-white/35">Demo</span>
                  </div>
                )}

                <button
                  onClick={confirmEnroll}
                  className="btn-glow mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
                >
                  {isFree ? "Confirm & start free" : `Pay ₹${course.price.toLocaleString("en-IN")}`}
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/40">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  This is a demo — no real payment is taken.
                </p>
              </>
            )}

            {/* ---- Processing ---- */}
            {enrollStep === "processing" && (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <LoaderCircle className="h-10 w-10 animate-spin text-rb-green-300" />
                <div>
                  <div className="font-semibold">Confirming your enrollment…</div>
                  <div className="mt-1 text-sm text-white/45">Just a moment</div>
                </div>
              </div>
            )}

            {/* ---- Success ---- */}
            {enrollStep === "done" && (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-rb-green-500/20 text-rb-green-200 ring-1 ring-rb-green-500/30">
                  <CircleCheck className="h-8 w-8" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">You&apos;re enrolled!</h2>
                  <p className="mt-1 text-sm text-white/55">
                    {course.title} is now in your library. Dive into the first
                    lesson whenever you&apos;re ready.
                  </p>
                </div>
                <Link
                  href={`/courses/${course.slug}/learn`}
                  className="btn-glow mt-1 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
                >
                  Start learning <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => setEnrollStep(null)}
                  className="text-sm text-white/50 hover:text-white"
                >
                  Maybe later
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
