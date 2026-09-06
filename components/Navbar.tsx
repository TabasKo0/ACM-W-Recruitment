'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [applicantName, setApplicantName] = useState('');

  useEffect(() => {
    const deptIds = ['technical', 'webdev', 'design', 'management', 'finance', 'content'];

    try {
      const baseDetails = Cookies.get('baseDetails');
      if (baseDetails) {
        const parsed = JSON.parse(baseDetails);
        setApplicantName(parsed?.fullName || '');
      } else if (typeof window !== 'undefined') {
        const savedName = window.sessionStorage.getItem('applicantName');
        setApplicantName(savedName || '');
      }
    } catch (error) {
      setApplicantName('');
    }

    if (pathname === '/application-submitted') {
      setProgress(100);
      return;
    }

    if (pathname.startsWith('/apply/')) {
      setProgress(75);
      return;
    }

    if (pathname === '/departments') {
      const hasAnyDepartmentCompleted = deptIds.some((dept) => !!Cookies.get(`dept_${dept}`));
      setProgress(hasAnyDepartmentCompleted ? 75 : 50);
      return;
    }

    if (pathname === '/recruitment') {
      setProgress(25);
      return;
    }

    setProgress(0);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0F24]">
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
          <div className="hidden md:flex flex-col items-end leading-none text-[11px] font-black tracking-[0.3em] text-foreground/70 gap-1">
            {applicantName && <span className="text-foreground">{applicantName.toUpperCase()}</span>}
            <span className="text-foreground">PROGRESS {progress}%</span>
          </div>

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
            className="text-foreground font-headline-md text-headline-md hover:text-accent-pink py-2" 
            href="/departments"
          >
            DEPARTMENTS
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

      <div className="h-1 w-full bg-white relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ff7ee2] via-[#de42fc] to-[#9d72ff] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(222,66,252,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
