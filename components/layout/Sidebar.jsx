"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@/components/ui/icons";
import { 
  Home, 
  User, 
  Briefcase, 
  Code, 
  Layers, 
  FileText, 
  Mail, 
  Download,
  Menu,
  X,
  Award
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Experience", href: "#experience", icon: Layers },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Certifications", href: "#certifications", icon: Award },
  { name: "Blog", href: "#blog", icon: FileText },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <span className="font-bold text-lg">{siteConfig.name}</span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-secondary rounded-md">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0 pt-16 md:pt-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary mb-1">TJ</h1>
          <p className="text-sm font-medium text-foreground">{siteConfig.name}</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border flex flex-col gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-between w-full px-4 py-2 bg-secondary text-foreground rounded-lg transition-colors text-sm font-medium hover:bg-secondary/80"
            >
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </button>
          )}
          
          <a 
            href={siteConfig.resume} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors text-sm font-medium hover:bg-primary/90"
          >
            <Download size={16} />
            Resume
          </a>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
