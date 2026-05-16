"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  { id: 1, src: "/gallery/photo1.jpg", alt: "Moment 1" },
  { id: 2, src: "/gallery/photo2.jpg", alt: "Moment 2" },
  { id: 3, src: "/gallery/photo3.jpg", alt: "Moment 3" },
  { id: 4, src: "/gallery/photo4.jpg", alt: "Moment 4" },
  { id: 5, src: "/gallery/photo5.jpg", alt: "Moment 5" },
  { id: 6, src: "/gallery/photo6.jpg", alt: "Moment 6" },
  { id: 7, src: "/gallery/photo7.jpg", alt: "Moment 7" },
  { id: 8, src: "/gallery/photo8.jpg", alt: "Moment 8" },
  { id: 9, src: "/gallery/photo9.jpg", alt: "Moment 9" },
  { id: 10, src: "/gallery/photo10.jpg", alt: "Moment 10" },
  { id: 11, src: "/gallery/photo11.jpg", alt: "Moment 11" },
  { id: 12, src: "/gallery/photo12.jpg", alt: "Moment 12" },
  { id: 13, src: "/gallery/photo13.jpg", alt: "Moment 13" },
  { id: 14, src: "/gallery/photo14.jpg", alt: "Moment 14" },
  { id: 15, src: "/gallery/photo15.jpg", alt: "Moment 15" },
  { id: 16, src: "/gallery/photo16.jpg", alt: "Moment 16" },
];

export function Gallery() {
  // Duplicate images for infinite scroll
  const duplicatedImages = [...images, ...images];

  return (
    <section id="gallery" className="py-10 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Moments & Memories
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A glimpse into my journey, events, and community involvements.
        </p>
      </motion.div>

      <div className="relative flex overflow-hidden group">
        <motion.div
          className="flex space-x-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 80,
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="relative w-64 h-48 md:w-80 md:h-60 rounded-2xl overflow-hidden border border-border bg-card group-hover:border-primary/30 transition-colors"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
