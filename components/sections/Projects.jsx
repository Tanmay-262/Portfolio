"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ExternalLink, ChevronDown, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import Image from "next/image";

export function Projects() {
  const [showModal, setShowModal] = useState(false);
  const displayedProjects = projects.slice(0, 3);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
      className="flex flex-col group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Image Placeholder or actual Image if exists */}
      <div className="relative h-48 w-full bg-muted overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
        {/* If we have actual images we can use next/image here */}
        {/* <Image src={project.image} alt={project.title} fill className="object-cover transition-transform group-hover:scale-105 duration-500" /> */}
        <span className="text-muted-foreground/50 font-mono text-sm z-0">
          [Image: {project.image}]
        </span>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors z-20">
                <GithubIcon size={20} />
              </a>
            )}
            {project.links.live && project.links.live !== "#" && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors z-20">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground border border-border">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <section id="projects" className="py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Here are some of the projects I've worked on recently. They highlight my focus on AI, full-stack development, and cybersecurity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length > 3 && (
          <motion.div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-full hover:bg-secondary/80 transition-colors border border-border"
            >
              Show All Projects <ChevronDown size={18} />
            </button>
          </motion.div>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
                <h2 className="text-2xl font-bold text-foreground">All Projects</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
