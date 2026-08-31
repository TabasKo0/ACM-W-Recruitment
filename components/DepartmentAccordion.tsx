'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
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

export function DepartmentAccordion({ completedDepts, onReset }: { completedDepts: string[]; onReset?: (deptId: string) => void }) {
  const [activeDept, setActiveDept] = useState<number | null>(0);
  const [pendingResetDeptId, setPendingResetDeptId] = useState<string | null>(null);
  const [isTearing, setIsTearing] = useState(false);
  const [tearPhase, setTearPhase] = useState(0);

  const pendingResetDept = departmentsData.find((dept) => dept.id === pendingResetDeptId) ?? null;

  const closeResetModal = () => {
    if (isTearing) return;
    setPendingResetDeptId(null);
  };

  const performResetDept = () => {
    if (!pendingResetDept) return;

    if (onReset) {
      onReset(pendingResetDept.id);
    } else {
      Cookies.remove(`dept_${pendingResetDept.id}`);
      window.location.reload();
    }

    closeResetModal();
  };

  const handleDeleteClick = () => {
    if (!pendingResetDept || isTearing) return;

    setIsTearing(true);
    setTearPhase(1);

    window.setTimeout(() => {
      setTearPhase(2);
    }, 170);

    window.setTimeout(() => {
      setTearPhase(3);
    }, 320);

    window.setTimeout(() => {
      performResetDept();
      setIsTearing(false);
      setTearPhase(0);
    }, 720);
  };

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
                "relative cursor-pointer overflow-hidden neo-card border-[3px] border-black flex flex-col justify-between transition-colors",
                dept.bgClass,
                //dept.borderClass,
                    completedDepts.includes(dept.id) ? " border-b-green-400" : '',
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
                  <div>

                 
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
                                      {/*   {completedDepts.includes(dept.id) ? <span className="material-symbols-outlined p-1 text-[#75FB4C]" data-icon="check">done_outline</span> : null} */}

                   </div>
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
                      <h2 className={cn("font-headline-md text-headline-md uppercase mb-stack-sm", "dept.textClass", dept.title.includes("EVENTS") || dept.title.includes("CONTENT") ? "font-medium text-[#0A0F24]" : "text-white")}>
                        {dept.title}
                      </h2>
                      <p className={cn("font-body-md text-body-md mb-stack-md whitespace-normal"," dept.textClass", dept.title.includes("EVENTS") || dept.title.includes("CONTENT") ? "font-medium text-[#0A0F24]" : "text-white") }>
                        {dept.description}
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-2">
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

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPendingResetDeptId(dept.id);
                        }}
                        aria-label={`Reset ${dept.title} data`}
                        className={cn(
                        "absolute top-4 right-4 cursor-pointer font-label-md text-label-sm  mb-stack-sm uppercase font-bold hover:scale-[1.08] transition-transform  hover:color-red-400",
                        dept.tagBg,
                        dept.tagText
                      )}>             
                      {completedDepts.includes(dept.id) ?                       <span className="material-symbols-outlined color-[#D16D6A]" data-icon="remove">delete_forever</span>
:``}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
      {pendingResetDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close reset confirmation"
            onClick={closeResetModal}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={isTearing ? { opacity: tearPhase >= 3 ? 0 : 1, scale: tearPhase >= 3 ? 0.78 : [1, 1.04, 0.92], x: tearPhase >= 3 ? [0, -36, 34] : [0, -14, 12, -8, 0], y: tearPhase >= 3 ? [0, -12, 10] : [0, -6, 4, -2, 0], rotate: tearPhase >= 3 ? [0, -4, 4] : [0, -1.4, 1.2, -0.8, 0] } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: isTearing ? 0.72 : 0.28, ease: isTearing ? [0.12, 0.9, 0.2, 1] : 'easeOut' }}
            className={cn(
              "relative w-full max-w-lg border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.35)] p-6 md:p-8 overflow-hidden",
              pendingResetDept.bgClass,
              pendingResetDept.shadowClass
            )}
          >
            <AnimatePresence>
              {isTearing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <motion.div
                    initial={{ y: 0 }}
                    animate={tearPhase >= 3 ? { y: -220, x: -220, rotate: -18, opacity: 0 } : tearPhase >= 2 ? { y: -110, x: -88, rotate: -8 } : { y: -28, x: -22, rotate: -2 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute left-0 top-0 h-1/2 w-full bg-inherit"
                    style={{ clipPath: tearPhase >= 3 ? 'polygon(0 0, 100% 0, 100% 58%, 91% 48%, 82% 62%, 73% 44%, 64% 66%, 55% 42%, 46% 68%, 37% 40%, 28% 64%, 19% 42%, 10% 58%, 0 52%)' : tearPhase >= 2 ? 'polygon(0 0, 100% 0, 100% 70%, 93% 64%, 86% 76%, 79% 62%, 72% 78%, 65% 60%, 58% 80%, 51% 62%, 44% 78%, 37% 60%, 30% 76%, 23% 62%, 16% 78%, 9% 64%, 0 72%)' : 'polygon(0 0, 100% 0, 100% 82%, 92% 78%, 84% 86%, 76% 78%, 68% 86%, 60% 78%, 52% 86%, 44% 78%, 36% 86%, 28% 78%, 20% 86%, 12% 78%, 4% 86%, 0 82%)' }}
                  />
                  <motion.div
                    initial={{ y: 0 }}
                    animate={tearPhase >= 3 ? { y: 220, x: 240, rotate: 16, opacity: 0 } : tearPhase >= 2 ? { y: 110, x: 92, rotate: 8 } : { y: 16, x: 18, rotate: 2 }}
                    transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute left-0 bottom-0 h-1/2 w-full bg-inherit"
                    style={{ clipPath: tearPhase >= 3 ? 'polygon(0 24%, 6% 14%, 12% 30%, 18% 10%, 24% 34%, 30% 12%, 36% 34%, 42% 8%, 48% 32%, 54% 12%, 60% 34%, 66% 10%, 72% 30%, 78% 14%, 84% 28%, 90% 12%, 100% 24%, 100% 100%, 0 100%)' : tearPhase >= 2 ? 'polygon(0 26%, 7% 18%, 14% 30%, 21% 16%, 28% 32%, 35% 18%, 42% 34%, 49% 16%, 56% 32%, 63% 18%, 70% 34%, 77% 16%, 84% 30%, 91% 18%, 100% 26%, 100% 100%, 0 100%)' : 'polygon(0 18%, 8% 22%, 16% 14%, 24% 22%, 32% 14%, 40% 22%, 48% 14%, 56% 22%, 64% 14%, 72% 22%, 80% 14%, 88% 22%, 96% 14%, 100% 18%, 100% 100%, 0 100%)' }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.7 }}
                    animate={tearPhase >= 3 ? { opacity: 0, scaleX: 1.35, x: [0, -24, 24], rotate: -10 } : { opacity: [0.15, 1, 0.4], scaleX: [0.6, 1.12, 0.96] }}
                    transition={{ duration: 0.34, delay: 0.08 }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 border-y-[3px] border-dashed border-black bg-black/30 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isTearing ? (tearPhase >= 3 ? { opacity: 0, y: -28, scale: 0.9 } : { opacity: 0, y: -8 }) : { opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn("inline-block border-[2px] font-label-sm text-label-sm px-2 py-1 mb-4 uppercase font-bold", pendingResetDept.tagBg, pendingResetDept.tagBorder, pendingResetDept.tagText)}>
                Confirm deletion
              </div>

              <h3 className={cn("font-headline-md text-headline-md uppercase mb-3", pendingResetDept.textClass)}>
                Reset {pendingResetDept.title}?
              </h3>

              <p className={cn("font-body-md text-body-md mb-6", pendingResetDept.title.includes("EVENTS") || pendingResetDept.title.includes("CONTENT") ? "text-[#0A0F24]" : "text-white") }>
                This will remove all saved progress for this department from your browser. You can fill it again after resetting.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={isTearing ? { opacity: 0, y: 30, x: -10, rotate: -4, scale: 0.85 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.26, delay: 0.06 }}
                  onClick={closeResetModal}
                  className="w-full sm:w-auto border-[2px] border-black bg-white text-[#0A0F24] px-4 py-3 font-bold uppercase font-label-sm text-label-sm hover:opacity-90"
                >
                  Cancel
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={isTearing ? { opacity: 0, y: 38, x: 12, rotate: 6, scale: 0.82 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.26, delay: 0.12 }}
                  onClick={handleDeleteClick}
                  disabled={isTearing}
                  className={cn(
                    "w-full sm:w-auto border-[2px] border-black px-4 py-3 font-bold uppercase font-label-sm text-label-sm transition-transform",
                    pendingResetDept.btnBg,
                    pendingResetDept.btnText,
                    pendingResetDept.btnHover,
                    isTearing ? "cursor-wait scale-[0.96]" : "hover:scale-[1.04]"
                  )}
                >
                  {isTearing ? 'Ripping...' : 'Delete saved data'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </motion.div>
  );
}
