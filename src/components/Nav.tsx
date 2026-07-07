import { Link } from "@tanstack/react-router";
import { Sparkles, Globe, Bell, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useI18n, LANGUAGES, type LangCode } from "@/lib/i18n";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/assistant", key: "nav.assistant" },
  { to: "/complaints", key: "nav.complaints" },
  { to: "/schemes", key: "nav.schemes" },
  { to: "/resources", key: "nav.resources" },
] as const;

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-[1440px] px-10 pt-5">
        <nav className="glass flex items-center justify-between rounded-2xl px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="grad-brand grid h-10 w-10 place-items-center rounded-xl shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-navy">Smart Bharat</div>
              <div className="text-[11px] font-medium text-muted-foreground">AI Civic Companion</div>
            </div>
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium bg-brand-soft text-primary" }}
                  inactiveProps={{ className: "rounded-full px-4 py-2 text-sm font-medium text-navy/70 hover:bg-brand-soft/60 hover:text-primary transition" }}
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <div ref={ref} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/60 px-3 py-2 text-sm font-medium text-navy/80 hover:bg-white"
              >
                <Globe className="h-4 w-4" /> {current.native}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {open && (
                <div className="glass absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl p-1.5 shadow-glass">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                        l.code === lang ? "bg-brand-soft text-primary" : "text-navy/80 hover:bg-brand-soft/60"
                      }`}
                    >
                      <span><span className="font-medium">{l.native}</span> <span className="text-xs text-muted-foreground">{l.label}</span></span>
                      {l.code === lang && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white/60 text-navy/70 hover:text-primary">
              <Bell className="h-4 w-4" />
            </button>
            <Link to="/assistant" className="grad-purple grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white shadow-soft">
              AR
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
