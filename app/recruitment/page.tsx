'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function RecruitmentBase() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Initialize state from cookies if they exist
    const [formData, setFormData] = useState({
        fullName: '',
        regNo: '',
        vitEmail: '',
        phoneNo: '',
        yearOfStudy: '',
        githubLink: '',
        linkedinLink: ''
    });

    useEffect(() => {
        const saved = Cookies.get('baseDetails');
        if (saved) {
            try {
                setFormData(JSON.parse(saved));
            } catch (e) {}
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        
        let message = "REQUIRED FIELD MISSING.";
        if (target.id === 'vitEmail' && target.validity.patternMismatch) {
            message = "ACCESS DENIED: Must use a valid @vitstudent.ac.in email address.";
        } else if (target.validity.typeMismatch) {
            message = "INVALID DATA FORMAT.";
        }

        setErrorMsg(message);
        
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        
        // Save to cookies
        Cookies.set('baseDetails', JSON.stringify(formData), { expires: 7 }); // Expires in 7 days
        
        // Route to departments
        router.push('/departments');
    };

    return (
        <>
            {/* TopNavBar */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-main h-20 bg-surface border-b-4 border-primary shadow-[6px_6px_0px_0px_rgba(195,245,255,1)]">
                <div className="font-headline-md text-headline-md font-black text-primary uppercase tracking-tighter">ACM-W CHENNAI</div>
                <Link href="/" className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 border-2 border-primary hover:bg-transparent hover:text-primary transition-all shadow-[4px_4px_0px_0px_rgba(195,245,255,0.5)] active:shadow-none inline-block">
                    BACK HOME
                </Link>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col justify-center items-center px-margin-main py-stack-lg relative z-10 w-full mt-20">
                {/* Header Section */}
                <div className="w-[90%] md:w-[70%] max-w-none mx-auto mb-stack-lg flex flex-col items-center text-center gap-stack-md">
                    <div className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold px-4 py-2 border-2 border-surface-container-lowest inline-block">
                        STEP 1: IDENTITY VERIFICATION
                    </div>
                    <div className="mt-stack-sm">
                        <h1 className="font-headline-xl text-headline-xl text-foreground uppercase">INITIALIZE APPLICATION</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-xl mx-auto">Provide your base identification details before choosing your technical divisions.</p>
                    </div>
                </div>

                {/* Form Container */}
                <div className="w-[90%] md:w-[70%] max-w-none mx-auto bg-background cyber-border border-secondary-container shadow-[8px_8px_0px_#00E5FF] p-8 md:p-12 relative">
                    
                    {/* Themed Error Popup */}
                    {errorMsg && (
                        <div className="bg-red-950 border-2 border-red-500 p-3 mb-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] animate-pulse transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-red-500 text-lg">warning</span>
                            <span className="font-headline-md text-red-500 font-black uppercase text-sm md:text-base">{errorMsg}</span>
                        </div>
                    )}

                    <form className="flex flex-col gap-stack-lg mt-4" onSubmit={handleSubmit} onInvalidCapture={handleInvalid}>
                        
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="fullName">
                                <span className="material-symbols-outlined text-primary-container text-sm">person</span>
                                FULL NAME
                            </label>
                            <input className="cyber-input p-4 font-body-md text-body-md text-foreground w-full rounded-none" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Alex Morgan" required type="text" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="regNo">
                                <span className="material-symbols-outlined text-primary-container text-sm">badge</span>
                                REGISTRATION NUMBER
                            </label>
                            <input className="cyber-input p-4 font-body-md text-body-md text-foreground w-full rounded-none" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} placeholder="24BCE1000" required type="text" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="vitEmail">
                                <span className="material-symbols-outlined text-primary-container text-sm">mail</span>
                                COLLEGE EMAIL ADDRESS
                            </label>
                            <input className="cyber-input p-4 font-body-md text-body-md text-foreground w-full rounded-none" id="vitEmail" name="vitEmail" value={formData.vitEmail} onChange={handleChange} placeholder="name@vitstudent.ac.in" pattern=".+@vitstudent\.ac\.in$" title="Please enter a valid @vitstudent.ac.in email address" required type="email" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="phoneNo">
                                <span className="material-symbols-outlined text-primary-container text-sm">phone</span>
                                PHONE NUMBER
                            </label>
                            <input className="cyber-input p-4 font-body-md text-body-md text-foreground w-full rounded-none" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="+91 9999999999" required type="tel" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary-container text-sm">school</span>
                                YEAR OF STUDY
                            </label>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map((year) => (
                                    <label key={year} className="flex items-center gap-2 cursor-pointer font-body-md text-body-md text-foreground">
                                        <input type="radio" name="yearOfStudy" value={year.toString()} checked={formData.yearOfStudy === year.toString()} onChange={handleChange} required className="w-5 h-5 accent-primary-container" />
                                        {year}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="githubLink">
                                <span className="material-symbols-outlined text-primary-container text-sm">code</span>
                                GITHUB LINK
                            </label>
                            <input className="cyber-input p-4 font-body-md text-body-md text-foreground w-full rounded-none" id="githubLink" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="https://github.com/..."  />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="linkedinLink">
                                <span className="material-symbols-outlined text-primary-container text-sm">link</span>
                                LINKEDIN LINK
                            </label>
                            <input className="cyber-input p-4 font-body-md text-body-md text-foreground w-full rounded-none" id="linkedinLink" name="linkedinLink" value={formData.linkedinLink} onChange={handleChange} placeholder="https://linkedin.com/in/..."  />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-center">
                            <button type="submit" className="w-full md:w-auto bg-primary-container text-on-primary-container border-[3px] border-on-primary-container font-headline-sm text-headline-sm px-8 py-4 font-black uppercase neo-btn shadow-[6px_6px_0px_0px_#00daf3] transition-all flex items-center justify-center gap-2 group">
                                NEXT: CHOOSE DIVISIONS
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
