import React from 'react';

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => (
  <section id={id} className={`py-20 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {title && (
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-scoreboard">
            <span className="gradient-text">{title}</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 chalk-underline rounded-full"></div>
            <span className="text-2xl" aria-hidden>⚽</span>
            <div className="w-16 h-0.5 chalk-underline rounded-full"></div>
          </div>
        </div>
      )}
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  </section>
);

export default Section;
