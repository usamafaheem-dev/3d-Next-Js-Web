"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { Cpu, Zap, Database, Globe } from "lucide-react";
import { useInView } from "react-intersection-observer";

// Optimized Spline Loader with Viewport Awareness
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[10px] tracking-widest font-mono">LOADING 3D ENGINE...</div>
});

const TechBadge = ({ label, icon: Icon, position }: { label: string, icon: any, position: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`absolute ${position} z-30 group cursor-default`}
  >
    <div className="glass-panel-heavy px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 backdrop-blur-md bg-[#0a0a15]/80 shadow-2xl">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 group-hover:text-purple-400 transition-colors">
        <Icon size={16} />
      </div>
      <span className="text-[11px] font-bold text-white/60 tracking-wider group-hover:text-white transition-colors uppercase">{label}</span>
    </div>
  </motion.div>
);

export default function TechStack() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="tech-stack" className="relative py-8 md:py-24 px-4 md:px-16 w-full z-10 overflow-hidden border-y border-white/[0.03] scroll-mt-20 bg-black">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#3a7bfd]/20 to-transparent shadow-[0_0_40px_rgba(58,123,253,0.2)]" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-10 md:mb-20 relative z-20 max-w-2xl px-4">
          <motion.div 
             initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
             whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             transition={{ duration: 0.8 }}
             className="flex items-center justify-center gap-3 mb-4 md:mb-6"
          >
             <div className="w-1.5 h-1.5 rounded-full bg-[#3a7bfd] animate-pulse" />
             <span className="text-[10px] md:text-[11px] tracking-[0.4em] font-bold text-[#8b5cf6] uppercase">
               The Architecture
             </span>
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
             whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="text-[28px] sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 font-heading text-white tracking-tighter leading-tight"
          >
            A Unified Core <br/>
            <span className="text-white/30">Intelligence.</span>
          </motion.h2>
        </div>

        <div ref={ref} className="relative w-full max-w-[1200px] h-[300px] sm:h-[500px] md:h-[750px] flex items-center justify-center">
          
          {/* Floating Technology Anchors */}
          <TechBadge label="Next.js 15" icon={Globe} position="top-[10%] left-[5%] md:left-[10%] hidden md:flex" />
          <TechBadge label="PyTorch AI" icon={Cpu} position="top-[25%] right-[5%] md:right-[15%] hidden md:flex" />
          <TechBadge label="PostgreSQL" icon={Database} position="bottom-[35%] left-[0%] md:left-[5%] hidden md:flex" />
          <TechBadge label="AWS Cloud" icon={Zap} position="bottom-[15%] right-[0%] md:right-[10%] hidden md:flex" />

          {/* Aesthetic UI Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center">
            <div className="absolute w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[140px]" />
            <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-white/5" />
          </div>

          {/* New Spline Scene - Only Render when In View */}
          <div 
             className="absolute inset-0 z-10 pointer-events-auto flex items-center justify-center"
          >
             {inView && (
               <Spline scene="https://prod.spline.design/SRBqmEpEga5YbjmO/scene.splinecode" />
             )}
             
             {/* Hidden Mask for Spline Watermark */}
             <div className="absolute bottom-0 right-0 w-[150px] h-[50px] bg-black z-20" />
          </div>
        </div>

      </div>
    </section>
  );
}
