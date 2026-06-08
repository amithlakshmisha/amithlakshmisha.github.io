import Game from "./components/game";
import AboutSection from "./components/aboutSection";
import WorkSection from "./components/workSection";

export default function Home() {
  return (
    <>
      {/* Hero: the soccer air-hockey game (full viewport) */}
      <Game />

      {/* Scrollable story: who I am + what I've done */}
      <div id="story" className="container mx-auto px-6 pb-12 scroll-mt-4">
        <AboutSection />
        <WorkSection />
      </div>

      <footer className="bg-card/90 backdrop-blur border-t-2 border-secondary/40">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="font-scoreboard text-sm text-secondary tracking-widest mb-2">
            ⚽ FULL TIME · THANKS FOR WATCHING ⚽
          </p>
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
