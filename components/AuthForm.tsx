"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const [show, setShow] = useState(false);

  return (
    <div className="grid min-h-[calc(100dvh-var(--nav-h))] place-items-center px-4 py-10">
      <div className="glass grid w-full max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-2">
        {/* Brand showcase */}
        <div className="relative hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-rb-green-900/30 via-black/20 to-black/40 p-10 lg:flex">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-rb-green-500">
              <Brain className="h-5 w-5 text-black" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-semibold">
              Rising<span className="text-rb-green-400">Brain</span>
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-bold leading-tight">
              {isSignup ? (
                <>
                  Start your journey to{" "}
                  <span className="text-gradient">cracking the interview.</span>
                </>
              ) : (
                <>
                  Welcome back to your{" "}
                  <span className="text-gradient">grind.</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm text-white/55">
              Curated DSA sheets, a real coding arena, live contests and the
              interview stories that got people hired — all in one glassy home.
            </p>
          </div>

          <div className="flex gap-6">
            {[
              ["1,200+", "Problems"],
              ["28", "Patterns"],
              ["50k", "Learners"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-xl font-bold text-rb-green-300">{n}</div>
                <div className="text-xs text-white/45">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              {isSignup ? "Create your account" : "Sign in"}
            </h1>
            <p className="mt-1 text-sm text-white/55">
              {isSignup
                ? "Join free — no credit card required."
                : "Pick up right where you left off."}
            </p>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button className="glass-pill inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm hover:text-rb-green-200">
              <Globe className="h-4 w-4" /> Google
            </button>
            <button className="glass-pill inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm hover:text-rb-green-200">
              <KeyRound className="h-4 w-4" /> GitHub
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-white/35">
            <span className="h-px flex-1 bg-white/10" />
            or continue with email
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {isSignup && (
              <FieldRow icon={User} label="Full name" placeholder="Ada Lovelace" />
            )}
            <FieldRow
              icon={Mail}
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            <div>
              <label className="mb-1.5 block text-sm text-white/60">
                Password
              </label>
              <div className="glass-pill flex items-center gap-2 rounded-xl px-3.5">
                <Lock className="h-4 w-4 text-white/40" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="text-white/40 hover:text-white"
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/55">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-rb-green-500"
                  />
                  Remember me
                </label>
                <a href="#" className="text-rb-green-300 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-black"
            >
              {isSignup ? "Create account" : "Sign in"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/55">
            {isSignup ? "Already have an account? " : "New to RisingBrain? "}
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="font-medium text-rb-green-300 hover:underline"
            >
              {isSignup ? "Sign in" : "Create one free"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldRow({
  icon: Icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: React.ElementType;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-white/60">{label}</label>
      <div className="glass-pill flex items-center gap-2 rounded-xl px-3.5">
        <Icon className="h-4 w-4 text-white/40" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-white/30"
        />
      </div>
    </div>
  );
}
