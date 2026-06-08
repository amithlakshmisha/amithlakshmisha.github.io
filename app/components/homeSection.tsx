"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const HomeSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // scoreboard ticker messages
  const texts = useMemo(() => [
    "SKILLED IN FULL STACK DEVELOPMENT",
    "REACT · ANGULAR · NODE · PYTHON",
    "BUILDING AI-POWERED SOLUTIONS",
  ], []);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        setTypingSpeed(40);
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        setTypingSpeed(90);
      }

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, typingSpeed, textIndex, texts]);

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
        {/* Scoreboard + text */}
        <div className="space-y-8 animate-slide-in-left lg:order-1 order-2 text-center lg:text-left">

          {/* Stadium LED scoreboard */}
          <div className="led-panel rounded-2xl p-5 sm:p-6 animate-flicker">
            <div className="flex items-center justify-between text-xs font-scoreboard tracking-widest text-white/60 mb-3">
              <span>⚽ MATCHDAY</span>
              <span className="led-green">● LIVE</span>
            </div>

            <div className="grid grid-cols-3 items-center gap-2 mb-4">
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-scoreboard text-white/50 mb-1">HOME</p>
                <p className="led-digits text-lg sm:text-2xl font-extrabold leading-none">AMITH</p>
              </div>
              <div className="text-center">
                <p className="led-digits text-3xl sm:text-5xl font-black leading-none">3<span className="text-white/40 mx-1">:</span>0</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-scoreboard text-white/50 mb-1">CHALLENGES</p>
                <p className="led-digits text-lg sm:text-2xl font-extrabold leading-none">SOLVED</p>
              </div>
            </div>

            {/* ticker */}
            <div className="bg-black/40 rounded-lg px-3 py-2 border border-led/20">
              <p className="font-scoreboard text-xs sm:text-sm min-h-[1.5em] flex items-center justify-center">
                <span className="led-green mr-1">{displayedText}</span>
                <span className="led-digits animate-pulse">_</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-scoreboard">
              <span className="gradient-text">Amith</span>
              <br />
              <span className="text-foreground">Lakshmisha</span>
            </h1>
            <p className="text-lg text-muted font-semibold tracking-wide">
              ⚽ Full Stack Developer · Squad No. <span className="text-secondary">10</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#work"
              className="bg-gradient-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-glow transition-all duration-300 hover:scale-105 transform font-scoreboard"
            >
              View Highlights
            </a>
            <a
              href="#about"
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-secondary hover:text-black transition-all duration-300 hover:scale-105 transform font-scoreboard"
            >
              Player Profile
            </a>
          </div>
        </div>

        {/* Profile / player card */}
        <div className="flex justify-center lg:order-2 order-1 animate-slide-in-right">
          <div className="relative group">
            {/* bouncing soccer ball */}
            <div className="absolute -top-6 -right-2 text-5xl z-20 animate-ball select-none" aria-hidden>⚽</div>

            <div className="absolute -inset-4 bg-gradient-primary rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative">
              <Image
                src="/amith.jpeg"
                alt="Amith Lakshmisha"
                width={300}
                height={300}
                className="rounded-full shadow-card-xl group-hover:scale-105 transition-transform duration-300"
                style={{
                  objectFit: "cover",
                  height: "300px",
                  width: "300px",
                }}
                priority
              />
              {/* spinning chalk ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-secondary/40 group-hover:border-secondary/70 transition-colors duration-300 animate-spin-ball"></div>
            </div>

            {/* captain's badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 led-panel rounded-full px-5 py-1.5">
              <span className="led-digits font-scoreboard text-sm font-bold">CAPTAIN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
