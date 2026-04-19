import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { Divider } from "@/components/divider"
import { StatsRow } from "@/components/stats-row"
import { BriefSections } from "@/components/brief-sections"
import { DataFlow } from "@/components/data-flow"
import { HowItWorks } from "@/components/how-it-works"
import { Comparison } from "@/components/comparison"
import { ProductBento } from "@/components/product-bento"
import { FAQ } from "@/components/faq"
import { ContactSection } from "@/components/contact-form"
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
        <BriefSections />
        <Divider />
        <DataFlow />
        <Divider />
        <HowItWorks />
        <Divider />
        <Comparison />
        <Divider />
        <ProductBento />
        <Divider />
        <FAQ />
        <Divider />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
