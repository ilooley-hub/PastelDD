import type { Metadata } from "next"
import { Instrument_Serif, Instrument_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://getpastel.ai"),
  title: "Pastel · The autonomous finance department",
  description:
    "Pastel runs your company's finance work end to end. Agents handle the routine; your team reviews and signs.",
  openGraph: {
    title: "Pastel · The autonomous finance department",
    description:
      "Pastel runs your company's finance work end to end. Agents handle the routine; your team reviews and signs.",
    images: ["/og-home.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sourceSerif.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        {/* Cookie consent: loads Google Tag Manager and Apollo only after the visitor accepts (public/consent.js). */}
        <Script src="/consent.js" strategy="afterInteractive" />
      </head>
      <body className="font-sans antialiased bg-base text-fg-1">
        {children}
        <Analytics />
        {/* How visitors arrived, for demo requests in Pastel HQ (public/attribution.js). */}
        <Script src="/attribution.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
