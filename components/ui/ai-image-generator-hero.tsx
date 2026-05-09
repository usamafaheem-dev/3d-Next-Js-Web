"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCard {
  id: string
  src: string
  alt: string
  rotation: number
}

interface ImageCarouselHeroProps {
  title: string
  subtitle: string
  description: string
  ctaText: string
  onCtaClick?: () => void
  images: ImageCard[]
  features?: Array<{
    title: string
    description: string
  }>
}

export function ImageCarouselHero({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  images,
  features = [
    {
      title: "Realistic Results",
      description: "Realistic Results Photos that look professionally crafted",
    },
    {
      title: "Fast Generation",
      description: "Turn ideas into images in seconds.",
    },
    {
      title: "Diverse Styles",
      description: "Choose from a wide range of artistic options.",
    },
  ],
}: ImageCarouselHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [, setIsHovering] = useState(false)
  const [rotatingCards, setRotatingCards] = useState<number[]>([])

  // Continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingCards((prev) => prev.map((val) => (val + 0.5) % 360))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Initialize rotating cards
  useEffect(() => {
    setRotatingCards(images.map((_, i) => i * (360 / images.length)))
  }, [images.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="relative w-full py-24 sm:py-32 bg-transparent overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#3a7bfd]/5 to-[#9b2cfa]/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Subtitle/Badge */}
        <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3a7bfd]" />
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#8b5cf6] uppercase">
                {subtitle}
            </span>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-5xl h-[400px] sm:h-[550px] mb-12 sm:mb-20"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Rotating Image Cards */}
          <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
            {images.map((image, index) => {
              const angle = (rotatingCards[index] || 0) * (Math.PI / 180)
              const radius = 220 // Increased radius for better spread
              const x = Math.cos(angle) * radius
              const z = Math.sin(angle) * radius // Using Z for depth in 3D carousel

              // 3D perspective effect based on mouse position
              const perspectiveX = (mousePosition.x - 0.5) * 15
              const perspectiveY = (mousePosition.y - 0.5) * 15

              return (
                <div
                  key={image.id}
                  className="absolute w-40 h-52 sm:w-52 sm:h-64 transition-all duration-300"
                  style={{
                    transform: `
                      translate3d(${x}px, 0, ${z}px)
                      rotateX(${perspectiveY}deg)
                      rotateY(${perspectiveX}deg)
                      rotateZ(${image.rotation}deg)
                    `,
                    transformStyle: "preserve-3d",
                    zIndex: Math.round(z + radius), // Cards in front have higher zIndex
                    opacity: (z + radius) / (radius * 2) * 0.8 + 0.2 // Depth fade
                  }}
                >
                  <div
                    className={cn(
                      "relative w-full h-full rounded-2xl overflow-hidden glass-panel-heavy border-white/10",
                      "transition-all duration-300 hover:scale-110 hover:border-white/20",
                      "cursor-pointer group shadow-2xl"
                    )}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      priority={index < 3}
                    />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-20 text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl font-bold font-heading text-white mb-6 tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* CTA Button */}
          <button
            onClick={onCtaClick}
            className={cn(
              "inline-flex items-center gap-3 px-10 py-4 rounded-full",
              "bg-gradient-brand text-white font-semibold text-[15px]",
              "hover:shadow-[0_0_30px_rgba(58,123,253,0.4)] hover:scale-105 transition-all duration-300",
              "active:scale-95 group shadow-xl"
            )}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features Section */}
        <div className="relative z-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "text-left p-8 rounded-3xl",
                "glass-panel hover:bg-white/5 transition-all duration-500",
                "group border-white/5 hover:border-white/10"
              )}
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3a7bfd] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-white/40 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
