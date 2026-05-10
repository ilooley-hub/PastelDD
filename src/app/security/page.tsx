import type { Metadata } from "next"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { SecurityPageContent } from "@/components/security-page-content"

export const metadata: Metadata = {
  title: "Security | Pastel",
  description:
    "Encryption, isolation, permissioned access, audit trails, and human-in-the-loop controls. The security posture behind the Pastel platform.",
}

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <SecurityPageContent />
      <Footer />
    </>
  )
}
