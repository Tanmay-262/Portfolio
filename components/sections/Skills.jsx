"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Skills & Technologies
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A brief overview of the tools, languages, and frameworks I use to build scalable and secure applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.items.map(item => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-secondary text-foreground border border-border hover:border-primary/50 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
