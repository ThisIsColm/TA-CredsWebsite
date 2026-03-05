"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollProvider, useScrollContext } from "@/components/ScrollContext";
import HorizontalScrollShell from "@/components/HorizontalScrollShell";
import Header from "@/components/Header";
import GrainOverlay from "@/components/GrainOverlay";
import Panel from "@/components/Panel";
import VimeoHero from "@/components/VimeoHero";
import ProjectCard from "@/components/ProjectCard";
import WorldMap from "@/components/WorldMap";
import Logo from "@/components/Logo";

/* ── Reveal wrapper with premium blur-to-focus animation ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 24, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}


/* ── Navigation Hint ── */
function NavigationHint() {
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[15] pointer-events-none text-white/40 font-mono text-[10px] uppercase tracking-[0.3em]">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-6 h-6 border border-white/20 rounded">←</span>
        <span>Use keys to navigate</span>
        <span className="flex items-center justify-center w-6 h-6 border border-white/20 rounded">→</span>
      </div>
    </div>
  );
}

/* ── Clickable Homepage Emails ── */
function HomepageEmails() {
  return (
    <div className="fixed bottom-48 left-8 lg:left-22 z-[15] pointer-events-none">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-24 text-white/80 font-mono text-sm lg:text-base tracking-widest uppercase">
        <a
          href="mailto:nathan@tinyark.com"
          className="hover:text-[var(--ark-accent)] transition-colors cursor-pointer pointer-events-auto"
        >
          nathan@tinyark.com
        </a>
        <a
          href="mailto:gabi@tinyark.com"
          className="hover:text-[var(--ark-accent)] transition-colors cursor-pointer pointer-events-auto"
        >
          gabi@tinyark.com
        </a>
      </div>
    </div>
  );
}



/* ── Data ── */
const PROJECTS = [
  {
    title: "Lumina Rebrand",
    description: "Full identity overhaul for a next-gen fintech platform. Brand strategy through launch.",
    category: "Branding · Strategy",
    imageBg: "#1e2a3a",
  },
  {
    title: "Atmos Campaign",
    description: "Cinematic campaign film and digital rollout for a sustainable lifestyle brand.",
    category: "Motion · Video",
    imageBg: "#2a1e1e",
  },
  {
    title: "Vertex Platform",
    description: "End-to-end web experience for a SaaS analytics tool. Design, motion, and front-end.",
    category: "Web · Design",
    imageBg: "#1e2a1e",
  },
];

const CAPABILITIES = [
  {
    title: "Creative & Strategy",
    description: "Research. Concept development. Mood boards. Content strategy. Treatments. Script and copy. Storyboards. Pre-vis."
  },
  {
    title: "Production",
    description: "Production management. Location scouting. Research. Permits. Casting. Visas. Customs/Carnet. Fixer Screening. Insurance. Crew onboarding. Travel coordination. Gear hire. Release. Management & NDAs. Health & Safety."
  },
  {
    title: "Post-Production",
    description: "Full edit suites (remote and live). Motion graphics. VFX. Animation. Retouching. Colour. Sound. Music composition & licensing. Distribution."
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Deep-dive into your brand, goals, audience, and competitive landscape." },
  { step: "02", title: "Define", description: "Crystallize strategy, creative direction, and project roadmap." },
  { step: "03", title: "Design", description: "Craft visuals, prototypes, and motion concepts for review and iteration." },
  { step: "04", title: "Deliver", description: "Build, polish, and launch production-ready assets and experiences." },
];

const TRUST_SIGNALS = [
  "50+ Projects Delivered",
  "12 Industries",
  "98% Client Retention",
  "Award-Winning Work",
];

/* ── Page ── */
export default function CredibilityPage() {
  return (
    <ScrollProvider>
      <Header />
      <VimeoHero />
      <Logo />
      <GrainOverlay />
      <NavigationHint />
      <HomepageEmails />


      <main className="relative z-20 bg-transparent">
        <HorizontalScrollShell>
          {/* ── Panel 1: Hero (Transparent spacer for fixed hero background) ── */}
          <Panel id="panel-hero" className="bg-transparent">
            {/* Empty spacer to satisfy children prop and allow hero to show through */}
            <div className="w-full h-full" />
          </Panel>

          {/* ── Panel 2: Statement & Showreel (Opaque bg covers hero) ── */}
          <Panel id="panel-about" className="bg-white relative overflow-hidden text-black z-20">
            <div className="container-wide h-full flex flex-col justify-between py-24">
              <Reveal>
                <span className="text-xs font-mono uppercase tracking-[0.2em] block" style={{ color: "var(--ark-accent)" }}>
                  Who we are
                </span>
              </Reveal>

              <div className="grid-layout items-center mt-auto mb-auto">
                {/* Text content: span 5 columns on desktop */}
                <div className="col-span-4 lg:col-span-6">
                  <Reveal delay={0.1}>
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8" style={{ color: "#111", letterSpacing: "-0.02em" }}>
                      Tiny Ark is a creative production studio.
                    </h2>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="text-lg mb-8 leading-relaxed text-neutral-600">
                      We create brand stories and commercials for some of the world’s leading companies. From creative strategy to distribution, we offer a full video partnership; empowering brands to plan, craft and share their stories.
                    </p>
                    <p className="text-base leading-relaxed text-neutral-400 font-mono uppercase tracking-wider">
                      Headquartered in Dublin. Networked globally.
                    </p>
                  </Reveal>
                </div>

                {/* Video content: span 7 columns on desktop */}
                <Reveal delay={0.3} className="col-span-4 lg:col-span-6 w-full aspect-video rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-neutral-100">
                  <iframe
                    src="https://player.vimeo.com/video/1157268231?h=d42e6ade47&loop=1&byline=0&title=0&quality=1080p&color=e85d04"
                    className="w-full h-full"
                    style={{ border: "none" }}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    title="Showreel video"
                  />
                </Reveal>
              </div>
            </div>
          </Panel>

          {/* ── Panel 3: Our Clients ── */}
          <Panel id="panel-clients" className="bg-[#E85D04] relative z-20">
            <div className="container-wide h-full flex flex-col justify-between py-24 text-white">
              <Reveal>
                <span className="text-xs font-mono uppercase tracking-[0.2em] block">
                  Our clients
                </span>
              </Reveal>

              <Reveal delay={0.1} className="mt-auto mb-20 lg:-mb-20 lg:mt-10">
                <h2 className="text-4xl lg:text-[100px] font-bold tracking-tight leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                  We’ve established <br className="hidden lg:block" />
                  creative partnerships <br className="hidden lg:block" />
                  with some of the world’s <br className="hidden lg:block" />
                  leading brands.
                </h2>
              </Reveal>

              <Reveal delay={0.2} className="mb-8">
                <div className="relative w-full lg:max-w-[100%] origin-left text-left lg:-ml-15 lg:-mt-100">
                  <img
                    src="/LogoSlide.png"
                    alt="Our Clients"
                    className="hidden lg:block w-full h-auto object-contain object-left"
                  />
                  <img
                    src="/LogoSlide-mobile.png"
                    alt="Our Clients"
                    className="block lg:hidden w-full h-auto object-contain object-left"
                  />
                </div>
              </Reveal>

              {/* Arrow icon in bottom right */}
              <div className="absolute bottom-10 right-10 opacity-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-45">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
          </Panel>

          {/* ── Panel 4: Capabilities ── */}
          <Panel id="panel-capabilities" className="bg-white relative text-black z-20">
            <div className="container-wide h-full flex flex-col justify-between py-24">
              <Reveal>
                <span className="text-xs font-mono uppercase tracking-[0.2em] block" style={{ color: "var(--ark-accent)" }}>
                  Capabilities
                </span>
              </Reveal>

              <div className="grid-layout items-center mt-auto mb-auto">
                {/* Video: span 7 columns on desktop (on the left) */}
                <Reveal delay={0.3} className="col-span-4 lg:col-span-6 w-full aspect-video rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-neutral-100">
                  <iframe
                    src="https://player.vimeo.com/video/1169321210?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p"
                    className="w-full h-full"
                    style={{ border: "none" }}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    title="Capabilities video"
                  />
                </Reveal>

                {/* Text: span 5 columns on desktop (on the right) */}
                <div className="col-span-4 lg:col-span-6">
                  <Reveal delay={0.1}>
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-12" style={{ color: "#111", letterSpacing: "-0.02em" }}>
                      Everything you need. Nothing you don&apos;t.
                    </h2>
                  </Reveal>

                  <div className="grid grid-cols-1 gap-8">
                    {CAPABILITIES.map((cap, i) => (
                      <Reveal key={cap.title} delay={0.2 + (0.1 * i)}>
                        <div className="border-l-2 border-neutral-200 pl-6 hover:border-[var(--ark-accent)] transition-colors">
                          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{cap.title}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed font-light">{cap.description}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Right Arrow */}
              <div className="absolute bottom-12 right-12 z-20 text-neutral-400 opacity-30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
          </Panel>

          {/* ── Panel 5: Global Reach ── */}
          <Panel id="panel-global" className="bg-white relative z-20">
            <WorldMap />
          </Panel>

          {/* ── Panel 6: Contact / Business Card ── */}
          <Panel id="panel-contact" className="bg-[url('/endcard.jpg')] bg-cover bg-center z-20 relative text-white">
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Small Logo positioned top-left */}
            <div className="absolute top-0 left-0 w-full z-[12] pointer-events-none select-none">
              <div className="container-wide pt-24">
                <div className="grid-layout">
                  <div className="col-span-12">
                    <h1 className="text-6xl font-bold tracking-tight text-white relative">
                      Tiny Ark<span>.</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-wide h-full flex flex-col justify-between py-24 relative z-10">
              {/* Empty reveal to maintain flex-between structure without the 'Let's Talk' header */}
              <Reveal>
                <div className="h-6 w-full" />
              </Reveal>
              <div className="grid-layout flex-1 items-center mt-auto mb-auto">
                <div className="col-span-4 lg:col-span-8">
                  <Reveal delay={0.1}>
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6" style={{ letterSpacing: "-0.02em" }}>
                      That's a wrap.
                    </h2>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="text-2xl mb-10 max-w-xl">
                      Now, let’s make some great work together.
                    </p>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <div className="flex flex-col sm:flex-row gap-4 mb-14">
                      <a
                        href="mailto:nathan@tinyark.com"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          backgroundColor: "var(--ark-accent)",
                          color: "var(--ark-text)",
                          borderRadius: "var(--ark-radius)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "var(--ark-accent-hover)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "var(--ark-accent)")
                        }
                      >
                        Work with us
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </Reveal>

                  {/* Contact details */}
                  <Reveal delay={0.4}>
                    <p className="text-sm font-mono uppercase tracking-widest text-white/50 mb-4">Connect</p>
                    <div className="flex flex-row gap-6 lg:gap-8 items-center">
                      <a href="https://www.instagram.com/tinyark/" aria-label="Instagram" className="text-white/80 hover:text-[var(--ark-accent)] transition-all duration-300 hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                      <a href="https://ie.linkedin.com/company/tiny-ark" aria-label="LinkedIn" className="text-white/80 hover:text-[var(--ark-accent)] transition-all duration-300 hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a href="https://www.tinyark.com" aria-label="Website" className="text-white/80 hover:text-[var(--ark-accent)] transition-all duration-300 hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </Panel>


        </HorizontalScrollShell>
      </main>
    </ScrollProvider>
  );
}
