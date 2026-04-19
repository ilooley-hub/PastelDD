import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SecurityPageContent } from "@/components/security-page-content"

export const metadata: Metadata = {
  title: "Security | Pastel",
  description:
    "Encryption, isolation, permissioned access, audit trails, and human-in-the-loop controls. The security posture behind the Pastel platform.",
}

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <SecurityPageContent />
      <Footer />
    </>
  )
}
