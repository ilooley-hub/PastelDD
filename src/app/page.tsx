import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { Divider } from "@/components/divider"
import { StatsRow } from "@/components/stats-row"
import { DataFlow } from "@/components/data-flow"
import { HowItWorks } from "@/components/how-it-works"
import { ProductBento } from "@/components/product-bento"
import { SocialProof } from "@/components/social-proof"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Divider />
        <StatsRow />
        <Divider />
        <DataFlow />
        <Divider />
        <HowItWorks />
        <Divider />
        <ProductBento />
        <Divider />
        <SocialProof />
        <Divider />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
