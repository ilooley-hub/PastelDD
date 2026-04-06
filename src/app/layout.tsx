import type { Metadata } from "next"
import { Instrument_Serif, DM_Sans, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

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
      className={cn(instrumentSerif.variable, "font-sans", geist.variable)}
    >
      <body className="font-sans antialiased bg-base text-text-primary">
        {children}
      </body>
    </html>
  )
}
