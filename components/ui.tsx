import { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass ${hover ? "glass-hover" : ""} rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}

const diffStyles: Record<string, string> = {
  Easy: "text-rb-green-300 bg-rb-green-500/15 border-rb-green-500/30",
  Medium: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  Hard: "text-rose-300 bg-rose-400/10 border-rose-400/30",
};

export function DifficultyBadge({ level }: { level: "Easy" | "Medium" | "Hard" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${diffStyles[level]}`}
    >
      {level}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="glass-pill inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-white/70">
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
          <span className="h-1.5 w-1.5 rounded-full bg-rb-green-400 pulse-ring" />
          {eyebrow}
        </span>
      )}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h1>
      {subtitle && <p className="mt-3 text-white/55">{subtitle}</p>}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[var(--app-max)] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      {children}
    </div>
  );
}
