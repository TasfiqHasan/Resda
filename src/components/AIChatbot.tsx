"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  Send,
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Compass,
  GraduationCap,
  CreditCard,
  Building,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { ChatNavigationCard, AIChatResponse } from "@/app/api/ai/chat/route";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  navigationCard?: ChatNavigationCard;
  suggestedFollowUps?: string[];
  timestamp: string;
}

export function AIChatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initialMessage: Message = {
    id: "welcome-1",
    sender: "assistant",
    text:
      "👋 Hello! I am **RESDA's AI Academic Counselor & Navigator**.\n\n" +
      "I can help you explore courses, check tuition fees & 2-installment plans, verify certificates, or navigate anywhere on our platform.\n\n" +
      "What would you like to know today?",
    navigationCard: {
      title: "Explore 50+ Certified IT Tracks",
      description: "Web Dev, Python, AI/ML, Flutter, Cybersecurity & UI/UX",
      link: "/courses",
      badge: "Popular",
      ctaText: "Browse Course Catalog",
    },
    suggestedFollowUps: [
      "Which course is best for beginners?",
      "Tuition fees & 2-installment options",
      "Where is your Gulshan campus located?",
      "How do I verify a certificate?",
    ],
    timestamp: "Just now",
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (res.ok) {
        const data: AIChatResponse = await res.json();
        const assistantMessage: Message = {
          id: `bot-${Date.now()}`,
          sender: "assistant",
          text: data.reply,
          navigationCard: data.navigationCard,
          suggestedFollowUps: data.suggestedFollowUps,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Chat request failed");
      }
    } catch {
      const fallbackMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text:
          "I am having trouble connecting to the network right now. You can browse our courses or contact our academic counselors directly on WhatsApp at **+880 1700-000000**.",
        navigationCard: {
          title: "Browse Courses",
          description: "Explore all technical tracks and syllabus outlines",
          link: "/courses",
          ctaText: "View Courses",
        },
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([initialMessage]);
  };

  const handleCardClick = (link: string) => {
    router.push(link);
    // On small screens, close the chat modal when navigating
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden font-sans">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 text-slate-900">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-purple-900 to-primary-dark p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full bg-white/10 p-1 flex items-center justify-center border border-white/20 shrink-0">
                <Image src="/logo-symbol.png" alt="RESDA Crest" fill className="object-contain p-1" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold truncate">RESDA AI Counselor</h3>
                  <span className="text-[9px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-purple-200 flex items-center gap-1 truncate">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span>Online • Instant Navigator</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Category Action Bar */}
          <div className="bg-purple-50/80 px-3 py-2 border-b border-purple-100 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {[
              { label: "Courses", link: "/courses", icon: GraduationCap },
              { label: "Fees & Pay", link: "/courses", icon: CreditCard },
              { label: "Campus", link: "/contact", icon: Building },
              { label: "Verify", link: "/verify", icon: ShieldCheck },
            ].map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleCardClick(chip.link)}
                  className="px-2.5 py-1 rounded-full bg-white text-purple-900 border border-purple-200/80 hover:border-primary hover:bg-primary hover:text-white transition-all font-semibold flex items-center gap-1 shrink-0 cursor-pointer text-[10px]"
                >
                  <Icon className="w-3 h-3" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-br-none shadow-sm"
                      : "bg-white text-slate-800 rounded-bl-none border border-slate-200/80 shadow-2xs"
                  }`}
                >
                  {/* Message Text with Simple Markdown Line Breaks & Bold */}
                  <div className="space-y-1.5 whitespace-pre-wrap">
                    {msg.text.split("\n\n").map((para, i) => (
                      <p key={i}>
                        {para.split("**").map((part, j) =>
                          j % 2 === 1 ? <strong key={j} className="font-bold">{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Embedded Interactive Navigation Card */}
                  {msg.navigationCard && (
                    <div className="mt-3 p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5 text-left text-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                          {msg.navigationCard.badge || "Recommendation"}
                        </span>
                        <Compass className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="font-bold text-xs text-heading">{msg.navigationCard.title}</p>
                      <p className="text-[11px] text-body leading-snug">{msg.navigationCard.description}</p>
                      <button
                        type="button"
                        onClick={() => handleCardClick(msg.navigationCard!.link)}
                        className="w-full mt-2 py-2 px-3 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>{msg.navigationCard.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-1.5 ${
                      msg.sender === "user" ? "text-purple-200" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* Follow-up question chips */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-2 space-y-1 w-full pl-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSend(chip)}
                          className="text-[10px] bg-white hover:bg-purple-50 text-primary border border-purple-200 rounded-full px-2.5 py-1 font-medium transition-all text-left flex items-center gap-1 hover:border-primary cursor-pointer"
                        >
                          <span>{chip}</span>
                          <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-500 font-medium">RESDA AI is researching...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, fees, campus, or navigation..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-purple-700 to-purple-900 hover:from-primary-dark hover:to-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Open RESDA AI Counselor"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative w-7 h-7">
            <Image src="/logo-symbol.png" alt="RESDA AI" fill className="object-contain" priority />
          </div>
        )}
      </button>
    </div>
  );
}
