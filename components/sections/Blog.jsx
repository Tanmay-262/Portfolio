"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Network Intrusion Detection with Machine Learning",
    date: "Coming Soon",
    summary: "A deep dive into using Scikit-learn and Python to build real-time threat detection models.",
    link: "#",
  },
  {
    id: 2,
    title: "Building Scalable Full-Stack Apps with Next.js",
    date: "Coming Soon",
    summary: "Best practices, architecture patterns, and optimizations I use when starting a new React application.",
    link: "#",
  }
];

export function Blog() {
  return (
    <section id="blog" className="py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Recent Writing
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          I occasionally write about AI, cybersecurity, and web development. Here are some of my recent thoughts.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col justify-between p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <div>
              <span className="text-xs font-medium text-primary mb-3 inline-block">
                {post.date}
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 mb-6">
                {post.summary}
              </p>
            </div>
            
            <div className="flex items-center text-sm font-medium text-primary mt-auto">
              Read Article <ExternalLink size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
