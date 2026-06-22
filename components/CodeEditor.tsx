"use client";

import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function CodeEditor({
  value,
  onChange,
  language = "javascript",
}: {
  value: string;
  onChange: (v: string) => void;
  language?: string;
}) {
  const defined = useRef(false);

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      beforeMount={(monaco) => {
        if (defined.current) return;
        defined.current = true;
        monaco.editor.defineTheme("rb-glass", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "5b8c7a", fontStyle: "italic" },
            { token: "keyword", foreground: "6ee7b7" },
            { token: "string", foreground: "34d399" },
            { token: "number", foreground: "a7f3d0" },
          ],
          colors: {
            "editor.background": "#06100b",
            "editor.foreground": "#eafff6",
            "editorLineNumber.foreground": "#2f4f43",
            "editorLineNumber.activeForeground": "#6ee7b7",
            "editor.selectionBackground": "#10b98133",
            "editor.lineHighlightBackground": "#10b9810d",
            "editorCursor.foreground": "#34d399",
            "editorIndentGuide.background1": "#13241d",
          },
        });
      }}
      onMount={(_, monaco) => monaco.editor.setTheme("rb-glass")}
      options={{
        fontSize: 14,
        fontFamily: "var(--font-geist-mono), monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 16, bottom: 16 },
        smoothScrolling: true,
        roundedSelection: true,
        cursorBlinking: "smooth",
        renderLineHighlight: "all",
        tabSize: 2,
      }}
    />
  );
}
