import { type Metadata } from 'next'
import { ClerkProvider, SignInButton, SignUpButton, SignedOut } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'RenderNova - AI Image Transformation',
  description: 'Transform your images with AI-powered tools',
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
          <SignedOut>
            <header className="navbar">
              <div className="navbar-container">
                <div className="navbar-brand">
                  <h1 className="brand-text">RenderNova</h1>
                </div>
                <div className="navbar-auth">
                  <SignInButton mode="modal">
                    <button className="auth-button signin-button">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="auth-button signup-button">Sign Up</button>
                  </SignUpButton>
                </div>
              </div>
            </header>
          </SignedOut>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}