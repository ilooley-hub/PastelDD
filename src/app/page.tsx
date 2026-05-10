import dynamic from "next/dynamic"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Ingestion } from "@/components/sections/Ingestion"
import { Playbook } from "@/components/sections/Playbook"
import { Querying } from "@/components/sections/Querying"
import { CtaBlock } from "@/components/sections/CtaBlock"

const Reporting = dynamic(
  () => import("@/components/sections/Reporting").then((m) => m.Reporting),
  { ssr: false }
)

function Divider() {
  return (
    <div className="px-12">
      <div className="section-divider" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ingestion />
        <Divider />
        <Querying />
        <Divider />
        <Reporting />
        <Divider />
        <Playbook />
        <Divider />
        <CtaBlock />
      </main>
      <Footer />
    </>
  )
}
