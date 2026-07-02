"use client";
import { useEffect, useState } from "react";

/**
 * Floating match-day nav. Hidden while the full-screen game hero is on
 * screen; slides in once the visitor scrolls into the story below.
 */
const LINKS = [
  { href: "#about", label: "Player Profile" },
  { href: "#work", label: "Career" },
  { href: "#contact", label: "Contact" },
];

const MatchNav = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 sm:gap-2 rounded-full px-2 py-1.5 bg-[rgb(8,20,13)]/85 backdrop-blur-md border border-secondary/40 shadow-card-lg">
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-1.5 pl-2 pr-2 sm:pr-3 font-display font-extrabold text-secondary uppercase tracking-widest text-sm hover:text-white transition-colors"
          aria-label="Back to the pitch"
        >
          <span aria-hidden>⚽</span>
          <span className="hidden sm:inline">Amith</span>
        </a>
        <span className="w-px h-5 bg-secondary/30" aria-hidden />
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-full font-display font-bold uppercase tracking-wider text-[13px] text-white/85 hover:text-secondary hover:bg-white/5 transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MatchNav;
