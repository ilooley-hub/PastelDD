import type { Severity } from "@/lib/fixtures"

const STYLES: Record<
  Severity,
  { bg: string; color: string; border: string }
> = {
  high: {
    bg: "rgba(200,51,58,0.10)",
    color: "#C8333A",
    border: "rgba(200,51,58,0.28)",
  },
  medium: {
    bg: "rgba(181,120,26,0.10)",
    color: "#B5781A",
    border: "rgba(181,120,26,0.28)",
  },
  low: {
    bg: "rgba(31,138,91,0.10)",
    color: "#1F8A5B",
    border: "rgba(31,138,91,0.28)",
  },
}

export function SeverityTag({
  severity,
  count,
  uppercase = true,
}: {
  severity: Severity
  count?: number
  uppercase?: boolean
}) {
  const s = STYLES[severity]
  return (
    <span
      className={`inline-flex items-center gap-[6px] rounded-[2px] border px-[9px] h-[24px] text-[11px] font-semibold leading-none tracking-[0.02em] ${
        uppercase ? "uppercase" : ""
      }`}
      style={{
        backgroundColor: s.bg,
        color: s.color,
        borderColor: s.border,
      }}
    >
      <span
        className="inline-block w-[6px] h-[6px] rounded-full"
        style={{ backgroundColor: s.color }}
      />
      {count !== undefined ? `${count} ${severity}` : severity}
    </span>
  )
}
