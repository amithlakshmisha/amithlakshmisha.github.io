"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "@/node_modules/next/image";

const HomeSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100); // Typing speed

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
        setTypingSpeed(50); // Speed up deleting
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        setTypingSpeed(100); // Normal typing speed
      }

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 500); // Delay before starting to delete
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, typingSpeed, textIndex, texts]);

  return (
    <div className="flex flex-row items-center justify-center my-8">
      <div className="flex-grow text-center">
        <h1 className="text-6xl font-bold mb-4">
          Amith Lakshmisha
        </h1>
        <p className="text-xl mt-4">
          {displayedText}
          <span className="text-blue-500">|</span>
        </p>
      </div>
      <Image
        src="/amith.jpeg"
        alt="Amith Lakshmisha"
        width={150}
        height={150}
        className="rounded-full ml-4"
        style={{
          objectFit: "cover",
          height: "200px",
          width: "200px",
        }}
      />
    </div>
  );
};

export default HomeSection;
