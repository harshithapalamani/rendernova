import React from 'react'
import Sidebar from '@/components/shared/sidebar'
import MobileNav from '@/components/shared/MobileNav'
import { UserButton } from '@clerk/nextjs'
import { Toaster } from 'sonner'

const Layout = ({children}: {children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <div className="root-container">
        {/* Top Navbar for authenticated users - matching pre-signin style */}
        <header className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <h1 className="brand-text">RenderNova</h1>
            </div>
            <div className="navbar-auth">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>
        
        <div className="lg:hidden">
          <MobileNav />
        </div>
        <div className="wrapper">
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  )
}

export default Layout