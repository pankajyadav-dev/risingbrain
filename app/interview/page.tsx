"use client";

import { useRef, useState } from "react";
import {
  Building2,
  ThumbsUp,
  Layers,
  PenLine,
  CircleCheck,
  CircleX,
  Clock3,
  Bold,
  Italic,
  Underline,
  Heading,
  List,
  ListOrdered,
  Quote,
  Code2,
  Link2,
  X,
} from "lucide-react";
import { interviewPosts } from "@/lib/data";
import { DifficultyBadge, PageShell, SectionHeader, Tag } from "@/components/ui";

const verdictStyle = {
  Selected: { icon: CircleCheck, cls: "text-rb-green-300 bg-rb-green-500/15" },
  Rejected: { icon: CircleX, cls: "text-rose-300 bg-rose-500/10" },
  Pending: { icon: Clock3, cls: "text-amber-300 bg-amber-400/10" },
} as const;

export default function InterviewPage() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <PageShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Real stories, real outcomes"
          title="Interview Experiences"
          subtitle="Learn from candidates who sat in the hot seat — what was asked, what worked, what didn't."
        />
        <button
          onClick={() => setShowEditor((v) => !v)}
          className="btn-glow mb-8 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-black"
        >
          <PenLine className="h-4 w-4" /> Write your experience
        </button>
      </div>

      {showEditor && <Composer onClose={() => setShowEditor(false)} />}

      <div className="grid gap-5 md:grid-cols-2">
        {interviewPosts.map((post) => {
          const V = verdictStyle[post.verdict];
          return (
            <article key={post.id} className="glass glass-hover rounded-3xl p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rb-green-500/15 text-rb-green-300">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold leading-tight">{post.company}</h3>
                    <p className="text-sm text-white/55">{post.role}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${V.cls}`}
                >
                  <V.icon className="h-3.5 w-3.5" /> {post.verdict}
                </span>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-white/65">
                {post.excerpt}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/50">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-4 w-4" /> {post.rounds} rounds
                  </span>
                  <DifficultyBadge level={post.difficulty} />
                </div>
                <div className="flex items-center gap-3">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1 text-rb-green-300">
                    <ThumbsUp className="h-4 w-4" /> {post.likes}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

/* A Word-like document editor — write the experience as a free-form post. */
function Composer({ onClose }: { onClose: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState(0);

  // Lightweight rich-text formatting (demo only) via execCommand.
  const cmd = (command: string, value?: string) => {
    bodyRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const countWords = () => {
    const text = bodyRef.current?.innerText.trim() ?? "";
    setWords(text ? text.split(/\s+/).length : 0);
  };

  const tools: [React.ElementType, string, string?, string?][] = [
    [Bold, "bold"],
    [Italic, "italic"],
    [Underline, "underline"],
    [Heading, "formatBlock", "<h3>"],
    [List, "insertUnorderedList"],
    [ListOrdered, "insertOrderedList"],
    [Quote, "formatBlock", "<blockquote>"],
    [Code2, "formatBlock", "<pre>"],
    [Link2, "createLink", "https://"],
  ];

  return (
    <div className="glass animate-in mb-8 overflow-hidden rounded-3xl">
      {/* Document header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <PenLine className="h-4 w-4 text-rb-green-300" />
          New experience · Draft
        </div>
        <button
          onClick={onClose}
          className="glass-pill grid h-8 w-8 place-items-center rounded-lg text-white/55 hover:text-white"
          aria-label="Close editor"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Formatting toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-black/20 px-3 py-2">
        {tools.map(([Icon, command, value], i) => (
          <button
            key={i}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => cmd(command, value)}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition hover:bg-rb-green-500/15 hover:text-rb-green-200"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <span className="mx-2 h-5 w-px bg-white/10" />
        <span className="text-xs text-white/35">
          Tip: select text, then format — just like a doc.
        </span>
      </div>

      {/* The "page" — a Word-like writing surface */}
      <div className="max-h-[60vh] overflow-y-auto bg-black/10 px-4 py-6 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div
            className="mb-2 text-2xl font-bold text-white/90 outline-none empty:before:text-white/25 empty:before:content-[attr(data-ph)]"
            contentEditable
            suppressContentEditableWarning
            data-ph="Untitled — e.g. My Google SDE-1 Interview"
          />
          <div
            ref={bodyRef}
            onInput={countWords}
            className="prose-doc min-h-[280px] leading-relaxed text-white/75 outline-none empty:before:text-white/25 empty:before:content-[attr(data-ph)]"
            contentEditable
            suppressContentEditableWarning
            data-ph="Start writing your story… Walk through each round, the questions you got, what you'd do differently, and tips for the next candidate."
          />
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3">
        <span className="text-xs text-white/40">{words} words · auto-saved</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="glass-pill rounded-xl px-5 py-2 text-sm text-white/70 hover:text-white"
          >
            Discard
          </button>
          <button
            onClick={onClose}
            className="btn-glow rounded-xl px-5 py-2 text-sm font-semibold text-black"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
}
