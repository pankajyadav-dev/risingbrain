import {
  ListChecks,
  Database,
  Calculator,
  Rocket,
  Network,
  Boxes,
  Cpu,
  MessageSquareQuote,
  Brain,
  Star,
  Clock,
  PlayCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui";
import type { Course } from "@/lib/data";

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

export default function CourseCard({ course }: { course: Course }) {
  const Icon = iconMap[course.icon] ?? Brain;
  const owned = course.owned;
  const completed = owned && course.progress === 100;

  return (
    <GlassCard hover className="flex h-full flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rb-green-500/15 text-rb-green-300">
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            levelStyles[course.level]
          }`}
        >
          {course.level}
        </span>
      </div>

      <div className="mb-1 flex items-center gap-2">
        <span className="glass-pill rounded-full px-2.5 py-0.5 text-[11px] text-white/55">
          {course.tag}
        </span>
        {course.price === 0 ? (
          <span className="rounded-full bg-rb-green-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-rb-green-300">
            Free
          </span>
        ) : null}
      </div>

      <h3 className="text-base font-semibold leading-snug">{course.title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-white/55">{course.blurb}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/50">
        <span className="inline-flex items-center gap-1">
          <PlayCircle className="h-3.5 w-3.5" /> {course.lessons} lessons
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {course.hours}h
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-rb-green-300 text-rb-green-300" />
          {course.rating}
        </span>
        <span className="inline-flex items-center gap-1">
          <Users className="h-3.5 w-3.5" /> {course.learners}
        </span>
      </div>

      <div className="mt-3 text-xs text-white/45">By {course.instructor}</div>

      {owned ? (
        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-white/55">
              {completed ? "Completed" : `${course.progress}% complete`}
            </span>
            <span className="font-medium text-rb-green-300">
              {completed ? "Review →" : "Continue →"}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-rb-green-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-lg font-bold">
            {course.price === 0 ? (
              <span className="text-rb-green-300">Free</span>
            ) : (
              <>₹{course.price.toLocaleString("en-IN")}</>
            )}
          </span>
          <span className="btn-glow inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-black">
            {course.price === 0 ? "Start free" : "Enroll now"}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      )}
    </GlassCard>
  );
}
