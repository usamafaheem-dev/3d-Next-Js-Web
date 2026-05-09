"use client"

import React, { useState, useRef, useEffect } from "react";
import { User, Mail, MessageSquare, ArrowRight, Send, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utils function to combine class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// DotMap Component
type RoutePoint = {
  x: number;
  y: number;
  delay: number;
};

const DotMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const routes: { start: RoutePoint; end: RoutePoint; color: string }[] = [
    {
      start: { x: 100, y: 150, delay: 0 },
      end: { x: 200, y: 80, delay: 2 },
      color: "#3b82f6",
    },
    {
      start: { x: 200, y: 80, delay: 2 },
      end: { x: 260, y: 120, delay: 4 },
      color: "#9333ea",
    },
    {
      start: { x: 50, y: 50, delay: 1 },
      end: { x: 150, y: 180, delay: 3 },
      color: "#3b82f6",
    },
    {
      start: { x: 280, y: 60, delay: 0.5 },
      end: { x: 180, y: 180, delay: 2.5 },
      color: "#9333ea",
    },
  ];

  const generateDots = (width: number, height: number) => {
    const dots = [];
    const gap = 12;
    const dotRadius = 1;

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const isInMapShape =
          ((x < width * 0.25 && x > width * 0.05) && (y < height * 0.4 && y > height * 0.1)) ||
          ((x < width * 0.25 && x > width * 0.15) && (y < height * 0.8 && y > height * 0.4)) ||
          ((x < width * 0.45 && x > width * 0.3) && (y < height * 0.35 && y > height * 0.15)) ||
          ((x < width * 0.5 && x > width * 0.35) && (y < height * 0.65 && y > height * 0.35)) ||
          ((x < width * 0.7 && x > width * 0.45) && (y < height * 0.5 && y > height * 0.1)) ||
          ((x < width * 0.8 && x > width * 0.65) && (y < height * 0.8 && y > height * 0.6));

        if (isInMapShape && Math.random() > 0.3) {
          dots.push({
            x,
            y,
            radius: dotRadius,
            opacity: Math.random() * 0.5 + 0.1,
          });
        }
      }
    }
    return dots;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      if (canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = generateDots(dimensions.width, dimensions.height);
    let animationFrameId: number;
    let startTime = Date.now();

    function drawDots() {
      if (!ctx) return;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();
      });
    }

    function drawRoutes() {
      if (!ctx) return;
      const currentTime = (Date.now() - startTime) / 1000;
      routes.forEach(route => {
        const elapsed = currentTime - route.start.delay;
        if (elapsed <= 0) return;
        const duration = 3;
        const progress = Math.min(elapsed / duration, 1);
        const x = route.start.x + (route.end.x - route.start.x) * progress;
        const y = route.start.y + (route.end.y - route.start.y) * progress;
        
        ctx.beginPath();
        ctx.moveTo(route.start.x, route.start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = route.color;
        ctx.setLineDash([2, 4]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = route.color;
        ctx.fill();
      });
    }
    
    function animate() {
      drawDots();
      drawRoutes();
      const currentTime = (Date.now() - startTime) / 1000;
      if (currentTime > 10) startTime = Date.now();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <div className="relative w-full h-full overflow-hidden opacity-40">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section id="contact" className="relative py-8 md:py-16 w-full bg-[#05050a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] tracking-[0.4em] font-bold text-[#8b5cf6] uppercase">Initialize Connection</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[34px] sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight"
          >
            Let&apos;s Build the <span className="text-[#8b5cf6]">Future.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto overflow-hidden rounded-[24px] sm:rounded-[32px] flex flex-col md:flex-row bg-[#080810]/80 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {/* Left side - Visual Map Integration */}
          <div className="hidden md:flex w-1/2 min-h-[550px] relative overflow-hidden border-r border-white/5 bg-[#0a0a15]">
            <DotMap />
            
            <div className="absolute inset-0 flex flex-col items-start justify-end p-12 z-10 bg-gradient-to-t from-[#05050a] via-transparent to-transparent">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 h-12 w-12 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-[0_0_20px_rgba(58,123,253,0.3)]"
              >
                <Globe className="text-white h-5 w-5" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-white mb-4 leading-tight"
              >
                Global <br/><span className="text-[#3b82f6]">Inference Network</span>
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-white/40 max-w-xs leading-relaxed"
              >
                Connecting your project with next-generation autonomous systems and spatial intelligence across every continent.
              </motion.p>
            </div>
          </div>
          
          {/* Right side - Pure Contact Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Get in touch</h1>
              <p className="text-sm text-white/40 mb-8 sm:mb-10">Initialize a directive for our autonomous team.</p>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 ml-1">Identity Node</label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-12 text-white placeholder:text-white/20 focus:border-blue-500/50 outline-none transition-all"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 ml-1">Communication Port</label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-12 text-white placeholder:text-white/20 focus:border-blue-500/50 outline-none transition-all"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 ml-1">Directive Logic</label>
                  <div className="relative group">
                    <textarea
                      placeholder="Outline system requirements and objectives..."
                      className="w-full min-h-[140px] bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-5 text-white placeholder:text-white/20 focus:border-blue-500/50 outline-none transition-all resize-none"
                    />
                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="w-full h-16 bg-gradient-brand text-white rounded-2xl font-bold flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_20px_40px_-10px_rgba(58,123,253,0.3)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Deploy Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    
                    {isHovered && (
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
