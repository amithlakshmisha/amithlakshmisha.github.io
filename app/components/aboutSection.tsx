import Image from "next/image";
import Section from "./section";
import Reveal from "./reveal";

const STATS = [
  { value: "8+", label: "Seasons Played", sub: "years of engineering" },
  { value: "6", label: "Clubs", sub: "companies & teams" },
  { value: "FS", label: "Position", sub: "full stack, box to box" },
];

const SKILL_GROUPS: { title: string; kit: string; items: string[] }[] = [
  { title: "Frontend", kit: "#deb568", items: ["React & Angular", "TypeScript", "Streamlit"] },
  { title: "Backend", kit: "#6ebe86", items: ["Node.js & Python", "FastAPI & REST APIs", "JSON Rules Engine"] },
  { title: "Cloud / DevOps", kit: "#7ba3a0", items: ["AWS & Azure", "GitLab CI/CD & CircleCI", "Airflow & Docker"] },
  { title: "AI & Data", kit: "#ca8066", items: ["Generative AI & Azure AI Foundry", "Neo4j & Graph DBs", "ML Models"] },
];

const AboutSection = () => (
  <Section id="about" title="Player Profile" eyebrow="First Half · Who I Am">
    {/* player card: photo + name + stat line */}
    <Reveal>
      <div className="sheet-card p-8 sm:p-10 mb-8" style={{ "--kit": "222, 181, 104" } as React.CSSProperties}>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-3 bg-gradient-primary rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Image
              src="/amith.jpeg"
              alt="Amith Lakshmisha"
              width={170}
              height={170}
              priority
              className="relative rounded-full border-4 border-secondary/60 shadow-card-xl"
              style={{ width: 170, height: 170, objectFit: "cover" }}
            />
            <span
              className="absolute -bottom-1 -right-1 crest !w-12 !h-12 text-lg"
              style={{ "--kit": "222, 181, 104" } as React.CSSProperties}
              aria-hidden
            >
              10
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display font-extrabold uppercase text-5xl sm:text-6xl leading-none tracking-tight">
              <span className="gradient-text">Amith Lakshmisha</span>
            </h2>
            <p className="mt-2 text-lg text-muted font-semibold tracking-wide">
              ⚽ Co-Founder &amp; CTO @ Mela · Full Stack Engineer
            </p>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted max-w-2xl md:mx-0 mx-auto">
              <span className="text-primary font-semibold">Full Stack Engineer</span> with expertise in modern web
              technologies including React, Angular, Node.js, and Python, plus strong experience in{" "}
              <span className="text-secondary font-semibold">cloud computing, databases, and AI-powered solutions</span>.
              I build scalable, user-friendly applications, thrive on solving complex challenges across teams, and
              believe in the power of code to make a real, meaningful difference.
            </p>
          </div>
        </div>

        {/* stat blocks */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-9 pt-8 border-t border-border/70">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="led-digits font-scoreboard text-3xl sm:text-4xl font-bold">{s.value}</div>
              <div className="font-display font-bold uppercase tracking-widest text-xs sm:text-sm text-white/85 mt-1.5">
                {s.label}
              </div>
              <div className="text-xs text-muted mt-0.5 hidden sm:block">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>

    {/* skills — the squad on the LED board */}
    <Reveal delay={120}>
      <div className="led-panel rounded-2xl p-8 sm:p-10 text-white shadow-card-xl">
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-8">
          <h3 className="font-display font-extrabold uppercase text-3xl tracking-tight">
            <span className="gradient-text">Skill Lineup</span>
          </h3>
          <span className="font-scoreboard text-xs tracking-[0.3em] text-secondary/80 uppercase">4 · 4 · 2</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="space-y-3">
              <h4
                className="font-display font-bold uppercase tracking-widest text-sm pb-2 border-b"
                style={{ color: g.kit, borderColor: `${g.kit}55` }}
              >
                {g.title}
              </h4>
              <ul className="text-sm space-y-2 text-white/80">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: g.kit }} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </Section>
);

export default AboutSection;
