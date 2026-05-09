"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import EarthGlobe from "@/components/ui/globe";

export default function About() {
  return (
    <section id="about" className="relative py-8 md:py-24 px-4 sm:px-8 lg:px-16 w-full bg-[#05050a] overflow-hidden border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          
          {/* Globe Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-[180px] h-[180px] sm:w-[320px] sm:h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">
              {/* Outer Glows */}
              <div className="absolute inset-0 bg-[#3a7bfd]/5 blur-[100px] rounded-full animate-pulse" />
              <div className="absolute inset-0 border border-white/5 rounded-full" />
              
              {/* CSS Earth Globe Component */}
              <EarthGlobe />

              {/* Data Overlays - Only on larger screens */}
              <div className="absolute inset-0 z-20 pointer-events-none hidden sm:block">
                <div className="absolute top-10 left-0 flex flex-col gap-1 items-start">
                  <div className="w-12 h-px bg-blue-500/50" />
                  <span className="text-[9px] text-blue-400 font-mono tracking-tighter">LAT: 37.7749</span>
                </div>
                <div className="absolute bottom-10 right-0 flex flex-col gap-1 items-end">
                  <span className="text-[9px] text-purple-400 font-mono tracking-tighter">LONG: -122.4194</span>
                  <div className="w-12 h-px bg-purple-500/50" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center gap-10">
            <div>
               <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9b2cfa]" />
                <span className="text-[10px] tracking-[0.2em] font-semibold text-[#8b5cf6] uppercase">
                  About NexusAI
                </span>
              </div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] font-heading text-white mb-6 tracking-tight"
              >
                Pioneering the <br />
                <span className="text-gradient">Next Era</span> of Intelligence.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-white/60 text-lg leading-relaxed font-light"
              >
                By blending machine learning protocols with stunning visual fidelity, we engineer digital ecosystems that adapt, scale, and outperform traditional systems at every constraint.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-4 p-6 glass-panel rounded-2xl border-white/[0.04]"
              >
                <div className="text-3xl font-bold font-heading text-white">40%</div>
                <h3 className="text-white text-sm font-medium">Efficiency Boost</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  Automating redundant tasks utilizing specialized LLM agents.
                </p>
              </motion.div>
              
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col gap-4 p-6 bg-gradient-brand rounded-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full mix-blend-overlay" />
                <div className="text-3xl font-bold font-heading text-white">99.9%</div>
                <h3 className="text-white text-sm font-medium">Uptime Guarantee</h3>
                <p className="text-white/80 text-[13px] leading-relaxed">
                  Robust scalable architecture ready for enterprise deployment.
                </p>
              </motion.div>
            </div>
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
            >
               <button className="flex items-center gap-3 text-white font-medium hover:text-[#3a7bfd] transition-colors group mt-4 text-[15px]">
                 Learn about our infrastructure <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
