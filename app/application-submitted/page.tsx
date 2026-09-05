'use client';

import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import questionnaires from '../../data/questionnaires.json';

type SubmittedApplication = {
    applicantName?: string;
    baseDetails?: {
        fullName?: string;
        regNo?: string;
        vitEmail?: string;
        phoneNo?: string;
        yearOfStudy?: string;
    };
    departments?: Record<string, Record<string, string>>;
    submittedAt?: string;
};

const DEPARTMENT_LABELS: Record<string, string> = {
    technical: 'Technical',
    webdev: 'Web Development',
    design: 'Design',
    management: 'Management',
    finance: 'Finance',
    content: 'Content',
};

type DepartmentId = keyof typeof DEPARTMENT_LABELS;

const getQuestionLabel = (deptId: string, questionId: string) => {
    const questionnaire = (questionnaires as Record<string, any>)[deptId];
    const question = questionnaire?.questions?.find((item: { id: string }) => item.id === questionId);
    return question?.label || questionId;
};

export default function ApplicationSubmittedPage() {
    const [applicantName, setApplicantName] = React.useState('');
    const [submittedApplication, setSubmittedApplication] = React.useState<SubmittedApplication | null>(null);

    React.useEffect(() => {
        try {
            const savedSubmission = window.sessionStorage.getItem('submittedApplication');
            if (savedSubmission) {
                const parsedSubmission = JSON.parse(savedSubmission) as SubmittedApplication;
                setSubmittedApplication(parsedSubmission);
                setApplicantName(parsedSubmission?.applicantName || parsedSubmission?.baseDetails?.fullName || '');
                return;
            }

            const baseDetails = Cookies.get('baseDetails');
            if (baseDetails) {
                const parsed = JSON.parse(baseDetails);
                if (parsed?.fullName) setApplicantName(parsed.fullName);
                return;
            }

            const savedName = window.sessionStorage.getItem('applicantName');
            if (savedName) setApplicantName(savedName);
        } catch (error) {}
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const displayBaseDetails = submittedApplication?.baseDetails;
    const completedDepartments = submittedApplication?.departments || {};
    const submittedDepartmentEntries = Object.entries(completedDepartments);

    return (
        <main className="flex min-h-screen items-center justify-center px-margin-main py-stack-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(157,114,255,0.22),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(255,126,226,0.18),_transparent_40%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl bg-background border-4 border-primary-container shadow-[10px_10px_0px_0px_var(--color-accent-pink)] p-8 md:p-12 text-center cyber-border print:hidden">
                <div className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 font-label-md text-label-md font-bold uppercase mb-6">
                    <span className="material-symbols-outlined text-base">verified</span>
                    Application Received
                </div>

                <h1 className="font-headline-xl text-headline-xl uppercase text-foreground mb-4">
                    {applicantName ? `${applicantName}, TRANSMISSION COMPLETE` : 'TRANSMISSION COMPLETE'}
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
                    {applicantName
                        ? `${applicantName}, your application has been submitted successfully. Our team will review it and reach out if you move forward in the recruitment process.`
                        : 'Your application has been submitted successfully. Our team will review it and reach out if you move forward in the recruitment process.'}
                </p>

                <div className="grid gap-4 md:grid-cols-2 mb-8 text-left">
                    <div className="bg-surface-container-low border-[2px] border-surface-container-highest p-4">
                        <h2 className="font-label-md text-label-md font-bold uppercase text-primary-container mb-2">Next Step</h2>
                        <p className="font-body-md text-body-md text-foreground">Keep an eye on your email and phone for any updates from the recruitment team.</p>
                    </div>
                    <div className="bg-surface-container-low border-[2px] border-surface-container-highest p-4">
                        <h2 className="font-label-md text-label-md font-bold uppercase text-primary-container mb-2">Status</h2>
                        <p className="font-body-md text-body-md text-foreground">Your response data has been securely transmitted and recorded.</p>
                    </div>
                </div>

                {submittedApplication && (
                    <section className="mb-8 text-left print:mb-0">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <h2 className="font-headline-md text-headline-md uppercase text-foreground">Your Submitted Inputs</h2>
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="bg-primary-container text-on-primary-container border-[3px] border-on-primary-container font-label-md text-label-md px-4 py-2 font-black uppercase neo-btn cyber-shadow-magenta transition-all inline-flex items-center justify-center gap-2 print:hidden"
                            >
                                PRINT / SAVE AS PDF
                                <span className="material-symbols-outlined">print</span>
                            </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 print:grid-cols-1">
                            <div className="bg-surface-container-low border-[2px] border-surface-container-highest p-4 print:bg-white print:border-black print:break-inside-avoid">
                                <h3 className="font-label-md text-label-md font-bold uppercase text-primary-container mb-3">Base Details</h3>
                                <ul className="space-y-2 font-body-md text-body-md text-foreground">
                                    <li><span className="text-on-surface-variant">Full name:</span> {displayBaseDetails?.fullName || '-'}</li>
                                    <li><span className="text-on-surface-variant">Reg no:</span> {displayBaseDetails?.regNo || '-'}</li>
                                    <li><span className="text-on-surface-variant">Email:</span> {displayBaseDetails?.vitEmail || '-'}</li>
                                    <li><span className="text-on-surface-variant">Phone:</span> {displayBaseDetails?.phoneNo || '-'}</li>
                                    <li><span className="text-on-surface-variant">Year:</span> {displayBaseDetails?.yearOfStudy || '-'}</li>
                                </ul>
                            </div>

                            <div className="bg-surface-container-low border-[2px] border-surface-container-highest p-4 print:bg-white print:border-black print:break-inside-avoid">
                                <h3 className="font-label-md text-label-md font-bold uppercase text-primary-container mb-3">Department Inputs</h3>
                                <div className="space-y-4 max-h-[420px] overflow-auto pr-2 print:max-h-none print:overflow-visible print:pr-0">
                                    {Object.keys(completedDepartments).length > 0 ? (
                                        Object.entries(completedDepartments).map(([deptId, answers]) => (
                                            <div key={deptId} className="border border-white/10 p-3 print:border-black print:break-inside-avoid">
                                                <h4 className="font-label-md text-label-md font-bold uppercase text-foreground mb-2">
                                                    {DEPARTMENT_LABELS[deptId] || deptId}
                                                </h4>
                                                <div className="space-y-2">
                                                    {Object.entries(answers).map(([questionId, answer]) => (
                                                        <div key={questionId} className="border-b border-white/10 pb-2 last:border-b-0 last:pb-0 print:border-black/10">
                                                            <p className="font-label-sm text-label-sm uppercase text-on-surface-variant print:text-black/70">{getQuestionLabel(deptId, questionId)}</p>
                                                            <p className="font-body-md text-body-md text-foreground whitespace-pre-wrap print:text-black">{answer || '-'}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="font-body-md text-body-md text-on-surface-variant">No department inputs found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
                    <Link href="/" className="bg-primary-container text-on-primary-container border-[3px] border-on-primary-container font-headline-sm text-headline-sm px-8 py-4 font-black uppercase neo-btn cyber-shadow-magenta transition-all inline-flex items-center justify-center gap-2">
                        BACK TO HOME
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                    
                </div>
            </div>

            <section className="hidden print:block w-full max-w-[180mm] mx-auto bg-white text-black p-0 font-mono">
                <div className="border-2 border-black p-6 mb-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.3em] font-bold mb-1">ACM-W Chennai</p>
                            <h1 className="text-2xl font-bold uppercase leading-tight">
                                Application Submission
                            </h1>
                        </div>
                        <div className="text-right text-[11px] leading-5">
                            <p>{submittedApplication?.submittedAt ? new Date(submittedApplication.submittedAt).toLocaleString() : new Date().toLocaleString()}</p>
                            <p>{applicantName || 'Applicant'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[12px]">
                        <div className="border border-black p-3">
                            <p className="font-bold uppercase mb-2">Base Details</p>
                            <div className="space-y-1">
                                <p><span className="font-bold">Full Name:</span> {displayBaseDetails?.fullName || '-'}</p>
                                <p><span className="font-bold">Reg No:</span> {displayBaseDetails?.regNo || '-'}</p>
                                <p><span className="font-bold">Email:</span> {displayBaseDetails?.vitEmail || '-'}</p>
                                <p><span className="font-bold">Phone:</span> {displayBaseDetails?.phoneNo || '-'}</p>
                                <p><span className="font-bold">Year:</span> {displayBaseDetails?.yearOfStudy || '-'}</p>
                            </div>
                        </div>

                        <div className="border border-black p-3">
                            <p className="font-bold uppercase mb-2">Summary</p>
                            <p><span className="font-bold">Name:</span> {applicantName || '-'}</p>
                            <p><span className="font-bold">Departments Completed:</span> {submittedDepartmentEntries.length}</p>
                            <p><span className="font-bold">Status:</span> Submitted</p>
                        </div>
                    </div>
                </div>

                <div className="border-2 border-black p-6">
                    <p className="text-[11px] uppercase tracking-[0.3em] font-bold mb-4">Department Inputs</p>

                    <div className="space-y-6">
                        {submittedDepartmentEntries.length > 0 ? (
                            submittedDepartmentEntries.map(([deptId, answers]) => (
                                <article key={deptId} className="border border-black p-4 break-inside-avoid-page">
                                    <h2 className="font-bold uppercase text-sm mb-3">
                                        {DEPARTMENT_LABELS[deptId] || deptId}
                                    </h2>

                                    <div className="space-y-3">
                                        {Object.entries(answers).map(([questionId, answer], index) => (
                                            <div key={questionId} className="border-b border-black/20 pb-2 last:border-b-0 last:pb-0">
                                                <p className="text-[10px] uppercase font-bold leading-snug mb-1">
                                                    {index + 1}. {getQuestionLabel(deptId, questionId)}
                                                </p>
                                                <p className="text-[12px] whitespace-pre-wrap leading-5">{answer || '-'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p className="text-[12px]">No department inputs found.</p>
                        )}
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 10mm;
                    }

                    html,
                    body {
                        background: #fff !important;
                        color: #000 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    body > header,
                    body > footer {
                        display: none !important;
                    }

                    main {
                        min-height: auto !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        overflow: visible !important;
                        background: #fff !important;
                    }

                    .print\:hidden {
                        display: none !important;
                    }

                    .print\:block {
                        display: block !important;
                    }

                    .break-inside-avoid-page {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </main>
    );
}