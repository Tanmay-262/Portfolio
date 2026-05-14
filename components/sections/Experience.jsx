"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Experience & Education
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          My professional journey, education, and notable achievements in hackathons and open source.
        </p>
      </motion.div>

      <div className="relative border-l border-border ml-3 md:ml-0 md:pl-0">
        <div className="flex flex-col gap-10">
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline marker */}
              <div className="absolute left-[-5px] md:left-[-5px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                <h3 className="text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                  {item.date}
                </span>
              </div>
              
              <h4 className="text-lg font-medium text-muted-foreground mb-4">
                {item.company}
              </h4>
              
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
