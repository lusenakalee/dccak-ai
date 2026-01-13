import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"


import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import SidebarToggle from '@/components/SidebarToggle'
import { AppSidebar } from '@/components/app-sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dccak ai update',
  description: 'DCCAK',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
         
          <main>
<SidebarProvider>
<SidebarInset>

          {children}
              
</SidebarInset>

<AppSidebar side="right" />

   {/* <FloatingDock /> */}
              <SidebarToggle /> 
</SidebarProvider>
          </main>
              <Toaster />
              </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}