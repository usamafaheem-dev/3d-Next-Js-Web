"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { id: "01", title: "Neuromorphic Web", type: "Generative Platform" },
  { id: "02", title: "Project Genesis", type: "LLM Agent System" },
];

export default function Portfolio() {
  return (
    <section id="showcase" className="relative py-32 px-8 lg:px-16 w-full z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3a7bfd]" />
                <span className="text-[10px] tracking-[0.2em] font-semibold text-[#8b5cf6] uppercase">
                  Showcase
                </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight">
              Deployed <br/><span className="text-white/30">Innovations.</span>
            </h2>
          </div>
          <button className="px-7 py-3.5 rounded-full border border-white/10 glass-panel hover:bg-white/10 transition-all flex items-center gap-2 text-[13px] font-medium max-w-max text-white">
            View Full Archive <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">

          {projects.map((project, i) => (
             <motion.div
               key={project.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               className="group cursor-pointer rounded-3xl glass-panel p-4 pb-8 border-white/[0.04] hover:shadow-[0_0_40px_rgba(58,123,253,0.1)] transition-all duration-500"
             >
               {/* Image Panel */}
               <div className="w-full h-[350px] bg-black rounded-2xl overflow-hidden relative border border-white/5 group-hover:border-[#3a7bfd]/30 transition-all duration-700 mb-8 flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#9b2cfa]/10 to-transparent mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 
                  <div className="text-[10px] font-semibold text-[#3a7bfd] tracking-[0.2em] uppercase text-center">
                     [ Live Project Render Wrapper ] <br/>
                     {project.title}
                  </div>
               </div>

               {/* Meta Panel */}
               <div className="w-full flex flex-col items-start gap-2 px-6">
                 <span className="text-[12px] text-[#8b5cf6] font-semibold tracking-widest uppercase">
                   {project.type}
                 </span>
                 <div className="flex w-full justify-between items-center">
                    <h3 className="text-3xl font-bold font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-brand transition-colors">
                      {project.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3a7bfd] group-hover:border-transparent transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                 </div>
               </div>
             </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
