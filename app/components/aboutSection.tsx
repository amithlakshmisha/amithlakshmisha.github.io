import Image from "next/image";
import Section from "./section";

const AboutSection = () => (
  <Section id="about" title="">
    {/* photo + name on one line */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left mb-14 animate-fade-in">
      <div className="relative group flex-shrink-0">
        <div className="absolute -inset-3 bg-gradient-primary rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <Image
          src="/amith.jpeg"
          alt="Amith Lakshmisha"
          width={170}
          height={170}
          priority
          className="relative rounded-full border-4 border-secondary/50 shadow-card-xl"
          style={{ width: 170, height: 170, objectFit: "cover" }}
        />
      </div>
      <div>
        <h2 className="text-4xl lg:text-6xl font-bold font-scoreboard">
          <span className="gradient-text">Amith Lakshmisha</span>
        </h2>
        <p className="mt-2 text-lg text-muted font-semibold tracking-wide">⚽ CTO@Mela</p>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300">
        <p className="text-lg leading-relaxed text-muted">
          <span className="text-primary font-semibold">Full Stack Engineer</span> with expertise in modern web technologies including React, Angular, Node.js, and Python, plus strong experience in <span className="text-secondary font-semibold">cloud computing, databases, and AI-powered solutions</span>. I focus on building scalable, user-friendly applications, thrive on solving complex challenges and collaborating across teams, and believe in the power of code to make a real, meaningful difference.
        </p>
      </div>

      <div className="space-y-6">
        <div className="led-panel rounded-3xl p-8 text-white shadow-card-xl">
          <h3 className="text-2xl font-bold mb-6 font-scoreboard">
            <span className="gradient-text">Skills</span>
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div className="space-y-2">
              <h4 className="font-scoreboard text-sm font-bold tracking-wide" style={{ color: "#d6ac63" }}>Frontend</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>React &amp; Angular</li>
                <li>TypeScript</li>
                <li>Streamlit</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-scoreboard text-sm font-bold tracking-wide" style={{ color: "#5fa974" }}>Backend</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>Node.js &amp; Python</li>
                <li>FastAPI &amp; REST APIs</li>
                <li>JSON Rules Engine</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-scoreboard text-sm font-bold tracking-wide" style={{ color: "#7ba3a0" }}>Cloud / DevOps</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>AWS</li>
                <li>GitLab CI/CD &amp; CircleCI</li>
                <li>Airflow &amp; Docker</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-scoreboard text-sm font-bold tracking-wide" style={{ color: "#c47c64" }}>AI &amp; Data</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>Generative AI &amp; Azure AI Foundry</li>
                <li>Neo4j &amp; Graph DBs</li>
                <li>ML Models</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default AboutSection;
