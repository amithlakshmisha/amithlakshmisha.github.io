import React from 'react';

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="my-8">
    <h2 className="text-4xl font-bold mb-4">{title}</h2>
    <div className="space-y-8">
      {children}
    </div>
  </section>
);

export default Section;
