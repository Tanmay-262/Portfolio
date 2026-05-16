import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Blog } from "@/components/sections/Blog";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Blog />
      <Gallery />
      <Contact />
    </div>
  );
}
