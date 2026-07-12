import type { UIMessage } from "ai";

// Shared between api/chat.ts and ResumeChat.tsx — data parts streamed
// alongside the assistant answer (follow-up suggestion chips).
export type ResumeUIMessage = UIMessage<
  never,
  {
    suggestions: { questions: string[] };
  }
>;
