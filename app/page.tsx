"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import TrustSection from "./components/TrustSection";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect } from "react";

export default function Home() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] antialiased">
      {/* Subtle background noise/texture could go here, but pure black is more elegant */}
      
      <div className="relative z-10 flex flex-col w-full overflow-x-clip">
        <Navbar />
        <main className="flex flex-col w-full items-center">
          <Hero />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent max-w-7xl mx-auto" />
          <About />
          <TrustSection />
          <Services />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
