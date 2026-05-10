import type { Source } from "@/lib/fixtures"

const DOT_COLOR = {
  green: "#1D9E75",
  amber: "#EF9F27",
  red: "#E24B4A",
}

export function SourceRow({
  source,
  active,
}: {
  source: Source
  active: boolean
}) {
  return (
    <div
      className="flex items-center justify-between border px-[11px] py-[8px] transition-[background-color,border-color] duration-300"
      style={{
        borderColor: active
          ? "rgba(200,162,255,0.35)"
          : "rgba(200,162,255,0.08)",
        backgroundColor: active
          ? "rgba(200,162,255,0.055)"
          : "rgba(200,162,255,0.015)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-7 w-7 items-center justify-center text-[10px] font-semibold text-white"
          style={{ backgroundColor: source.badgeBg }}
        >
          {source.badge}
        </div>
        <div className="leading-tight">
          <div className="text-[12px] font-medium text-white">{source.name}</div>
          <div className="text-[10px] text-[rgba(232,228,240,0.45)]">
            {source.sub}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.08em] text-[rgba(232,228,240,0.4)]">
          {source.count}
        </span>
        <span
          className="inline-block h-[5px] w-[5px] rounded-full"
          style={{ backgroundColor: DOT_COLOR[source.dot] }}
        />
      </div>
    </div>
  )
}
