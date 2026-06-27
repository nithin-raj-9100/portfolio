import { useState, useEffect, useRef } from "react";
import { usePostHog } from "@posthog/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { BotMessageSquare, X, Send, RotateCcw, ChevronRight, ChevronDown, Brain, Trash2 } from "lucide-react";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
} from "@/components/ui/message-scroller";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";

const SUGGESTED_PROMPTS = [
  "Why should I hire him?",
  "What is Nithin's current role?",
  "Which databases has he worked with?",
  "Tell me about CartVerse",
];

export default function ResumeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [reasoningOpen, setReasoningOpen] = useState(true);
  const autoCollapsedRef = useRef(false);
  const reasoningScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const posthog = usePostHog();

  const { messages, sendMessage, status, error, regenerate, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const handleClearHistory = () => {
    setMessages([]);
    posthog?.capture("resume_chat_cleared");
  };

  useEffect(() => {
    if (status === "submitted") {
      setReasoningOpen(true);
      autoCollapsedRef.current = false;
    }
  }, [status]);

  const lastReasoningText = messages.reduce<string>((acc, m) => {
    if (m.role !== "assistant") return acc;
    const part = m.parts?.find((p) => p.type === "reasoning") as
      | { type: "reasoning"; text: string }
      | undefined;
    return part?.text ?? acc;
  }, "");

  useEffect(() => {
    if (reasoningOpen && reasoningScrollRef.current) {
      const el = reasoningScrollRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [lastReasoningText, reasoningOpen]);

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

  useEffect(() => {
    if (lastAssistantHasText && !autoCollapsedRef.current) {
      autoCollapsedRef.current = true;
      setReasoningOpen(false);
    }
  }, [lastAssistantHasText]);

  const showColdStart = status === "submitted";

  return (
    <>
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
            <div className="flex items-center gap-1.5 ml-auto">
              {messages.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  disabled={isStreaming}
                  className="geist-focus w-7 h-7 flex items-center justify-center rounded-full text-gray-700 hover:text-red-700 hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Clear chat history"
                  aria-label="Clear chat history"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <button
                onClick={handleClose}
                className="geist-focus w-7 h-7 flex items-center justify-center rounded-full text-gray-700 hover:text-gray-1000 hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Message list — MessageScroller handles anchoring and auto-scroll */}
          <MessageScrollerProvider>
            <MessageScroller className="flex-1 min-h-0">
              <MessageScrollerViewport className="chat-scrollbar px-4 py-3">
                <MessageScrollerContent className="gap-4">
                  {/* Empty state */}
                  {messages.length === 0 && (
                    <MessageScrollerItem>
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
                    </MessageScrollerItem>
                  )}

                  {/* Messages */}
                  {messages.map((message, i) => {
                    const isUser = message.role === "user";
                    const isLastAssistant = i === lastAssistantIdx;
                    const reasoningPart = message.parts.find((p) => p.type === "reasoning") as
                      | { type: "reasoning"; text: string }
                      | undefined;
                    const hasReasoning = !!reasoningPart?.text;
                    const isThisStreaming = isStreaming && isLastAssistant;

                    return (
                      <MessageScrollerItem
                        key={message.id}
                        scrollAnchor={isLastAssistant}
                      >
                        <Message align={isUser ? "end" : "start"}>
                          <MessageContent className={isUser ? "items-end" : "items-start"}>
                            {/* User bubble */}
                            {isUser && (
                              <Bubble variant="default" align="end">
                                <BubbleContent className="px-3 py-2 rounded-[10px] bg-gray-1000 text-background-100 copy-13">
                                  {message.parts.map((part, j) =>
                                    part.type === "text" ? (
                                      <span key={j}>{(part as { type: "text"; text: string }).text}</span>
                                    ) : null
                                  )}
                                </BubbleContent>
                              </Bubble>
                            )}

                            {/* Assistant: reasoning + answer */}
                            {!isUser && (
                              <Bubble variant="ghost" align="start" className="w-full">
                                <BubbleContent className="w-full flex flex-col gap-2">
                                  {/* Reasoning collapsible */}
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
                                        <div ref={reasoningScrollRef} className="px-3 py-2 bg-gray-alpha-100 max-h-[180px] overflow-y-auto reasoning-scrollbar">
                                          <p className="copy-13 text-gray-600 whitespace-pre-wrap break-words leading-relaxed">
                                            {reasoningPart.text}
                                            {isThisStreaming && !lastAssistantHasText && (
                                              <span className="inline-block w-1.5 h-3 bg-gray-400 ml-0.5 align-middle animate-pulse" />
                                            )}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Main answer */}
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
                                </BubbleContent>
                              </Bubble>
                            )}
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    );
                  })}

                  {/* Cold-start indicator */}
                  {showColdStart && (
                    <MessageScrollerItem>
                      <Message align="start">
                        <MessageContent>
                          <Bubble variant="muted" align="start">
                            <BubbleContent className="px-3 py-2 rounded-[10px] bg-gray-100 copy-13 text-gray-700 flex items-center gap-2 animate-fadeIn">
                              <span className="text-gray-600">Thinking</span>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
                            </BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  )}

                  {/* Error state */}
                  {error && (
                    <MessageScrollerItem>
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
                    </MessageScrollerItem>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
            </MessageScroller>
          </MessageScrollerProvider>

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
