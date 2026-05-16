import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: 'UniClubs - University Club Management Platform',
    template: '%s | UniClubs',
  },
  description: 'Discover clubs, manage events, and build community in one polished campus experience. Connect with fellow students, join exciting clubs, and never miss an event.',
  keywords: ['university', 'clubs', 'events', 'students', 'campus', 'community', 'AAU', 'Addis Ababa University', 'student organizations'],
  authors: [{ name: 'UniClubs Team' }],
  creator: 'UniClubs',
  publisher: 'UniClubs',
  metadataBase: new URL('https://uniclubs.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://uniclubs.vercel.app',
    siteName: 'UniClubs',
    title: 'UniClubs - University Club Management Platform',
    description: 'Discover clubs, manage events, and build community in one polished campus experience.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UniClubs - Connect, Collaborate, Grow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UniClubs - University Club Management Platform',
    description: 'Discover clubs, manage events, and build community in one polished campus experience.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#050a14' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
