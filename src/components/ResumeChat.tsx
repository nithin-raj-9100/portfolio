import { useState, useEffect, useRef } from "react";
import { usePostHog } from "@posthog/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { BotMessageSquare, X, Send, RotateCcw, ChevronRight, ChevronDown, Brain } from "lucide-react";

const SUGGESTED_PROMPTS = [
  "Why should I hire him?",
  "What is Nithin's current role?",
  "Which databases has he worked with?",
  "Tell me about CartVerse",
];

export default function ResumeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  // Controls whether the reasoning box is open; resets each new response
  const [reasoningOpen, setReasoningOpen] = useState(true);
  const autoCollapsedRef = useRef(false); // prevent re-collapsing on every render
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const posthog = usePostHog();

  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // Reset reasoning state when a new message is submitted
  useEffect(() => {
    if (status === "submitted") {
      setReasoningOpen(true);
      autoCollapsedRef.current = false;
    }
  }, [status]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    posthog?.capture("resume_chat_opened");
  };

  const handleClose = () => setIsOpen(false);

  const handleSend = () => {
    const text = input.trim();
    if (!text || status !== "ready") return;
    sendMessage({ text });
    setInput("");
    posthog?.capture("resume_chat_message_sent", { message_length: text.length });
  };

  const handleSuggest = (prompt: string) => {
    if (status !== "ready") return;
    sendMessage({ text: prompt });
    posthog?.capture("resume_chat_suggested_prompt_used", { prompt });
  };

  const isStreaming = status === "streaming" || status === "submitted";
  const lastAssistantIdx = messages.reduce(
    (acc, m, i) => (m.role === "assistant" ? i : acc),
    -1
  );

  const lastAssistantHasText = messages[lastAssistantIdx]?.parts?.some(
    (p) => p.type === "text" && (p as { type: "text"; text: string }).text.length > 0
  );

  // Auto-collapse reasoning box the moment the first text token arrives
  useEffect(() => {
    if (lastAssistantHasText && !autoCollapsedRef.current) {
      autoCollapsedRef.current = true;
      setReasoningOpen(false);
    }
  }, [lastAssistantHasText]);

  // Show simple dots only during cold-start (before reasoning even begins)
  const showColdStart = status === "submitted";

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-[84px] right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] max-h-[540px] flex flex-col bg-background-100 border border-gray-300 rounded-[16px] overflow-hidden animate-slideUp"
          style={{ boxShadow: "var(--shadow-dialog)" }}
          role="dialog"
          aria-label="Resume chat"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-background-200 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gray-1000 flex items-center justify-center flex-shrink-0">
                <BotMessageSquare size={13} className="text-background-100" />
              </div>
              <div>
                <p className="heading-14 text-gray-1000">Ask my resume</p>
                <p className="copy-13 text-gray-700">AI assistant</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="geist-focus w-7 h-7 flex items-center justify-center rounded-full text-gray-700 hover:text-gray-1000 hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X size={15} />
            </button>
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 flex flex-col gap-4 min-h-0">
            {/* Empty state */}
            {messages.length === 0 && (
              <div className="flex flex-col gap-3 animate-fadeIn">
                <p className="copy-13 text-gray-700 text-center pt-2">
                  Ask me anything about Nithin's experience, skills, or projects.
                </p>
                <div className="flex flex-col gap-2 mt-1">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggest(prompt)}
                      disabled={status !== "ready"}
                      className="geist-focus flex items-center gap-2 text-left px-3 py-2.5 rounded-[8px] border border-gray-300 hover:border-gray-500 bg-background-100 hover:bg-gray-100 transition-all copy-13 text-gray-900 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed group"
                    >
                      <ChevronRight
                        size={13}
                        className="text-gray-600 flex-shrink-0 group-hover:text-gray-1000 transition-colors"
                      />
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, i) => {
              const isLastAssistant = i === lastAssistantIdx;
              const reasoningPart = message.parts.find((p) => p.type === "reasoning") as
                | { type: "reasoning"; text: string }
                | undefined;
              const hasReasoning = !!reasoningPart?.text;
              const isThisStreaming = isStreaming && isLastAssistant;

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"} gap-2`}
                >
                  {/* User bubble */}
                  {message.role === "user" && (
                    <div className="max-w-[80%] px-3 py-2 rounded-[10px] bg-gray-1000 text-background-100 copy-13">
                      {message.parts.map((part, j) =>
                        part.type === "text" ? (
                          <span key={j}>{(part as { type: "text"; text: string }).text}</span>
                        ) : null
                      )}
                    </div>
                  )}

                  {/* Assistant: reasoning collapsible + answer */}
                  {message.role === "assistant" && (
                    <div className="w-full flex flex-col gap-2">
                      {/* Reasoning collapsible — shown while reasoning exists */}
                      {hasReasoning && (
                        <div className="border border-gray-200 rounded-[8px] overflow-hidden animate-fadeIn">
                          <button
                            onClick={() => setReasoningOpen((v) => !v)}
                            className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            <Brain size={12} className="text-gray-600 flex-shrink-0" />
                            <span className="copy-13 text-gray-700 flex-1 text-left">
                              {isThisStreaming && !lastAssistantHasText ? "Reasoning…" : "Reasoning"}
                            </span>
                            {reasoningOpen ? (
                              <ChevronDown size={13} className="text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronRight size={13} className="text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {reasoningOpen && (
                            <div className="px-3 py-2 bg-gray-alpha-100 max-h-[140px] overflow-y-auto scrollbar-none">
                              <p className="copy-13-mono text-gray-700 whitespace-pre-wrap break-words">
                                {reasoningPart.text}
                                {isThisStreaming && !lastAssistantHasText && (
                                  <span className="inline-block w-1.5 h-3 bg-gray-500 ml-0.5 animate-pulse" />
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Main answer via Streamdown */}
                      {message.parts.map((part, j) =>
                        part.type === "text" ? (
                          <div key={j} className="copy-13 text-gray-1000">
                            <Streamdown
                              plugins={{ code }}
                              caret="block"
                              isAnimating={isThisStreaming}
                              linkSafety={{ enabled: false }}
                              className="text-sm"
                            >
                              {(part as { type: "text"; text: string }).text}
                            </Streamdown>
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Cold-start indicator — only before first chunk arrives */}
            {showColdStart && (
              <div className="flex justify-start animate-fadeIn">
                <div className="px-3 py-2 rounded-[10px] bg-gray-100 copy-13 text-gray-700 flex items-center gap-2">
                  <span className="text-gray-600">Thinking</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex flex-col gap-2 animate-fadeIn">
                <p className="copy-13 text-red-700 text-center">
                  Something went wrong. Please try again.
                </p>
                <button
                  onClick={() => regenerate()}
                  className="geist-focus flex items-center justify-center gap-1.5 mx-auto px-3 py-1.5 rounded-[6px] border border-gray-300 hover:border-gray-500 bg-background-100 copy-13 text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Retry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input row */}
          <div className="flex-shrink-0 px-3 py-3 border-t border-gray-200 bg-background-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming}
                placeholder="Ask about Nithin's experience…"
                className="geist-focus-input flex-1 bg-background-100 text-gray-1000 border border-gray-300 rounded-[8px] px-3 py-2 copy-13 placeholder:text-gray-600 transition-all focus:border-gray-700 disabled:opacity-50 min-w-0"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                aria-label="Send message"
                className="geist-focus w-8 h-8 flex items-center justify-center rounded-[8px] bg-gray-1000 hover:bg-gray-800 disabled:bg-gray-400 text-background-100 transition-colors flex-shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send size={13} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAB toggle button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? "Close chat" : "Open resume chat"}
        className="geist-focus fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gray-1000 hover:bg-gray-800 text-background-100 flex items-center justify-center transition-all cursor-pointer animate-fadeIn"
        style={{ boxShadow: "var(--shadow-dialog)" }}
      >
        {isOpen ? <X size={20} /> : <BotMessageSquare size={22} />}
      </button>
    </>
  );
}
