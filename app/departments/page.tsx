'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Departments() {
    const router = useRouter();
    const [completedDepts, setCompletedDepts] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);

    useEffect(() => {
        const depts = ['technical', 'design', 'management', 'sponsorship', 'content'];
        const completed = depts.filter(dept => !!Cookies.get(`dept_${dept}`));
        setCompletedDepts(completed);
    }, []);

    const handleFinalSubmit = async () => {
        if (completedDepts.length === 0) {
            setSubmitStatus('ERROR: You must complete at least one department division.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        
        const payload: any = {
            baseDetails: JSON.parse(Cookies.get('baseDetails') || '{}'),
            departments: {}
        };
        
        completedDepts.forEach(dept => {
            payload.departments[dept] = JSON.parse(Cookies.get(`dept_${dept}`) || '{}');
        });

        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                Cookies.remove('baseDetails');
                completedDepts.forEach(dept => Cookies.remove(`dept_${dept}`));
                setSubmitStatus('SUCCESS: Application transmitted securely.');
                setTimeout(() => router.push('/'), 3000);
            } else {
                setSubmitStatus('ERROR: Transmission failed. Please try again.');
            }
        } catch (e) {
            setSubmitStatus('ERROR: Network transmission failure.');
        } finally {
            setIsSubmitting(false);
        }
    };
  return (
    <>

{/*  Top Navigation from Shared Components  */}
<nav className="bg-surface dark:bg-surface w-full top-0 sticky border-b-4 border-on-surface dark:border-outline-variant shadow-[6px_6px_0px_0px_rgba(255,126,226,1)] z-50">
<div className="flex justify-between items-center w-full px-margin-main py-4 max-w-full mx-auto">
<div className="font-headline-md text-headline-md font-black text-primary dark:text-primary-fixed uppercase tracking-tighter">
                ACM-W CHENNAI
            </div>
<div className="hidden md:flex gap-gutter items-center">
<a className="text-on-surface dark:text-on-surface-variant font-medium font-label-md text-label-md hover:bg-accent-pink hover:text-on-tertiary transition-colors duration-100 px-2 py-1" href="#">EVENTS</a>
<a className="text-on-surface dark:text-on-surface-variant font-medium font-label-md text-label-md hover:bg-accent-pink hover:text-on-tertiary transition-colors duration-100 px-2 py-1" href="#">TEAM</a>
<a className="text-accent-pink font-bold border-b-2 border-accent-pink font-label-md text-label-md hover:bg-accent-pink hover:text-on-tertiary transition-colors duration-100 px-2 py-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" href="#">RECRUIT</a>
<a className="text-on-surface dark:text-on-surface-variant font-medium font-label-md text-label-md hover:bg-accent-pink hover:text-on-tertiary transition-colors duration-100 px-2 py-1" href="#">FAQ</a>
</div>

</div>
</nav>
{/*  Main Content  */}
<main className="flex-grow w-full px-margin-main py-stack-lg max-w-7xl mx-auto">
{/*  Header Section  */}
<div className="mb-stack-lg">
<Link className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors mb-stack-md uppercase" href="/">
<span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                BACK TO HOME
            </Link>
<h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-foreground mb-stack-sm">
                CHOOSE YOUR DIVISION.
            </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-[3px] border-accent-pink pl-4">
                Pick the track where you want to create the biggest impact. You can apply to one primary department.
            </p>
</div>
{/*  Banner Section  */}
<div className="bg-red-950 border-4 border-red-500 p-4 mb-stack-lg cyber-shadow-red animate-pulse">
    <span className="font-headline-md text-red-500 font-black flex items-center gap-2 uppercase">
        <span className="material-symbols-outlined">warning</span>
        WARNING: APPLICATION INCOMPLETE
    </span>
    <p className="font-body-md text-red-200 mt-2 uppercase font-bold">
        Your application is not complete until you press the final submit button at the bottom of this page.
    </p>
</div>
{/*  Department Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-[24px]">
{/*  TECHNICAL  */}
<div className="bg-background border-[3px] border-primary-container shadow-[6px_6px_0px_#00e5ff] p-stack-md flex flex-col justify-between neo-card transition-transform duration-200">
<div>
<div className="inline-block bg-background border-[2px] border-accent-pink text-accent-pink font-label-sm text-label-sm px-2 py-1 mb-stack-sm uppercase">
                        CODE • BUILD • TEACH
                    </div>
<h2 className="font-headline-md text-headline-md uppercase text-foreground mb-stack-sm">TECHNICAL</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                        Website development, hackathon problem statements, technical workshops, and dev tooling.
                    </p>
</div>
<Link href="/apply/technical" className="w-full bg-primary-container text-[#0A0F24] border-[3px] border-primary-container font-headline-md text-label-md px-4 py-3 font-bold uppercase neo-btn shadow-[6px_6px_0px_0px_#0A0F24] hover:bg-primary-fixed transition-all flex justify-between items-center">
                    {completedDepts.includes("technical") ? "EDIT TECHNICAL" : "SELECT TECHNICAL"}
                    <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{/*  DESIGN & UI/UX  */}
<div className="bg-brand-purple text-[#0A0F24] border-[3px] border-white shadow-[6px_6px_0px_#FF7EE2] p-stack-md flex flex-col justify-between neo-card transition-transform duration-200">
<div>
<div className="inline-block bg-brand-purple border-[2px] border-[#0A0F24] text-[#0A0F24] font-label-sm text-label-sm px-2 py-1 mb-stack-sm uppercase font-bold">
                        VISUALS • BRANDING • UI
                    </div>
<h2 className="font-headline-md text-headline-md uppercase text-[#0A0F24] mb-stack-sm">DESIGN &amp; UI/UX</h2>
<p className="font-body-md text-body-md text-[#0A0F24] font-medium mb-stack-md">
                        Website UI/UX, event posters, visual branding, social media assets, and badges.
                    </p>
</div>
<Link href="/apply/design" className="w-full bg-[#0A0F24] text-white border-[3px] border-[#0A0F24] font-headline-md text-label-md px-4 py-3 font-bold uppercase neo-btn shadow-[6px_6px_0px_0px_white] hover:bg-surface-container-highest transition-all flex justify-between items-center">
                    {completedDepts.includes("design") ? "EDIT DESIGN" : "SELECT DESIGN"}
                    <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{/*  EVENTS & OPERATIONS  */}
<div className="bg-accent-pink text-[#0A0F24] border-[3px] border-white shadow-[6px_6px_0px_#00E5FF] p-stack-md flex flex-col justify-between neo-card transition-transform duration-200">
<div>
<div className="inline-block bg-accent-pink border-[2px] border-[#0A0F24] text-[#0A0F24] font-label-sm text-label-sm px-2 py-1 mb-stack-sm uppercase font-bold">
                        LOGISTICS • EXECUTION
                    </div>
<h2 className="font-headline-md text-headline-md uppercase text-[#0A0F24] mb-stack-sm">EVENTS &amp; OPS</h2>
<p className="font-body-md text-body-md text-[#0A0F24] font-medium mb-stack-md">
                        Hackathon floor management, venue coordination, timeline planning, and workshop flow.
                    </p>
</div>
<Link href="/apply/management" className="w-full bg-[#0A0F24] text-white border-[3px] border-[#0A0F24] font-headline-md text-label-md px-4 py-3 font-bold uppercase neo-btn shadow-[6px_6px_0px_0px_white] hover:bg-surface-container-highest transition-all flex justify-between items-center">
                    {completedDepts.includes("management") ? "EDIT EVENTS" : "SELECT EVENTS"}
                    <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{/*  SPONSORSHIP & PR  */}
<div className="bg-background border-[3px] border-brand-purple shadow-[6px_6px_0px_#9D72FF] p-stack-md flex flex-col justify-between neo-card transition-transform duration-200 md:col-span-1 lg:col-span-1">
<div>
<div className="inline-block bg-background border-[2px] border-brand-purple text-brand-purple font-label-sm text-label-sm px-2 py-1 mb-stack-sm uppercase">
                        GROWTH • SPONSORS
                    </div>
<h2 className="font-headline-md text-headline-md uppercase text-foreground mb-stack-sm">SPONSORSHIP &amp; PR</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                        Landing corporate sponsors, speaker outreach, partnerships, and community growth.
                    </p>
</div>
<Link href="/apply/sponsorship" className="w-full bg-brand-purple text-[#0A0F24] border-[3px] border-brand-purple font-headline-md text-label-md px-4 py-3 font-bold uppercase neo-btn shadow-[6px_6px_0px_0px_#0A0F24] hover:bg-secondary transition-all flex justify-between items-center">
                    {completedDepts.includes("sponsorship") ? "EDIT SPONSORSHIP" : "SELECT SPONSORSHIP"}
                    <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
{/*  CONTENT & EDITORIAL  */}
<div className="bg-background border-[3px] border-accent-pink shadow-[6px_6px_0px_#FF7EE2] p-stack-md flex flex-col justify-between neo-card transition-transform duration-200 md:col-span-2 lg:col-span-2">
<div>
<div className="inline-block bg-background border-[2px] border-accent-pink text-accent-pink font-label-sm text-label-sm px-2 py-1 mb-stack-sm uppercase">
                        COPY • STORYTELLING
                    </div>
<h2 className="font-headline-md text-headline-md uppercase text-foreground mb-stack-sm">CONTENT &amp; EDITORIAL</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-stack-md max-w-xl">
                        Social media copy, newsletters, documentation, and event campaign writing.
                    </p>
</div>
<Link href="/apply/content" className="w-full md:w-auto self-start bg-accent-pink text-[#0A0F24] border-[3px] border-accent-pink font-headline-md text-label-md px-6 py-3 font-bold uppercase neo-btn shadow-[6px_6px_0px_0px_#0A0F24] hover:opacity-90 transition-all flex justify-between gap-4 items-center">
                    {completedDepts.includes("content") ? "EDIT CONTENT" : "SELECT CONTENT"}
                    <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
</div>
{/*  Bottom Bar Notice  */}
<div className="mt-stack-lg border-[3px] border-surface-container-highest bg-surface-container-low p-4 text-center">
<p className="font-label-md text-label-md text-on-surface-variant uppercase">
<span className="material-symbols-outlined align-middle mr-2 text-tertiary-container" data-icon="lightbulb">lightbulb</span>
                Not sure which to pick? Choose where you are most curious to learn.
            </p>
</div>
{/* Final Submit Action */}
<div className="mt-stack-xl flex flex-col items-center gap-4 bg-background border-[4px] border-primary-container p-8 cyber-shadow-cyan">
    {submitStatus && (
        <div className={`p-4 border-4 uppercase font-bold ${submitStatus.startsWith('SUCCESS') ? 'bg-green-950 border-green-500 text-green-400' : 'bg-red-950 border-red-500 text-red-400'}`}>
            {submitStatus}
        </div>
    )}
    <button 
        onClick={handleFinalSubmit} 
        disabled={isSubmitting || completedDepts.length === 0}
        className={`w-full md:w-auto font-headline-md text-headline-md px-12 py-6 font-black uppercase neo-btn transition-all flex items-center justify-center gap-2 group ${completedDepts.length === 0 ? 'bg-gray-800 text-gray-500 border-[3px] border-gray-600 cursor-not-allowed' : 'bg-[#00E5FF] text-black border-[3px] border-white cyber-shadow-cyan hover:bg-[#00daf3]'}`}>
        {isSubmitting ? 'TRANSMITTING...' : 'SUBMIT FINAL APPLICATION'}
        <span className="material-symbols-outlined font-black">send</span>
    </button>
</div>
</main>
{/*  Footer from Shared Components  */}
<footer className="bg-surface-container-lowest dark:bg-surface-container-lowest w-full border-t-4 border-on-surface border-t-4 border-on-surface dark:border-outline-variant mt-auto">
<div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-main py-stack-lg gap-stack-md">
<div className="font-headline-lg-mobile text-headline-lg-mobile font-black text-accent-pink uppercase">
                ACM-W CHENNAI
            </div>
<div className="flex flex-wrap justify-center gap-gutter">
<a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:text-accent-pink transition-colors" href="#">CONSTITUTION</a>
<a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:text-accent-pink transition-colors" href="#">CODE OF CONDUCT</a>
<a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:text-accent-pink transition-colors" href="#">PRIVACY</a>
<a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:text-accent-pink transition-colors" href="#">CONTACT</a>
</div>
<div className="font-body-md text-body-md text-secondary dark:text-secondary-fixed text-center md:text-right">
                © 2024 ACM-W CHENNAI CHAPTER. BUILT FOR THE BOLD.
            </div>
</div>
</footer>

    </>
  );
}
