'use client';
import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import questionnaires from '../../../data/questionnaires.json';

type Props = {
    params: Promise<{ department_id: string }>;
};

type Question = {
    id: string;
    label: string;
    required: boolean;
};

export default function Apply({ params }: Props) {
    const { department_id } = use(params);
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [applicantName, setApplicantName] = useState('');

    // Initialize answers state
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const deptData = (questionnaires as Record<string, any>)[department_id];

    // Load existing answers on mount
    React.useEffect(() => {
        const baseDetails = Cookies.get('baseDetails');
        if (!baseDetails) {
            router.push('/recruitment');
            return;
        }

        try {
            const parsed = JSON.parse(baseDetails);
            setApplicantName(parsed?.fullName || '');
        } catch (error) {}

        const saved = Cookies.get(`dept_${department_id}`);
        if (saved) {
            try {
                setAnswers(JSON.parse(saved));
            } catch (e) {}
        }
    }, [department_id, router]);

    const handleAnswerChange = (qId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

    if (!deptData) {
        return (
            <main className="flex-grow flex items-center justify-center min-h-screen text-center bg-background">
                <div>
                    <h1 className="font-headline-xl text-headline-xl text-primary mb-4">DIVISION NOT FOUND</h1>
                    <Link href="/departments" className="bg-primary text-background px-6 py-3 font-bold inline-block">
                        BACK TO DEPARTMENTS
                    </Link>
                </div>
            </main>
        );
    }

    const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Stop native HTML5 popup
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        
        let message = "REQUIRED FIELD MISSING.";
        if (target.id === 'vitEmail' && target.validity.patternMismatch) {
            message = "ACCESS DENIED: Must use a valid @vitstudent.ac.in email address.";
        } else if (target.validity.typeMismatch) {
            message = "INVALID DATA FORMAT.";
        }

        setErrorMsg(message);
        
        // Scroll to the error box or the field
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        
        // Save details to cookies
        Cookies.set(`dept_${department_id}`, JSON.stringify(answers), { expires: 7 });
        
        // Route back to departments page
        router.push('/departments');
    };

    return (
        <main className="flex-grow flex flex-col justify-center items-center px-margin-main py-stack-lg relative z-10 w-full">
                {/* Header Section */}
                <div className="w-[90%] md:w-[70%] max-w-none mx-auto mb-stack-lg flex flex-col items-center text-center gap-stack-md">
                    <Link className="group flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="/departments">
                        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_left</span>
                        [ CHANGE DIVISION ]
                    </Link>
                    <div className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold px-4 py-2 border-2 border-surface-container-lowest inline-block">
                        {applicantName ? `${applicantName.toUpperCase()} :: CURRENT TRACK: ${deptData.title}` : `CURRENT TRACK: ${deptData.title}`}
                    </div>
                    <div className="mt-stack-sm">
                        <h1 className="font-headline-xl text-headline-xl text-foreground uppercase">INITIALIZE APPLICATION</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-xl mx-auto">{applicantName ? `${applicantName}, keep it honest and tell us how you like to build.` : 'No generic essays. Keep it honest and tell us how you like to build.'}</p>
                    </div>
                </div>

                {/* Form Container */}
                <div className="w-[90%] md:w-[70%] max-w-none mx-auto bg-background cyber-border border-secondary-container shadow-[8px_8px_0px_0px_var(--color-primary-container)] p-8 md:p-12 relative">
                    
                    {/* Themed Error Popup */}
                    {errorMsg && (
                        <div className="bg-red-950 border-2 border-red-500 p-3 mb-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] animate-pulse transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-red-500 text-lg">warning</span>
                            <span className="font-headline-md text-red-500 font-black uppercase text-sm md:text-base">{errorMsg}</span>
                        </div>
                    )}

                    <form className="flex flex-col gap-stack-lg mt-4" onSubmit={handleSubmit} onInvalidCapture={handleInvalid}>

                        {/* Dynamic Fields */}
                        {deptData.questions.map((q: Question, i: number) => (
                            <div key={q.id} className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md font-bold text-foreground uppercase tracking-widest flex items-center gap-2" htmlFor={q.id}>
                                    <span className="material-symbols-outlined text-primary-container text-sm">terminal</span>
                                    {q.label}
                                </label>
                                <textarea
                                    className="cyber-input p-4 font-body-md text-body-md text-foreground w-full resize-y rounded-none min-h-[150px]"
                                    id={q.id}
                                    placeholder="Execute answer..."
                                    required={q.required}
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                ></textarea>
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-center">
                            <button type="submit" className="w-full md:w-auto bg-primary-container text-on-primary-container border-[3px] border-on-primary-container font-headline-sm text-headline-sm px-8 py-4 font-black uppercase neo-btn cyber-shadow-magenta transition-all flex items-center justify-center gap-2 group">
                                SAVE DETAILS
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
    );
}
