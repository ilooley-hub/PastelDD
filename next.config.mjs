/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // old positioning page; the firms page (now the homepage) serves this audience
      { source: "/fractional-cfo", destination: "/", permanent: true },
      // The firms page became the homepage (Oct 2026). Not permanent, in case that changes.
      { source: "/firms", destination: "/", permanent: false },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles wins over app routes: the redesigned static pages take over
      // the routes they replace, while React routes not listed here (privacy,
      // terms, governance, due-diligence, fractional-cfo) keep working.
      beforeFiles: [
        // Accounting firms are who Pastel sells to first, so their page is the homepage;
        // the page for companies' own finance teams lives at /companies.
        { source: "/", destination: "/pastel_firms.html" },
        { source: "/companies", destination: "/pastel_homepage_v5.html" },
        { source: "/security", destination: "/pastel_security.html" },
        { source: "/platform", destination: "/pastel_platform.html" },
        { source: "/book-a-demo", destination: "/pastel_demo.html" },
        { source: "/due-diligence", destination: "/pastel_due_diligence.html" },
        { source: "/thanks", destination: "/thanks.html" },
      ],
    };
  },
};

export default nextConfig;
