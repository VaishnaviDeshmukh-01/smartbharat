import { createFileRoute, Link } from "@tanstack/react-router";
import heroAi from "@/assets/hero-ai.png";
import {
  Sparkles, MessageSquare, FileText, AlertTriangle, Compass, GraduationCap,
  ArrowRight, Mic, Send, MapPin, Upload,
  Shield, Zap, TrendingUp, Users, Clock, Languages, CheckCircle2,
  Landmark, CreditCard, IdCard, Car, Vote, ReceiptText, Baby, Building2,
  Star, Quote, ChevronDown,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main className="mx-auto max-w-[1440px] px-10">
        <Hero />
        <Stats />
        <Features />
        <ChatPreview />
        <PopularServices />
        <Complaints />
        <Schemes />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative grid grid-cols-12 gap-8 pt-16 pb-24">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 grad-hero-bg" />
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute right-10 top-40 -z-10 h-96 w-96 rounded-full bg-purple/20 blur-3xl animate-blob" />

      <div className="col-span-7 flex flex-col justify-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-3 py-1.5 text-xs font-semibold text-primary shadow-soft backdrop-blur">
          <span className="grid h-5 w-5 place-items-center rounded-full grad-brand"><Sparkles className="h-3 w-3 text-white" /></span>
          Powered by Bharat AI · Now with 25 languages
        </div>
        <h1 className="mt-6 font-display text-[76px] font-bold leading-[1.02] tracking-tight text-navy">
          Smart <span className="bg-gradient-to-br from-primary via-purple to-orange bg-clip-text text-transparent">Bharat</span>
        </h1>
        <p className="mt-3 text-2xl font-semibold text-navy/80">AI Powered Civic Companion</p>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Helping every citizen access government services through AI — with multilingual support,
          complaint tracking, document guidance and personalized scheme recommendations.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button className="group grad-brand inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
            <Sparkles className="h-4 w-4" /> Try AI Assistant
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/70 px-6 py-4 text-sm font-semibold text-navy shadow-soft backdrop-blur hover:bg-white">
            Explore Services
          </button>
          <div className="ml-3 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["grad-brand","grad-orange","grad-green","grad-purple"].map((g,i)=>(
                <div key={i} className={`${g} h-8 w-8 rounded-full border-2 border-white`} />
              ))}
            </div>
            Trusted by 5M+ citizens
          </div>
        </div>
      </div>

      <div className="relative col-span-5">
        <div className="relative mx-auto aspect-square max-w-[520px]">
          <div className="absolute inset-6 rounded-[40px] grad-brand opacity-20 blur-2xl" />
          <img src={heroAi} alt="Smart Bharat AI Civic Companion" width={1024} height={1024} className="relative z-10 animate-float drop-shadow-2xl" />
          {/* Floating cards */}
          <FloatCard className="left-[-20px] top-16" delay="0s">
            <div className="grad-green grid h-9 w-9 place-items-center rounded-xl"><CheckCircle2 className="h-4 w-4 text-white" /></div>
            <div>
              <div className="text-xs text-muted-foreground">Complaint #4821</div>
              <div className="text-sm font-semibold text-navy">Resolved in 2 days</div>
            </div>
          </FloatCard>
          <FloatCard className="right-[-20px] top-40" delay="1.5s">
            <div className="grad-orange grid h-9 w-9 place-items-center rounded-xl"><TrendingUp className="h-4 w-4 text-white" /></div>
            <div>
              <div className="text-xs text-muted-foreground">Scheme match</div>
              <div className="text-sm font-semibold text-navy">PM Kisan · ₹6,000/yr</div>
            </div>
          </FloatCard>
          <FloatCard className="bottom-4 left-8" delay="0.8s">
            <div className="grad-purple grid h-9 w-9 place-items-center rounded-xl"><Languages className="h-4 w-4 text-white" /></div>
            <div>
              <div className="text-xs text-muted-foreground">Ask in</div>
              <div className="text-sm font-semibold text-navy">हिन्दी · தமிழ் · বাংলা</div>
            </div>
          </FloatCard>
        </div>
      </div>
    </section>
  );
}

function FloatCard({ children, className = "", delay = "0s" }: { children: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={`glass absolute z-20 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    { v: "120+", l: "Government Services", i: Landmark, g: "grad-brand" },
    { v: "25", l: "Languages Supported", i: Languages, g: "grad-purple" },
    { v: "5M+", l: "Citizens Served", i: Users, g: "grad-orange" },
    { v: "24/7", l: "AI Support", i: Clock, g: "grad-green" },
  ];
  return (
    <section className="glass grid grid-cols-4 gap-8 rounded-3xl px-10 py-8">
      {stats.map((s, i) => (
        <div key={i} className={`flex items-center gap-4 ${i < 3 ? "border-r border-border/60 pr-8" : ""}`}>
          <div className={`${s.g} grid h-14 w-14 place-items-center rounded-2xl shadow-soft`}>
            <s.i className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-navy">{s.v}</div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------------- SECTION HEAD ---------------- */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-5xl font-bold text-navy">{title}</h2>
      <p className="mt-3 text-lg text-muted-foreground">{sub}</p>
    </div>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const items = [
    { i: Sparkles, g: "grad-brand", t: "AI Assistant", d: "Chat with Bharat AI in 25 Indian languages to navigate every government service." },
    { i: Landmark, g: "grad-purple", t: "Government Services", d: "Access 120+ central & state services with step-by-step guided journeys." },
    { i: AlertTriangle, g: "grad-orange", t: "Report Public Issues", d: "Snap a photo, drop a pin — file civic complaints to the right authority in seconds." },
    { i: Compass, g: "grad-green", t: "Track Complaints", d: "Real-time status, SLA reminders and automated escalations across departments." },
    { i: GraduationCap, g: "grad-purple", t: "Scheme Recommendations", d: "Personalized central & state schemes matched to your profile and eligibility." },
    { i: FileText, g: "grad-brand", t: "Document Assistant", d: "Auto-fill forms, verify checklists and get pre-submission review by AI." },
  ];
  return (
    <section className="py-24">
      <SectionHead eyebrow="Capabilities" title="Everything a citizen needs" sub="A single AI-native surface for services, complaints, schemes and documents." />
      <div className="grid grid-cols-3 gap-6">
        {items.map((f, i) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
            <div className={`${f.g} grid h-14 w-14 place-items-center rounded-2xl shadow-soft transition group-hover:scale-105`}>
              <f.i className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-navy">{f.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100">
              Learn more <ArrowRight className="h-4 w-4" />
            </div>
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/10" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CHAT PREVIEW ---------------- */
function ChatPreview() {
  return (
    <section className="relative py-24">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5 flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">
            AI Assistant
          </div>
          <h2 className="mt-4 font-display text-5xl font-bold text-navy">Ask Bharat AI anything.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            From ration cards to startup registrations — get instant, cited, multilingual answers with
            step-by-step actions. Voice-first. Works offline. Always private.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-navy/80">
            {["Cited answers from official portals","Voice input in 25 Indian languages","One-click form pre-fill & tracking"].map((t)=>(
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-green/10 text-green"><CheckCircle2 className="h-4 w-4" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-7">
          <div className="glass overflow-hidden rounded-3xl p-2 shadow-glow">
            <div className="rounded-[22px] bg-white">
              {/* header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="grad-brand grid h-9 w-9 place-items-center rounded-xl"><Sparkles className="h-4 w-4 text-white" /></div>
                  <div>
                    <div className="text-sm font-semibold text-navy">Bharat AI</div>
                    <div className="flex items-center gap-1.5 text-xs text-green"><span className="h-1.5 w-1.5 rounded-full bg-green" /> Online · answers in हिन्दी</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                </div>
              </div>
              {/* messages */}
              <div className="space-y-4 px-6 py-6">
                <div className="flex justify-end">
                  <div className="grad-brand max-w-md rounded-3xl rounded-br-md px-5 py-3 text-sm text-white shadow-soft">
                    How do I apply for a new passport in Delhi?
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="grad-purple grid h-8 w-8 place-items-center rounded-xl"><Sparkles className="h-4 w-4 text-white" /></div>
                  <div className="max-w-lg rounded-3xl rounded-bl-md bg-secondary px-5 py-3 text-sm text-navy">
                    Sure! For a fresh passport in Delhi you'll need Aadhaar, address proof and a filled Form-1.
                    I can pre-fill the form and book your PSK appointment. Shall I start?
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Pre-fill form","Book appointment","Fee details"].map(c=>(
                        <button key={c} className="rounded-full border border-primary/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-white">{c}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="grad-purple grid h-8 w-8 place-items-center rounded-xl"><Sparkles className="h-4 w-4 text-white" /></div>
                  <div className="flex gap-1 rounded-3xl bg-secondary px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-typing" style={{animationDelay:"0s"}} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-typing" style={{animationDelay:"0.2s"}} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-typing" style={{animationDelay:"0.4s"}} />
                  </div>
                </div>
              </div>
              {/* suggestions */}
              <div className="flex flex-wrap gap-2 px-6 pb-3">
                {["Check PAN status","Apply for ration card","PM Kisan eligibility","Report pothole"].map(s=>(
                  <button key={s} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy/70 hover:border-primary/40 hover:text-primary">{s}</button>
                ))}
              </div>
              {/* input */}
              <div className="m-3 flex items-center gap-2 rounded-2xl border border-border bg-secondary/60 p-2">
                <button className="grid h-10 w-10 place-items-center rounded-xl text-navy/60 hover:bg-white"><Mic className="h-4 w-4" /></button>
                <input placeholder="Ask about any government service…" className="flex-1 bg-transparent px-2 text-sm text-navy placeholder:text-muted-foreground focus:outline-none" />
                <button className="grad-brand grid h-10 w-10 place-items-center rounded-xl text-white shadow-glow"><Send className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- POPULAR SERVICES ---------------- */
function PopularServices() {
  const s = [
    { i: IdCard, t: "Passport", g: "grad-brand" },
    { i: Car, t: "Driving License", g: "grad-orange" },
    { i: CreditCard, t: "PAN Card", g: "grad-purple" },
    { i: Shield, t: "Aadhaar", g: "grad-green" },
    { i: ReceiptText, t: "Income Certificate", g: "grad-brand" },
    { i: Baby, t: "Birth Certificate", g: "grad-purple" },
    { i: Vote, t: "Voter ID", g: "grad-orange" },
    { i: Building2, t: "GST Registration", g: "grad-green" },
  ];
  return (
    <section className="py-24">
      <SectionHead eyebrow="Popular Services" title="Start with what citizens use most" sub="Guided journeys — no more portal hopping." />
      <div className="grid grid-cols-4 gap-6">
        {s.map((it, i) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
            <div className={`${it.g} grid h-12 w-12 place-items-center rounded-2xl shadow-soft`}>
              <it.i className="h-5 w-5 text-white" />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <div className="font-display text-base font-semibold text-navy">{it.t}</div>
                <div className="text-xs text-muted-foreground">Apply · Track · Renew</div>
              </div>
              <ArrowRight className="h-4 w-4 text-navy/40 transition group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- COMPLAINTS ---------------- */
function Complaints() {
  return (
    <section className="py-24">
      <div className="glass relative overflow-hidden rounded-[32px] p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
              <AlertTriangle className="h-3.5 w-3.5" /> Report & Track
            </div>
            <h2 className="mt-4 font-display text-5xl font-bold text-navy">File a civic complaint in 30 seconds.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Upload a photo, share your location, and let AI route it to the right authority — with live status,
              SLA reminders and automatic escalation.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <StatusCard tone="grad-orange" label="Open" value="12,481" trend="+8%" />
              <StatusCard tone="grad-green" label="Resolved" value="98,204" trend="+21%" />
            </div>
          </div>

          <div className="col-span-7">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-semibold text-navy">New Complaint</div>
                <div className="text-xs text-muted-foreground">Draft · autosaved</div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <Field label="Category">
                  <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/60 px-3 py-3 text-sm text-navy">
                    Roads & Potholes <ChevronDown className="h-4 w-4 text-navy/50" />
                  </div>
                </Field>
                <Field label="Location">
                  <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/60 px-3 py-3 text-sm text-navy">
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Connaught Place, Delhi</span>
                    <ChevronDown className="h-4 w-4 text-navy/50" />
                  </div>
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Description">
                  <textarea rows={3} defaultValue="Large pothole near Block A causing traffic slowdown during peak hours." className="w-full rounded-xl border border-border bg-secondary/60 p-3 text-sm text-navy focus:outline-none" />
                </Field>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-primary/30 bg-brand-soft/60 px-5 py-6">
                <div className="flex items-center gap-3">
                  <div className="grad-brand grid h-11 w-11 place-items-center rounded-xl"><Upload className="h-5 w-5 text-white" /></div>
                  <div>
                    <div className="text-sm font-semibold text-navy">Upload photo evidence</div>
                    <div className="text-xs text-muted-foreground">JPG or PNG · up to 10MB</div>
                  </div>
                </div>
                <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary shadow-soft">Browse</button>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-navy">Save draft</button>
                <button className="grad-brand rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Submit complaint</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
function StatusCard({ tone, label, value, trend }: { tone: string; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className={`${tone} h-10 w-10 rounded-xl`} />
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-display text-2xl font-bold text-navy">{value}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-green"><TrendingUp className="h-3.5 w-3.5" /> {trend} this month</div>
    </div>
  );
}

/* ---------------- SCHEMES ---------------- */
function Schemes() {
  const s = [
    { t: "Scholarships", d: "Central & state scholarships for students", g: "grad-brand", i: GraduationCap, tag: "Education" },
    { t: "PM Kisan", d: "₹6,000/yr direct income support to farmers", g: "grad-green", i: Landmark, tag: "Agriculture" },
    { t: "Skill India", d: "Free vocational training & certifications", g: "grad-purple", i: Zap, tag: "Skilling" },
    { t: "Startup India", d: "Tax benefits & funding for new ventures", g: "grad-orange", i: TrendingUp, tag: "Business" },
    { t: "Mudra Loan", d: "Collateral-free micro loans up to ₹10L", g: "grad-brand", i: CreditCard, tag: "Finance" },
  ];
  return (
    <section className="py-24">
      <SectionHead eyebrow="Government Schemes" title="Discover schemes you qualify for" sub="AI matches central & state schemes to your profile." />
      <div className="grid grid-cols-5 gap-5">
        {s.map((it, i) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
            <div className={`${it.g} grid h-12 w-12 place-items-center rounded-2xl shadow-soft`}><it.i className="h-5 w-5 text-white" /></div>
            <div className="mt-4 text-xs font-semibold text-primary">{it.tag}</div>
            <div className="mt-1 font-display text-lg font-semibold text-navy">{it.t}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.d}</p>
            <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">Check eligibility <ArrowRight className="h-3.5 w-3.5" /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Ask AI", d: "Voice or text — in any Indian language.", i: MessageSquare, g: "grad-brand" },
    { n: "02", t: "Get Guidance", d: "Cited steps, checklists and forms.", i: Compass, g: "grad-purple" },
    { n: "03", t: "Apply", d: "Pre-filled forms, one-click submission.", i: FileText, g: "grad-orange" },
    { n: "04", t: "Track Progress", d: "Live status, alerts & escalations.", i: TrendingUp, g: "grad-green" },
  ];
  return (
    <section className="py-24">
      <SectionHead eyebrow="How it works" title="Four calm steps. Zero paperwork." sub="From doubt to done — in minutes, not months." />
      <div className="relative grid grid-cols-4 gap-6">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-16 -z-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {steps.map((s, i) => (
          <div key={i} className="relative rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className={`${s.g} grid h-14 w-14 place-items-center rounded-2xl shadow-soft`}><s.i className="h-6 w-6 text-white" /></div>
            <div className="mt-6 font-display text-4xl font-bold text-navy/10">{s.n}</div>
            <div className="-mt-3 font-display text-xl font-semibold text-navy">{s.t}</div>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const t = [
    { n: "Priya Sharma", r: "Teacher, Jaipur", q: "Got my PAN correction done in a single evening. The AI walked me through everything in Hindi.", g: "grad-brand" },
    { n: "Rahul Verma", r: "Farmer, Meerut", q: "PM Kisan verification felt impossible before. Smart Bharat made it a 10-minute job on my phone.", g: "grad-green" },
    { n: "Ananya Iyer", r: "Founder, Bengaluru", q: "Registered my startup, applied for Mudra, and tracked GST — all in one calm dashboard.", g: "grad-purple" },
  ];
  return (
    <section className="py-24">
      <SectionHead eyebrow="Testimonials" title="Loved by citizens across India" sub="From metros to villages — a companion that respects your time." />
      <div className="grid grid-cols-3 gap-6">
        {t.map((it, i) => (
          <div key={i} className="glass relative overflow-hidden rounded-3xl p-8">
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />
            <div className="flex gap-0.5 text-orange">
              {Array.from({length:5}).map((_,k)=>(<Star key={k} className="h-4 w-4 fill-current" />))}
            </div>
            <p className="mt-5 text-base leading-relaxed text-navy/90">"{it.q}"</p>
            <div className="mt-8 flex items-center gap-3">
              <div className={`${it.g} grid h-11 w-11 place-items-center rounded-full font-semibold text-white`}>{it.n[0]}</div>
              <div>
                <div className="text-sm font-semibold text-navy">{it.n}</div>
                <div className="text-xs text-muted-foreground">{it.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const cols = [
    { h: "Government", l: ["India.gov.in", "MyGov", "Digital India", "Grievance Portal"] },
    { h: "Services", l: ["Passport", "PAN Card", "Aadhaar", "GST"] },
    { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
    { h: "Legal", l: ["Privacy", "Terms", "Support", "Accessibility"] },
  ];
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto max-w-[1440px] px-10 py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-4">
            <div className="flex items-center gap-3">
              <div className="grad-brand grid h-11 w-11 place-items-center rounded-xl shadow-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">Smart Bharat</div>
                <div className="text-xs text-white/60">AI Powered Civic Companion</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              A public-good AI platform for every Indian citizen. Multilingual. Private by default. Built for Bharat.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Linkedin, Youtube, Github].map((I, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="col-span-2">
              <div className="font-display text-sm font-semibold text-white">{c.h}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {c.l.map((x) => (<li key={x}><a href="#" className="hover:text-white">{x}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <div>© 2026 Smart Bharat. A citizen-first initiative.</div>
          <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5" /> Meity-compliant · ISO 27001 · Data stays in India</div>
        </div>
      </div>
    </footer>
  );
}
