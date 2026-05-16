"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight, Mail, Briefcase } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import Link from "next/link";

const titles = [
  siteConfig.title,
  "Full-Stack Developer",
  "Machine Learning Enthusiast"
];

const TypewriterText = () => {
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && displayText === currentTitle) {
      typingSpeed = 2000; // Pause at end of word
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      typingSpeed = 500; // Pause before typing next word
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        currentTitle.substring(0, displayText.length + (isDeleting ? -1 : 1))
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <span className="inline-block min-w-[20px]">
      {displayText}
      <span className="animate-pulse border-r-2 border-primary ml-[1px]" />
    </span>
  );
};

export function Hero() {
  return (
    <section id="home" className="min-h-[75vh] flex flex-col justify-center py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Available for Jobs & Internships</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-2">Hi, I'm</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
              {siteConfig.name}
            </h1>
            <h3 className="text-2xl md:text-3xl font-semibold text-primary h-8 md:h-10">
              <TypewriterText />
            </h3>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <Link 
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
            >
              View My Work <ArrowRight size={18} />
            </Link>
            
            <a 
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 border border-border transition-all"
            >
              <GithubIcon size={18} /> GitHub
            </a>

            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg border border-primary/20 transition-all"
            >
              <Briefcase size={18} /> Hire Me
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 text-sm font-mono text-muted-foreground mt-8"
          >
            <span className="text-primary">&lt;</span>
            <span>building</span>
            <span className="text-primary">&middot;</span>
            <span>learning</span>
            <span className="text-primary">&middot;</span>
            <span>improving</span>
            <span className="text-primary">/&gt;</span>
          </motion.div>
        </div>

        {/* Graphic Area: Photo + Terminal Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col items-center justify-center order-first lg:order-none mb-12 lg:mb-0 relative lg:-mt-16"
        >
          {/* Theme Glow behind shoulder */}
          <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 bg-primary/40 rounded-full blur-[80px] z-[-1] animate-pulse" />

          {/* Profile Photo */}
          <div className="relative z-0 w-full max-w-[280px] md:max-w-[340px] flex justify-center -mb-6 pointer-events-none">
            <img 
              src="/profile.png" 
              alt={siteConfig.name} 
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            />
          </div>

          {/* Terminal Box */}
          <div className="w-full max-w-sm rounded-xl border border-border bg-card shadow-2xl overflow-hidden font-mono text-sm relative z-20">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-muted-foreground">whoami.sh</span>
            </div>
            <div className="p-4 flex flex-col gap-2 text-muted-foreground">
              <p><span className="text-primary">$</span> whoami</p>
              <p className="text-foreground">{siteConfig.name}</p>
              <p><span className="text-primary">$</span> role</p>
              <p className="text-foreground">{siteConfig.title}</p>
              <p><span className="text-primary">$</span> location</p>
              <p className="text-foreground">{siteConfig.location} ({siteConfig.timezone})</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
