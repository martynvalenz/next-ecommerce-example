import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/config/fonts'
import { Providers } from '@/components/providers/Providers'

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Teslo | Shop'
  },
  description: 'This is a cool store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
