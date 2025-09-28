import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/components/providers/language-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "KrushiBandhu - AI-Powered Farming Assistant",
  description: "Your intelligent farming companion...",
  generator: "v0.app",
  keywords: [],
  authors: [{ name: "KrushiBandhu Team" }],
  viewport: "width=device-width, initial-scale=1", // ✅ allow zoom & scaling
  themeColor: "#059669",
  manifest: "/manifest.json",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KrishiBandu" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="KrishiBandu" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
