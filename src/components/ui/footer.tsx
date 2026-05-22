"use client";

import { ArrowUp, Heart, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";

export default function Footer() {
  const { theme, addToast } = usePortfolioStore();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    addToast("Scrolled to top", "info");
  };

  const accentColor = theme.accentHex;

  return (
    <footer className="w-full border-t border-white/[0.04] bg-black/40 py-12 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-neutral-500 font-mono">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-white tracking-wider font-mono">SK.DEV</span>
          <span className="text-xs">© {new Date().getFullYear()} Budige Srijan Kumar Goud</span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-5">
          <a
            href={PORTFOLIO_DATA.personal.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-colors"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="h-4 w-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.socials.email}
            className="hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={handleBackToTop}
          className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 hover:text-white hover:border-white/10 hover:bg-white/[0.05] transition-all text-xs font-semibold tracking-wider cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Bottom line */}
      <div className="max-w-7xl mx-auto text-center mt-8 pt-6 border-t border-white/[0.03] text-[10px] text-neutral-600 font-mono flex items-center justify-center gap-1.5 flex-wrap">
        <span>Built with</span>
        <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
        <span>using Next.js · TypeScript · Tailwind CSS · Framer Motion · Three.js</span>
      </div>
    </footer>
  );
}
