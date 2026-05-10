"use client"

import { useEffect, useState } from "react"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import {
  AGENT_QUERIES,
  AGENT_STEPS,
  AGENT_FINDING,
  type AgentStep,
} from "@/lib/fixtures"

const TYPE_DELAY = 40
const DELETE_DELAY = 16
const HOLD_DELAY = 2400

function useTypewriter(queries: readonly string[]) {
  const [text, setText] = useState("")
  const [queryIdx, setQueryIdx] = useState(0)
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing")

  useEffect(() => {
    const current = queries[queryIdx]
    let timer: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_DELAY
        )
      } else {
        timer = setTimeout(() => setPhase("holding"), HOLD_DELAY)
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 0)
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_DELAY)
      } else {
        setQueryIdx((i) => (i + 1) % queries.length)
        setPhase("typing")
        return
      }
    }
    return () => clearTimeout(timer)
  }, [text, phase, queryIdx, queries])

  return text
}

function StepIcon({ state }: { state: AgentStep["state"] }) {
  if (state === "done") {
    return (
      <span
        className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
        style={{ backgroundColor: "rgba(31,138,91,0.15)", color: "#1F8A5B" }}
      >
        ✓
      </span>
    )
  }
  if (state === "running") {
    return (
      <span
        className="flex h-[16px] w-[16px] shrink-0 animate-pulse-dot items-center justify-center rounded-full text-[10px] font-bold"
        style={{ backgroundColor: "rgba(123,91,214,0.12)", color: "#7B5BD6" }}
      >
        ◎
      </span>
    )
  }
  return (
    <span
      className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full text-[10px]"
      style={{
        backgroundColor: "#F1EFE9",
        color: "#76737F",
        opacity: 0.55,
      }}
    >
      ○
    </span>
  )
}

export function AgentQuery() {
  const text = useTypewriter(AGENT_QUERIES)

  return (
    <section className="px-12 py-14">
      <RevealOnScroll>
        <div
          className="mx-auto max-w-[760px] rounded-[16px] border overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#DEDBD2",
            boxShadow:
              "0 8px 24px rgba(20,19,28,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div
            className="flex items-center justify-between border-b px-5 py-3.5"
            style={{ borderColor: "#ECEAE3", backgroundColor: "#FBFAF6" }}
          >
            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-fg-3">
              Pastel Agent
            </span>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-[6px] w-[6px] animate-pulse-dot rounded-full"
                style={{ backgroundColor: "#1F8A5B" }}
              />
              <span className="text-[11px] text-fg-3">Resolving</span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 border-b px-5 py-4"
            style={{ borderColor: "#ECEAE3" }}
          >
            <span className="font-mono text-fg-3">{">"}</span>
            <span className="text-[14px] font-medium text-fg-1">{text}</span>
            <span
              className="inline-block h-[14px] w-[2px] animate-blink-cursor"
              style={{ backgroundColor: "#7B5BD6" }}
            />
          </div>

          <div className="px-5 py-4">
            {AGENT_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3 py-1.5">
                <StepIcon state={step.state} />
                <span
                  className="text-[12px]"
                  style={{
                    color:
                      step.state === "waiting"
                        ? "#ABA8B0"
                        : step.state === "running"
                          ? "#14131C"
                          : "#4A4858",
                  }}
                >
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mx-5 mb-5 rounded-[10px] border p-4"
            style={{
              backgroundColor: "rgba(123,91,214,0.04)",
              borderColor: "rgba(123,91,214,0.20)",
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.14em] font-semibold"
              style={{ color: "#7B5BD6" }}
            >
              {AGENT_FINDING.label}
            </div>
            <p className="mt-2 text-[13px] leading-[1.55] text-fg-1">
              <span className="font-semibold" style={{ color: "#7B5BD6" }}>
                18
              </span>{" "}
              {AGENT_FINDING.body
                .replace("$1.24M", "[[$1.24M]]")
                .replace("$14.6M EV impact", "[[$14.6M EV impact]]")
                .split(/(\[\[.*?\]\]|not applied)/)
                .map((chunk, i) => {
                  if (chunk === "not applied")
                    return (
                      <span
                        key={i}
                        className="font-semibold"
                        style={{ color: "#C8333A" }}
                      >
                        not applied
                      </span>
                    )
                  if (chunk.startsWith("[[") && chunk.endsWith("]]"))
                    return (
                      <span
                        key={i}
                        className="font-semibold num-tabular"
                        style={{ color: "#7B5BD6" }}
                      >
                        {chunk.slice(2, -2)}
                      </span>
                    )
                  return <span key={i}>{chunk}</span>
                })}
            </p>
            <div
              className="mt-3 border-t pt-2 text-[11px] font-mono text-fg-3"
              style={{ borderColor: "rgba(123,91,214,0.15)" }}
            >
              {AGENT_FINDING.citation}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
