"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Briefcase,
  MoreVertical,
  UserPlus,
  CheckCircle2,
} from "lucide-react";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "STUDENT" | "INSTRUCTOR" | "ADMIN" | "CLIENT">("ALL");

  const usersList = [
    {
      id: "usr-1",
      name: "Tanvir Ahmed",
      email: "tanvir@resda.org",
      role: "STUDENT",
      batch: "WD-48 (MERN)",
      phone: "+880 1700-123456",
      status: "ACTIVE",
      joined: "Oct 01, 2026",
    },
    {
      id: "usr-2",
      name: "MD. Rafiqul Islam",
      email: "rafiq@resda.org",
      role: "INSTRUCTOR",
      batch: "Python & Data Track",
      phone: "+880 1711-234567",
      status: "ACTIVE",
      joined: "Jan 12, 2026",
    },
    {
      id: "usr-3",
      name: "Nusrat Jahan",
      email: "nusrat@resda.org",
      role: "INSTRUCTOR",
      batch: "UI/UX Design Track",
      phone: "+880 1722-345678",
      status: "ACTIVE",
      joined: "Mar 05, 2026",
    },
    {
      id: "usr-4",
      name: "Apex Global Retail",
      email: "sarah@apexglobal.com",
      role: "CLIENT",
      batch: "E-Commerce System Project",
      phone: "+880 1733-456789",
      status: "ACTIVE",
      joined: "Aug 19, 2026",
    },
    {
      id: "usr-5",
      name: "Mahmud Hasan",
      email: "mahmud@gmail.com",
      role: "STUDENT",
      batch: "NET-29 (Network Admin)",
      phone: "+880 1744-567890",
      status: "ACTIVE",
      joined: "Sep 25, 2026",
    },
    {
      id: "usr-6",
      name: "System Admin",
      email: "admin@resda.org",
      role: "ADMIN",
      batch: "All Access",
      phone: "+880 1700-000000",
      status: "ACTIVE",
      joined: "Jan 01, 2026",
    },
  ];

  const filteredUsers = usersList.filter((u) => {
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.batch.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-accent" /> User & Role Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage authenticated students, certified instructors, commercial clients, and admin access rights.
          </p>
        </div>

        <button className="px-4 py-2 bg-accent hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-lg shadow-accent/20">
          <UserPlus className="w-4 h-4" /> Add User Manually
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
            placeholder="Search by student name, email, or batch..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:block" />
          {(["ALL", "STUDENT", "INSTRUCTOR", "CLIENT", "ADMIN"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                roleFilter === r
                  ? "bg-accent text-slate-950 shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {r === "ALL" ? "All Users" : r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Batch / Project Track</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{u.name}</p>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        u.role === "ADMIN"
                          ? "bg-purple-950 text-purple-400 border border-purple-800"
                          : u.role === "INSTRUCTOR"
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : u.role === "CLIENT"
                          ? "bg-sky-950 text-sky-400 border border-sky-800"
                          : "bg-blue-950 text-blue-400 border border-blue-800"
                      }`}
                    >
                      {u.role === "ADMIN" ? (
                        <ShieldCheck className="w-3 h-3" />
                      ) : u.role === "INSTRUCTOR" ? (
                        <UserCheck className="w-3 h-3" />
                      ) : u.role === "CLIENT" ? (
                        <Briefcase className="w-3 h-3" />
                      ) : (
                        <GraduationCap className="w-3 h-3" />
                      )}
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">{u.batch}</td>
                  <td className="py-3.5 px-4 text-slate-400">{u.phone}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{u.joined}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
