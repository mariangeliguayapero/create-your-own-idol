"use client";

import { useEffect, useRef, useState } from "react";
import type { AppConfig } from "@/lib/registry";
import { useBrain } from "@/components/factory/useBrain";
import StreamBox from "@/components/factory/StreamBox";

/* Product 3 — Starbiz ("Create Your Own Idol", /3).
   Pixel clone of https://create-your-own-idol.lovable.app.
   Custom classes (text-display, eyebrow, text-headline, btn-primary,
   btn-ghost-white, glow-coral, hairline-grid, glass-card-dark,
   text-gradient-coral, shadow-glass-lg, animate-float, animate-fade-in-up,
   stagger-N, font-700 and token colors like bg-primary /
   text-muted-foreground) are authored product-scoped in app/starbiz.css
   under .starbiz-root. Imagery lives in public/starbiz/. */

const NAV_LINKS = ["Platform", "Artists", "Pricing", "Enterprise"];

/* Rendered via {} so the apostrophe never hits JSX text directly
   (react/no-unescaped-entities). */
const BADGE = "The World's First AI Artist Platform";

const STATS = [
  { value: "50K+", label: "Artists Created", accent: false },
  { value: "120+", label: "Countries", accent: true },
  { value: "2M+", label: "Songs Generated", accent: false },
  { value: "98%", label: "Satisfaction Rate", accent: false },
  { value: "01", label: "AI Music Platform", accent: false },
];

const CONTROL_CARDS = [
  {
    n: "01",
    title: "Design Members",
    body: "Create individual AI artists with unique looks, voices, roles, and personalities.",
    img: "/starbiz/member-3.jpg",
  },
  {
    n: "02",
    title: "Generate Songs",
    body: "AI composes full tracks with lyrics, melody, and production in your chosen genre.",
    img: "/starbiz/member-4.jpg",
  },
  {
    n: "03",
    title: "Direct Videos",
    body: "Set the stage, costume, and effects. Watch your music video come to life.",
    img: "/starbiz/video-still.jpg",
  },
  {
    n: "04",
    title: "Launch Worldwide",
    body: "Run AI interviews, build a press kit, and post to every platform at once.",
    img: "/starbiz/concert.jpg",
  },
];

const MEMBER_SPECS = [
  { label: "Face & Style", value: "AI Portrait" },
  { label: "Voice Type", value: "Neural Audio" },
  { label: "Personality", value: "Deep Profile" },
  { label: "Dance Style", value: "Motion AI" },
];

const VIDEO_FEATURES = [
  "Cinematic 4K output",
  "100+ stage sets & locations",
  "Custom choreography AI",
  "One-click export to all platforms",
];

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Perfect for experimenting with your first AI artist.",
    features: ["1 AI group", "3 members max", "5 songs/mo", "Basic press kit", "Community support"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Creator",
    price: "$29",
    period: "/month",
    desc: "For serious creators ready to launch their act.",
    features: [
      "5 AI groups",
      "7 members each",
      "Unlimited songs",
      "4K music videos",
      "AI interviews",
      "Social auto-post",
      "Priority support",
    ],
    cta: "Start Creating",
    popular: true,
  },
  {
    name: "Label",
    price: "$149",
    period: "/month",
    desc: "Full label operations. Multiple acts, full analytics.",
    features: [
      "Unlimited groups",
      "Custom AI training",
      "White-label export",
      "Label dashboard",
      "Revenue analytics",
      "Dedicated manager",
      "API access",
    ],
    cta: "Launch Your Label",
    popular: false,
  },
];

const QUOTES = [
  {
    q: "“I launched my AI K-pop group in one afternoon. First song hit 500K streams in a week.”",
    by: "Sarah K.",
    role: "Creator, @NOVA_VOID",
    img: "/starbiz/member-3.jpg",
  },
  {
    q: "“The music video quality blew everyone away. Nobody could tell it was AI-generated.”",
    by: "Marcus T.",
    role: "Music Producer",
    img: "/starbiz/member-1.jpg",
  },
  {
    q: "“We run 3 different AI acts through Starbiz. It's like having a full label team in one app.”",
    by: "Jenny L.",
    role: "Indie Label Owner",
    img: "/starbiz/member-4.jpg",
  },
];

const FOOTER_LINKS = ["Privacy", "Terms", "Careers", "Blog", "Contact"];

function CheckDot() {
  return (
    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path
          d="M2 5l2.5 2.5 4-4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const DESIGN_PROMPT =
  "Design a brand-new AI K-pop idol: stage name, debut concept, visual style, voice, personality, and fan engagement strategy. Be specific, not generic.";
const MEMBER_PROMPT =
  "Create detailed AI K-pop group members: appearance, voice, personality, role, and backstory for each member of a new group.";
const INTERACT_PROMPT =
  "Write a fan-interaction strategy for an AI K-pop idol: how it replies to DMs, hosts live Q&As, and grows its audience on Instagram like an AI influencer. Be specific.";

const INTERACT_FEATURES = [
  { title: "Replies in your idol's voice", desc: "Personality-locked AI that sounds exactly like them." },
  { title: "Lives on Instagram & TikTok", desc: "Debuts like the AI influencers fans already follow." },
  { title: "Remembers every fan", desc: "Never loses context, even across thousands of DMs." },
  { title: "Moderated by you", desc: "You approve the tone, the topics, and the brand." },
];

export default function SocialIdolLayout({ app }: { app: AppConfig }) {
  const { loading, output, run } = useBrain(app.id);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);
  return (
    <div className="starbiz-root min-h-screen">
      {/* ---------------- Nav ---------------- */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-white/5 px-4 py-5 sm:px-8"
        style={{
          background: "rgba(10, 10, 12, 0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <a href="#" className="flex items-center gap-2.5">
          <img src="/starbiz/starbiz-logo.png" alt="Starbiz logo" className="h-8 w-8 object-contain" />
          <span className="text-display text-2xl tracking-widest">Starbiz</span>
        </a>
        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="eyebrow text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>
        {/* Desktop: inline auth (hidden on mobile, replaced by dropdown below) */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="eyebrow whitespace-nowrap px-2 py-2 text-muted-foreground transition-colors hover:text-foreground">
            Sign In
          </button>
          <button className="btn-primary whitespace-nowrap px-6 py-3">Get Started</button>
        </div>
        {/* Mobile: menu button + glass dropdown matching the site theme */}
        <div className="md:hidden" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-foreground transition-colors hover:bg-white/5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute inset-x-4 top-[68px] z-50 rounded-2xl border border-white/10 bg-[rgba(10,10,12,0.96)] p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="eyebrow rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    {link}
                  </a>
                ))}
                <div className="my-2 h-px bg-white/10" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="eyebrow w-full rounded-lg px-3 py-2 text-left text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  Sign In
                </button>
                <button onClick={() => setMenuOpen(false)} className="btn-primary mt-2 w-full py-3">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10">
        <div className="glow-coral -left-32 top-24 h-[520px] w-[520px] bg-accent opacity-30" />
        <div className="glow-coral -right-32 bottom-0 h-[520px] w-[520px] bg-primary opacity-20" />
        <div className="hairline-grid absolute inset-0 opacity-60" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <div className="animate-fade-in-up stagger-1 mb-10 mx-auto inline-flex w-fit items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 lg:mx-0">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="eyebrow text-primary">{BADGE}</span>
            </div>
            <h1
              className="text-display animate-fade-in-up stagger-2 mb-8"
              style={{ fontSize: "clamp(4rem, 10vw, 8.5rem)" }}
            >
              Create Your
              <br />
              <span className="text-gradient-coral">Own Star.</span>
            </h1>
            <p className="animate-fade-in-up stagger-3 mb-12 mx-auto max-w-md text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Build an AI K-pop group from scratch. Design members, generate songs, direct music
              videos, run live interviews, then launch to the world.
            </p>
            <div className="animate-fade-in-up stagger-4 flex flex-wrap justify-center gap-5 lg:justify-start">
              <button className="btn-primary px-10 py-5" onClick={() => run(DESIGN_PROMPT)}>Enter the Studio</button>
              <button className="btn-ghost-white px-10 py-5">Watch Demo</button>
            </div>
          </div>

          <div className="relative animate-fade-in-up stagger-3 lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div className="absolute -inset-4 border border-white/5" />
              <div className="absolute -inset-4 h-24 w-24 border-l border-t border-primary/40" />
              <div className="relative h-full w-full overflow-hidden bg-card">
                <img
                  src="/starbiz/hero-band.jpg"
                  alt="AI-generated K-pop group in neon-lit city"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--sb-background))_0%,transparent_50%,transparent_100%)]" />
              </div>

              <div className="animate-float absolute -left-6 bottom-1/4 border border-white/10 bg-white/5 p-4 shadow-glass-lg backdrop-blur-xl xl:-left-12">
                <div className="flex items-center gap-4">
                  <img
                    src="/starbiz/member-1.jpg"
                    alt="KAIRO"
                    className="h-10 w-10 rounded-full border border-primary/50 object-cover"
                  />
                  <div>
                    <div className="eyebrow text-primary">Main Vocalist</div>
                    <div className="font-700 text-sm tracking-wide">KAIRO</div>
                  </div>
                </div>
              </div>

              <div
                className="animate-float absolute -right-4 top-12 border border-accent/30 bg-accent/10 p-4 shadow-glass-lg backdrop-blur-xl xl:-right-8"
                style={{ animationDuration: "7s" }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-8">
                    <span className="eyebrow text-muted-foreground">Vocal Synthesis</span>
                    <span className="eyebrow text-primary">98%</span>
                  </div>
                  <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "98%",
                        background:
                          "linear-gradient(90deg, hsl(var(--sb-primary-glow)), hsl(var(--sb-primary-deep)))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-24 grid max-w-7xl grid-cols-2 gap-8 border-t border-white/5 pt-10 md:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span
                className={`text-display text-4xl tracking-widest ${s.accent ? "text-primary" : "text-foreground"}`}
              >
                {s.value}
              </span>
              <span className="eyebrow text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Full creative control ---------------- */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-4 text-center md:text-left">
              <p className="eyebrow text-primary">Full Creative Control</p>
              <h2 className="text-display text-5xl md:text-7xl">
                From idea to debut
                <br />
                in one session.
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              No music experience needed. Our AI handles the craft, you bring the vision.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {CONTROL_CARDS.map((card) => (
              <div key={card.n} className="group overflow-hidden bg-background">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--sb-background)),transparent)] opacity-70" />
                  <span className="eyebrow absolute left-4 top-4 text-primary">{card.n}</span>
                </div>
                <div className="space-y-3 p-7">
                  <h3 className="text-headline text-2xl">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Stadium band ---------------- */}
      <section className="relative overflow-hidden">
        <img
          src="/starbiz/concert.jpg"
          alt="Sold-out AI idol concert"
          className="h-[68vh] w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--sb-background))_0%,hsl(var(--sb-background)/0.4)_50%,hsl(var(--sb-background))_100%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 text-center">
          <p className="eyebrow text-primary">Scale Like a Label</p>
          <h2 className="text-display max-w-4xl text-6xl md:text-8xl">
            Stadium-ready
            <br />
            from day one.
          </h2>
          <button className="btn-primary px-12 py-5">Start Your Band Now</button>
        </div>
      </section>

      {/* ---------------- AI member design ---------------- */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="glow-coral -left-24 top-1/3 h-[420px] w-[420px] bg-accent opacity-20" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 grid-cols-1 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4 text-center md:text-left">
              <p className="eyebrow text-primary">AI Member Design</p>
              <h2 className="text-display text-6xl md:text-7xl">
                Every idol.
                <br />
                Fully yours.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Design each member&apos;s appearance, voice, personality, and role. Our AI generates
              photorealistic portraits, unique vocal styles, and complete backstories.
            </p>
            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
              {MEMBER_SPECS.map((spec) => (
                <div key={spec.label} className="space-y-1 bg-background p-5">
                  <p className="eyebrow text-muted-foreground">{spec.label}</p>
                  <p className="text-headline text-xl text-primary">{spec.value}</p>
                </div>
              ))}
            </div>
            <button className="btn-primary px-9 py-4" onClick={() => run(MEMBER_PROMPT)}>Design Your Members</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square overflow-hidden border border-white/10">
              <img
                src="/starbiz/member-1.jpg"
                alt="AI idol member 1"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-8 aspect-square overflow-hidden border border-white/10">
              <img
                src="/starbiz/member-2.jpg"
                alt="AI idol member 2"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="aspect-square overflow-hidden border border-white/10">
              <img
                src="/starbiz/member-3.jpg"
                alt="AI idol member 3"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-8 aspect-square overflow-hidden border border-white/10">
              <img
                src="/starbiz/member-4.jpg"
                alt="AI idol member 4"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Music video director ---------------- */}
      <section className="relative border-y border-white/5 bg-card/40 px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-16 grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden border border-white/10">
            <img
              src="/starbiz/video-still.jpg"
              alt="Music video preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary/80 backdrop-blur-md transition-transform hover:scale-110">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-card-dark flex items-center gap-3 px-4 py-2.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="eyebrow">Live Preview</span>
                <span className="eyebrow ml-auto text-muted-foreground">4K Ultra HD</span>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4 text-center md:text-left">
              <p className="eyebrow text-primary">Music Video Director</p>
              <h2 className="text-display text-6xl md:text-7xl">
                Cinematic.
                <br />
                On demand.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Direct studio-quality music videos with AI. Choose sets, lighting, choreography, and
              visual effects. Export in 4K with full broadcast rights.
            </p>
            <div className="space-y-3">
              {VIDEO_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckDot />
                  <span className="text-sm text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Talk to your idol ---------------- */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="glow-coral -right-24 top-1/3 h-[420px] w-[420px] bg-accent opacity-20" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Instagram-style DM mockup */}
          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-glass-lg">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <img
                  src="/starbiz/member-1.jpg"
                  alt="KAIRO"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/40"
                />
                <div>
                  <p className="font-700 text-sm tracking-wide">KAIRO</p>
                  <p className="eyebrow text-primary">Active now</p>
                </div>
                <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h.01M12 12h.01M19 12h.01" />
                </svg>
              </div>
              <div className="space-y-3 px-4 py-5">
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2 text-sm">
                    KAIRO! Your new single is literally on repeat 🔥🔥
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/80 px-3.5 py-2 text-sm text-background">
                    Hehe thank you!! Which part hits hardest for you?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2 text-sm">
                    The chorus at 0:42 — it&apos;s been my alarm all week
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/80 px-3.5 py-2 text-sm text-background">
                    That&apos;s my favorite part too. Want me to make a reply video for you? 🎧
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
                <input
                  placeholder="Message KAIRO..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                />
                <span className="eyebrow text-primary">Send</span>
              </div>
            </div>
            <p className="eyebrow mt-4 text-center text-muted-foreground">Every reply written by your AI idol, live.</p>
          </div>

          {/* Copy */}
          <div className="space-y-8">
            <div className="space-y-4 text-center md:text-left">
              <p className="eyebrow text-primary">Fan Interaction</p>
              <h2 className="text-display text-6xl md:text-7xl">
                Your idol
                <br />
                talks back.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Fans don&apos;t just watch — they talk. Your AI idol replies to DMs, hosts live Q&amp;As, and answers
              every comment in their own voice. On Instagram, TikTok, or your own app. 24/7, in any language.
            </p>
            <div className="space-y-3">
              {INTERACT_FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="font-700 text-sm">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary px-9 py-4" onClick={() => run(INTERACT_PROMPT)}>
              Run a Fan Interview
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section className="relative px-6 py-28 md:px-10">
        <div className="glow-coral left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 bg-primary opacity-10" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-16 space-y-4 text-center">
            <p className="eyebrow text-primary">Pricing</p>
            <h2 className="text-display text-6xl md:text-7xl">
              Start free.
              <br />
              Scale to a label.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="relative space-y-7 bg-background p-8 transition-colors duration-500 hover:bg-card"
                style={
                  plan.popular
                    ? {
                        background:
                          "linear-gradient(160deg, hsl(var(--sb-primary) / 0.12), transparent 60%)",
                      }
                    : undefined
                }
              >
                {plan.popular && (
                  <span className="eyebrow absolute right-6 top-6 border border-primary/40 px-2 py-1 text-primary">
                    Most Popular
                  </span>
                )}
                {/* Reference build uses Tailwind v3 space-y semantics
                    (`> * + *` margin-TOP): its absolutely-positioned "Most
                    Popular" badge is the FIRST child, so every following block
                    gets pushed down 28px inside the popular card. Tailwind v4
                    (our stack) applies space-y as margin-BOTTOM instead, which
                    shifts nothing here — reproduce v3's net layout explicitly.
                    Measured on ref: header y+412, features y+559, CTA y+787,
                    card 517px tall. */}
                <div className={plan.popular ? "mt-7" : undefined}>
                  <p className="eyebrow mb-3 text-muted-foreground">{plan.name}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-display text-6xl">{plan.price}</span>
                    <span className="mb-2 text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{plan.desc}</p>
                </div>
                <div className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                          plan.popular ? "bg-primary" : "bg-muted-foreground"
                        }`}
                      />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full py-4 transition-all duration-300 ${
                    plan.popular ? "btn-primary" : "btn-ghost-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-3 text-center md:text-left">
            <p className="eyebrow text-primary">Creators Love It</p>
            <h2 className="text-display text-5xl md:text-6xl">The world is building their stars.</h2>
          </div>
          <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {QUOTES.map((quote) => (
              <div key={quote.by} className="space-y-6 bg-background p-8">
                <p className="text-lg leading-relaxed text-foreground/90">{quote.q}</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <img
                    src={quote.img}
                    alt={quote.by}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-700 text-sm">{quote.by}</p>
                    <p className="eyebrow text-muted-foreground">{quote.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-white/5 px-8 py-36">
        <img
          src="/starbiz/hero-band.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--sb-background)/0.7)_0%,hsl(var(--sb-background)/0.85)_50%,hsl(var(--sb-background))_100%)]" />
        <div className="glow-coral bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 bg-primary opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-8 text-center">
          <h2 className="text-display text-7xl md:text-8xl">
            Ready to create
            <br />
            <span className="text-gradient-coral">your star?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join 50,000+ creators worldwide building the next generation of music artists.
          </p>
          <button className="btn-primary px-14 py-5" onClick={() => run(DESIGN_PROMPT)}>Enter the Studio</button>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-white/5 px-8 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <img
              src="/starbiz/starbiz-logo.png"
              alt="Starbiz logo"
              className="h-7 w-7 object-contain"
            />
            <span className="text-display text-xl tracking-widest">Starbiz</span>
          </div>
          <div className="flex flex-nowrap justify-center gap-3 whitespace-nowrap text-[11px] md:flex-wrap md:gap-8 md:text-base">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="eyebrow text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="eyebrow text-muted-foreground/60">&copy; 2026 Starbiz</p>
        </div>
      </footer>

      {/* AI Output panel — "create / interact" generates a fresh idol persona */}
      {(loading || output) && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(720px,92vw)] -translate-x-1/2">
          <StreamBox app={app} output={output} loading={loading} />
        </div>
      )}
    </div>
  );
}