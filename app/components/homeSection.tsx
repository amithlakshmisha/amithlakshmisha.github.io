"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const HomeSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const texts = useMemo(() => [
    "I am a dedicated software engineer.",
    "Skilled in Full stack development.",
    "Committed to continuous learning in AI.",
    "Passionate about Web development.",
  ], []);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        setTypingSpeed(100);
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
        {/* Text Content */}
        <div className="space-y-8 animate-slide-in-left lg:order-1 order-2 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Amith</span>
              <br />
              <span className="text-foreground">Lakshmisha</span>
            </h1>
            <div className="h-16 flex items-center justify-center lg:justify-start">
              <p className="text-xl lg:text-2xl text-muted min-h-[2em] flex items-center">
                <span className="mr-2">{displayedText}</span>
                <span className="text-primary animate-pulse text-2xl font-bold">|</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href="#work"
              className="bg-gradient-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-glow transition-all duration-300 hover:scale-105 transform"
            >
              View My Work
            </a>
            <a 
              href="#about"
              className="border-2 border-primary text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 transform"
            >
              About Me
            </a>
          </div>
          
          {/* Floating Elements */}
          <div className="hidden lg:block absolute top-1/4 right-1/4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:order-2 order-1 animate-slide-in-right">
          <div className="relative group">
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
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
