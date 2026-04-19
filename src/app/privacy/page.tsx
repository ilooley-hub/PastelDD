import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PrivacyPageContent } from "@/components/privacy-page-content"

export const metadata: Metadata = {
  title: "Privacy Policy | Pastel",
  description:
    "How Pastel handles personal information, customer content, and the data you share with us through our website and platform.",
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <PrivacyPageContent />
      <Footer />
    </>
  )
}
