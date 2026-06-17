import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fractional CFO Software · Continuous Client Monitoring · Pastel",
  description:
    "Pastel is the platform behind modern fractional CFO practices. Continuous client monitoring, board-ready briefs, anomaly detection. Make your office more valuable to every client you serve.",
  openGraph: {
    title: "Fractional CFO Software · Continuous Client Monitoring · Pastel",
    description:
      "Pastel is the platform behind modern fractional CFO practices. Continuous client monitoring, board-ready briefs, anomaly detection. Make your office more valuable to every client you serve.",
    images: ["/og.png"],
  },
}

export default function FractionalCfoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
