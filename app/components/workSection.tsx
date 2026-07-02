import React from "react";
import Section from "./section";
import Badge from "./badge";
import Reveal from "./reveal";

type Club = {
  name: string;
  crest: string;
  role: string;
  season: string;
  /** kit color as "r, g, b" — drives the card stripe, crest, tags and bullets */
  kit: string;
  url?: string;
  current?: boolean;
  intro?: React.ReactNode;
  badges: string[];
  bullets: React.ReactNode[];
};

const hl = (kit: string, children: React.ReactNode) => (
  <span className="font-semibold" style={{ color: `rgb(${kit})` }}>{children}</span>
);

const GOLD = "222, 181, 104";
const GREEN = "110, 190, 134";
const TEAL = "123, 163, 160";
const BLUE = "111, 159, 196";
const VIOLET = "155, 142, 196";
const CLAY = "202, 128, 102";

const CLUBS: Club[] = [
  {
    name: "Mela",
    crest: "M",
    role: "Co-Founder & Chief Technology Officer",
    season: "Nov 2025 – Present",
    kit: GOLD,
    url: "https://visitmela.com/",
    current: true,
    intro: (
      <>Mela is an {hl(GOLD, "AI agent to hire creative freelancers")}.</>
    ),
    badges: ["AI Agents", "AI Matchmaking", "Semantic Search", "Azure AI Foundry", "Azure", "WhatsApp", "Interakt", "Webhooks", "Next.js", "Node.js"],
    bullets: [
      <>Lead all of technology and engineering as {hl(GOLD, "CTO")}, owning architecture, the product roadmap, and the founding tech team.</>,
      <>Built the {hl(GOLD, "AI matchmaking engine")} that pairs brands with the right creatives based on skill, style, and project fit, powered by semantic search over a vetted freelancer database.</>,
      <>Designed the {hl(GOLD, "vetting pipeline")} that lets the agent actually evaluate creative work, combining multi-platform portfolio scraping with multi-pass LLM analysis, discipline-aware extraction across creative buckets (visual design, video, writing, marketing), and vision and video analysis on real portfolio assets.</>,
      <>Built the {hl(GOLD, "brand-side agentic flow")} end to end, from brief intake through discovery, scope generation, proposal sending, and AI-driven negotiation with freelancers.</>,
      <>Built the {hl(GOLD, "freelancer intake experience")}, from multi-platform portfolio scraping (Behance, Canva, Notion, personal sites) to conversational onboarding and live progress feedback while the AI evaluates their work.</>,
      <>Built the agent&apos;s models on {hl(GOLD, "Azure AI Foundry")} and shipped the production infrastructure on Azure across dev and prod environments.</>,
      <>Integrated {hl(GOLD, "WhatsApp")} into the agent&apos;s workflow, with outbound proposal sends via Interakt templates and an inbound webhook pipeline that lets the agent hold multi-turn negotiations with freelancers automatically.</>,
    ],
  },
  {
    name: "Fidelity Investments",
    crest: "FI",
    role: "Senior Full Stack Developer",
    season: "Apr 2024 – Oct 2025",
    kit: GREEN,
    badges: ["Angular", "Python FastAPI", "Neo4j", "Graph Databases", "REST APIs", "Generative AI", "AWS"],
    bullets: [
      <>Developed and maintained a scalable chatbot application using Angular and Python FastAPI.</>,
      <>Designed and implemented a Neo4j graph database for efficient data storage and relationship mapping.</>,
      <>Leveraged Generative AI to automate decision-making, improving response accuracy and user experience.</>,
      <>Applied best practices in RESTful API development and graph data modeling to improve scalability and performance.</>,
    ],
  },
  {
    name: "Flipt LLC",
    crest: "FL",
    role: "Senior Full Stack Developer",
    season: "Nov 2021 – Mar 2024",
    kit: TEAL,
    badges: ["React", "Streamlit", "Couchbase", "N1QL", "REST APIs", "JSON Rules Engine", "CircleCI", "Airflow", "Python"],
    bullets: [
      <>Built a self-service adjudication tool for large pharmaceutical corporations.</>,
      <>Developed React SPA screens reducing concierge response times by {hl(TEAL, "50%")}.</>,
      <>Architected an AI-powered Q&amp;A portal using OpenAI&apos;s API and Streamlit.</>,
      <>Implemented RBAC with React for multiple users, roles, and organizations.</>,
      <>Built REST APIs for approval processes using JSON rules and chaining for multi-level approvals.</>,
      <>Engineered CI/CD pipelines with CircleCI to automate testing, builds, and deployments.</>,
      <>Created Airflow jobs in Python to automate drug list generation for each organization.</>,
    ],
  },
  {
    name: "United Nations",
    crest: "UN",
    role: "Full Stack Developer",
    season: "May 2019 – Oct 2021",
    kit: BLUE,
    badges: ["Node.js", "Angular", "MongoDB", "AWS", "GitLab CI/CD", "Python"],
    bullets: [
      <>Migrated Lotus Notes applications to web-based service catalog using MEAN stack.</>,
      <>Parsed PDFs/XMLs into MongoDB with Node.js, reducing manual effort by {hl(BLUE, "80%")}.</>,
      <>Developed Angular SPA with role-based data export and management.</>,
      <>Implemented CI/CD pipelines with AWS CodePipeline, ECS, and GitLab reducing build/test time by {hl(BLUE, "50%")}.</>,
      <>Created Python scripts for data migration and unit testing with Karma/Jasmine.</>,
    ],
  },
  {
    name: "MCG LLC (VMware)",
    crest: "VM",
    role: "Software & Automation Engineer",
    season: "Aug 2018 – Apr 2019",
    kit: VIOLET,
    badges: ["ServiceNow", "vRA", "VMware", "Random Forest", "Python", "NGINX"],
    bullets: [
      <>Built AI-backed console to integrate ServiceNow with VMware vRealize for VM provisioning/monitoring.</>,
      <>Created Random Forest regression model to predict VM type/size with {hl(VIOLET, "82% accuracy")}.</>,
      <>Automated NGINX server installation via ServiceNow MID server, reducing build times by {hl(VIOLET, "10%")}.</>,
      <>Designed monitoring dashboard with auto-scaling alerts for cost optimization.</>,
    ],
  },
  {
    name: "ServiceNow",
    crest: "SN",
    role: "Technical Engineer Intern",
    season: "May 2017 – Jun 2018",
    kit: CLAY,
    badges: ["JavaScript", "ServiceNow", "Event Logs"],
    bullets: [
      <>Built application to monitor live instances and push auto-update email notifications.</>,
      <>Improved quarterly patch program efficiency by {hl(CLAY, "20%")} through automated log parsing and triggers.</>,
      <>Resolved multiple bugs in client monitoring/logging applications working with cross-functional teams.</>,
    ],
  },
];

const ClubCard = ({ club }: { club: Club }) => (
  <article
    className="sheet-card p-7 sm:p-8"
    style={{ "--kit": club.kit } as React.CSSProperties}
  >
    <header className="flex flex-wrap items-start gap-x-4 gap-y-3 mb-5">
      <span className="crest" aria-hidden>{club.crest}</span>
      <div className="flex-1 min-w-[12rem]">
        <h3 className="font-display font-extrabold uppercase tracking-tight text-3xl leading-none">
          {club.url ? (
            <a
              href={club.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 transition-colors"
              style={{ color: `rgb(${club.kit})` }}
            >
              {club.name} ↗
            </a>
          ) : (
            <span style={{ color: `rgb(${club.kit})` }}>{club.name}</span>
          )}
        </h3>
        <p className="text-base font-semibold text-muted mt-1">{club.role}</p>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-2">
        <span className="season-tag">{club.current && <span className="animate-pulse" aria-hidden>●</span>}{club.season}</span>
        {club.current && (
          <span className="font-display font-extrabold uppercase tracking-[0.2em] text-[11px] px-2.5 py-1 rounded-md bg-secondary text-[rgb(6,16,10)]">
            Current Club
          </span>
        )}
      </div>
    </header>

    {club.intro && <p className="text-muted leading-relaxed mb-5">{club.intro}</p>}

    <div className="flex flex-wrap gap-2 mb-6">
      {club.badges.map((b) => (
        <Badge key={b} text={b} kit={club.kit} size="sm" />
      ))}
    </div>

    <ul className="space-y-3 text-muted leading-relaxed">
      {club.bullets.map((b, i) => (
        <li key={i} className="chalk-li">{b}</li>
      ))}
    </ul>
  </article>
);

const WorkSection = () => (
  <Section id="work" title="Career Highlights" eyebrow="Second Half · Season by Season">
    <div className="relative max-w-4xl mx-auto">
      {/* chalk touchline connecting the seasons */}
      <div
        className="absolute left-[13px] sm:left-[15px] top-2 bottom-2 w-0.5 rounded-full bg-white/15"
        aria-hidden
      />
      <div className="space-y-10">
        {CLUBS.map((club, i) => (
          <Reveal key={club.name} delay={Math.min(i, 2) * 90}>
            <div className="relative pl-10 sm:pl-14">
              {/* timeline node */}
              <span
                className="absolute left-0 top-9 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-[11px]"
                style={{
                  borderColor: `rgba(${club.kit}, 0.8)`,
                  background: "rgb(10, 24, 16)",
                  boxShadow: `0 0 14px rgba(${club.kit}, 0.35)`,
                }}
                aria-hidden
              >
                ⚽
              </span>
              <ClubCard club={club} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export default WorkSection;
