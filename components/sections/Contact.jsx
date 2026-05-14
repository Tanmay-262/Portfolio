"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-10 md:py-16 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
        
        {/* Left Side: Text and Socials */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            I'm currently looking for new opportunities, internships, and exciting projects. 
            Whether you have a question or just want to say hi, my inbox is always open!
          </p>

          <a 
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors mt-4 w-fit"
          >
            <Mail size={20} />
            {siteConfig.email}
          </a>

          <div className="flex items-center gap-6 mt-8">
            {siteConfig.social.github && (
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-3 bg-secondary/50 rounded-full border border-border hover:border-primary">
                <GithubIcon size={24} />
              </a>
            )}
            {siteConfig.social.linkedin && (
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-3 bg-secondary/50 rounded-full border border-border hover:border-primary">
                <LinkedinIcon size={24} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Side: The Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 rounded-3xl bg-secondary/30 border border-border shadow-xl"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</label>
              <input 
                id="name"
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                className="px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</label>
              <input 
                id="email"
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                className="px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">Message</label>
              <textarea 
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="How can I help you?"
                className="px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="mt-2 flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={20} /> Message Sent!
                </>
              ) : (
                <>
                  <Send size={20} /> Send Message
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-red-500 text-sm text-center mt-2">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}
