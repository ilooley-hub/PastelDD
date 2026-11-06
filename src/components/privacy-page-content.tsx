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
          Pastel Ltd., a company incorporated in Delaware, United States
          (&ldquo;Pastel,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), builds
          AI software that runs finance work, such as bookkeeping, bills,
          payroll, reporting and the month-end close, for accounting firms and
          the companies they serve. This policy explains
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
          We do not sell personal information for money, and we do not use
          customer content to train generative models. Under some US state
          laws, using analytics and marketing cookies (described under
          &ldquo;Cookies&rdquo; below) may count as &ldquo;sharing&rdquo;
          personal information. These run only if you choose &ldquo;Accept
          all&rdquo;, and you can turn them off at any time.
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
          Pastel is based in the United States. Our service providers may
          process data in the United States, the United Kingdom, and the
          European Economic Area. If you are in the UK or EEA, your personal
          information will be transferred to the United States. When it is,
          we rely on approved transfer mechanisms, such as the EU Standard
          Contractual Clauses and the UK International Data Transfer Agreement
          or Addendum, where applicable.
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
          Depending on where you live, you may have some or all of the
          following rights over your personal information:
        </P>
        <UL>
          <li>
            <Strong>United States.</Strong> Residents of California and other
            states with consumer privacy laws may have the right to know what
            personal information we collect and how we use it; to access,
            correct, or delete it; and to opt out of the &ldquo;sale&rdquo; or
            &ldquo;sharing&rdquo; of personal information and of targeted
            advertising. You can opt out of analytics and marketing cookies at
            any time through &ldquo;Cookie settings&rdquo; in the footer. If we
            decline your request, you may appeal by replying to our decision.
          </li>
          <li>
            <Strong>United Kingdom and European Economic Area.</Strong> You may
            have the right to access, correct, delete, restrict, or object to
            our processing of your personal information, to data portability,
            and to withdraw consent at any time. You may also lodge a complaint
            with your local data protection authority.
          </li>
        </UL>
        <P>
          To exercise any of these rights, email{" "}
          <a
            href="mailto:ilan@getpastel.ai"
            className="text-accent hover:underline"
          >
            ilan@getpastel.ai
          </a>
          . We may need to verify your identity before acting on a request,
          and you may use an authorized agent to make a request for you. We
          will not treat you differently for exercising your rights.
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
          We use a small number of cookies and similar technologies on our
          website. When you first visit, we ask for your permission before
          setting anything that is not strictly necessary.
        </P>
        <P>
          <strong>Strictly necessary.</strong> These make the site work and are
          always on. They include a cookie called <code>pastel_consent</code>,
          which remembers your cookie choice for six months. We also use Vercel
          Web Analytics, which counts page views without cookies and without
          identifying you.
        </P>
        <P>
          <strong>Analytics and marketing (only with your permission).</strong>{" "}
          Google Tag Manager and the tags it loads (such as Google Analytics)
          help us understand how the site is used. Apollo.io identifies which
          companies visit our website so we can follow up with relevant
          businesses. We also remember, in your browser, how you first arrived
          (for example the referring site or campaign), so a demo request shows
          where it came from. None of these run unless you choose
          &ldquo;Accept all&rdquo;.
        </P>
        <P>
          You can change your choice at any time using the &ldquo;Cookie
          settings&rdquo; link in the footer of every page, or{" "}
          <a href="#cookie-settings" className="underline">
            open cookie settings now
          </a>
          . You can also block or delete cookies through your browser settings.
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
            href="mailto:ilan@getpastel.ai"
            className="text-accent hover:underline"
          >
            ilan@getpastel.ai
          </a>
          . Pastel Ltd. is incorporated in Delaware, United States.
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
      lastUpdated="November 6, 2026"
      sections={sections}
    />
  )
}
