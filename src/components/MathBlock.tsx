import katex from "katex";
import { useMemo } from "react";

interface MathBlockProps {
  tex: string;
  embedded?: boolean;
}

export function MathBlock({ tex, embedded = false }: MathBlockProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
        strict: false,
      }),
    [tex]
  );

  return (
    <div
      className={
        embedded
          ? "sova-math overflow-x-auto py-2 text-foreground"
          : "sova-math border border-border bg-surface px-4 py-4 overflow-x-auto text-foreground"
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
