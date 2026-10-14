"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { signOut } from "next-auth/react";

const adminNav = [
  { name: "Admin Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users & Students", href: "/admin/users", icon: Users },
  { name: "Course Management", href: "/admin/courses", icon: BookOpen },
  { name: "Inquiries & Leads (CRM)", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Platform Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-gold.png"
                  alt="RESDA Emblem"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">RESDA</span>
                <span className="block text-[10px] text-accent font-bold uppercase tracking-wider">
                  Admin Control
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {adminNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-accent" />}
                </Link>
              );
            })}
          </nav>

          {/* Admin user info & Logout */}
          <div className="p-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs border border-accent/30">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate flex items-center gap-1">
                  System Admin <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                </p>
                <p className="text-[10px] text-slate-400 truncate">admin@resda.org</p>
              </div>
            </div>

            <button
              onClick={() => {
                document.cookie = "resda_demo_session=; path=/; max-age=0";
                signOut({ callbackUrl: "/login" });
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 bg-slate-900">
        {/* Top Header */}
        <header className="h-20 bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users, courses, invoices..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button className="p-2 text-slate-400 hover:text-white relative rounded-xl hover:bg-slate-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-accent absolute top-2 right-2 ring-2 ring-slate-950" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
