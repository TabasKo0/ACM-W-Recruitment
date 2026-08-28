'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import Link from 'next/link';

// Simple fallback for cn if clsx/tailwind-merge are not installed
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export type DepartmentInfo = {
  id: string;
  tag: string;
  title: string;
  description: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  shadowClass: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  btnBg: string;
  btnText: string;
  btnBorder: string;
  btnShadow: string;
  btnHover: string;
};

const departmentsData: DepartmentInfo[] = [
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
    borderClass: 'border-[#0A0F24]',
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
    borderClass: 'border-[#0A0F24]',
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
    borderClass: 'border-[#0A0F24]',
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
    id: 'content',
    tag: 'COPY • STORYTELLING',
    title: 'CONTENT & EDITORIAL',
    description: 'Social media copy, newsletters, documentation, and event campaign writing.',
    bgClass: 'bg-primary',
    borderClass: 'border-[#0A0F24]',
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

export function DepartmentAccordion({ completedDepts }: { completedDepts: string[] }) {
  const [activeDept, setActiveDept] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative w-full mx-auto"
    >
      <div className="flex flex-col md:flex-row w-full items-stretch justify-center gap-4 h-[1000px] md:h-[400px]">
        {departmentsData.map((dept, index) => {
          const isActive = activeDept === index;

          return (
            <motion.div
              key={dept.id}
              className={cn(
                "relative cursor-pointer overflow-hidden neo-card border-[3px] flex flex-col justify-between transition-colors",
                dept.bgClass,
                dept.borderClass,
                isActive ? dept.shadowClass : "shadow-none hover:shadow-[4px_4px_0px_rgba(255,255,255,0.1)]"
              )}
              initial={{ 
                flexBasis: '20%' 
              }}
              animate={{
                flexBasis: isActive ? '60%' : '10%',
                flexGrow: isActive ? 1 : 0
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} // smooth spring-like ease
              onClick={() => setActiveDept(index)}
              onHoverStart={() => setActiveDept(index)}
            >
              {/* Vertical Title (when inactive) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <h2 className={cn(
                      "font-headline-md text-headline-md uppercase whitespace-nowrap md:-rotate-90 md:origin-center",
                      dept.textClass,
                      "opacity-50"
                    )}>
                      {dept.title}
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Content (when active) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex flex-col h-full justify-between p-stack-md w-full min-w-[300px]"
                  >
                    <div>
                      <div className={cn(
                        "inline-block border-[2px] font-label-sm text-label-sm px-2 py-1 mb-stack-sm uppercase font-bold",
                        dept.tagBg,
                        dept.tagBorder,
                        dept.tagText
                      )}>
                        {dept.tag}
                      </div>
                      <h2 className={cn("font-headline-md text-headline-md uppercase mb-stack-sm", dept.textClass)}>
                        {dept.title}
                      </h2>
                      <p className={cn("font-body-md text-body-md mb-stack-md whitespace-normal", dept.textClass, dept.title.includes("DESIGN") || dept.title.includes("EVENTS") ? "font-medium" : "text-on-surface-variant")}>
                        {dept.description}
                      </p>
                    </div>

                    <Link 
                      href={`/apply/${dept.id}`} 
                      className={cn(
                        "w-full border-[3px] font-headline-md text-label-md px-4 py-3 font-bold uppercase neo-btn transition-all flex justify-between items-center",
                        dept.btnBg,
                        dept.btnText,
                        dept.btnBorder,
                        dept.btnShadow,
                        dept.btnHover
                      )}
                    >
                      {completedDepts.includes(dept.id) ? `EDIT ${dept.title}` : `SELECT ${dept.title}`}
                      <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
