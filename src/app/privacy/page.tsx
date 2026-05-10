import type { Metadata } from "next"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { PrivacyPageContent } from "@/components/privacy-page-content"

export const metadata: Metadata = {
  title: "Privacy Policy | Pastel",
  description:
    "How Pastel handles personal information, customer content, and the data you share with us through our website and platform.",
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <PrivacyPageContent />
      <Footer />
    </>
  )
}
