import React from 'react';
import Reveal from './reveal';

type SectionProps = {
  id: string;
  title: string;
  /** small match-programme label above the title, e.g. "SECOND HALF" */
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<SectionProps> = ({ id, title, eyebrow, children, className = "" }) => (
  <section id={id} className={`py-20 scroll-mt-20 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {title && (
        <Reveal className="text-center mb-14">
          {eyebrow && (
            <p className="font-scoreboard text-xs sm:text-sm tracking-[0.35em] text-secondary/90 uppercase mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display font-extrabold uppercase text-5xl lg:text-7xl tracking-tight leading-none mb-5">
            <span className="gradient-text">{title}</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-0.5 chalk-underline rounded-full"></div>
            <span className="text-xl" aria-hidden>⚽</span>
            <div className="w-20 h-0.5 chalk-underline rounded-full"></div>
          </div>
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

export default Section;
