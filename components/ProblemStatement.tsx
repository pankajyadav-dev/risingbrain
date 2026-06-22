import { CodeProblem } from "@/lib/data";
import { DifficultyBadge, Tag } from "@/components/ui";

export default function ProblemStatement({ problem }: { problem: CodeProblem }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <DifficultyBadge level={problem.difficulty} />
        </div>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {problem.acceptance !== "—" && (
            <span className="text-xs text-white/40">
              Acceptance {problem.acceptance}
            </span>
          )}
        </div>
      </div>

      <p className="leading-relaxed text-white/75">{problem.statement}</p>

      <div className="space-y-4">
        {problem.examples.map((ex, i) => (
          <div key={i} className="glass-pill rounded-2xl p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-rb-green-300">
              Example {i + 1}
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm text-white/80">
              <span className="text-white/45">Input: </span>
              {ex.input}
              {"\n"}
              <span className="text-white/45">Output: </span>
              {ex.output}
              {ex.explanation && (
                <>
                  {"\n"}
                  <span className="text-white/45">Explanation: </span>
                  {ex.explanation}
                </>
              )}
            </pre>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-white/80">Constraints</h3>
        <ul className="space-y-1">
          {problem.constraints.map((c) => (
            <li key={c} className="font-mono text-sm text-white/55">
              • {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
