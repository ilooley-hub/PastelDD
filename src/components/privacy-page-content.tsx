import { LegalPage, type LegalSection } from "./legal-page"

const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p {...props} />
)
const UL = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    {...props}
    className="list-disc pl-5 space-y-1.5 marker:text-accent/60"
  />
)
const Strong = (props: React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...props} className="text-text-primary font-medium" />
)

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <>
        <P>
          Pastel AI Ltd. (&ldquo;Pastel,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) builds AI-powered
          diligence and portfolio governance software for private equity firms,
          family offices, and their portfolio companies. This policy explains
          what information we collect when you use our website and services,
          how we use it, and the choices you have.
        </P>
        <P>
          This policy applies to information we process as a <Strong>controller</Strong> (for
          example, information you provide on our marketing site or when booking
          a demo). When we process your deal or portfolio-company data through
          the Pastel platform, we do so as a <Strong>processor</Strong> on behalf
          of our customer; that processing is governed by the Data Processing
          Addendum signed with the customer.
        </P>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <P>We collect the following categories of information:</P>
        <UL>
          <li>
            <Strong>Account &amp; contact information.</Strong> Name, business
            email, firm or company name, role, and any message content you send
            us when you request a demo, contact support, or sign up for an
            account.
          </li>
          <li>
            <Strong>Authentication data.</Strong> Identifiers used to sign in,
            including single sign-on identifiers issued by your identity provider.
          </li>
          <li>
            <Strong>Customer content.</Strong> Documents, contracts, financials,
            and communications that customers upload or connect to the platform.
            We process this on the customer&apos;s behalf under our Data
            Processing Addendum.
          </li>
          <li>
            <Strong>Usage &amp; device data.</Strong> Pages visited, features
            used, IP address, browser type, operating system, and timestamps,
            collected through cookies and server logs.
          </li>
          <li>
            <Strong>Correspondence.</Strong> Records of communications you have
            with us, including support tickets and sales conversations.
          </li>
        </UL>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: (
      <>
        <P>We use the information we collect to:</P>
        <UL>
          <li>Provide, secure, and improve the Pastel platform.</li>
          <li>
            Authenticate users, manage accounts, and enforce access controls.
          </li>
          <li>
            Respond to demo requests, support inquiries, and other communications.
          </li>
          <li>
            Send service-related notices, product updates, and occasional
            marketing communications (you can opt out of marketing at any time).
          </li>
          <li>
            Detect, investigate, and prevent fraud, abuse, and security incidents.
          </li>
          <li>Meet our legal, regulatory, and contractual obligations.</li>
        </UL>
        <P>
          We do not sell personal information, and we do not use customer
          content to train generative models.
        </P>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing &amp; disclosures",
    body: (
      <>
        <P>We share information only as needed and with the following categories:</P>
        <UL>
          <li>
            <Strong>Service providers and subprocessors</Strong> that host our
            infrastructure, provide analytics, send transactional email, or
            otherwise help us operate Pastel. A current list is available on
            request.
          </li>
          <li>
            <Strong>Your own organization</Strong> and its authorized users,
            according to the access controls configured in your workspace.
          </li>
          <li>
            <Strong>Law enforcement or regulators</Strong> when we have a good-faith
            belief that disclosure is required by law or necessary to protect
            rights, safety, or property.
          </li>
          <li>
            <Strong>Successors</Strong> in the event of a merger, acquisition,
            or sale of assets, subject to equivalent protections.
          </li>
        </UL>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    body: (
      <>
        <P>
          We retain personal information for as long as needed to provide the
          services, comply with legal obligations, resolve disputes, and enforce
          our agreements. Retention periods depend on the category of data and
          are documented in our Data Processing Addendum for customer content.
        </P>
        <P>
          When information is no longer needed, we delete it or anonymize it so
          it can no longer be associated with an identifiable individual.
        </P>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <>
        <P>
          We encrypt data in transit (TLS) and at rest, isolate customer
          workspaces, log administrative activity, and follow the practices
          described on our <a href="/security" className="text-accent hover:underline">Security page</a>.
          No system is perfectly secure; if you believe your account or our
          systems have been compromised, contact us immediately.
        </P>
      </>
    ),
  },
  {
    id: "international",
    title: "International transfers",
    body: (
      <>
        <P>
          Pastel is operated from the United Kingdom and processes data in the
          United Kingdom, the European Economic Area, and the United States.
          When personal information is transferred across jurisdictions, we
          rely on approved transfer mechanisms, including the UK International
          Data Transfer Agreement and the EU Standard Contractual Clauses where
          applicable.
        </P>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <P>
          Depending on your jurisdiction, you may have rights to access,
          correct, delete, restrict, or object to our processing of your
          personal information, as well as rights to portability and to withdraw
          consent. To exercise these rights, email{" "}
          <a
            href="mailto:privacy@getpastel.ai"
            className="text-accent hover:underline"
          >
            privacy@getpastel.ai
          </a>
          . You may also have the right to lodge a complaint with a supervisory
          authority.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <P>
          We use a small number of cookies and similar technologies to keep you
          signed in, remember your preferences, and understand aggregate usage.
          You can control cookies through your browser settings. Disabling
          cookies may affect the functionality of the service.
        </P>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <>
        <P>
          Pastel is not directed to children under 16 and we do not knowingly
          collect personal information from them. If you believe a child has
          provided personal information to us, please contact us and we will
          delete it.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <>
        <P>
          We may update this policy from time to time. When we do, we will
          revise the &ldquo;Last updated&rdquo; date above. Material changes
          will be communicated to account holders by email or in-product notice
          before they take effect.
        </P>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <P>
          If you have questions about this policy or our privacy practices,
          email{" "}
          <a
            href="mailto:privacy@getpastel.ai"
            className="text-accent hover:underline"
          >
            privacy@getpastel.ai
          </a>{" "}
          or write to us at Pastel AI Ltd., United Kingdom.
        </P>
      </>
    ),
  },
]

export function PrivacyPageContent() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      lead="How Pastel handles personal information, customer content, and the data you share with us through our website and platform."
      lastUpdated="April 19, 2026"
      sections={sections}
    />
  )
}
