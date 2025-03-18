import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KamianiKarani',
  description: 'KamianiKarani - украшения и предметы интерьера',
  icons: {
    icon: [
      { url: '/kamianikarani.svg', type: 'image/svg+xml' },
      { url: '/kamianikarani.png', type: 'image/png' }
    ],
    apple: [
      { url: '/kamianikarani.png', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
