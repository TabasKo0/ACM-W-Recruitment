import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#0A0F24]">

      {/* Snap 1 */}
      <section className="snap-start min-h-[100dvh] flex flex-col relative">

{/*  JSON TopNavBar Component  */}
<nav className="bg-[#0A0F24] w-full top-0 sticky border-b-4 border-foreground z-50">
<div className="flex justify-between items-center w-full px-margin-main py-4 max-w-full mx-auto">
<a className="font-headline-md text-headline-md font-black text-primary-container uppercase tracking-tighter" href="#">ACM-W CHENNAI</a>
<div className="hidden md:flex items-center gap-gutter">
<a className="text-foreground font-medium font-label-md text-label-md hover:text-accent-pink transition-colors" href="#about">EVENTS</a>
<a className="text-accent-pink font-bold border-b-2 border-accent-pink font-label-md text-label-md" href="#team">RECRUIT</a>
<a className="text-foreground font-medium font-label-md text-label-md hover:text-accent-pink transition-colors" href="#faq">FAQ</a>
</div>

<Link href="/recruitment" className="hidden md:block bg-primary-container text-on-primary-container border-[3px] border-on-primary-container font-label-md text-label-md px-4 py-2 font-bold uppercase neo-btn shadow-[6px_6px_0px_0px_#00daf3] transition-all">
                APPLY NOW
            </Link>
<button className="md:hidden text-primary">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
{/*  Mobile Menu Trigger  */}
<button className="md:hidden text-primary-container">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu</span>
</button>
</div>
</nav>
{/*  Marquee Banner  */}
<div className="marquee-container w-full bg-[#00E5FF] border-y-4 border-black overflow-hidden py-2 flex whitespace-nowrap z-40 relative">
<div className="marquee-content flex gap-8 font-headline-md text-headline-md font-black text-black">
<span>* ZERO BENCHWARMERS * 100% HANDS-ON EXECUTION * REAL MENTORSHIP * ACM-W CHENNAI RECRUITMENT LIVE *</span>
<span>* ZERO BENCHWARMERS * 100% HANDS-ON EXECUTION * REAL MENTORSHIP * ACM-W CHENNAI RECRUITMENT LIVE *</span>
</div>
</div>

{/*  Hero Section  */}
<section className=" flex flex-col justify-center items-center text-center px-margin-main py-stack-lg relative overflow-hidden bg-[#0A0F24]">
<div className="max-w-4xl z-10 flex flex-col items-center gap-stack-lg">
<h1 className="font-headline-xl text-headline-xl md:text-[80px] font-black text-[#F3F4F6] leading-none">
                    A CLUB WHERE EVERYONE ACTUALLY BUILDS
                </h1>
<p className="font-body-lg text-body-lg text-[#F3F4F6] max-w-2xl bg-black p-4 border-4 border-white">
                    No fluff. Just raw execution, building tools, running operations, and scaling high-footfall hackathons. We are recruiting the next generation of builders.
                </p>
<Link className="mt-stack-lg bg-[#9D72FF] text-black font-headline-md text-headline-md px-8 py-4 border-4 border-white cyber-shadow-cyan cyber-interactive flex items-center gap-2 group font-black" href="/recruitment">
                    INITIALIZE APPLICATION 
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
</Link>
</div>
</section>
</section>

{/*  Snap 2  */}
<section className="snap-start min-h-[100dvh] flex flex-col justify-center px-margin-main py-stack-lg bg-[#0A0F24] w-full" id="why">
  <div className="max-w-7xl w-full mx-auto">
<h2 className="font-headline-lg text-headline-lg font-black text-[#00E5FF] mb-stack-lg border-b-4 border-[#00E5FF] pb-2 inline-block">WHY EXECUTE WITH US</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
{/*  Card 1  */}
<div className="bg-[#0A0F24] border-4 border-[#00E5FF] p-stack-md cyber-shadow-cyan">
<h3 className="font-headline-md text-headline-md text-[#00E5FF] mb-stack-sm flex items-center gap-2 font-black">
<span className="font-label-sm text-label-sm bg-accent-pink text-black font-black px-2 py-1">01</span> 
                        ZERO GATEKEEPING
                    </h3>
<p className="font-body-md text-body-md text-foreground">
                        We don&apos;t filter based on past resumes. If you are hungry to learn, you get a seat at the table.
                    </p>
</div>
{/*  Card 2  */}
<div className="bg-[#9D72FF] border-4 border-white p-stack-md cyber-shadow-pink text-black">
<h3 className="font-headline-md text-headline-md mb-stack-sm flex items-center gap-2 font-black">
<span className="font-label-sm text-label-sm bg-black text-[#9D72FF] px-2 py-1 font-black">02</span> 
                        DIRECT MENTORSHIP
                    </h3>
<p className="font-body-md text-body-md font-bold">
                        Learn directly from seniors who guide you through building tools and running operations.
                    </p>
</div>
{/*  Card 3  */}
<div className="bg-[#FF7EE2] border-4 border-white p-stack-md cyber-shadow-cyan text-black">
<h3 className="font-headline-md text-headline-md mb-stack-sm flex items-center gap-2 font-black">
<span className="font-label-sm text-label-sm bg-black text-[#FF7EE2] px-2 py-1 font-black">03</span> 
                        MASSIVE EVENT SCALE
                    </h3>
<p className="font-body-md text-body-md font-bold">
                        Be part of the core crew organizing high-footfall hackathons and campus bootcamps.
                    </p>
</div>
{/*  Card 4  */}
<div className="bg-[#0A0F24] border-4 border-[#9D72FF] p-stack-md cyber-shadow-purple">
<h3 className="font-headline-md text-headline-md text-[#9D72FF] mb-stack-sm flex items-center gap-2 font-black">
<span className="font-label-sm text-label-sm bg-accent-pink text-black font-black px-2 py-1">04</span> 
                        GLOBAL ACM NETWORK
                    </h3>
<p className="font-body-md text-body-md text-foreground">
                        Direct connection to the world&apos;s largest computing society.
                    </p>
</div>
</div>
  </div>
</section>

{/*  Snap 3  */}
<section className="snap-start min-h-[100dvh] flex flex-col justify-center bg-[#0A0F24] border-t-4 border-white py-stack-lg">
  {/*  Timeline Section  */}
  <div className="px-margin-main max-w-5xl mx-auto w-full" id="timeline">
    <h2 className="font-headline-lg text-headline-lg font-black text-[#00E5FF] mb-12 text-center">RECRUITMENT PROTOCOL</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 relative">
      
      {/*  Step 1 (Top Left)  */}
      <div className="bg-black border-4 border-[#00E5FF] p-6 w-full text-center cyber-shadow-cyan z-10 flex flex-col justify-center min-h-[160px] md:col-start-1 md:row-start-1 relative">
        <span className="block font-headline-md text-headline-md text-[#00E5FF] font-black">1. APPLICATION</span>
        <span className="font-label-sm text-label-sm text-foreground mt-2 block">Form filling.</span>
        {/* Right Arrow (Desktop) */}
        <div className="hidden md:flex absolute top-1/2 -right-[3rem] w-[3rem] -translate-y-1/2 items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-4xl text-white">arrow_forward</span>
        </div>
        {/* Down Arrow (Mobile) */}
        <div className="flex md:hidden absolute -bottom-[4rem] left-1/2 h-[4rem] -translate-x-1/2 items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-3xl text-white">arrow_downward</span>
        </div>
      </div>
      
      {/*  Step 2 (Top Right)  */}
      <div className="bg-black border-4 border-[#9D72FF] p-6 w-full text-center cyber-shadow-purple z-10 flex flex-col justify-center min-h-[160px] md:col-start-2 md:row-start-1 relative mt-16 md:mt-0">
        <span className="block font-headline-md text-headline-md text-[#9D72FF] font-black">2. PROOF OF WORK</span>
        <span className="font-label-sm text-label-sm text-foreground mt-2 block">Test submission / basic joining project.</span>
        {/* Down Arrow (Desktop) */}
        <div className="hidden md:flex absolute -bottom-[4rem] left-1/2 h-[4rem] -translate-x-1/2 items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-4xl text-white">arrow_downward</span>
        </div>
        {/* Down Arrow (Mobile) */}
        <div className="flex md:hidden absolute -bottom-[4rem] left-1/2 h-[4rem] -translate-x-1/2 items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-3xl text-white">arrow_downward</span>
        </div>
      </div>
      
      {/*  Step 3 (Bottom Right)  */}
      <div className="bg-black border-4 border-accent-pink p-6 w-full text-center cyber-shadow-pink z-10 flex flex-col justify-center min-h-[160px] md:col-start-2 md:row-start-2 relative mt-16 md:mt-0">
        <span className="block font-headline-md text-headline-md text-accent-pink font-black">3. INTERVIEW</span>
        <span className="font-label-sm text-label-sm text-foreground mt-2 block">Prove your hunger.</span>
        {/* Left Arrow (Desktop) */}
        <div className="hidden md:flex absolute top-1/2 -left-[3rem] w-[3rem] -translate-y-1/2 items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-4xl text-white">arrow_back</span>
        </div>
        {/* Down Arrow (Mobile) */}
        <div className="flex md:hidden absolute -bottom-[4rem] left-1/2 h-[4rem] -translate-x-1/2 items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-3xl text-white">arrow_downward</span>
        </div>
      </div>
      
      {/*  Step 4 (Bottom Left)  */}
      <div className="bg-black border-4 border-[#00E5FF] p-6 w-full text-center cyber-shadow-cyan z-10 flex flex-col justify-center min-h-[160px] md:col-start-1 md:row-start-2 relative mt-16 md:mt-0">
        <span className="block font-headline-md text-headline-md text-[#00E5FF] font-black">4. ONBOARDING</span>
        <span className="font-label-sm text-label-sm text-foreground mt-2 block">Finally, you&apos;re in!</span>
      </div>
    </div>
  </div>
</section>

{/*  Snap 4  */}
<section className="snap-start min-h-[100dvh] flex flex-col justify-between bg-[#0A0F24] pt-stack-lg">
  <div className="flex-grow flex flex-col justify-center">

{/*  FAQ Section  */}
<div className="px-margin-main max-w-3xl mx-auto w-full mb-stack-lg" id="faq">
<h2 className="font-headline-lg text-headline-lg font-black text-[#00E5FF] mb-stack-lg text-center md:text-left">SYSTEM QUERIES (FAQ)</h2>
<div className="flex flex-col gap-stack-md">
{/*  Accordion Item  */}
<details className="group bg-black border-4 border-white transition-colors cyber-shadow-cyan mb-4">
<summary className="font-headline-md text-headline-md p-4 cursor-pointer flex justify-between items-center bg-black text-white hover:bg-gray-900 font-black">
                        DO I NEED PRIOR EXPERIENCE?
                        <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#00E5FF]">expand_more</span>
</summary>
<div className="p-4 border-t-4 border-white font-body-md text-body-md text-foreground bg-black">
                        Negative. Hunger and willingness to execute matter more than a polished resume. We train on the ground.
                    </div>
</details>
<details className="group bg-black border-4 border-white transition-colors cyber-shadow-purple mb-4">
<summary className="font-headline-md text-headline-md p-4 cursor-pointer flex justify-between items-center bg-black text-white hover:bg-gray-900 font-black">
                        CAN 1ST YEARS APPLY?
                        <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#9D72FF]">expand_more</span>
</summary>
<div className="p-4 border-t-4 border-white font-body-md text-body-md text-foreground bg-black">
                        Affirmative. We actively look for fresh talent to mold into core team members over the years.
                    </div>
</details>
<details className="group bg-black border-4 border-white transition-colors cyber-shadow-pink">
<summary className="font-headline-md text-headline-md p-4 cursor-pointer flex justify-between items-center bg-black text-white hover:bg-gray-900 font-black">
                        WHAT ROLES ARE OPEN?
                        <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-accent-pink">expand_more</span>
</summary>
<div className="p-4 border-t-4 border-white font-body-md text-body-md text-foreground bg-black">
                        Technical (Dev/Design), Operations, Logistics, and Marketing. We need builders across all domains.
                    </div>
</details>
</div>
</div>

</div>
{/*  JSON Footer Component  */}
<footer className="bg-black w-full border-t-4 border-white mt-auto">
<div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-main py-stack-lg gap-stack-md">
<div className="flex flex-col items-center md:items-start">
<span className="font-headline-lg-mobile text-headline-lg-mobile font-black text-accent-pink uppercase tracking-tighter">ACM-W CHENNAI</span>
<span className="font-label-sm text-label-sm text-foreground mt-2 text-center md:text-left">© 2024 ACM-W CHENNAI CHAPTER. BUILT FOR THE BOLD.</span>
</div>
<div className="flex gap-gutter font-label-sm text-label-sm text-foreground">
<a className="hover:text-accent-pink transition-colors font-bold" href="#">CONSTITUTION</a>
<a className="hover:text-accent-pink transition-colors font-bold" href="#">CODE OF CONDUCT</a>
<a className="hover:text-accent-pink transition-colors font-bold" href="#">PRIVACY</a>
<a className="hover:text-accent-pink transition-colors font-bold" href="#">CONTACT</a>
</div>
</div>
</footer>
</section>

    </div>
  );
}
