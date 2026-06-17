import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Due Diligence Automation for Private Equity · Pastel",
  description:
    "Pastel is automated due diligence software for private equity deal teams. Ingest the VDR, build the deal ontology, get a cited brief your investment committee can defend in 48 hours.",
  openGraph: {
    title: "Due Diligence Automation for Private Equity · Pastel",
    description:
      "Pastel is automated due diligence software for private equity deal teams. Ingest the VDR, build the deal ontology, get a cited brief your investment committee can defend in 48 hours.",
    images: ["/og.png"],
  },
}

export default function DueDiligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
