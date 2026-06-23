"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What exactly is RisingBrain?",
    a: "RisingBrain is a pattern-first placement-prep platform founded by Anjali Kumari (ex-Walmart, Morgan Stanley). It bundles curated DSA sheets, SQL, aptitude, a real coding arena, live contests and interview experiences — everything you need to crack product-based company interviews, in one glassy home.",
  },
  {
    q: "Who is this platform for?",
    a: "Students from tier-2/3 colleges with no coding culture, working professionals switching to product roles, and anyone preparing for SDE interviews. If you have raw motivation but no roadmap, RisingBrain gives you the structure.",
  },
  {
    q: "Do I need to pay to start?",
    a: "No. The curated SWE sheet, aptitude drills and a large chunk of the practice arena are free forever. Premium adds the mentorship cohort, mock interviews and the campus training track.",
  },
  {
    q: "How is RisingBrain different from just grinding LeetCode?",
    a: "LeetCode gives you problems; RisingBrain gives you patterns. We sequence ~1,200 problems across 28 reusable patterns so you stop memorising solutions and start recognising shapes — the way interviews actually test you.",
  },
  {
    q: "Do you offer campus / university training programs?",
    a: "Yes. We run structured placement-training programs for colleges — aptitude, DSA, mock interviews and a live contest series mapped to each batch. TPOs get a dashboard with batch analytics. Reach out via the founder's LinkedIn to bring it to your campus.",
  },
  {
    q: "Will this actually help me get placed?",
    a: "Our learners have converted offers at Amazon, Microsoft, Walmart, Goldman Sachs, Atlassian, Flipkart and more. Structure plus consistency works — the sheets, contests and interview stories are built around what got real candidates hired.",
  },
  {
    q: "How do I follow along for free content?",
    a: "Anjali shares daily DSA breakdowns and placement strategy across YouTube (RisingBrain), LinkedIn (150k+) and Instagram (@rbanjali.codes). Follow any of them and join the 30-Day DSA Challenge.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16">
      <div className="mb-8 text-center">
        <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
          <span className="h-1.5 w-1.5 rounded-full bg-rb-green-400 pulse-ring" />
          FAQ
        </span>
        <h2 className="text-2xl font-bold sm:text-3xl">
          Questions, <span className="text-gradient">answered</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/55">
          Everything you might want to know before you start your prep with
          RisingBrain.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`glass rounded-2xl transition-colors ${
                isOpen ? "border-rb-green-500/30" : ""
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold sm:text-base">
                  {f.q}
                </span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rb-green-500/15 text-rb-green-300">
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              {isOpen && (
                <p className="animate-in px-5 pb-5 text-sm leading-relaxed text-white/60">
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
