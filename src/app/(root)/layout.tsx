import React from 'react'
import Sidebar from '@/components/shared/sidebar'
import MobileNav from '@/components/shared/MobileNav'

const Layout = ({children}: {children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <div className="root-container">
        <div className="lg:hidden">
          <MobileNav />
        </div>
        <div className="wrapper">
          {children}
        </div>
      </div>
    </main>
  )
}

export default Layout