import type { PortfolioCompany } from "@/lib/fixtures"

const STATUS_DOT = {
  ok: "#1F8A5B",
  warn: "#B5781A",
  err: "#C8333A",
}

const VALUE_TONE = {
  default: "#14131C",
  ok: "#1F8A5B",
  warn: "#B5781A",
  err: "#C8333A",
}

const ALERT_TONE = {
  warn: {
    bg: "rgba(181,120,26,0.06)",
    border: "rgba(181,120,26,0.22)",
    color: "#B5781A",
  },
  err: {
    bg: "rgba(200,51,58,0.06)",
    border: "rgba(200,51,58,0.22)",
    color: "#C8333A",
  },
}

export function PortfolioCard({ company }: { company: PortfolioCompany }) {
  const a = company.alert ? ALERT_TONE[company.alert.tone] : null
  return (
    <div className="card-surface card-surface-hover rounded-[10px] px-5 py-4">
      <div className="flex items-center justify-between">
        <div
          className="text-[16px] font-bold text-fg-1"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontVariationSettings: "'opsz' 30",
            letterSpacing: "-0.01em",
          }}
        >
          {company.name}
        </div>
        <span
          className={`inline-block h-[7px] w-[7px] rounded-full ${
            company.status === "err" ? "animate-pulse-dot" : ""
          }`}
          style={{ backgroundColor: STATUS_DOT[company.status] }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {company.metrics.map((m) => (
          <div
            key={m.label}
            className="flex items-center justify-between text-[12px]"
          >
            <span className="text-fg-3">{m.label}</span>
            <span
              className="num-tabular font-semibold"
              style={{ color: VALUE_TONE[m.tone] }}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {company.alert && a && (
        <div
          className="mt-4 rounded-[6px] border px-2.5 py-1.5 text-[11px] font-semibold leading-snug"
          style={{
            backgroundColor: a.bg,
            borderColor: a.border,
            color: a.color,
          }}
        >
          {company.alert.text}
        </div>
      )}
    </div>
  )
}
