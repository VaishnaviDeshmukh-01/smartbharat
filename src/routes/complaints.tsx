import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AlertTriangle, Upload, MapPin, ChevronDown, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "File a Complaint – Smart Bharat" },
      { name: "description", content: "Report civic issues with photo, location and category — track resolution end-to-end." },
      { property: "og:title", content: "Report & Track Complaints – Smart Bharat" },
      { property: "og:description", content: "AI-routed complaints to the right authority in seconds." },
    ],
  }),
  component: ComplaintsPage,
});

function ComplaintsPage() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [category, setCategory] = useState("Roads & Potholes");
  const [location, setLocation] = useState("Connaught Place, Delhi");
  const [desc, setDesc] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "CMP-" + Math.floor(Math.random() * 90000 + 10000);
    setSubmitted(id);
    setDesc("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-[1440px] px-10 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
              <AlertTriangle className="h-3.5 w-3.5" /> Report & Track
            </div>
            <h1 className="mt-3 font-display text-5xl font-bold text-navy">File a civic complaint.</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">AI routes it to the right authority with live status and escalation.</p>
          </div>
          <Link to="/assistant" className="grad-brand rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-glow">Ask AI for help</Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5 space-y-4">
            <StatCard tone="grad-orange" icon={Clock} label="Open" value="12,481" />
            <StatCard tone="grad-green" icon={CheckCircle2} label="Resolved" value="98,204" />
            <StatCard tone="grad-brand" icon={TrendingUp} label="Avg. resolution" value="4.2 days" />
          </div>

          <div className="col-span-7">
            {submitted ? (
              <div className="glass rounded-3xl p-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl grad-green shadow-glow">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold text-navy">Complaint filed</h2>
                <p className="mt-2 text-sm text-muted-foreground">Your reference number is <span className="font-mono font-semibold text-navy">{submitted}</span>. We'll notify you on updates.</p>
                <button onClick={() => setSubmitted(null)} className="mt-6 grad-brand rounded-xl px-5 py-2.5 text-sm font-semibold text-white">File another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl border border-border bg-white p-6 shadow-soft">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full appearance-none rounded-xl border border-border bg-secondary/60 px-3 py-3 text-sm text-navy focus:outline-none">
                      {["Roads & Potholes", "Water Supply", "Electricity", "Garbage & Sanitation", "Streetlights", "Public Transport", "Other"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Location">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <input value={location} onChange={(e) => setLocation(e.target.value)} className="flex-1 bg-transparent py-3 text-sm text-navy focus:outline-none" />
                    </div>
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Description">
                    <textarea required rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe the issue in detail…" className="w-full rounded-xl border border-border bg-secondary/60 p-3 text-sm text-navy focus:outline-none" />
                  </Field>
                </div>
                <label className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-primary/30 bg-brand-soft/60 px-5 py-6">
                  <span className="flex items-center gap-3">
                    <span className="grad-brand grid h-11 w-11 place-items-center rounded-xl"><Upload className="h-5 w-5 text-white" /></span>
                    <span>
                      <span className="block text-sm font-semibold text-navy">Upload photo evidence</span>
                      <span className="block text-xs text-muted-foreground">JPG or PNG · up to 10MB</span>
                    </span>
                  </span>
                  <span className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary shadow-soft">Browse</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                <div className="mt-5 flex justify-end gap-2">
                  <button type="button" className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-navy">Save draft</button>
                  <button type="submit" className="grad-brand rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Submit complaint</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
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
function StatCard({ tone, icon: I, label, value }: { tone: string; icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className={`${tone} grid h-11 w-11 place-items-center rounded-xl`}><I className="h-5 w-5 text-white" /></div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-display text-2xl font-bold text-navy">{value}</div>
        </div>
      </div>
    </div>
  );
}
