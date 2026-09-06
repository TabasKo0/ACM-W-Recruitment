'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { DepartmentAccordion } from '@/components/DepartmentAccordion';

export default function Departments() {
    const router = useRouter();
    const [completedDepts, setCompletedDepts] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);
    const [applicantName, setApplicantName] = useState('');

    useEffect(() => {
        const baseDetails = Cookies.get('baseDetails');
        if (!baseDetails) {
            router.push('/recruitment');
            return;
        }

        try {
            const parsed = JSON.parse(baseDetails);
            setApplicantName(parsed?.fullName || '');
        } catch (error) {}

        const depts = ['technical', 'webdev', 'design', 'management', 'finance', 'content'];
        const completed = depts.filter(dept => !!Cookies.get(`dept_${dept}`));
        setCompletedDepts(completed);
    }, [router]);

    const handleDeptReset = (deptId: string) => {
        Cookies.remove(`dept_${deptId}`);
        setCompletedDepts(prev => prev.filter(d => d !== deptId));
    };

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
                const applicantName = payload?.baseDetails?.fullName || '';
                if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem('applicantName', applicantName);
                    window.sessionStorage.setItem(
                        'submittedApplication',
                        JSON.stringify({
                            ...payload,
                            applicantName,
                            submittedAt: new Date().toISOString(),
                        })
                    );
                }

                Cookies.remove('baseDetails');
                completedDepts.forEach(dept => Cookies.remove(`dept_${dept}`));
                setSubmitStatus('SUCCESS: Application transmitted securely.');
                router.push('/application-submitted');
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
    <main className="flex-grow w-full px-margin-main py-stack-lg max-w-7xl mx-auto">
{/*  Header & Submit Section  */}
<div className="mb-stack-lg flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
    <div>
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
    
    {/* Final Submit Action */}
    <div className="flex flex-col items-start lg:items-end gap-2 w-full lg:w-auto mt-4 lg:mt-0">
        {submitStatus && (
            <div className={`px-4 py-2 border-[2px] text-label-sm uppercase font-bold w-full text-center ${submitStatus.startsWith('SUCCESS') ? 'bg-green-950/50 border-green-500/50 text-green-400' : 'bg-red-950/50 border-red-500/50 text-red-400'}`}>
                {submitStatus}
            </div>
        )}
        <button 
            onClick={handleFinalSubmit} 
            disabled={isSubmitting || completedDepts.length === 0}
            className={`w-full lg:w-auto font-headline-md text-label-md px-8 py-4 font-black uppercase neo-btn transition-all flex items-center justify-center gap-2 group ${completedDepts.length === 0 ? 'bg-surface-container text-on-surface-variant border-[2px] border-outline-variant cursor-not-allowed opacity-50' : 'bg-primary-container text-[#0A0F24] border-[3px] border-primary-container shadow-[6px_6px_0px_0px_#FF7EE2] hover:bg-primary-fixed'}`}>
            {isSubmitting ? 'TRANSMITTING...' : 'SUBMIT FINAL APPLICATION'}
            <span className="material-symbols-outlined font-black">send</span>
        </button>
    </div>
</div>

{/*  Department Accordion Grid  */}
    <div className="mb-stack-lg">
    <DepartmentAccordion completedDepts={completedDepts} onReset={handleDeptReset} />
</div>
{/*  Bottom Bar Notice  */}
<div className="mt-stack-lg border-[3px] border-surface-container-highest bg-surface-container-low p-4 text-center">
<p className="font-label-md text-label-md text-on-surface-variant uppercase">
<span className="material-symbols-outlined align-middle mr-2 text-tertiary-container" data-icon="lightbulb">lightbulb</span>
                Not sure which to pick? Choose where you are most curious to learn.
            </p>
</div>

{/*  Banner Section  */}
<div className="bg-surface-container-low mt-4 border-[2px] border-red-500/30 p-4 mb-stack-lg flex flex-col md:flex-row items-start md:items-center gap-2 rounded-md">
    <span className="material-symbols-outlined text-red-400">info</span>
    <p className="font-body-md text-on-surface-variant m-0">
                <span className="text-red-400 font-bold uppercase mr-2">Friendly Reminder:</span>
                {applicantName ? `${applicantName}, ` : ''}your application is not complete until you press the final submit button above.
    </p>
</div>
</main>
  );
}
