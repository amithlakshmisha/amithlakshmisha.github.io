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
      <div className="text-center mb-16 animate-slide-up">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="gradient-text">{title}</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
      </div>
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  </section>
);

export default Section;
