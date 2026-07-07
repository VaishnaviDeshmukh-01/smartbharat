import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BookOpen, HelpCircle, Shield, Mail, Phone, FileText, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources – Smart Bharat" },
      { name: "description", content: "Guides, FAQ, support and legal information for Smart Bharat." },
      { property: "og:title", content: "Resources – Smart Bharat" },
      { property: "og:description", content: "Everything you need to make the most of Bharat AI." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const links = [
    { i: BookOpen, t: "Getting Started", d: "How Smart Bharat works and what Bharat AI can do.", to: "/assistant" as const },
    { i: HelpCircle, t: "FAQ", d: "Common questions on services, complaints and privacy.", to: "/assistant" as const },
    { i: FileText, t: "Documentation", d: "Detailed guides for each government service.", to: "/services" as const },
    { i: Shield, t: "Privacy & Security", d: "How we handle your data. ISO 27001, data stays in India.", to: "/resources" as const },
  ];
  const contacts = [
    { i: Mail, t: "Email support", v: "support@smartbharat.gov.in", href: "mailto:support@smartbharat.gov.in" },
    { i: Phone, t: "Helpline (toll-free)", v: "1800-11-1234", href: "tel:18001111234" },
    { i: ExternalLink, t: "Public Grievance Portal", v: "pgportal.gov.in", href: "https://pgportal.gov.in" },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-[1440px] px-10 py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">Resources</div>
          <h1 className="mt-3 font-display text-5xl font-bold text-navy">Guides, support and policies.</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Everything you need to make the most of Smart Bharat.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {links.map((l) => (
            <Link key={l.t} to={l.to} className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
              <div className="grad-brand grid h-12 w-12 place-items-center rounded-2xl shadow-soft"><l.i className="h-5 w-5 text-white" /></div>
              <div className="mt-5 font-display text-lg font-semibold text-navy">{l.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{l.d}</p>
            </Link>
          ))}
        </div>

        <div className="glass mt-10 grid grid-cols-3 gap-6 rounded-3xl p-8">
          {contacts.map((c) => (
            <a key={c.t} href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl p-4 transition hover:bg-white/60">
              <div className="grad-purple grid h-12 w-12 place-items-center rounded-2xl"><c.i className="h-5 w-5 text-white" /></div>
              <div>
                <div className="text-xs text-muted-foreground">{c.t}</div>
                <div className="font-display text-base font-semibold text-navy">{c.v}</div>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
