/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // old positioning page; the firms page serves this audience now
      { source: "/fractional-cfo", destination: "/firms", permanent: true },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles wins over app routes: the redesigned static pages take over
      // the routes they replace, while React routes not listed here (privacy,
      // terms, governance, due-diligence, fractional-cfo) keep working.
      beforeFiles: [
        { source: "/", destination: "/pastel_homepage_v5.html" },
        { source: "/security", destination: "/pastel_security.html" },
        { source: "/platform", destination: "/pastel_platform.html" },
        { source: "/firms", destination: "/pastel_firms.html" },
        { source: "/book-a-demo", destination: "/pastel_demo.html" },
        { source: "/due-diligence", destination: "/pastel_due_diligence.html" },
        { source: "/thanks", destination: "/thanks.html" },
      ],
    };
  },
};

export default nextConfig;
