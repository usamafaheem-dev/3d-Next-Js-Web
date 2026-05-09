"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-500 px-4 md:px-0 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <nav
        className={`flex items-center justify-between transition-all duration-500 rounded-full relative ${
          scrolled
            ? "w-full md:w-[85%] max-w-6xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 md:px-12 py-4"
            : "w-full max-w-7xl bg-transparent border border-transparent px-4 md:px-0 py-2"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <span className="text-3xl font-bold font-heading text-gradient leading-none">N</span>
          <span className="font-heading font-medium text-lg tracking-tight text-white">
            NexusAI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/70 hover:text-white text-[13px] font-medium tracking-wide transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 z-50">
          <Link
            href="#contact"
            className="hidden sm:flex px-6 py-2.5 rounded-full text-[13px] font-medium bg-gradient-brand text-white items-center gap-2 transition-all duration-300 transform active:scale-95 shadow-[0_0_20px_rgba(155,44,250,0.3)]"
          >
            Let's Talk <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Hamburger Menu Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 mx-2 p-6 rounded-3xl bg-[#0a0a15]/95 backdrop-blur-2xl border border-white/10 md:hidden flex flex-col gap-6 shadow-2xl z-40"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white text-lg font-medium tracking-wide px-4 py-2 hover:bg-white/5 rounded-xl transition-all"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
                 <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full justify-center px-6 py-4 rounded-2xl text-[15px] font-bold bg-gradient-brand text-white flex items-center gap-2"
                >
                  Let's Talk <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
