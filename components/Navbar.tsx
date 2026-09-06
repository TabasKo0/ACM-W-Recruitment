'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0F24] border-b-4 border-foreground">
      <div className="flex justify-between items-center w-full px-margin-main py-4 max-w-full mx-auto">
        <Link 
          className="font-headline-md text-headline-md font-black text-primary-container uppercase tracking-tighter hover:opacity-90 transition-opacity" 
          href="/"
        >
          ACM-W CHENNAI
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-gutter">
          <Link 
            className={`font-medium font-label-md text-label-md hover:text-accent-pink transition-colors px-2 py-1 ${
              pathname === '/' ? 'text-foreground' : 'text-on-surface-variant'
            }`} 
            href="/#why"
          >
            WHY US
          </Link>
          <Link 
            className={`font-medium font-label-md text-label-md hover:text-accent-pink transition-colors px-2 py-1 ${
              pathname === '/recruitment' ? 'text-accent-pink font-bold border-b-2 border-accent-pink' : 'text-foreground'
            }`} 
            href="/recruitment"
          >
            RECRUIT
          </Link>
          <Link 
            className="text-foreground font-medium font-label-md text-label-md hover:text-accent-pink transition-colors px-2 py-1" 
            href="/#faq"
          >
            FAQ
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            href="/recruitment" 
            className="hidden md:block bg-primary-container text-on-primary-container border-[3px] border-on-primary-container font-label-md text-label-md px-4 py-2 font-bold uppercase neo-btn cyber-shadow-magenta transition-all"
          >
            APPLY NOW
          </Link>
          
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary-container p-1 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-t-4 border-foreground px-margin-main py-4 flex flex-col gap-4">
          <Link 
            onClick={() => setMobileMenuOpen(false)}
            className="text-foreground font-headline-md text-headline-md hover:text-accent-pink py-2" 
            href="/#why"
          >
            WHY US
          </Link>
         
          <Link 
            onClick={() => setMobileMenuOpen(false)}
            className="text-accent-pink font-headline-md text-headline-md py-2 font-bold" 
            href="/recruitment"
          >
            RECRUITMENT
          </Link>
          <Link 
            onClick={() => setMobileMenuOpen(false)}
            className="text-foreground font-headline-md text-headline-md hover:text-accent-pink py-2" 
            href="/#faq"
          >
            FAQ
          </Link>
          <Link 
            onClick={() => setMobileMenuOpen(false)}
            href="/recruitment" 
            className="w-full text-center bg-primary-container text-on-primary-container border-[3px] border-on-primary-container font-label-md text-label-md px-4 py-3 font-bold uppercase neo-btn cyber-shadow-magenta transition-all mt-2"
          >
            APPLY NOW
          </Link>
        </div>
      )}
    </header>
  );
}
