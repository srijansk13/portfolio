import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import ProjectsShowcase from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full relative z-10">
      <Hero />
      <About />
      <ProjectsShowcase />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
