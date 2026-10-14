"use client";

import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function AdminOverviewPage() {
  const kpiStats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+18.2%",
      trend: "up",
      icon: Users,
      description: "Active enrollments across all batches",
    },
    {
      title: "Active Courses",
      value: "24",
      change: "+3 new",
      trend: "up",
      icon: BookOpen,
      description: "Online & offline tracks combined",
    },
    {
      title: "Monthly Revenue",
      value: "৳ 14,85,000",
      change: "+24.5%",
      trend: "up",
      icon: DollarSign,
      description: "Tuition fees & IT project milestones",
    },
    {
      title: "Pending Inquiries",
      value: "19",
      change: "5 urgent",
      trend: "neutral",
      icon: MessageSquare,
      description: "From website contact form & courses",
    },
  ];

  const recentInquiries = [
    {
      id: "inq-1",
      name: "Rafid Hossain",
      email: "rafid@fintechbd.com",
      service: "Enterprise ERP Software",
      type: "SERVICE",
      time: "20 mins ago",
      status: "NEW",
    },
    {
      id: "inq-2",
      name: "Sharmin Sultana",
      email: "sharmin@gmail.com",
      service: "Full-Stack Web Dev (Nov Batch)",
      type: "ENROLLMENT",
      time: "1 hour ago",
      status: "NEW",
    },
    {
      id: "inq-3",
      name: "Kamrul Ahsan",
      email: "kamrul@apexgroup.com",
      service: "Cybersecurity Audit & Penetration Testing",
      type: "SERVICE",
      time: "3 hours ago",
      status: "IN_PROGRESS",
    },
    {
      id: "inq-4",
      name: "Nabila Tabassum",
      email: "nabila@gmail.com",
      service: "Offline Graphic Design Batch",
      type: "ENROLLMENT",
      time: "Yesterday",
      status: "RESPONDED",
    },
  ];

  const recentBatches = [
    {
      batch: "WD-48 (MERN Stack)",
      mode: "Online Live",
      enrolled: "38 / 40",
      start: "Oct 15, 2026",
      status: "Filling Fast",
    },
    {
      batch: "PY-20 (Python & AI)",
      mode: "Offline • Nafi Tower",
      enrolled: "18 / 20",
      start: "Nov 01, 2026",
      status: "Almost Full",
    },
    {
      batch: "NET-30 (Network Admin)",
      mode: "Offline • Nafi Tower",
      enrolled: "14 / 20",
      start: "Nov 15, 2026",
      status: "Open",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Admin Master Dashboard <ShieldCheck className="w-5 h-5 text-accent" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time operations for RESDA Training Programs, Classroom Batches, and IT Services.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/courses"
            className="px-4 py-2 bg-accent hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-lg shadow-accent/20"
          >
            <Plus className="w-4 h-4" /> Add New Course
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl border border-slate-700 transition-colors"
          >
            Review Leads
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiStats.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{kpi.title}</span>
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-accent flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{kpi.value}</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="text-emerald-400 font-bold flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> {kpi.change}
                  </span>
                  <span className="text-slate-500 text-[11px] truncate">{kpi.description}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column: Inquiries Pipeline + Batch Capacities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" /> Recent Inquiries & Admissions (CRM)
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-xs text-accent hover:underline flex items-center gap-0.5"
            >
              Manage All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Program / Service</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {recentInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-white">{inq.name}</p>
                        <p className="text-[11px] text-slate-500">{inq.email}</p>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-200">{inq.service}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            inq.type === "SERVICE"
                              ? "bg-purple-950/60 text-purple-400 border border-purple-800/50"
                              : "bg-blue-950/60 text-blue-400 border border-blue-800/50"
                          }`}
                        >
                          {inq.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            inq.status === "NEW"
                              ? "bg-amber-950/60 text-amber-400 border border-amber-800/50"
                              : inq.status === "IN_PROGRESS"
                              ? "bg-sky-950/60 text-sky-400 border border-sky-800/50"
                              : "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">{inq.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Batch Status / Campus Seat Capacities (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" /> Upcoming Batch Intakes
            </h2>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            {recentBatches.map((b, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{b.batch}</span>
                  <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {b.status}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>{b.mode}</span>
                  <span className="text-white font-medium">Starts {b.start}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Seat Capacity:</span>
                  <span className="font-bold text-white">{b.enrolled}</span>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/admin/courses"
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-800"
              >
                <span>View All Training Programs</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
