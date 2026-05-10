import type { Metadata } from "next"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { TermsPageContent } from "@/components/terms-page-content"

export const metadata: Metadata = {
  title: "Terms of Service | Pastel",
  description:
    "The agreement that governs your access to and use of the Pastel platform, marketing site, and related services.",
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <TermsPageContent />
      <Footer />
    </>
  )
}
