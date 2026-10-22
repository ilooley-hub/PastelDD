import type { Metadata } from "next"
import { Instrument_Serif, Instrument_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const GTM_ID = "GTM-NQ9S6W79"
const APOLLO_APP_ID = "69f667e8a704d400110e746c"

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
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* Apollo website visitor tracking: shows which companies visit, for the Warm Visitors loop. */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
            o.onload=function(){window.trackingFunctions.onLoad({appId:"${APOLLO_APP_ID}"})},
            document.head.appendChild(o)}initApollo();
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-base text-fg-1">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
        {/* How visitors arrived, for demo requests in Pastel HQ (public/attribution.js). */}
        <Script src="/attribution.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
