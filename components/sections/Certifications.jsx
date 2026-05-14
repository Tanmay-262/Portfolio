"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications } from "@/data/certifications";
import { Award, ChevronDown, ExternalLink, X } from "lucide-react";

export function Certifications() {
  const [showModal, setShowModal] = useState(false);
  const displayedCerts = certifications.slice(0, 4);

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

  const CertCard = ({ cert }) => (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md cursor-pointer relative"
    >
      <div className="mt-1 p-2 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
        <Award size={24} />
      </div>
      <div className="flex-1 pr-6">
        <h3 className="font-semibold text-foreground mb-1 leading-snug group-hover:text-primary transition-colors">
          {cert.name}
        </h3>
        <p className="text-sm font-medium text-muted-foreground">
          {cert.issuer}
        </p>
      </div>
      <ExternalLink size={16} className="absolute right-5 top-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  );

  return (
    <>
      <section id="certifications" className="py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Continuous learning is key in tech. Here are my recent certifications and job simulations in Cybersecurity, AI, and Full-Stack Development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCerts.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>

        {certifications.length > 4 && (
          <motion.div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-full hover:bg-secondary/80 transition-colors border border-border"
            >
              Show All Certifications <ChevronDown size={18} />
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
              className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
                <h2 className="text-2xl font-bold text-foreground">All Certifications</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certifications.map((cert) => (
                    <CertCard key={cert.id} cert={cert} />
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
