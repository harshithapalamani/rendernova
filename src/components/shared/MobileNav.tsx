"use client"

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={50}
          height={28}
        />
        <span className="text-xl font-bold text-gray-800">RenderNova</span>
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image 
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                <div className="flex items-center gap-2 mb-8">
                  <Image 
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={50}
                    height={28}
                  />
                  <span className="text-lg font-bold text-gray-800">RenderNova</span>
                </div>

                <ul className="header-nav_elements">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname

                    return (
                      <li 
                        className={`${isActive ? 'gradient-text' : 'text-gray-700'} p-2 flex whitespace-nowrap`}
                        key={link.route}
                      >
                        <Link className="sidebar-link cursor-pointer w-full" href={link.route}>
                          <Image 
                            src={link.icon}
                            alt={link.label}
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-8 pt-4 border-t border-gray-200">
                  <UserButton afterSignOutUrl='/' showName />
                </div>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in" className="bg-purple-gradient text-white px-4 py-2 rounded-lg">
            Login
          </Link>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav