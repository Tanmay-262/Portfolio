"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export function About() {
  return (
    <section id="about" className="py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
            About Me
          </h2>
          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed text-lg">
            <p>
              I am a passionate software developer and cybersecurity enthusiast currently pursuing my B.Tech in Computer Science. My journey is driven by a deep curiosity about how intelligent systems can solve complex, real-world problems.
            </p>
            <p>
              Whether it's building full-stack applications with MERN and Next.js, or experimenting with Machine Learning models for intrusion detection, I enjoy bridging the gap between security and scalable engineering.
            </p>
            <p>
              When I'm not coding or participating in hackathons, you can find me exploring open-source projects or writing about the things I learn along the way.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {Object.entries(siteConfig.stats).map(([key, value], index) => (
            <div 
              key={key}
              className="p-6 rounded-2xl bg-secondary/50 border border-border flex flex-col items-center justify-center text-center gap-2"
            >
              <h4 className="text-3xl font-bold text-primary">{value}</h4>
              <p className="text-sm font-medium text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
