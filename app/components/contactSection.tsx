import Section from "./section";
import Reveal from "./reveal";
import { SOCIAL_LINKS, linkProps } from "./socialLinks";

const ContactSection = () => (
  <Section id="contact" title="Extra Time" eyebrow="Full Time · Let's Talk">
    <Reveal>
      <div
        className="sheet-card p-8 sm:p-12 max-w-4xl mx-auto text-center"
        style={{ "--kit": "222, 181, 104" } as React.CSSProperties}
      >
        <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-9">
          Open to <span className="text-secondary font-semibold">interesting problems, collaborations, and conversations</span> —
          whether it&apos;s AI agents, full-stack architecture, or a five-a-side kickabout. The transfer window is always open.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SOCIAL_LINKS.map((l) => (
            <a
              key={l.label}
              {...linkProps(l)}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border/80 bg-white/[0.03] px-4 py-5 transition-all duration-200 hover:border-secondary/60 hover:bg-secondary/10 hover:-translate-y-0.5"
            >
              <span className="text-secondary group-hover:scale-110 transition-transform duration-200">{l.icon}</span>
              <span className="font-display font-bold uppercase tracking-wider text-sm">{l.label}</span>
              <span className="text-xs text-muted break-all leading-tight">{l.sub}</span>
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  </Section>
);

export default ContactSection;
