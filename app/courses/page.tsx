"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { courses } from "@/lib/data";
import { PageShell, SectionHeader } from "@/components/ui";
import CourseCard from "@/components/CourseCard";

const owned = courses.filter((c) => c.owned);
const catalog = courses.filter((c) => !c.owned);

const filters = ["All", "Free", "Premium", "DSA", "System Design"] as const;
type Filter = (typeof filters)[number];

function matches(course: (typeof catalog)[number], f: Filter) {
  if (f === "All") return true;
  if (f === "Free") return course.price === 0;
  if (f === "Premium") return course.price > 0;
  if (f === "System Design") return course.tag === "System Design";
  return course.tag === f;
}

export default function CoursesPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = catalog.filter((c) => matches(c, filter));

  const totalProgress = owned.length
    ? Math.round(
        owned.reduce((s, c) => s + (c.progress ?? 0), 0) / owned.length
      )
    : 0;

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Learn with RisingBrain"
        title="Courses"
        subtitle="Founder-led, placement-focused courses — pick up where you left off, or explore something new."
      />

      {/* ---- My Courses (owned) ---- */}
      <section className="mb-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-rb-green-500/15 text-rb-green-300">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold">My Courses</h2>
              <p className="text-xs text-white/50">
                {owned.length} enrolled · {totalProgress}% average progress
              </p>
            </div>
          </div>
          <span className="glass-pill rounded-full px-3 py-1 text-xs text-rb-green-300">
            Continue learning
          </span>
        </div>

        {owned.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {owned.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-10 text-center text-white/55">
            You haven&apos;t enrolled in any course yet. Explore the catalog
            below to get started.
          </div>
        )}
      </section>

      {/* ---- All courses (catalog) ---- */}
      <section>
        <div className="mb-5 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-rb-green-500/15 text-rb-green-300">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold">Explore all courses</h2>
            <p className="text-xs text-white/50">
              {catalog.length} courses to take your prep further
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-rb-green-500/15 text-rb-green-300"
                  : "glass-pill text-white/60 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {shown.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-10 text-center text-white/55">
            No courses match this filter yet.
          </div>
        )}
      </section>

      {/* CTA */}
      <div className="glass mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl p-8 text-center sm:flex-row sm:text-left">
        <div>
          <h3 className="text-lg font-bold">Not sure where to start?</h3>
          <p className="mt-1 text-sm text-white/55">
            Begin with the free 30-Day DSA Challenge and build the habit first.
          </p>
        </div>
        <Link
          href="/sheet"
          className="btn-glow inline-flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
        >
          Browse the free sheet <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageShell>
  );
}
