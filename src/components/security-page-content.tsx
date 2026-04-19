"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FadeUp, StaggerContainer, StaggerItem } from "./motion"
import { Divider } from "./divider"
import {
  GradientOrbs,
  FloatingBadge,
  GlowDot,
} from "./visual-effects"
import {
  DotGrid,
  SectionLabel,
  CornerMarkers,
} from "./decorations"
import { Particles } from "./ui/particles"
import { BorderBeam } from "./ui/border-beam"
import { NumberTicker } from "./ui/number-ticker"
import { AuroraText } from "./ui/aurora-text"
import { ShimmerButton } from "./ui/shimmer-button"
import {
  IconArrowRight,
  IconShield,
  IconLock,
  IconSource,
  IconBrief,
  IconCheck,
  IconOps,
  IconBuilding,
  IconPulse,
  IconStack,
  IconSpark,
  IconClock,
  IconSearch,
} from "./icons"

const ease = [0.25, 0.1, 0.25, 1] as const

/* ─────────────── Hero ─────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-base pt-36 pb-24 grain">
      <GradientOrbs variant="purple" />
      <DotGrid color="rgba(124, 58, 237, 0.05)" size={32} dotSize={1} />
      <Particles
        className="absolute inset-0"
        quantity={50}
        ease={70}
        color="#7C3AED"
        size={0.5}
        staticity={45}
      />

      <div className="pointer-events-none absolute inset-8 hidden lg:block">
        <CornerMarkers />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <FadeUp>
          <div className="relative inline-block mb-7">
            <FloatingBadge>
              <GlowDot color="green" />
              <span className="text-text-secondary">
                SOC 2 Type II · in progress
              </span>
            </FloatingBadge>
            <BorderBeam
              size={60}
              duration={8}
              colorFrom="#C8A2FF"
              colorTo="#8DD0FF"
              borderWidth={1}
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="font-heading text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-heading-tight text-text-primary mb-7">
            Security you can{" "}
            <em className="not-italic font-normal italic">
              <AuroraText
                colors={["#8DD0FF", "#C8A2FF", "#FFB8D9", "#FFCFA0", "#8DD0FF"]}
                speed={1.1}
              >
                send to your CISO.
              </AuroraText>
            </em>
          </h1>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary leading-relaxed mb-10">
            Pastel reads confidential deal information, so security is a
            first-class part of the product. Encryption, isolation,
            permissioned access, audit trails, and human-in-the-loop controls
            are built in from day one.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/#contact" className="inline-flex">
              <ShimmerButton
                background="#14141C"
                shimmerColor="#C8A2FF"
                shimmerDuration="2.5s"
                className="magnetic px-8 py-4 text-base font-medium shadow-pastel"
              >
                <span className="inline-flex items-center gap-2">
                  Request security pack
                  <IconArrowRight size={16} />
                </span>
              </ShimmerButton>
            </Link>
            <a
              href="#compliance"
              className="inline-flex items-center gap-2 rounded-full border border-pastel-border bg-surface/60 backdrop-blur-sm px-8 py-4 text-base font-medium text-text-primary transition-all duration-300 hover:border-accent/40 hover:bg-surface"
            >
              Review the posture
            </a>
          </div>
        </FadeUp>

        {/* Stat strip */}
        <FadeUp delay={0.3}>
          <div className="mt-14 flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {[
              { value: 256, suffix: "-bit", label: "AES at rest" },
              { value: 100, suffix: "%", label: "TLS in transit" },
              { value: 24, suffix: "h", label: "Incident notify" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && <div className="h-10 w-px bg-pastel-border" />}
                <div className="flex flex-col">
                  <span className="font-heading text-2xl sm:text-3xl text-text-primary leading-none">
                    <NumberTicker
                      value={stat.value}
                      className="text-text-primary"
                    />
                    {stat.suffix}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] text-text-tertiary mt-2">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────── Compliance & standards ─────────────── */

const standards = [
  {
    icon: IconShield,
    title: "SOC 2 Type II",
    status: "In progress",
    detail:
      "Implementing the Trust Services Criteria across security, availability, and confidentiality. Bridge letter available on request.",
  },
  {
    icon: IconSource,
    title: "GDPR &amp; UK GDPR",
    status: "Compliant",
    detail:
      "Data Processing Addendum, Standard Contractual Clauses, and UK IDTA available for customers in the EEA and UK.",
  },
  {
    icon: IconLock,
    title: "Encryption standards",
    status: "Active",
    detail:
      "AES-256 at rest and TLS 1.2+ in transit. Keys managed via cloud-provider KMS with regular rotation.",
  },
  {
    icon: IconBrief,
    title: "Data Processing Addendum",
    status: "Available",
    detail:
      "Standard DPA with enterprise customers, including subprocessor transparency and incident-notification commitments.",
  },
]

function Compliance() {
  return (
    <section
      id="compliance"
      className="relative overflow-hidden bg-surface py-28 grain"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-16">
          <SectionLabel color="deep">Compliance</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            Standards we hold{" "}
            <em className="gradient-text not-italic font-normal italic">
              ourselves to.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto">
            We build for teams that handle confidential deal work. That means
            documented controls, not just good intentions.
          </p>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid gap-5 sm:grid-cols-2"
        >
          {standards.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="group relative h-full rounded-2xl border border-pastel-border bg-base p-7 transition-all duration-500 hover:border-pastel-border-hover hover:shadow-pastel overflow-hidden">
                {i === 0 && (
                  <BorderBeam
                    size={80}
                    duration={10}
                    colorFrom="#8DD0FF"
                    colorTo="#C8A2FF"
                    borderWidth={1}
                  />
                )}
                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <s.icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="font-heading text-lg text-text-primary"
                        dangerouslySetInnerHTML={{ __html: s.title }}
                      />
                      <span className="text-[9px] uppercase tracking-[2px] text-accent border border-accent/30 bg-accent/10 rounded-full px-2 py-0.5">
                        {s.status}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-text-secondary">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ─────────────── Four-pillar block builder ─────────────── */

interface Pillar {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  detail: string
}

function PillarBlock({
  eyebrow,
  title,
  emphasis,
  lead,
  pillars,
}: {
  eyebrow: string
  title: string
  emphasis: string
  lead: string
  pillars: Pillar[]
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <FadeUp className="mx-auto max-w-2xl text-center mb-14">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
          {title}{" "}
          <em className="gradient-text not-italic font-normal italic">
            {emphasis}
          </em>
        </h2>
        <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto">
          {lead}
        </p>
      </FadeUp>

      <div
        className={`grid gap-5 ${
          pillars.length === 3
            ? "md:grid-cols-3"
            : "sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {pillars.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.06}>
            <div className="group h-full rounded-2xl border border-pastel-border bg-surface p-6 transition-all duration-500 hover:border-pastel-border-hover hover:shadow-pastel">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4 transition-all duration-500 group-hover:bg-accent/15 group-hover:border-accent/30">
                <p.icon size={18} />
              </div>
              <h3 className="font-heading text-[15px] text-text-primary mb-1.5">
                {p.title}
              </h3>
              <p className="text-[12.5px] leading-relaxed text-text-secondary">
                {p.detail}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  )
}

/* ─────────────── Data protection ─────────────── */

const dataProtection: Pillar[] = [
  {
    icon: IconLock,
    title: "Encryption",
    detail:
      "AES-256 at rest, TLS 1.2+ in transit. Keys managed via cloud-provider KMS with automated rotation and envelope encryption for sensitive fields.",
  },
  {
    icon: IconBuilding,
    title: "Tenant isolation",
    detail:
      "Every customer workspace is logically isolated. Deal and portfolio data never cross fund boundaries. Optional single-tenant deployment is available for enterprise customers.",
  },
  {
    icon: IconSpark,
    title: "No model training",
    detail:
      "Customer content is never used to train generative models. We run inference against foundation models under data-processing agreements that prohibit retention.",
  },
]

function DataProtection() {
  return (
    <section className="relative overflow-hidden bg-base py-28 grain">
      <GradientOrbs variant="default" />
      <PillarBlock
        eyebrow="Data protection"
        title="How your data stays"
        emphasis="yours."
        lead="Encryption, isolation, and a strict no-training policy for customer content."
        pillars={dataProtection}
      />
    </section>
  )
}

/* ─────────────── Access & identity ─────────────── */

const accessControls: Pillar[] = [
  {
    icon: IconCheck,
    title: "SSO &amp; MFA",
    detail:
      "SAML and OIDC single sign-on with enforced multi-factor authentication. No password-only access in the default configuration.",
  },
  {
    icon: IconOps,
    title: "Role-based access",
    detail:
      "Granular workspace permissions. Scope access by deal, by stream, and by user role. Enforce least-privilege without stopping the work.",
  },
  {
    icon: IconSource,
    title: "Audit trail",
    detail:
      "Every administrative and agent action is logged with the actor, target, timestamp, and source link. Exportable to your SIEM.",
  },
  {
    icon: IconShield,
    title: "Human-in-the-loop",
    detail:
      "Outbound agent actions (Slack, email, document requests) require explicit approval before they leave Pastel. No surprises for portfolio CFOs.",
  },
]

function AccessControls() {
  return (
    <section className="relative overflow-hidden bg-surface py-28 grain">
      <PillarBlock
        eyebrow="Access &amp; identity"
        title="Access that respects"
        emphasis="deal discretion."
        lead="Authentication, permissions, and traceability built around how deal teams actually work."
        pillars={accessControls}
      />
    </section>
  )
}

/* ─────────────── Infrastructure & resilience ─────────────── */

const infrastructure: Pillar[] = [
  {
    icon: IconStack,
    title: "Hosted on AWS",
    detail:
      "All production workloads run on AWS in hardened VPCs. Region residency (EU, UK, US) available for enterprise customers.",
  },
  {
    icon: IconClock,
    title: "Backup &amp; recovery",
    detail:
      "Daily encrypted backups with point-in-time recovery. Documented RPO and RTO for production data, tested quarterly.",
  },
  {
    icon: IconPulse,
    title: "High availability",
    detail:
      "Multi-AZ architecture with automatic failover. Rolling deploys; zero-downtime migrations; status published at status.getpastel.ai.",
  },
]

function Infrastructure() {
  return (
    <section className="relative overflow-hidden bg-base py-28 grain">
      <GradientOrbs variant="default" />
      <PillarBlock
        eyebrow="Infrastructure"
        title="Resilience you don&apos;t"
        emphasis="have to think about."
        lead="Production workloads run on hardened AWS infrastructure with documented recovery and availability targets."
        pillars={infrastructure}
      />
    </section>
  )
}

/* ─────────────── Secure development ─────────────── */

const sdlPillars: Pillar[] = [
  {
    icon: IconSearch,
    title: "Code review",
    detail:
      "Every change is peer-reviewed. No direct-to-main commits; branch protection enforced for all production repositories.",
  },
  {
    icon: IconShield,
    title: "Dependency &amp; secret scanning",
    detail:
      "Automated vulnerability scanning on every build. Secret scanning in CI. Known-bad dependencies block merges.",
  },
  {
    icon: IconSpark,
    title: "Annual penetration test",
    detail:
      "Third-party penetration test annually with remediation tracking. Executive summary available under NDA on request.",
  },
  {
    icon: IconBrief,
    title: "Threat modeling",
    detail:
      "Security review required for features that touch authentication, data access, or outbound agent actions.",
  },
]

function SecureDevelopment() {
  return (
    <section className="relative overflow-hidden bg-surface py-28 grain">
      <PillarBlock
        eyebrow="Secure development"
        title="How we build"
        emphasis="the product itself."
        lead="Security is enforced at the development boundary, not bolted on afterward."
        pillars={sdlPillars}
      />
    </section>
  )
}

/* ─────────────── Incident response ─────────────── */

const incidentSteps = [
  {
    num: "01",
    title: "Detect",
    detail:
      "Continuous monitoring, alerting, and on-call rotation. Internal severity classification within 30 minutes of detection.",
  },
  {
    num: "02",
    title: "Contain &amp; investigate",
    detail:
      "Defined runbooks for containment. Incident commander appointed for severity-1 and severity-2 events.",
  },
  {
    num: "03",
    title: "Notify",
    detail:
      "Affected customers notified within 24 hours of confirming a qualifying security incident, per our Data Processing Addendum.",
  },
  {
    num: "04",
    title: "Remediate &amp; learn",
    detail:
      "Post-incident review within 10 business days. Structural fixes tracked to completion; summary shared with impacted customers.",
  },
]

function IncidentResponse() {
  return (
    <section className="relative overflow-hidden bg-base py-28 grain">
      <GradientOrbs variant="default" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-14">
          <SectionLabel>Incident response</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            Prepared for the{" "}
            <em className="gradient-text not-italic font-normal italic">
              worst day.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto">
            We hope never to use these runbooks. We practice them anyway.
          </p>
        </FadeUp>

        <div className="space-y-3">
          {incidentSteps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.06}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="group flex items-start gap-5 rounded-2xl border border-pastel-border bg-surface px-6 py-5 transition-all duration-500 hover:border-pastel-border-hover hover:shadow-pastel"
              >
                <span className="font-heading text-2xl text-accent/80 shrink-0 w-10">
                  {s.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[14.5px] font-medium text-text-primary mb-1"
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                  <p className="text-[13px] text-text-secondary leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Subprocessors / transparency ─────────────── */

const subprocessors = [
  { name: "AWS", purpose: "Core infrastructure and data storage", region: "EU / UK / US" },
  { name: "Anthropic", purpose: "Foundation model inference (no training)", region: "US" },
  { name: "OpenAI", purpose: "Foundation model inference (no training)", region: "US" },
  { name: "Vercel", purpose: "Marketing site hosting", region: "Global edge" },
  { name: "Resend", purpose: "Transactional email delivery", region: "US" },
  { name: "Slack API", purpose: "Agent outbound messaging (customer-authorized)", region: "US" },
]

function Subprocessors() {
  return (
    <section className="relative overflow-hidden bg-surface py-28 grain">
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-12">
          <SectionLabel color="deep">Transparency</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            Every service we rely on,{" "}
            <em className="gradient-text not-italic font-normal italic">
              listed.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto">
            A current list of subprocessors who may handle customer data on our
            behalf. We notify customers before adding new ones.
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="rounded-2xl border border-pastel-border bg-base shadow-pastel overflow-hidden">
            <div className="grid grid-cols-[1.2fr_2fr_1fr] gap-4 border-b border-pastel-border/70 bg-surface px-6 py-3 text-[10px] uppercase tracking-[2px] text-text-tertiary">
              <div>Service</div>
              <div>Purpose</div>
              <div>Region</div>
            </div>
            {subprocessors.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
                className="grid grid-cols-[1.2fr_2fr_1fr] gap-4 border-b border-pastel-border/40 last:border-0 px-6 py-4 text-[13px] transition-colors hover:bg-surface/60"
              >
                <div className="font-medium text-text-primary">{p.name}</div>
                <div className="text-text-secondary">{p.purpose}</div>
                <div className="text-text-tertiary text-[12px]">{p.region}</div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────── Closing CTA ─────────────── */

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-base py-32 grain">
      <GradientOrbs variant="cta" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <FadeUp>
          <SectionLabel color="deep">Security pack</SectionLabel>
          <h2 className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-heading-tight text-text-primary mb-6 text-balance">
            Send it to your{" "}
            <em className="gradient-text not-italic font-normal italic">
              CISO and legal team.
            </em>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-text-secondary leading-relaxed mb-9">
            Request the full pack: DPA, subprocessor list, pen-test summary,
            and answers to your security questionnaire. Usually returned within
            two business days.
          </p>
          <Link href="/#contact" className="inline-flex">
            <ShimmerButton
              background="#14141C"
              shimmerColor="#C8A2FF"
              shimmerDuration="2.5s"
              className="magnetic px-8 py-4 text-base font-medium shadow-pastel"
            >
              <span className="inline-flex items-center gap-2">
                Request the security pack
                <IconArrowRight size={16} />
              </span>
            </ShimmerButton>
          </Link>
          <p className="mt-6 text-[12px] text-text-tertiary">
            Or email{" "}
            <a
              href="mailto:security@getpastel.ai"
              className="text-accent hover:underline"
            >
              security@getpastel.ai
            </a>{" "}
            directly.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────── Page ─────────────── */

export function SecurityPageContent() {
  return (
    <main>
      <Hero />
      <Divider />
      <Compliance />
      <Divider />
      <DataProtection />
      <Divider />
      <AccessControls />
      <Divider />
      <Infrastructure />
      <Divider />
      <SecureDevelopment />
      <Divider />
      <IncidentResponse />
      <Divider />
      <Subprocessors />
      <Divider />
      <ClosingCTA />
    </main>
  )
}
