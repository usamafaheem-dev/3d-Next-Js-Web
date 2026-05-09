"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);

  // Safely preload images in background to avoid flicker when swapping
  useEffect(() => {
    for (let i = 1; i <= 235; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `/hero-frames/ezgif-frame-${frameNumber}.png`;
    }
  }, []);

  // Track the scroll progress precisely for this large container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the exact frame based on explicit float offsets
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 'latest' goes exactly 0.0 to 1.0. We map this strictly to frames 1 to 235
    const frame = Math.round(latest * 234) + 1; 
    const clampedFrame = Math.max(1, Math.min(235, frame));
    setCurrentFrame(clampedFrame);
  });

  const frameHash = currentFrame.toString().padStart(3, '0');

  return (
    // Much larger container (600vh) guarantees the hero section hangs around long enough to gently show all 235 frames
    <section id="home" ref={containerRef} className="relative w-full h-[300vh] bg-[#05050a]">
      
      {/* Strictly sticky layout locks the hero view in place while we scroll through the huge area */}
      <div className="sticky top-0 w-full h-screen min-h-[850px] flex items-center justify-center overflow-hidden border-b border-white/[0.03]">
        
        {/* Absolute Background Wrapper */}
        <div className="absolute inset-0 z-0 bg-[#05050a]">
          
          {/* Robust Image Tag seamlessly swapping sources natively handles drawing logic perfectly */}
          <img 
            src={`/hero-frames/ezgif-frame-${frameHash}.png`}
            alt="Hero Sequence Animation"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Left deep dark fade text container legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05050a]/90 via-[#05050a]/40 to-transparent z-10 w-full md:w-[65%] pointer-events-none" />
          
          {/* Bottom dark fade */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#05050a] to-transparent z-10 pointer-events-none" />
          
          {/* Fallback floating purple particles */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#9b2cfa]/10 blur-[100px] rounded-full z-0 mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#3a7bfd]/10 blur-[100px] rounded-full z-0 mix-blend-screen pointer-events-none" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-8 relative z-20 flex flex-col justify-center h-full pt-20 pointer-events-auto">
          <div className="max-w-2xl relative z-30">
            <motion.div 
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#3a7bfd] shadow-[0_0_10px_#3a7bfd]" />
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#8b5cf6] uppercase">
                AI SOLUTIONS FOR THE FUTURE
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-[40px] sm:text-6xl md:text-7xl lg:text-[85px] font-bold font-heading text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 leading-[1.05] mb-6 tracking-tight drop-shadow-sm"
            >
              Intelligence <br />
              That <span className="bg-gradient-to-r from-[#3a7bfd] via-[#8b5cf6] to-[#9b2cfa] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">Evolves.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-white/60 text-lg md:text-[17px] font-light max-w-lg mb-10 leading-relaxed"
            >
              We build next-generation AI solutions that automate, innovate and accelerate the way businesses grow in the digital era.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-5 mb-16"
            >
              <button className="bg-gradient-brand px-7 py-3.5 rounded-full text-white font-medium text-[15px] flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(58,123,253,0.3)] hover:shadow-[0_0_30px_rgba(58,123,253,0.5)]">
                Explore Solutions <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <button className="glass-panel px-7 py-3.5 rounded-full text-white font-medium text-[15px] flex items-center gap-3 hover:bg-white/10 transition-colors">
                See Our Work <Play className="w-4 h-4 text-white" />
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold font-mono">
                TRUSTED BY INNOVATIVE COMPANIES
              </span>
              <div className="flex items-center gap-8 opacity-40 grayscale -ml-2">
                <span className="font-heading font-bold text-xl ml-2">Google</span>
                <span className="font-heading font-bold text-xl flex items-center gap-1">
                  <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                    <div className="bg-white" /><div className="bg-white" />
                    <div className="bg-white" /><div className="bg-white" />
                  </div>
                  Microsoft
                </span>
                <span className="font-heading font-bold text-xl tracking-tight">aws</span>
                <span className="font-heading font-bold text-xl tracking-tighter">NVIDIA</span>
                <span className="font-heading font-bold text-xl tracking-tight">OpenAI</span>
              </div>
            </motion.div>
          </div>
          
          {/* Floating Right Stats Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute right-0 bottom-12 glass-panel-heavy rounded-2xl rounded-r-none p-8 pl-10 hidden lg:flex items-center gap-12 border-r-0"
          >
            <div className="flex flex-col">
              <span className="text-[32px] font-bold text-white font-heading">150+</span>
              <span className="text-[11px] text-white/40 mt-1 uppercase tracking-widest">AI Projects</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[32px] font-bold text-white font-heading">98%</span>
              <span className="text-[11px] text-white/40 mt-1 uppercase tracking-widest">Client Satisfaction</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[32px] font-bold text-white font-heading">10x</span>
              <span className="text-[11px] text-white/40 mt-1 uppercase tracking-widest">Growth Impact</span>
            </div>
          </motion.div>

          {/* Floating Right Side Showreel CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute right-8 top-[40%] hidden xl:flex flex-col gap-8 items-end"
          >
            <div className="text-[9px] tracking-[0.25em] text-[#3a7bfd] uppercase text-right max-w-[150px] leading-[1.8] font-semibold">
              POWERING THE NEXT WAVE OF INNOVATION
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-bold text-white uppercase tracking-widest">Watch Intro</span>
                  <span className="text-[11px] text-white/40 mt-1">Play Showreel</span>
                </div>
                <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center glass-panel-heavy group-hover:bg-white/5 transition-colors">
                  <Play className="w-4 h-4 ml-1 text-white" />
                </button>
            </div>
          </motion.div>

          {/* Scroll indicator center bottom */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-semibold">Scroll Down</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1 relative overflow-hidden">
              <div className="w-1 h-2 bg-white/50 rounded-full animate-[bounce_2s_infinite]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
