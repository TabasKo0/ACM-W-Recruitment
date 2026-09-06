"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import CRTWarp from '@/components/CRTWarp';
import dynamic from 'next/dynamic';

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

const DepartmentExploreSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [wheelFontSize, setWheelFontSize] = useState(2.5);

  useEffect(() => {
    const handleResize = () => {
      setWheelFontSize(window.innerWidth < 768 ? 1.5 : 2.5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeDept = departmentsData[activeIndex];
  const items = departmentsData.map(d => d.title);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col bg-transparent relative z-10" id="departments">
      {/* DESKTOP VIEW */}
      <div className="hidden md:flex flex-row w-full h-full min-h-screen">
        {/* Option Wheel Section (Left) */}
        <div className="w-1/3 h-screen relative flex flex-col justify-center border-r-[3px] border-white/10 bg-transparent">
          <div className="flex-1 w-full h-full relative">
              <OptionWheel
                items={items}
                defaultSelected={0}
                textColor="#a6a6a6"
                activeColor="#ffffff"
                side="left"
                fontSize={wheelFontSize}
                spacing={1.5}
                curve={1.2}
                tilt={10}
                blur={2}
                fade={0.25}
                smoothing={200}
                inset={50}
                loop={false}
                draggable={true}
                wheelContainerRef={sectionRef}
                onChange={(index) => setActiveIndex(index)}
              />
          </div>
        </div>

        {/* Details Section (Right) */}
        <div className="w-2/3 h-screen relative flex flex-col p-12 justify-center items-center bg-transparent">
          <AnimatePresence mode="wait">
              <motion.div
                  key={activeDept.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={cn(
                      "w-full max-w-2xl flex flex-col p-8 lg:p-12 border-[3px] border-black relative neo-card",
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
                      "font-headline-xl text-3xl lg:text-5xl uppercase mb-6",
                      activeDept.title.includes("EVENTS") || activeDept.title.includes("CONTENT") || activeDept.id === 'webdev' || activeDept.id === 'design' ? "font-bold text-[#0A0F24]" : "text-white"
                  )}>
                      {activeDept.title}
                  </h1>
                  
                  <p className={cn(
                      "font-body-lg text-lg lg:text-xl mb-12 border-l-[4px] pl-4 border-black/20",
                      activeDept.title.includes("EVENTS") || activeDept.title.includes("CONTENT") || activeDept.id === 'webdev' || activeDept.id === 'design' ? "font-medium text-[#0A0F24]" : "text-white/90"
                  )}>
                      {activeDept.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-auto">
                      <Link 
                          href="/recruitment" 
                          className={cn(
                              "w-full border-[3px] font-headline-md text-label-lg lg:text-xl px-6 py-4 font-black uppercase neo-btn transition-all flex justify-between items-center text-center",
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
      </div>

      {/* MOBILE VIEW */}
      <div className="flex md:hidden flex-col w-full px-margin-main py-stack-lg gap-12 relative z-10 min-h-screen">
        <h2 className="font-headline-lg text-3xl font-black text-primary-container text-center border-b-4 border-primary-container pb-2 mx-auto inline-block">DEPARTMENTS</h2>
        
        <div className="flex flex-col gap-8 w-full">
          {departmentsData.map((dept) => (
            <div
                key={dept.id}
                className={cn(
                    "w-full flex flex-col p-6 border-[3px] border-black relative neo-card",
                    dept.bgClass,
                    dept.shadowClass
                )}
            >
                <div className={cn(
                    "inline-block border-[2px] font-label-sm text-label-sm px-3 py-2 mb-4 uppercase font-bold w-fit",
                    dept.tagBg,
                    dept.tagBorder,
                    dept.tagText
                )}>
                    {dept.tag}
                </div>
                
                <h1 className={cn(
                    "font-headline-xl text-3xl uppercase mb-4",
                    dept.title.includes("EVENTS") || dept.title.includes("CONTENT") || dept.id === 'webdev' || dept.id === 'design' ? "font-bold text-[#0A0F24]" : "text-white"
                )}>
                    {dept.title}
                </h1>
                
                <p className={cn(
                    "font-body-lg text-lg mb-8 border-l-[4px] pl-4 border-black/20",
                    dept.title.includes("EVENTS") || dept.title.includes("CONTENT") || dept.id === 'webdev' || dept.id === 'design' ? "font-medium text-[#0A0F24]" : "text-white/90"
                )}>
                    {dept.description}
                </p>

                <div className="flex flex-col gap-4 mt-auto">
                    <Link 
                        href="/recruitment" 
                        className={cn(
                            "w-full border-[3px] font-headline-md text-label-lg px-4 py-3 font-black uppercase neo-btn transition-all flex justify-between items-center text-center",
                            dept.btnBg,
                            dept.btnText,
                            dept.btnBorder,
                            dept.btnShadow,
                            dept.btnHover
                        )}
                    >
                        <span>START APPLICATION</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className?: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="var(--color-primary-container)"
        strokeWidth="12"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};

// Sub-component for individual tracker nodes to handle their own localized transform animations
// Sub-component for individual tracker nodes to handle their own localized transform animations
const TrackerNode = ({ sec, scrollYProgress }: { sec: any, scrollYProgress: any }) => {
  // 1. Clamp startRange so it never drops below 0
  const startRange = Math.max(0, sec.pos - 0.2);
  // 2. Ensure endRange is strictly greater than startRange
  const endRange = Math.max(startRange + 0.01, sec.pos);

  const opacity = useTransform(scrollYProgress, [startRange, endRange], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [startRange, endRange], [0.7, 1.3]);
  const shadow = useTransform(
    scrollYProgress, 
    [startRange, endRange], 
    ["0px 0px 0px rgba(0,0,0,0)", `0px 0px 15px ${sec.color}`]
  );

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 flex items-center"
      style={{ top: `${sec.pos * 100}%` }}
    >
      <motion.div
        className="absolute right-6 font-headline-sm text-[11px] font-black tracking-widest text-right whitespace-nowrap"
        style={{ opacity, color: sec.color }}
      >
        {sec.name}
      </motion.div>
      <motion.div
        className="w-3 h-3 rotate-45 border-2 bg-[#0A0F24]"
        style={{ scale, borderColor: sec.color, boxShadow: shadow }}
      />
    </div>
  );
};
const CyberScrollTracker = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const [percent, setPercent] = useState(0);

  // Update percentage text dynamically
  useMotionValueEvent(scrollYProgress, "change", (latest: any) => {
    setPercent(Math.round(latest * 100));
  });

  const SECTIONS = [
    { name: "SYS.INIT", pos: -0, color: "#F3F4F6" },
    { name: "EXEC_WHY", pos: 0.25, color: "#9D72FF" },
    { name: "DEPARTMENTS", pos: 0.50, color: "#9D72FF" },
    { name: "PROTOCOL", pos: 0.75, color: "#FF7EE2" },
    { name: "SYS.FAQ", pos: 0.95, color: "#F3F4F6" }
  ];

  return (
    <>
      {/* Mobile Thin Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-[#9D72FF] z-50 md:hidden w-[100%] origin-left"
        style={{ 
          scaleX: scrollYProgress, 
          boxShadow: "0 0 12px #9D72FF, 0 0 4px #9D72FF" 
        }}
      />

      {/* Desktop HUD Vertical Tracker */}
      <div className="fixed right-6 lg:right-12 top-12 h-screen py-32 flex-col items-center justify-center z-50 pointer-events-none hidden md:flex">
        <div className="absolute top-20 font-mono text-[10px] font-black text-white/40 tracking-widest">
          SYS.TRK
        </div>

        <div className="relative w-[3px] h-full bg-white/10 flex flex-col">
          {/* Glowing active line fill */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-[#9D72FF] origin-top"
            style={{
              scaleY: scrollYProgress,
              boxShadow: "0 0 15px #9D72FF, 0 0 5px #9D72FF"
            }}
          />

          {/* Node Mapping */}
          {SECTIONS.map((sec, i) => (
            <TrackerNode key={i} sec={sec} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="absolute bottom-20 font-mono text-[13px] font-black tracking-widest text-[#9D72FF]">
          {percent.toString().padStart(2, '0')}%
        </div>
      </div>
    </>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden bg-[#0A0F24] relative scroll-smooth text-white">
      {/* Interactive CRT Warp Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <CRTWarp
          color="#de42fc"
          backgroundColor="#0A0F24"
          speed={0.35}
          curvature={0.15}
          scanlineStrength={0.2}
          scanlineFrequency={150}
          waveAmplitude={0.2}
          waveFrequency={2.0}
          bloom={1.2}
          bloomRadius={1}
          noise={0.06}
          vignette={0.3}
          brightness={1.1}
          pixelation={1}
          rgbShift={0.01}
          mouseReact={true}
          mouseStrength={0.4}
          dpr={1}
          fps={16}
          paused={false}
          className="w-full h-full"
        />
      </div>

      {/* Background SVG Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 flex justify-center opacity-30 mix-blend-screen">
        <LinePath 
          scrollYProgress={scrollYProgress} 
          className="h-[100%] max-w-[80vw]"
        />
      </div>

      {/* 🚀 INJECTED CYBER SCROLL TRACKER 🚀 */}
      <CyberScrollTracker scrollYProgress={scrollYProgress} />

      {/* Snap 1 */}
      <section className="min-h-screen flex flex-col relative z-10">
        {/* Marquee Banner */}
        <div className="marquee-container w-full bg-primary-container border-y-4 border-black overflow-hidden py-2 flex whitespace-nowrap z-40 relative">
          <div className="marquee-content flex gap-8 font-headline-md text-headline-md font-black text-black">
            <span>* ZERO BENCHWARMERS * 100% HANDS-ON EXECUTION * REAL MENTORSHIP * ACM-W CHENNAI RECRUITMENT LIVE *</span>
            <span>* ZERO BENCHWARMERS * 100% HANDS-ON EXECUTION * REAL MENTORSHIP * ACM-W CHENNAI RECRUITMENT LIVE *</span>
            <span>* ZERO BENCHWARMERS * 100% HANDS-ON EXECUTION * REAL MENTORSHIP * ACM-W CHENNAI RECRUITMENT LIVE *</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className=" flex flex-col justify-center items-center text-center px-margin-main py-stack-lg relative overflow-hidden bg-transparent">
          <div className="max-w-4xl z-10 flex flex-col items-center gap-stack-lg">
            <h1 className="font-headline-xl text-headline-xl md:text-[80px] font-black text-[#F3F4F6] leading-none">
              A CLUB WHERE EVERYONE ACTUALLY BUILDS
            </h1>
            <p className="font-body-lg text-body-lg text-[#F3F4F6] max-w-2xl bg-black p-4 border-4 border-white">
              No fluff. Just raw execution, building tools, running operations, and scaling high-footfall hackathons. We are recruiting the next generation of builders.
            </p>
            <Link className="mt-stack-lg bg-[#9D72FF] text-black font-headline-md text-headline-md px-8 py-4 border-4 border-white cyber-shadow-cyan cyber-interactive flex items-center gap-2 group font-black" href="#departments">
              EXPLORE DEPARTMENTS
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </section>
      </section>

      {/* Snap 2 */}
      <section className="min-h-screen flex flex-col justify-center px-margin-main py-stack-lg bg-transparent w-full relative z-10" id="why">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="font-headline-lg text-headline-lg font-black text-primary-container mb-stack-lg border-b-4 border-primary-container pb-2 inline-block">WHY EXECUTE WITH US</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Card 1 */}
            <div className="bg-[#0A0F24] border-4 border-primary-container p-stack-md cyber-shadow-magenta">
              <h3 className="font-headline-md text-headline-md text-primary-container mb-stack-sm flex items-center gap-2 font-black">
                <span className="font-label-sm text-label-sm bg-accent-pink text-black font-black px-2 py-1">01</span> 
                ZERO GATEKEEPING
              </h3>
              <p className="font-body-md text-body-md text-foreground">
                We don&apos;t filter based on past resumes. If you are hungry to learn, you get a seat at the table.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-[#9D72FF] border-4 border-white p-stack-md cyber-shadow-pink text-black">
              <h3 className="font-headline-md text-headline-md mb-stack-sm flex items-center gap-2 font-black">
                <span className="font-label-sm text-label-sm bg-black text-[#9D72FF] px-2 py-1 font-black">02</span> 
                DIRECT MENTORSHIP
              </h3>
              <p className="font-body-md text-body-md font-bold">
                Learn directly from seniors who guide you through building tools and running operations.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-[#FF7EE2] border-4 border-white p-stack-md cyber-shadow-cyan text-black">
              <h3 className="font-headline-md text-headline-md mb-stack-sm flex items-center gap-2 font-black">
                <span className="font-label-sm text-label-sm bg-black text-[#FF7EE2] px-2 py-1 font-black">03</span> 
                MASSIVE EVENT SCALE
              </h3>
              <p className="font-body-md text-body-md font-bold">
                Be part of the core crew organizing high-footfall hackathons and campus bootcamps.
              </p>
            </div>
            {/* Card 4 */}
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

      {/* Snap 2.5: Department Explore */}
      <DepartmentExploreSection />

      {/* Snap 3 */}
      <section className="min-h-screen flex flex-col justify-center bg-transparent py-stack-lg relative z-10">
        {/* Timeline Section */}
        <div className="px-margin-main max-w-5xl mx-auto w-full" id="timeline">
          <h2 className="font-headline-lg text-headline-lg font-black text-primary-container mb-12 text-center">RECRUITMENT PROTOCOL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 relative">
            
            {/* Step 1 (Top Left) */}
            <div className="bg-black border-4 border-primary-container p-6 w-full text-center cyber-shadow-magenta z-10 flex flex-col justify-center min-h-[160px] md:col-start-1 md:row-start-1 relative">
              <span className="block font-headline-md text-headline-md text-primary-container font-black">1. APPLICATION</span>
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
            
            {/* Step 2 (Top Right) */}
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
            
            {/* Step 3 (Bottom Right) */}
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
            
            {/* Step 4 (Bottom Left) */}
            <div className="bg-black border-4 border-primary-container p-6 w-full text-center cyber-shadow-magenta z-10 flex flex-col justify-center min-h-[160px] md:col-start-1 md:row-start-2 relative mt-16 md:mt-0">
              <span className="block font-headline-md text-headline-md text-primary-container font-black">4. ONBOARDING</span>
              <span className="font-label-sm text-label-sm text-foreground mt-2 block">Finally, you&apos;re in!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Snap 4 */}
      <section className="min-h-screen flex flex-col justify-between bg-transparent pt-stack-lg relative z-10">
        <div className="flex-grow flex flex-col justify-center">

          {/* FAQ Section */}
          <div className="px-margin-main max-w-3xl mx-auto w-full mb-stack-lg" id="faq">
            <h2 className="font-headline-lg text-headline-lg font-black text-primary-container mb-stack-lg text-center md:text-left">SYSTEM QUERIES (FAQ)</h2>
            <div className="flex flex-col gap-stack-md">
              {/* Accordion Item */}
              <details className="group bg-black border-4 border-white transition-colors cyber-shadow-magenta mb-4">
                <summary className="font-headline-md text-headline-md p-4 cursor-pointer flex justify-between items-center bg-black text-white hover:bg-gray-900 font-black">
                  DO I NEED PRIOR EXPERIENCE?
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary-container">expand_more</span>
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
              <details className="group bg-black border-4 border-white transition-colors cyber-shadow-pink mb-4">
                <summary className="font-headline-md text-headline-md p-4 cursor-pointer flex justify-between items-center bg-black text-white hover:bg-gray-900 font-black">
                  WHAT ROLES ARE OPEN?
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-accent-pink">expand_more</span>
                </summary>
                <div className="p-4 border-t-4 border-white font-body-md text-body-md text-foreground bg-black">
                  Technical (Dev/Design), Operations, Logistics, and Marketing. We need builders across all domains.
                </div>
              </details>
              <details className="group bg-black border-4 border-white transition-colors cyber-shadow-magenta">
                <summary className="font-headline-md text-headline-md p-4 cursor-pointer flex justify-between items-center bg-black text-white hover:bg-gray-900 font-black">
                  CAN MEN JOIN ACM-W?
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary-container">expand_more</span>
                </summary>
                <div className="p-4 border-t-4 border-white font-body-md text-body-md text-foreground bg-black">
                  Affirmative. While ACM-W's core mission is to support, celebrate, and advocate for women in computing, membership and participation in our chapter are open to everyone regardless of gender. We welcome allies who want to execute and build with us.
                </div>
              </details>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}