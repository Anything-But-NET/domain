import { useState } from "react";

type EscalationState =
  | "PENDING"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "CANCELLED";

interface StateNodeDef {
  id: EscalationState;
  x: number;
  y: number;
  w: number;
  h: number;
  terminal?: boolean;
}

interface StateEdgeDef {
  from: EscalationState;
  to: EscalationState;
  d: string;
}

const NODES: StateNodeDef[] = [
  { id: "PENDING", x: 12, y: 60, w: 104, h: 34 },
  { id: "IN_PROGRESS", x: 142, y: 60, w: 104, h: 34 },
  { id: "RESOLVED", x: 272, y: 60, w: 104, h: 34 },
  { id: "CLOSED", x: 402, y: 60, w: 104, h: 34, terminal: true },
  { id: "CANCELLED", x: 208, y: 136, w: 104, h: 34, terminal: true },
];

const EDGES: StateEdgeDef[] = [
  { from: "PENDING", to: "IN_PROGRESS", d: "M 116 77 H 137" },
  { from: "PENDING", to: "RESOLVED", d: "M 64 60 V 34 H 324 V 55" },
  { from: "PENDING", to: "CANCELLED", d: "M 64 94 V 153 H 203" },
  { from: "IN_PROGRESS", to: "RESOLVED", d: "M 246 77 H 267" },
  { from: "IN_PROGRESS", to: "CLOSED", d: "M 194 60 V 14 H 454 V 55" },
  { from: "IN_PROGRESS", to: "CANCELLED", d: "M 194 94 V 115 H 260 V 131" },
  { from: "RESOLVED", to: "CLOSED", d: "M 376 77 H 397" },
];

const TRANSITIONS: Record<EscalationState, EscalationState[]> = {
  PENDING: ["IN_PROGRESS", "RESOLVED", "CANCELLED"],
  IN_PROGRESS: ["RESOLVED", "CLOSED", "CANCELLED"],
  RESOLVED: ["CLOSED"],
  CLOSED: [],
  CANCELLED: [],
};

export function EscalationStateMachine() {
  const [selected, setSelected] = useState<EscalationState>("PENDING");

  const targets = TRANSITIONS[selected];
  const isTerminal = targets.length === 0;

  return (
    <div className="border border-border bg-surface">
      <div className="p-4 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 518 184"
          className="w-full min-w-[460px] h-auto block select-none"
          role="group"
          aria-label="Escalation state machine"
        >
          <defs>
            <marker
              id="esc-arrow-active"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="#ece9e1" />
            </marker>
            <marker
              id="esc-arrow-muted"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="#5b5953" />
            </marker>
          </defs>

          {/* Inactive edges rendered beneath active ones */}
          {EDGES.filter((edge) => edge.from !== selected).map((edge) => (
            <path
              key={`${edge.from}-${edge.to}`}
              d={edge.d}
              fill="none"
              stroke="#5b5953"
              strokeWidth="1"
              opacity={0.3}
              markerEnd="url(#esc-arrow-muted)"
              className="mechanical-lever"
            />
          ))}

          {/* Active outgoing edges */}
          {EDGES.filter((edge) => edge.from === selected).map((edge) => (
            <g key={`${edge.from}-${edge.to}`}>
              <path
                d={edge.d}
                fill="none"
                stroke="#111110"
                strokeWidth="3.5"
              />
              <path
                d={edge.d}
                fill="none"
                stroke="#ece9e1"
                strokeWidth="1.2"
                markerEnd="url(#esc-arrow-active)"
                className="mechanical-lever"
              />
            </g>
          ))}

          {/* Interactive state nodes */}
          {NODES.map((node) => {
            const isSelected = node.id === selected;
            const isReachable = targets.includes(node.id);
            const dimmed = !isSelected && !isReachable;

            const strokeColor = isSelected
              ? "#c95b3c"
              : isReachable
                ? "#ece9e1"
                : "#3b3b35";
            const fillColor = isSelected
              ? "#161614"
              : isReachable
                ? "#111110"
                : "#0b0b0a";
            const textColor = isSelected || isReachable ? "#ece9e1" : "#8d8a82";

            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Select ${node.id} state`}
                onClick={() => setSelected(node.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(node.id);
                  }
                }}
                opacity={dimmed ? 0.3 : 1}
                className="cursor-pointer outline-none mechanical-lever"
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isSelected ? "1.5" : "1"}
                />
                <text
                  x={node.x + node.w / 2}
                  y={node.y + node.h / 2 + 4}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="10.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.04em"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-4 sm:px-5 py-2.5 border-t border-border bg-background font-mono text-[11px] text-muted-foreground overflow-x-auto whitespace-nowrap">
        {isTerminal ? (
          <span>
            <span className="text-foreground">{selected}</span> · TERMINAL STATE — RESPONSE EDITS LOCKED
          </span>
        ) : (
          <span>
            FROM <span className="text-brand">{selected}</span> →{" "}
            <span className="text-foreground">{targets.join(", ")}</span>
          </span>
        )}
      </div>
    </div>
  );
}
