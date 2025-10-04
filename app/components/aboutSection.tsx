import Section from "./section";

const AboutSection = () => (
  <Section id="about" title="About Me">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300">
          <p className="text-lg leading-relaxed text-muted">
            I am a dedicated <span className="text-primary font-semibold">Full Stack Engineer</span> with expertise in modern web technologies, including React, Angular, Node.js, and Python. Skilled in both frontend and backend development, I focus on building scalable, user-friendly applications that deliver real impact.
          </p>
        </div>
        
        <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300">
          <p className="text-lg leading-relaxed text-muted">
            With strong experience in <span className="text-secondary font-semibold">cloud computing, databases, and AI-powered solutions</span>, I thrive on solving complex challenges, collaborating across teams, and continuously expanding my technical expertise to stay ahead in an ever-evolving industry.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-primary rounded-3xl p-8 text-white shadow-card-xl">
          <h3 className="text-2xl font-bold mb-4">Core Expertise</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Frontend</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>React & Angular</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Backend</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>Node.js & Python</li>
                <li>FastAPI & REST APIs</li>
                <li>Databases</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Cloud & DevOps</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>AWS Services</li>
                <li>CI/CD Pipelines</li>
                <li>Docker</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">AI & Data</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>Generative AI</li>
                <li>Graph Databases</li>
                <li>ML Models</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300">
          <h3 className="text-xl font-bold mb-4 text-primary">What Drives Me</h3>
          <p className="text-muted leading-relaxed">
            I'm passionate about creating technology solutions that make a meaningful difference. Whether it's building AI-powered applications or optimizing user experiences, I believe in the power of code to solve real-world problems.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

export default AboutSection;
