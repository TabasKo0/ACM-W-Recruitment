'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const OptionWheel = dynamic(() => import('@/components/optionWheel'), { ssr: false });

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const departmentsData = [
  {
    id: 'technical',
    tag: 'CODE • BUILD • TEACH',
    title: 'TECHNICAL',
    description: 'Website development, hackathon problem statements, technical workshops, and dev tooling.',
    bgClass: 'bg-secondary-container',
    borderClass: 'border-white',
    textClass: 'text-white',
    shadowClass: 'shadow-[6px_6px_0px_#9D72FF]',
    tagBg: 'bg-secondary-container',
    tagBorder: 'border-white',
    tagText: 'text-white',
    btnBg: 'bg-white',
    btnText: 'text-secondary-container',
    btnBorder: 'border-white',
    btnShadow: 'shadow-[6px_6px_0px_0px_#9D72FF]',
    btnHover: 'hover:opacity-90',
  },
  {
    id: 'webdev',
    tag: 'FRONTEND • BACKEND • WEB',
    title: 'WEB DEV',
    description: 'React, Next.js, UI engineering, and building digital platforms for the community.',
    bgClass: 'bg-brand-purple',
    borderClass: 'border-white',
    textClass: 'text-[#0A0F24]',
    shadowClass: 'shadow-[6px_6px_0px_#de42fc]',
    tagBg: 'bg-brand-purple',
    tagBorder: 'border-[#0A0F24]',
    tagText: 'text-[#0A0F24]',
    btnBg: 'bg-[#0A0F24]',
    btnText: 'text-brand-purple',
    btnBorder: 'border-[#0A0F24]',
    btnShadow: 'shadow-[6px_6px_0px_0px_white]',
    btnHover: 'hover:bg-surface-container-highest',
  },
  {
    id: 'design',
    tag: 'VISUALS • BRANDING • UI',
    title: 'DESIGN & UI/UX',
    description: 'Website UI/UX, event posters, visual branding, social media assets, and badges.',
    bgClass: 'bg-primary-container',
    borderClass: 'border-white',
    textClass: 'text-[#0A0F24]',
    shadowClass: 'shadow-[6px_6px_0px_#FF7EE2]',
    tagBg: 'bg-primary-container',
    tagBorder: 'border-[#0A0F24]',
    tagText: 'text-[#0A0F24]',
    btnBg: 'bg-[#0A0F24]',
    btnText: 'text-primary-container',
    btnBorder: 'border-[#0A0F24]',
    btnShadow: 'shadow-[6px_6px_0px_0px_white]',
    btnHover: 'hover:bg-surface-container-highest',
  },
  {
    id: 'management',
    tag: 'LOGISTICS • EXECUTION',
    title: 'EVENTS & OPS',
    description: 'Hackathon floor management, venue coordination, timeline planning, and workshop flow.',
    bgClass: 'bg-accent-pink',
    borderClass: 'border-white',
    textClass: 'text-[#0A0F24]',
    shadowClass: 'shadow-[6px_6px_0px_#ffd6f6]',
    tagBg: 'bg-accent-pink',
    tagBorder: 'border-[#0A0F24]',
    tagText: 'text-[#0A0F24]',
    btnBg: 'bg-[#0A0F24]',
    btnText: 'text-accent-pink',
    btnBorder: 'border-[#0A0F24]',
    btnShadow: 'shadow-[6px_6px_0px_0px_white]',
    btnHover: 'hover:bg-surface-container-highest',
  },
  {
    id: 'finance',
    tag: 'BILLS • BUDGET • ACCOUNTS',
    title: 'FINANCE & TREASURY',
    description: 'Budgeting, reimbursements, financial records, sponsor tracking, and expense workflows.',
    bgClass: 'bg-emerald-600',
    borderClass: 'border-white',
    textClass: 'text-white',
    shadowClass: 'shadow-[6px_6px_0px_#10B981]',
    tagBg: 'bg-emerald-600',
    tagBorder: 'border-white',
    tagText: 'text-white',
    btnBg: 'bg-white',
    btnText: 'text-emerald-600',
    btnBorder: 'border-white',
    btnShadow: 'shadow-[6px_6px_0px_0px_#10B981]',
    btnHover: 'hover:opacity-90',
  },
  {
    id: 'content',
    tag: 'COPY • STORYTELLING',
    title: 'CONTENT & EDITORIAL',
    description: 'Social media copy, newsletters, documentation, and event campaign writing.',
    bgClass: 'bg-primary',
    borderClass: 'border-white',
    textClass: 'text-[#0A0F24]',
    shadowClass: 'shadow-[6px_6px_0px_#5724b6]',
    tagBg: 'bg-primary',
    tagBorder: 'border-[#0A0F24]',
    tagText: 'text-[#0A0F24]',
    btnBg: 'bg-[#0A0F24]',
    btnText: 'text-primary',
    btnBorder: 'border-[#0A0F24]',
    btnShadow: 'shadow-[6px_6px_0px_0px_white]',
    btnHover: 'hover:bg-surface-container-highest',
  }
];

export default function DepartmentView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDept = departmentsData[activeIndex];
  const items = departmentsData.map(d => d.title);

  return (
    <main className="flex-grow w-full h-full min-h-screen flex flex-col md:flex-row bg-[#0A0F24] overflow-hidden">
      {/* Option Wheel Section (Left) */}
      <div className="w-full md:w-1/3 h-[40vh] md:h-screen relative flex flex-col justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-white/10 bg-surface-container">
        
        {/* Header / Back */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
            <Link className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors uppercase" href="/">
                <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                HOME
            </Link>
        </div>

        <div className="flex-1 w-full h-full relative">
            <OptionWheel
              items={items}
              defaultSelected={0}
              textColor="#a6a6a6"
              activeColor="#ffffff"
              side="left"
              fontSize={2.5}
              spacing={1.5}
              curve={1.2}
              tilt={10}
              blur={2}
              fade={0.25}
              smoothing={200}
              inset={50}
              loop={false}
              draggable={true}
              onChange={(index) => setActiveIndex(index)}
            />
        </div>
      </div>

      {/* Details Section (Right) */}
      <div className="w-full md:w-2/3 min-h-[60vh] md:h-screen relative flex flex-col p-6 md:p-12 justify-center items-center overflow-y-auto bg-surface-container-low">
        
        <AnimatePresence mode="wait">
            <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={cn(
                    "w-full max-w-2xl flex flex-col p-8 md:p-12 border-[3px] border-black relative neo-card",
                    activeDept.bgClass,
                    activeDept.shadowClass
                )}
            >
                <div className={cn(
                    "inline-block border-[2px] font-label-sm text-label-sm px-3 py-2 mb-6 uppercase font-bold w-fit",
                    activeDept.tagBg,
                    activeDept.tagBorder,
                    activeDept.tagText
                )}>
                    {activeDept.tag}
                </div>
                
                <h1 className={cn(
                    "font-headline-xl text-3xl md:text-5xl uppercase mb-6",
                    activeDept.title.includes("EVENTS") || activeDept.title.includes("CONTENT") || activeDept.id === 'webdev' || activeDept.id === 'design' ? "font-bold text-[#0A0F24]" : "text-white"
                )}>
                    {activeDept.title}
                </h1>
                
                <p className={cn(
                    "font-body-lg text-lg md:text-xl mb-12 border-l-[4px] pl-4 border-black/20",
                    activeDept.title.includes("EVENTS") || activeDept.title.includes("CONTENT") || activeDept.id === 'webdev' || activeDept.id === 'design' ? "font-medium text-[#0A0F24]" : "text-white/90"
                )}>
                    {activeDept.description}
                </p>

                <div className="flex flex-col gap-4 mt-auto">
                    <Link 
                        href="/recruitment" 
                        className={cn(
                            "w-full border-[3px] font-headline-md text-label-lg md:text-xl px-6 py-4 font-black uppercase neo-btn transition-all flex justify-between items-center text-center",
                            activeDept.btnBg,
                            activeDept.btnText,
                            activeDept.btnBorder,
                            activeDept.btnShadow,
                            activeDept.btnHover
                        )}
                    >
                        <span>START APPLICATION</span>
                        <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}
