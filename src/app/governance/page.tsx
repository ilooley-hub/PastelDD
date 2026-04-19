import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GovernancePageContent } from "@/components/governance-page-content"

export const metadata: Metadata = {
  title: "Portfolio Governance | Pastel",
  description:
    "Continuous AI-powered financial auditing, operational monitoring, and on-demand deep dives for private equity portfolio companies. Real-time signals, weekly digests, and source-traced alerts.",
}

export default function GovernancePage() {
  return (
    <>
      <Navbar />
      <GovernancePageContent />
      <Footer />
    </>
  )
}
