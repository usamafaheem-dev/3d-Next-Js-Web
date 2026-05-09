"use client"

import { Sparkles } from "@/components/ui/sparkles"
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

// Brand Icons (Simplified Path Data)
const Google = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.16-1.56 4-1.2 1.2-2.84 2.12-5.48 2.12-4.48 0-8.08-3.6-8.08-8.08s3.6-8.08 8.08-8.08c2.4 0 4.2 1 5.36 2.08l2.32-2.32C19.16 2.2 16.12 1 12.48 1 5.6 1 0 6.6 0 13.48S5.6 25.96 12.48 25.96c3.6 0 6.44-1.2 8.64-3.48 2.28-2.28 3-5.52 3-8.28 0-.84-.08-1.64-.24-2.28h-11.4z" />
  </svg>
)

const Microsoft = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
  </svg>
)

const AWS = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M14.4 19.1c-1.6 0-3.3-.3-4.9-1-1.1-.4-1.5-1.4-1.1-2.4.4-1.1 1.4-1.5 2.4-1.1 1.1.5 2.3.7 3.5.7 3.2 0 4.7-1.3 4.7-2.6 0-.6-.3-1.2-1-1.7l-4.1-1.4c-1.8-.6-3.8-1.6-3.8-4.2 0-3 2.5-5.4 6.2-5.4 1.4 0 2.8.2 4.1.7 1.1.4 1.5 1.5 1.1 2.6-.4 1.1-1.5 1.5-2.6 1.1-1-.4-2.1-.5-3.1-.5-1.8 0-2.6.7-2.6 1.6 0 .5.3 1 .9 1.4l4.1 1.4c1.9.6 3.9 1.9 3.9 4.3 0 3.3-2.6 5.8-7.7 5.8z" />
  </svg>
)

const NVIDIA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M21.2 5.1C18.4 2.3 14.8.8 11 .8 7.2.8 3.5 2.3.8 5.1c-1 1.1-1.1 2.8 0 3.8 1.1 1 2.8 1 3.8 0 2.9-2.9 8.2-2.9 11.1 0 1.1 1 2.8 1 3.8 0 1.1-1 1-2.7-.3-3.8zM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
  </svg>
)

const OpenAI = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M22.28 7.59c-.48-1.77-1.73-3.23-3.41-3.95-2.2-.95-4.75-.43-6.42 1.3L12 5.4l-.45-.46c-1.67-1.73-4.22-2.25-6.42-1.3-1.68.72-2.93 2.18-3.41 3.95-.5 1.82-.12 3.78 1.05 5.28l1.3 1.66 2.44 3.1 3.49 4.44.45.57.45-.57 3.49-4.44 2.44-3.1 1.3-1.66c1.17-1.5 1.55-3.46 1.05-5.28z" />
  </svg>
)

const brandLogos = [
  { id: "google", component: Google, name: "Google" },
  { id: "microsoft", component: Microsoft, name: "Microsoft" },
  { id: "aws", component: AWS, name: "aws" },
  { id: "nvidia", component: NVIDIA, name: "NVIDIA" },
  { id: "openai", component: OpenAI, name: "OpenAI" }
]

export default function TrustSection() {
  return (
    <div className="w-full bg-[#05050a] pt-12 pb-0 relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-8 relative z-20">
        
        <div className="flex flex-col items-center mb-8">
           <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold mb-8">
             Accelerating the world's most innovative teams
           </span>
        </div>

        <div className="relative h-[80px] w-full">
          <InfiniteSlider 
            className='flex h-full w-full items-center' 
            duration={40}
            gap={40}
          >
            {brandLogos.map(({ id, component: Logo, name }) => (
              <div 
                key={id} 
                className="flex items-center gap-3 md:gap-4 text-white/30 hover:text-white transition-all duration-700 cursor-default group"
              >
                <div className="scale-75 md:scale-100 group-hover:scale-110 transition-transform duration-500">
                  <Logo />
                </div>
                <span className="text-[13px] md:text-[15px] font-bold tracking-tight opacity-80">{name}</span>
              </div>
            ))}
          </InfiniteSlider>

          {/* Fade edges - Responsive width */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#05050a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#05050a] to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* Aesthetic Sparkle Background */}
      <div className="relative -mt-8 h-[200px] w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none opacity-30">
        <Sparkles
          density={600}
          className="absolute inset-0 h-full w-full"
          color="#3a7bfd"
          speed={0.8}
          size={1}
        />
      </div>
    </div>
  )
}
