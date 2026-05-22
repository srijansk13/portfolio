"use client";

import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import ProjectsShowcase from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full relative z-10">
      <Hero />
      <About />
      <Skills />
      <ProjectsShowcase />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
