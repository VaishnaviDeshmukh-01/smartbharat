import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  IdCard, Car, CreditCard, Shield, ReceiptText, Baby, Vote, Building2,
  Landmark, GraduationCap, FileText, Search, ArrowRight,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services – Smart Bharat" },
      { name: "description", content: "Browse 120+ Indian government services with guided journeys and AI assistance." },
      { property: "og:title", content: "Government Services – Smart Bharat" },
      { property: "og:description", content: "Passport, PAN, Aadhaar, GST and more — guided end-to-end." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { i: IdCard, t: "Passport", d: "Fresh, renewal and re-issue", g: "grad-brand", url: "https://portal2.passportindia.gov.in" },
  { i: Car, t: "Driving License", d: "Apply, renew, add class", g: "grad-orange", url: "https://parivahan.gov.in" },
  { i: CreditCard, t: "PAN Card", d: "Apply, correct, e-PAN", g: "grad-purple", url: "https://www.onlineservices.nsdl.com" },
  { i: Shield, t: "Aadhaar", d: "Enrolment, update, mAadhaar", g: "grad-green", url: "https://uidai.gov.in" },
  { i: ReceiptText, t: "Income Certificate", d: "State e-District portals", g: "grad-brand", url: "https://services.india.gov.in" },
  { i: Baby, t: "Birth Certificate", d: "Municipal registration", g: "grad-purple", url: "https://crsorgi.gov.in" },
  { i: Vote, t: "Voter ID", d: "Register, correct, download", g: "grad-orange", url: "https://voters.eci.gov.in" },
  { i: Building2, t: "GST Registration", d: "New GSTIN and returns", g: "grad-green", url: "https://www.gst.gov.in" },
  { i: Landmark, t: "Ration Card", d: "Apply and check status", g: "grad-brand", url: "https://nfsa.gov.in" },
  { i: GraduationCap, t: "Scholarships", d: "NSP central & state", g: "grad-purple", url: "https://scholarships.gov.in" },
  { i: FileText, t: "Income Tax", d: "e-Filing and refunds", g: "grad-green", url: "https://www.incometax.gov.in" },
  { i: Building2, t: "EPFO", d: "PF passbook and UAN", g: "grad-orange", url: "https://www.epfindia.gov.in" },
];

function ServicesPage() {
  const [q, setQ] = useState("");
  const filtered = SERVICES.filter((s) => s.t.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-[1440px] px-10 py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">Services</div>
          <h1 className="mt-3 font-display text-5xl font-bold text-navy">120+ services, one clean surface.</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Search and open any Indian government service — with an AI guide one click away.</p>
          <div className="mt-6 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-soft">
            <Search className="h-4 w-4 text-navy/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Passport, PAN, Aadhaar…" className="flex-1 bg-transparent text-sm focus:outline-none" />
            <Link to="/assistant" className="grad-brand rounded-xl px-3 py-1.5 text-xs font-semibold text-white">Ask AI</Link>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {filtered.map((s) => (
            <a key={s.t} href={s.url} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
              <div className={`${s.g} grid h-12 w-12 place-items-center rounded-2xl shadow-soft`}>
                <s.i className="h-5 w-5 text-white" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-semibold text-navy">{s.t}</div>
                  <div className="text-xs text-muted-foreground">{s.d}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-navy/40 transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
