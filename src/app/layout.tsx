import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/config/fonts'
import { AuthProvider } from '@/components/providers/AuthProvider'

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
        <AuthProvider>
          {children}  
        </AuthProvider>      
      </body>
    </html>
  )
}
