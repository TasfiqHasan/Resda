"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "SERVICE" | "ENROLLMENT" | "GENERAL">("ALL");

  const [inquiries, setInquiries] = useState([
    {
      id: "inq-101",
      name: "Dr. Tariq Rahman",
      email: "tariq@cityhospital.com",
      phone: "+880 1711-987654",
      subject: "Hospital EMR Software Customization",
      message: "We need an integrated radiology and billing portal module for our clinic branch in Gulshan.",
      type: "SERVICE",
      status: "NEW",
      date: "Oct 14, 2026 • 04:30 PM",
    },
    {
      id: "inq-102",
      name: "Sharmin Sultana",
      email: "sharmin.s@gmail.com",
      phone: "+880 1819-123456",
      subject: "Inquiry regarding November MERN Batch",
      message: "Can I pay the course tuition fee in two installments? I work as a junior QA engineer.",
      type: "ENROLLMENT",
      status: "IN_PROGRESS",
      date: "Oct 14, 2026 • 01:15 PM",
    },
    {
      id: "inq-103",
      name: "Mahbubul Alam",
      email: "mahbub@quickbite.com.bd",
      phone: "+880 1912-345678",
      subject: "Food Delivery App Upgrade Consultation",
      message: "Looking for Flutter mobile app maintenance and backend API performance optimization.",
      type: "SERVICE",
      status: "NEW",
      date: "Oct 13, 2026 • 11:20 AM",
    },
    {
      id: "inq-104",
      name: "Farhan Kabir",
      email: "farhan@yahoo.com",
      phone: "+880 1622-456789",
      subject: "Offline Lab Training Hours at Nafi Tower",
      message: "Are the computer labs open for practice on Saturdays after class hours?",
      type: "GENERAL",
      status: "RESPONDED",
      date: "Oct 12, 2026 • 05:40 PM",
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const filtered = inquiries.filter((inq) => {
    const matchesType = typeFilter === "ALL" || inq.type === typeFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-accent" /> Customer Leads & Inquiries Pipeline (CRM)
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Incoming student admission requests, commercial IT service quotation calls, and customer tickets.
        </p>
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
        {filtered.map((inq) => (
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

              {/* Status Selector */}
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
                  <option value="CLOSED">Status: Closed</option>
                </select>
              </div>
            </div>

            {/* Message Body */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
              &quot;{inq.message}&quot;
            </div>

            {/* Contact Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex items-center gap-4 text-slate-400">
                <a
                  href={`mailto:${inq.email}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent" /> {inq.email}
                </a>
                <a
                  href={`tel:${inq.phone}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" /> {inq.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${inq.email}?subject=RE: ${encodeURIComponent(inq.subject)}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Reply Email
                </a>
                <a
                  href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" /> WhatsApp Followup
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
