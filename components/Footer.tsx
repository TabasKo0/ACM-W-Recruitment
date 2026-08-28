import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black w-full border-t-4 border-white mt-auto z-20 relative">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-main py-stack-lg gap-stack-md">
        <div className="flex flex-col items-center md:items-start">
          <Link 
            href="/" 
            className="font-headline-lg-mobile text-headline-lg-mobile font-black text-accent-pink uppercase tracking-tighter hover:opacity-90 transition-opacity"
          >
            ACM-W CHENNAI
          </Link>
          <span className="font-label-sm text-label-sm text-foreground mt-2 text-center md:text-left">
            © 2024 ACM-W CHENNAI CHAPTER. BUILT FOR THE BOLD.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-gutter font-label-sm text-label-sm text-foreground">
          <a className="hover:text-accent-pink transition-colors font-bold" href="#">CONSTITUTION</a>
          <a className="hover:text-accent-pink transition-colors font-bold" href="#">CODE OF CONDUCT</a>
          <a className="hover:text-accent-pink transition-colors font-bold" href="#">PRIVACY</a>
          <a className="hover:text-accent-pink transition-colors font-bold" href="#">CONTACT</a>
        </div>
      </div>
    </footer>
  );
}
