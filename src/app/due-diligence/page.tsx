import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DDPageContent } from "@/components/dd-page-content"

export const metadata: Metadata = {
  title: "Due Diligence Product | Pastel",
  description:
    "AI-generated financial and operational due diligence briefs. 48-hour turnaround, source-traceable findings, queryable outputs.",
}

export default function DueDiligencePage() {
  return (
    <>
      <Navbar />
      <DDPageContent />
      <Footer />
    </>
  )
}
