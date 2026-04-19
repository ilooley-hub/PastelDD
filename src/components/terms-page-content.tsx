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

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance",
    body: (
      <>
        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
          use of the Pastel websites, applications, and services
          (&ldquo;Services&rdquo;) provided by Pastel AI Ltd. (&ldquo;Pastel,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us&rdquo;). By accessing or using the
          Services, you agree to be bound by these Terms and our{" "}
          <a href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </a>
          .
        </P>
        <P>
          If you are using the Services on behalf of a company or other entity,
          you represent that you have authority to bind that entity to these
          Terms, and &ldquo;you&rdquo; will refer to that entity.
        </P>
      </>
    ),
  },
  {
    id: "the-services",
    title: "The Services",
    body: (
      <>
        <P>
          Pastel provides AI-powered diligence and portfolio-governance tooling
          for private equity firms, family offices, and their portfolio
          companies. Specific capabilities, usage limits, and service levels are
          described in the applicable order form, statement of work, or Data
          Processing Addendum.
        </P>
        <P>
          We may modify, add, or remove features from time to time. We will not
          make material reductions to paid functionality during an active
          subscription term without notice.
        </P>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Accounts &amp; access",
    body: (
      <>
        <P>
          You are responsible for keeping your account credentials secure and
          for all activity that occurs through your account. You must notify us
          immediately if you suspect unauthorized access.
        </P>
        <P>
          You are responsible for your users and for ensuring that your users
          comply with these Terms. Access is granted to named individuals;
          shared credentials are not permitted.
        </P>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <P>You agree not to:</P>
        <UL>
          <li>
            Use the Services to violate applicable law or third-party rights.
          </li>
          <li>
            Upload or submit content that you do not have the right to provide.
          </li>
          <li>
            Reverse engineer, circumvent access controls, or attempt to gain
            unauthorized access to the Services or associated systems.
          </li>
          <li>
            Use the Services to develop or train a competing AI product, or to
            benchmark the Services without our prior written consent.
          </li>
          <li>
            Interfere with or disrupt the Services, or introduce malicious code.
          </li>
          <li>
            Resell, sublicense, or make the Services available to third parties
            beyond your organization without our agreement.
          </li>
        </UL>
      </>
    ),
  },
  {
    id: "customer-data",
    title: "Customer data",
    body: (
      <>
        <P>
          &ldquo;Customer Data&rdquo; means the documents, information, and
          other data you upload, connect, or otherwise make available to the
          Services. You retain all rights to Customer Data.
        </P>
        <P>
          You grant Pastel a limited, non-exclusive license to use Customer Data
          solely to provide, secure, and maintain the Services for you. We do
          not use Customer Data to train generative models.
        </P>
        <P>
          Our handling of personal information within Customer Data is governed
          by our Data Processing Addendum, which forms part of these Terms for
          customers to whom it applies.
        </P>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <P>
          The Services, including all underlying software, models, content, and
          trademarks, are and remain the property of Pastel and its licensors.
          These Terms do not transfer any rights in the Services except for the
          limited right to use them in accordance with these Terms.
        </P>
        <P>
          If you provide feedback or suggestions, you grant us a perpetual,
          royalty-free license to use that feedback to improve the Services.
        </P>
      </>
    ),
  },
  {
    id: "ai-outputs",
    title: "AI outputs",
    body: (
      <>
        <P>
          The Services include features that generate summaries, analyses, and
          other AI-produced outputs (&ldquo;Outputs&rdquo;) based on Customer
          Data and other inputs. AI outputs may contain errors or omissions.
          You are responsible for reviewing outputs before relying on them for
          investment, legal, or other decisions.
        </P>
        <P>
          As between you and Pastel, you own Outputs derived from your Customer
          Data, subject to the rights of third parties in the underlying data
          and content.
        </P>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees",
    body: (
      <>
        <P>
          Paid access to the Services is governed by the order form or other
          written agreement between you and Pastel. Fees are exclusive of taxes.
          Unless otherwise stated, invoices are due within 30 days of issue.
          Overdue amounts may bear interest at the lower of 1.5% per month or
          the maximum rate permitted by law.
        </P>
        <P>
          We may suspend access for accounts with materially overdue balances
          after reasonable notice.
        </P>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <>
        <P>
          Each party may receive confidential information from the other in
          connection with the Services. The receiving party will use the same
          degree of care it uses to protect its own confidential information
          (but no less than reasonable care) and will not disclose it except as
          permitted by these Terms or required by law.
        </P>
      </>
    ),
  },
  {
    id: "warranties",
    title: "Warranties &amp; disclaimers",
    body: (
      <>
        <P>
          Each party represents that it has the authority to enter into these
          Terms. Pastel warrants that the Services will materially conform to
          our published documentation during an active subscription.
        </P>
        <P>
          EXCEPT AS EXPRESSLY STATED, THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo;
          AND PASTEL DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED,
          INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. PASTEL DOES NOT WARRANT THAT THE SERVICES WILL BE
          UNINTERRUPTED OR ERROR-FREE, OR THAT AI OUTPUTS WILL BE ACCURATE OR
          COMPLETE.
        </P>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <P>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE
          FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
          OR FOR LOST PROFITS, REVENUE, OR DATA, ARISING OUT OF OR RELATED TO
          THESE TERMS OR THE SERVICES. EACH PARTY&apos;S TOTAL LIABILITY ARISING
          OUT OF OR RELATED TO THESE TERMS WILL NOT EXCEED THE AMOUNTS PAID OR
          PAYABLE BY YOU TO PASTEL IN THE 12 MONTHS PRECEDING THE CLAIM.
        </P>
        <P>
          These limitations do not apply to breaches of confidentiality,
          indemnification obligations, or liability that cannot be limited by
          law.
        </P>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <>
        <P>
          You will defend, indemnify, and hold Pastel harmless against claims
          arising from your Customer Data, your use of the Services in breach
          of these Terms, or your violation of applicable law or third-party
          rights.
        </P>
        <P>
          Pastel will defend, indemnify, and hold you harmless against claims
          that the Services, as provided by us and used in accordance with
          these Terms, infringe a third-party intellectual property right,
          subject to customary carve-outs.
        </P>
      </>
    ),
  },
  {
    id: "term",
    title: "Term &amp; termination",
    body: (
      <>
        <P>
          These Terms remain in effect while you use the Services. Either party
          may terminate for material breach that remains uncured 30 days after
          written notice. We may suspend access if required to protect the
          security or integrity of the Services.
        </P>
        <P>
          On termination, your right to use the Services ends. Sections that by
          their nature should survive termination will do so (including
          confidentiality, IP, disclaimers, liability limits, and indemnities).
        </P>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law &amp; disputes",
    body: (
      <>
        <P>
          These Terms are governed by the laws of England and Wales, without
          regard to conflict-of-laws principles. The courts of England and Wales
          will have exclusive jurisdiction over any dispute arising out of or
          related to these Terms, unless a different forum is required by a
          separately executed agreement.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    body: (
      <>
        <P>
          We may update these Terms from time to time. When we do, we will
          update the &ldquo;Last updated&rdquo; date above. Material changes
          will be communicated to active customers by email or in-product
          notice before they take effect.
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
          Questions about these Terms? Email{" "}
          <a
            href="mailto:legal@getpastel.ai"
            className="text-accent hover:underline"
          >
            legal@getpastel.ai
          </a>
          .
        </P>
      </>
    ),
  },
]

export function TermsPageContent() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      lead="The agreement that governs your access to and use of the Pastel platform, marketing site, and related services."
      lastUpdated="April 19, 2026"
      sections={sections}
    />
  )
}
