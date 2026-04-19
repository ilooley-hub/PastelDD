import type { Metadata } from "next"
import { Instrument_Serif, DM_Sans } from "next/font/google"
import "./globals.css"
import { CursorOrb } from "@/components/cursor-orb"

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pastel | AI-Powered Due Diligence for Private Equity",
  description:
    "Comprehensive financial and operational DD briefs in 48 hours. Fully queryable, source-traceable, built for PE firms and family offices.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased bg-base text-text-primary">
        <CursorOrb />
        {children}
      </body>
    </html>
  )
}
