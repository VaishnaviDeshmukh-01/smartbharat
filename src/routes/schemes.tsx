import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GraduationCap, Landmark, Zap, TrendingUp, CreditCard, Heart, Home, Baby, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes – Smart Bharat" },
      { name: "description", content: "Discover central and state schemes matched to your profile — PM Kisan, Mudra, Skill India and more." },
      { property: "og:title", content: "Government Schemes – Smart Bharat" },
      { property: "og:description", content: "AI-matched schemes for every Indian citizen." },
    ],
  }),
  component: SchemesPage,
});

const SCHEMES = [
  { t: "PM Kisan Samman Nidhi", d: "₹6,000/yr direct income support to eligible farmer families.", g: "grad-green", i: Landmark, tag: "Agriculture", url: "https://pmkisan.gov.in" },
  { t: "Mudra Loan", d: "Collateral-free micro loans up to ₹10L for small businesses.", g: "grad-brand", i: CreditCard, tag: "Finance", url: "https://www.mudra.org.in" },
  { t: "Skill India", d: "Free vocational training and certifications for youth.", g: "grad-purple", i: Zap, tag: "Skilling", url: "https://www.skillindiadigital.gov.in" },
  { t: "Startup India", d: "Tax benefits, funding and mentorship for new ventures.", g: "grad-orange", i: TrendingUp, tag: "Business", url: "https://www.startupindia.gov.in" },
  { t: "National Scholarship Portal", d: "Central and state scholarships for students.", g: "grad-brand", i: GraduationCap, tag: "Education", url: "https://scholarships.gov.in" },
  { t: "Ayushman Bharat", d: "Health cover up to ₹5L per family per year.", g: "grad-green", i: Heart, tag: "Health", url: "https://pmjay.gov.in" },
  { t: "PM Awas Yojana", d: "Affordable housing for all — urban & rural.", g: "grad-purple", i: Home, tag: "Housing", url: "https://pmaymis.gov.in" },
  { t: "Beti Bachao Beti Padhao", d: "Support for girl child education and welfare.", g: "grad-orange", i: Baby, tag: "Women & Child", url: "https://wcd.nic.in" },
];

function SchemesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-[1440px] px-10 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">Government Schemes</div>
            <h1 className="mt-3 font-display text-5xl font-bold text-navy">Discover schemes you qualify for.</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Central & state schemes matched to your profile by Bharat AI.</p>
          </div>
          <Link to="/assistant" className="grad-brand rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-glow">Check my eligibility</Link>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {SCHEMES.map((s) => (
            <a key={s.t} href={s.url} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
              <div className={`${s.g} grid h-12 w-12 place-items-center rounded-2xl shadow-soft`}><s.i className="h-5 w-5 text-white" /></div>
              <div className="mt-4 text-xs font-semibold text-primary">{s.tag}</div>
              <div className="mt-1 font-display text-lg font-semibold text-navy">{s.t}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Visit portal <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
