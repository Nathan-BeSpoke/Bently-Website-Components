import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Selection Demo',
  description: 'A responsive car selection component built with Next.js',
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