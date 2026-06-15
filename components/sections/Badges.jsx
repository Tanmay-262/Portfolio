"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { badges } from "@/data/badges";
import { ExternalLink, ShieldCheck, ChevronDown, X } from "lucide-react";
import Image from "next/image";

export function Badges() {
  const [showModal, setShowModal] = useState(false);
  const displayedBadges = badges.slice(0, 3);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const BadgeCard = ({ badge }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ "--glow-color": badge.glowColor }}
      className={`flex flex-col group rounded-3xl border border-border bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-500 ${badge.borderColor} hover:shadow-2xl hover:shadow-[var(--glow-color)]`}
    >
      {/* Card Top: Pulsing status + Image showcase */}
      <div className="relative p-6 flex flex-col items-center justify-center bg-gradient-to-br from-card/80 to-secondary/30 h-52 border-b border-border/40">
        {/* Verification Seal */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Verifiable
        </div>

        {/* Badge Image */}
        <div className="relative w-32 h-32 drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-500 ease-out">
          <Image
            src={badge.badgeImage}
            alt={badge.title}
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-6">
        {/* Issuer & Platform */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
            {badge.issuer}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">
            via {badge.platform}
          </span>
        </div>

        {/* Badge Title */}
        <h3 className="text-lg font-bold text-foreground mb-1 leading-snug group-hover:text-primary transition-colors duration-300">
          {badge.title}
        </h3>
        
        {/* Earned Date */}
        <span className="text-xs text-muted-foreground mb-4">
          Earned {badge.issueDate}
        </span>

        {/* Skills/Tags validated by the Badge */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {badge.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-secondary text-secondary-foreground border border-border/60"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action button at bottom */}
        <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secure Credential
          </span>
          
          {badge.verificationUrl !== "#" ? (
            <a
              href={badge.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              Verify
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className="text-xs font-medium text-muted-foreground italic px-2 py-1 bg-secondary rounded">
              In-Platform
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <section id="badges" className="py-10 md:py-16 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Verifiable Digital Badges
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Verified credentials and skill achievements from leading tech platforms. Click to inspect and verify the official record on the issuer's verification gateway.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </motion.div>

        {badges.length > 3 && (
          <motion.div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-full hover:bg-secondary/80 transition-colors border border-border"
            >
              Show All Badges <ChevronDown size={18} />
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
                <h2 className="text-2xl font-bold text-foreground">All Badges</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {badges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


