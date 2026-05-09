"use client";

import Link from "next/link";
import { Send, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#05050a] pt-12 pb-10 px-4 sm:px-8 lg:px-16 w-full border-t border-white/[0.03] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 justify-between items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tighter text-white">
                NexusAI
              </span>
            </Link>
            <p className="text-white/40 font-light leading-relaxed max-w-sm text-[13px]">
              Pioneering the next era of digital intelligence through autonomous agents and immersive spatial web architectures.
            </p>
            <div className="flex items-center gap-6 mt-2">
              {["TW", "LI", "GH", "IG"].map((label, i) => (
                <Link key={i} href="#" className="text-[10px] font-bold tracking-[0.2em] text-white/20 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Links Groups */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 w-full">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Platform</h4>
              <nav className="flex flex-col gap-2.5 text-[13px]">
                <Link href="#home" className="text-white/40 hover:text-blue-400">Home</Link>
                <Link href="#about" className="text-white/40 hover:text-blue-400">About</Link>
                <Link href="#services" className="text-white/40 hover:text-blue-400">Services</Link>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Links</h4>
              <nav className="flex flex-col gap-2.5 text-[13px]">
                <Link href="#" className="text-white/40 hover:text-purple-400">Security</Link>
                <Link href="#" className="text-white/40 hover:text-purple-400">Legal</Link>
                <Link href="#contact" className="text-white/40 hover:text-purple-400">Contact</Link>
              </nav>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Newsletter</h4>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email Node" 
                  className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-xs text-white outline-none focus:border-blue-500/50"
                />
                <button className="absolute right-1.5 top-1.5 h-8 w-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white"><Send size={12} /></button>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 w-fit">
              <Mail size={14} className="text-purple-400" />
              <span className="text-[11px] text-white/50">hello@nexusai.io</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Simplified and Fixed for mobile */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-white/20 font-medium tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} NEXUS AI. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px]">Systems Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
