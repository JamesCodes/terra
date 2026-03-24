import type { Metadata } from "next"
import { DM_Sans, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

const seasonMix = localFont({
  src: [
    { path: "../public/fonts/SeasonMix-Medium.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/SeasonMix-MediumItalic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-season-mix",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Terra",
  description: "Offensive security built for the AI era",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${seasonMix.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
