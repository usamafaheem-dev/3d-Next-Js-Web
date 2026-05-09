"use client"

import { ImageCarouselHero } from "@/components/ui/ai-image-generator-hero"

export function VisualShowcase() {
  const images = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      alt: "Abstract AI Neural Network",
      rotation: -10,
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      alt: "Robotic Hand Intelligence",
      rotation: 5,
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      alt: "Cybersecurity Data Flow",
      rotation: -5,
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=800",
      alt: "Futuristic AI Interface",
      rotation: 12,
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
      alt: "Laboratory AI Research",
      rotation: -8,
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      alt: "Edge Computing Hardware",
      rotation: 15,
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      alt: "Global Data Network",
      rotation: -4,
    },
    {
        id: "8",
        src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
        alt: "Blockchain Visuals",
        rotation: 10,
    }
  ]

  const features = [
    {
      title: "Generative Precision",
      description: "Produce high-fidelity visuals and models with surgical accuracy and artistic depth.",
    },
    {
      title: "Instant Inference",
      description: "Real-time generation pipelines that transform raw data into insights in milliseconds.",
    },
    {
      title: "Adaptive Architectures",
      description: "Systems that evolve with your input, learning and refining their output continuously.",
    },
  ]

  return (
    <section id="showcase" className="w-full">
      <ImageCarouselHero
        title="Visualizing the Next Frontier of Intelligence"
        subtitle="Generative Visual Engine"
        description="We bridge the gap between abstract concepts and hyper-realistic digital assets using proprietary generative pipelines."
        ctaText="View Case Studies"
        onCtaClick={() => window.location.href = '#contact'}
        images={images}
        features={features}
      />
    </section>
  )
}
