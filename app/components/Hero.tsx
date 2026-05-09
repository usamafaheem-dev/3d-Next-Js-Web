"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<{ [key: number]: HTMLImageElement }>({});
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadProgress, setLoadProgress] = useState(0);
  const totalFrames = 235;

  // Progressive Smart Loader: Loads sparse frames first for immediate interaction
  useEffect(() => {
    let loadedCount = 0;
    const tempImages: { [key: number]: HTMLImageElement } = {};

    const loadImages = async () => {
      // Phase 1: Rapid Sparse Load (Every 10th frame) for immediate scroll feel
      const sparseIndices = [];
      for (let i = 1; i <= totalFrames; i += 10) sparseIndices.push(i);
      
      // Phase 2: Full Fill (Fill the gaps)
      const allIndices = Array.from({ length: totalFrames }, (_, i) => i + 1);
      const remainingIndices = allIndices.filter(i => !sparseIndices.includes(i));
      
      const loadBatch = async (indices: number[]) => {
        for (const i of indices) {
          const img = new Image();
          const frameHash = i.toString().padStart(3, '0');
          img.src = `/hero-frames/ezgif-frame-${frameHash}.png`;
          
          await new Promise((resolve) => {
            img.onload = () => {
              loadedCount++;
              setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
              tempImages[i] = img;
              setImages(prev => ({ ...prev, [i]: img }));
              resolve(true);
            };
            img.onerror = resolve;
          });
          
          // Yield to main thread
          if (loadedCount % 5 === 0) await new Promise(r => setTimeout(r, 0));
        }
      };

      // Load sparse first, then the rest
      await loadBatch(sparseIndices);
      loadBatch(remainingIndices);
    };

    loadImages();
  }, []);

  // Track the scroll progress precisely for this large container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the exact frame based on explicit float offsets
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frame = Math.round(latest * (totalFrames - 1)) + 1; 
    const clampedFrame = Math.max(1, Math.min(totalFrames, frame));
    setCurrentFrame(clampedFrame);
  });

  // Draw to Canvas on frame change with high fidelity
  useEffect(() => {
    // Optimization: Find the nearest loaded frame to show something immediately 
    // instead of waiting for a 100% specific frame.
    const findNearestFrame = (target: number) => {
      const keys = Object.keys(images).map(Number);
      if (keys.length === 0) return null;
      // Find closest key that is <= target
      return keys.reduce((prev, curr) => 
        (curr <= target && curr > prev) ? curr : prev, keys[0]
      );
    };

    const nearestFrame = findNearestFrame(currentFrame);
    
    if (nearestFrame && images[nearestFrame] && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { alpha: false });
      if (context) {
        const img = images[nearestFrame];
        
        // Handle aspect ratio cover logic manually for canvas
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    }
  }, [currentFrame, images]);

  // Handle Resize for Canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Much larger container (350vh)
    <section id="home" ref={containerRef} className="relative w-full h-[350vh] bg-[#05050a]">
      
      {/* Strictly sticky layout locks the hero view in place while we scroll through the huge area */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden border-b border-white/[0.03]">
        
        {/* Absolute Background Wrapper */}
        <div className="absolute inset-0 z-0 bg-[#05050a]">
          
          {/* High Performance Canvas Renderer */}
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Fallback frame while loading */}
          {loadProgress < 5 && (
            <img 
               src="/hero-frames/ezgif-frame-001.png" 
               className="absolute inset-0 w-full h-full object-cover z-0"
               alt="Hero Fallback"
            />
          )}

          {/* Loading Indicator for Production Slowness */}
          {loadProgress < 100 && (
             <div className="absolute bottom-8 right-8 z-50 flex items-center gap-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300" 
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                  BUFFERING ASSETS: {loadProgress}%
                </span>
             </div>
          )}

          {/* Left deep dark fade text container legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05050a]/95 via-[#05050a]/40 to-transparent z-10 w-full md:w-[70%] pointer-events-none" />
          
          {/* Bottom dark fade */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#05050a] to-transparent z-10 pointer-events-none" />
          
          {/* Fallback floating purple particles */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#9b2cfa]/5 blur-[80px] rounded-full z-0 mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#3a7bfd]/5 blur-[80px] rounded-full z-0 mix-blend-screen pointer-events-none" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-8 relative z-20 flex flex-col justify-center h-full pt-20 pointer-events-auto">
          <div className="max-w-2xl relative z-30">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#3a7bfd] shadow-[0_0_10px_#3a7bfd]" />
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#8b5cf6] uppercase">
                AI SOLUTIONS FOR THE FUTURE
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-[40px] sm:text-6xl md:text-7xl lg:text-[85px] font-bold font-heading text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 leading-[1.05] mb-6 tracking-tight drop-shadow-sm"
            >
              Intelligence <br />
              That <span className="bg-gradient-to-r from-[#3a7bfd] via-[#8b5cf6] to-[#9b2cfa] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">Evolves.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
