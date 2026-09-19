"use client";

import type { AppConfig } from "@/lib/registry";
import Markdown from "./Markdown";

export default function StreamBox({
  app,
  output,
  loading,
}: {
  app: AppConfig;
  output: string;
  loading: boolean;
}) {
  return (
    <section className="rounded-3xl border border-app bg-app-surface p-6">
      <p className="text-app-muted mb-3 text-xs font-semibold uppercase tracking-widest">
        Result window
      </p>
      {output ? (
        <div
          className={`${app.theme.fontClass} max-h-[480px] overflow-y-auto ${
            loading ? "app-stream-cursor" : ""
          }`}
        >
          <Markdown text={output} />
        </div>
      ) : (
        <p className="text-app-muted text-sm">
          {loading
            ? "Streaming response…"
            : "Your result will stream here. Same shell — only the prompt and skin changed."}
        </p>
      )}
    </section>
  );
}