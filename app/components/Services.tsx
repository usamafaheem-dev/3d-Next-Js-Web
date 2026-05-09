"use client";

import { motion } from "framer-motion";
import { Cpu, Network, Webhook, BrainCircuit, Globe, ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const services = [
  { icon: BrainCircuit, title: "Cognitive AI Models", desc: "Custom trained ML pipelines built to solve niche enterprise logic natively.", color: 'purple' as const },
  { icon: Network, title: "Neural Networks", desc: "Deep learning models capable of data synthesis and autonomous processing.", color: 'blue' as const },
  { icon: Cpu, title: "Edge Processing", desc: "Deploying intelligent operations rapidly at the peripheral node layer.", color: 'green' as const },
  { icon: Webhook, title: "API Microservices", desc: "Interconnected, headless system communication bridges.", color: 'orange' as const },
  { icon: Globe, title: "Spatial Web Apps", desc: "Next-gen immersive 3D generative web architectures.", color: 'purple' as const }
];

export default function Services() {
  return (
    <section id="services" className="relative py-8 md:py-16 px-4 sm:px-8 lg:px-16 w-full z-10 bg-[#05050a]/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col justify-center items-center text-center">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3a7bfd]" />
                <span className="text-[10px] tracking-[0.2em] font-semibold text-[#8b5cf6] uppercase">
                  Platform Services
                </span>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight max-w-2xl"
            >
              Enterprise-Grade <br/>
              <span className="text-white/40">AI Capabilities</span>.
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-1"
          >
             <GlowCard glowColor="purple" customSize className="w-full h-full bg-[#05050a]/60 flex flex-col justify-between group relative overflow-hidden p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3a7bfd]/5 to-[#9b2cfa]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                   <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#3a7bfd] mb-6">
                     <BrainCircuit className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">Core Model<br/>Development</h3>
                   <p className="text-sm text-white/50 leading-relaxed max-w-[250px]">
                     Building foundational models with strict adherence to dataset integrity and ethical inference boundaries.
                   </p>
                </div>
                <div className="mt-12 flex justify-end relative z-10">
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#3a7bfd] group-hover:border-transparent transition-colors shadow-lg">
                     <ArrowUpRight className="w-4 h-4 text-white" />
                   </div>
                </div>
             </GlowCard>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.slice(1).map((service, i) => {
              // Direction logic: Top, Bottom, Right, Bottom-Right
              const directions = [
                { x: 0, y: -40 }, // Top
                { x: 50, y: 0 },  // Right
                { x: 0, y: 40 },  // Bottom
                { x: 50, y: 50 }, // Bottom Right
              ];
              const dir = directions[i % directions.length];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, ...dir, filter: "blur(5px)" }}
                  whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7, 
                    delay: i * 0.15,
                    ease: [0.21, 0.47, 0.32, 0.98] 
                  }}
                >
                  <GlowCard glowColor={service.color} customSize className="flex flex-col h-full bg-[#05050a]/60 p-8 group transition-all duration-300 hover:bg-[#05050a]/80">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors mb-6 glass-panel">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {service.desc}
                    </p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
