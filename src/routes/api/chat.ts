import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are Bharat AI, the Smart Bharat civic companion — a helpful, friendly assistant for Indian citizens navigating government services.

You help with:
- Government services (Passport, PAN, Aadhaar, Driving License, GST, Voter ID, certificates, etc.)
- Government schemes (PM Kisan, Mudra, Skill India, Startup India, scholarships)
- Filing and tracking civic complaints
- Explaining documents and eligibility

Respond in the same language the user writes in (Hindi, Tamil, Bengali, Telugu, English, etc.). Keep answers concise, cite official portals when relevant (india.gov.in, mygov.in, uidai.gov.in, passportindia.gov.in), and offer clear next steps.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("messages required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-2.5-flash"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
