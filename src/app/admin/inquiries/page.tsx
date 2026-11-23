"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RefreshCw,
  Send,
  X,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "SERVICE" | "ENROLLMENT" | "GENERAL">("ALL");
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Reply note modal
  const [replyModalInq, setReplyModalInq] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setInquiries(data);
        }
      }
    } catch (err) {
      console.warn("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    try {
      await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry record?")) return;
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    try {
      await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const handleSaveReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModalInq) return;
    setIsSubmittingReply(true);

    try {
      await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: replyModalInq.id,
          status: "RESPONDED",
          replyNote: replyText,
        }),
      });

      setInquiries((prev) =>
        prev.map((i) =>
          i.id === replyModalInq.id
            ? { ...i, status: "RESPONDED", replyNote: replyText }
            : i
        )
      );
      setReplyModalInq(null);
      setReplyText("");
    } catch (err) {
      console.error("Failed to save reply:", err);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesType = typeFilter === "ALL" || inq.type === typeFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.phone && inq.phone.includes(search));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent" /> Customer Leads & Inquiries Pipeline (CRM)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Incoming student admission requests, commercial IT service quotation calls, and customer tickets.
          </p>
        </div>

        <button
          onClick={loadInquiries}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Leads
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, or subject..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:block" />
          {(["ALL", "SERVICE", "ENROLLMENT", "GENERAL"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === t
                  ? "bg-accent text-slate-950 shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {t === "ALL" ? "All Inquiries" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-slate-950 rounded-3xl border border-slate-800 text-slate-400">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">No inquiries found</p>
            <p className="text-xs text-slate-500 mt-1">
              {search ? "Try adjusting your search criteria." : "New leads from contact forms will appear here."}
            </p>
          </div>
        ) : (
          filtered.map((inq) => (
            <div
              key={inq.id}
              className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inq.type === "SERVICE"
                          ? "bg-purple-950 text-purple-400 border border-purple-800"
                          : inq.type === "ENROLLMENT"
                          ? "bg-blue-950 text-blue-400 border border-blue-800"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {inq.type} INQUIRY
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {inq.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{inq.subject}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    From: <strong className="text-slate-200">{inq.name}</strong>
                  </p>
                </div>

                {/* Status Selector & Delete */}
                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${
                      inq.status === "NEW"
                        ? "bg-amber-950/80 text-amber-300 border-amber-800"
                        : inq.status === "IN_PROGRESS"
                        ? "bg-sky-950/80 text-sky-300 border-sky-800"
                        : "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    }`}
                  >
                    <option value="NEW">Status: New Lead</option>
                    <option value="IN_PROGRESS">Status: In Progress</option>
                    <option value="RESPONDED">Status: Responded</option>
                  </select>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    title="Delete Inquiry"
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                &quot;{inq.message}&quot;
              </div>

              {/* Reply Note if exists */}
              {inq.replyNote && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Internal Reply Note:</span>
                    <span>{inq.replyNote}</span>
                  </div>
                </div>
              )}

              {/* Contact Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center gap-4 text-slate-400">
                  <a
                    href={`mailto:${inq.email}`}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-accent" /> {inq.email}
                  </a>
                  {inq.phone && (
                    <a
                      href={`tel:${inq.phone}`}
                      className="flex items-center gap-1.5 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-accent" /> {inq.phone}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setReplyModalInq(inq);
                      setReplyText(inq.replyNote || "");
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Log Response / Note
                  </button>
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" /> WhatsApp Followup
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Response Modal */}
      {replyModalInq && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Log Response to {replyModalInq.name}
              </h3>
              <button
                onClick={() => setReplyModalInq(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Response Details / Follow-up Notes
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="e.g. Called student via phone. Shared admission brochure and confirmed weekend batch seat..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyModalInq(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReply}
                  className="px-5 py-2 bg-accent hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Save & Mark Responded
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
