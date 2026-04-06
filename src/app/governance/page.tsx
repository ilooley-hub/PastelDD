import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GovernancePageContent } from "@/components/governance-page-content"

export const metadata: Metadata = {
  title: "Financial Governance & Monitoring | Pastel",
  description:
    "Continuous AI-powered financial auditing and operational monitoring for private equity portfolio companies.",
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
