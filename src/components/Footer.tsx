import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Linkedin, Youtube, Github, Shield } from "lucide-react";

export function Footer() {
  const cols = [
    { h: "Government", l: [
      { t: "India.gov.in", href: "https://www.india.gov.in" },
      { t: "MyGov", href: "https://www.mygov.in" },
      { t: "Digital India", href: "https://www.digitalindia.gov.in" },
      { t: "Grievance Portal", href: "https://pgportal.gov.in" },
    ]},
    { h: "Services", l: [
      { t: "Passport", to: "/services" }, { t: "PAN Card", to: "/services" },
      { t: "Aadhaar", to: "/services" }, { t: "GST", to: "/services" },
    ]},
    { h: "Company", l: [
      { t: "About", to: "/resources" }, { t: "AI Assistant", to: "/assistant" },
      { t: "Schemes", to: "/schemes" }, { t: "Contact", to: "/resources" },
    ]},
    { h: "Legal", l: [
      { t: "Privacy", to: "/resources" }, { t: "Terms", to: "/resources" },
      { t: "Support", to: "/resources" }, { t: "Accessibility", to: "/resources" },
    ]},
  ];
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto max-w-[1440px] px-10 py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="grad-brand grid h-11 w-11 place-items-center rounded-xl shadow-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">Smart Bharat</div>
                <div className="text-xs text-white/60">AI Powered Civic Companion</div>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              A public-good AI platform for every Indian citizen. Multilingual. Private by default. Built for Bharat.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { I: Twitter, href: "https://twitter.com" },
                { I: Linkedin, href: "https://linkedin.com" },
                { I: Youtube, href: "https://youtube.com" },
                { I: Github, href: "https://github.com" },
              ].map(({ I, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="col-span-2">
              <div className="font-display text-sm font-semibold text-white">{c.h}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {c.l.map((x: any) => (
                  <li key={x.t}>
                    {x.href ? (
                      <a href={x.href} target="_blank" rel="noreferrer" className="hover:text-white">{x.t}</a>
                    ) : (
                      <Link to={x.to} className="hover:text-white">{x.t}</Link>
                    )}
                  </li>
                ))}
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
