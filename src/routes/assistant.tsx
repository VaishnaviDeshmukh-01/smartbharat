import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Mic, Loader2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant – Smart Bharat" },
      { name: "description", content: "Chat with Bharat AI to navigate Indian government services in 25 languages." },
      { property: "og:title", content: "AI Assistant – Smart Bharat" },
      { property: "og:description", content: "Multilingual civic AI assistant for India." },
    ],
  }),
  component: AssistantPage,
});

type UIMsg = { id: string; role: "user" | "assistant"; text: string };

function AssistantPage() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<UIMsg[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, status]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "streaming") return;
    const userMsg: UIMsg = { id: crypto.randomUUID(), role: "user", text: trimmed };
    const assistantId = crypto.randomUUID();
    setMessages((m) => [...m, userMsg, { id: assistantId, role: "assistant", text: "" }]);
    setInput("");
    setStatus("streaming");

    // build UIMessage payload for AI SDK server route
    const payload = [...messages, userMsg].map((m) => ({
      id: m.id,
      role: m.role,
      parts: [{ type: "text", text: m.text }],
    }));

    const ctl = new AbortController();
    abortRef.current = ctl;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
        signal: ctl.signal,
      });
      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const l = line.trim();
          if (!l.startsWith("data:")) continue;
          const data = l.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const evt = JSON.parse(data);
            // AI SDK v5 UI stream: text-delta parts carry `.delta`
            if (evt.type === "text-delta" && typeof evt.delta === "string") {
              acc += evt.delta;
              setMessages((m) => m.map((x) => x.id === assistantId ? { ...x, text: acc } : x));
            }
          } catch { /* ignore */ }
        }
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setMessages((m) => m.map((x) => x.id === assistantId
        ? { ...x, text: `⚠️ ${err?.message || "Something went wrong. Please try again."}` }
        : x));
    } finally {
      setStatus("idle");
      abortRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  const suggestions = [
    "How do I apply for a new passport?",
    "PM Kisan eligibility check",
    "मेरा PAN कार्ड कैसे बनवाएं?",
    "Report a pothole in my area",
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <Nav />
      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-10 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> AI Assistant
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold text-navy">Bharat AI</h1>
            <p className="text-muted-foreground">{t("chat.online")}</p>
          </div>
          <Link to="/" className="text-sm font-medium text-navy/70 hover:text-primary">← Home</Link>
        </div>

        <div className="glass flex flex-1 flex-col overflow-hidden rounded-3xl p-2 shadow-glow min-h-0">
          <div className="flex flex-1 flex-col overflow-hidden rounded-[22px] bg-white">
            <div ref={scrollRef} className="flex-1 min-h-0 space-y-4 overflow-y-auto px-6 py-6">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="grad-brand grid h-14 w-14 place-items-center rounded-2xl shadow-glow">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <p className="mt-4 max-w-md text-sm text-muted-foreground">{t("chat.empty")}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {suggestions.map((s) => (
                      <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy/70 hover:border-primary/40 hover:text-primary">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="grad-brand max-w-lg whitespace-pre-wrap rounded-3xl rounded-br-md px-5 py-3 text-sm text-white shadow-soft">{m.text}</div>
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-3">
                  <div className="grad-purple mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl"><Sparkles className="h-4 w-4 text-white" /></div>
                  <div className="max-w-2xl whitespace-pre-wrap rounded-3xl rounded-bl-md bg-secondary px-5 py-3 text-sm leading-relaxed text-navy">
                    {m.text || (
                      <span className="inline-flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-typing" style={{animationDelay:"0s"}} />
                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-typing" style={{animationDelay:"0.2s"}} />
                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-typing" style={{animationDelay:"0.4s"}} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="m-3 flex items-end gap-2 rounded-2xl border border-border bg-secondary/60 p-2"
            >
              <button type="button" className="grid h-10 w-10 place-items-center rounded-xl text-navy/60 hover:bg-white" aria-label="Voice input">
                <Mic className="h-4 w-4" />
              </button>
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                }}
                placeholder={t("chat.placeholder")}
                className="flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-navy placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "streaming" || !input.trim()}
                className="grad-brand grid h-10 w-10 place-items-center rounded-xl text-white shadow-glow disabled:opacity-50"
                aria-label="Send"
              >
                {status === "streaming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
