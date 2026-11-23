"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, Phone, ArrowUpRight } from "lucide-react";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Course Admission & Fee Discount");
  const [customNote, setCustomNote] = useState("");

  const topics = [
    { label: "🎓 Course Admission & Discount", msg: "Hello RESDA! I am interested in course admissions and fee discount details." },
    { label: "🏢 Offline Campus Lab Visit", msg: "Hi RESDA! I would like to schedule a visit to your Nafi Tower campus labs in Gulshan." },
    { label: "💻 Enterprise IT Services Quote", msg: "Hello! Our company is looking for a quotation for software development / IT services." },
    { label: "❓ General Counseling", msg: "Hi RESDA team, I need some career counseling regarding your upcoming training batches." },
  ];

  const handleOpenWhatsApp = (messageText: string) => {
    const finalMsg = customNote.trim() ? `${messageText} - Note: ${customNote.trim()}` : messageText;
    const url = `https://wa.me/8801700000000?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 print:hidden">
      {/* Pop-up Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 text-slate-900">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">RESDA Admissions Desk</h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>Online</span> • <span>Gulshan-1 Campus, Dhaka</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-50 text-xs">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 text-slate-700 shadow-2xs leading-relaxed">
              👋 Assalamu Alaikum! How can our academic counselors and IT team help you today?
            </div>

            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Select Inquiry Topic:
              </p>
              {topics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(t.msg)}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all font-medium text-slate-800 flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-xs truncate">{t.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Type custom message..."
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOpenWhatsApp(customNote || "Hello RESDA!");
                  }
                }}
              />
              <button
                onClick={() => handleOpenWhatsApp(customNote || "Hello RESDA!")}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Chat on WhatsApp with RESDA"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7 fill-white text-white" />
        )}
      </button>
    </div>
  );
}
