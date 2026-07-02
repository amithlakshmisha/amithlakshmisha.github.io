import Game from "./components/game";
import AboutSection from "./components/aboutSection";
import WorkSection from "./components/workSection";
import ContactSection from "./components/contactSection";
import MatchNav from "./components/matchNav";
import { SOCIAL_LINKS, linkProps } from "./components/socialLinks";

export default function Home() {
  return (
    <>
      {/* floating nav — appears once you scroll off the pitch */}
      <MatchNav />

      {/* Hero: the soccer air-hockey game (full viewport) */}
      <Game />

      {/* Scrollable story: who I am + what I've done */}
      <div id="story" className="container mx-auto px-6 pb-12 scroll-mt-4">
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </div>

      <footer className="bg-card/90 backdrop-blur border-t-2 border-secondary/40">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="font-scoreboard text-sm text-secondary tracking-[0.25em] mb-4">
            ⚽ FULL TIME · THANKS FOR WATCHING ⚽
          </p>
          <div className="flex items-center justify-center gap-5 mb-5">
            {SOCIAL_LINKS.map((l) => (
              <a
                key={l.label}
                {...linkProps(l)}
                aria-label={l.label}
                title={l.label}
                className="text-muted hover:text-secondary hover:scale-110 transition-all duration-200"
              >
                {l.icon}
              </a>
            ))}
          </div>
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} Amith Lakshmisha. All rights reserved.
          </p>
          <p className="text-muted text-xs mt-2">
            Built with Next.js, TypeScript &amp; Tailwind CSS, on a pitch of pure code
          </p>
        </div>
      </footer>
    </>
  );
}
