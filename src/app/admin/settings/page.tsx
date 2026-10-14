"use client";

import { useState } from "react";
import { Settings, Shield, Bell, Database, Mail, Globe, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState("RESDA - Skill Empowerment for the Nation's");
  const [supportEmail, setSupportEmail] = useState("info@resda.org");
  const [campusAddress, setCampusAddress] = useState(
    "19th Floor, Nafi Tower, 53 Gulshan Avenue, Gulshan-1, Dhaka 1212, Bangladesh"
  );
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoApproveEnrollments, setAutoApproveEnrollments] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-accent" /> Platform Settings & Governance
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Global application configurations, campus operating details, notification gateways, and security policies.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Platform configuration changes successfully saved and deployed.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="w-4 h-4 text-accent" /> General Identity & Campus Headquarters
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Platform Title & Branding Tagline
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Central Support Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Primary Campus Hotline
                </label>
                <input
                  type="text"
                  defaultValue="+880 1700-000000"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Official Head Office Address (Nafi Tower)
              </label>
              <textarea
                rows={2}
                value={campusAddress}
                onChange={(e) => setCampusAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent resize-none"
              />
            </div>
          </div>
        </div>

        {/* System & Enrollment Policies */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Shield className="w-4 h-4 text-accent" /> Security, Admission & Maintenance Controls
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80">
              <div>
                <p className="text-xs font-bold text-white">Auto-approve Online Course Registrations</p>
                <p className="text-[11px] text-slate-400">
                  Instantly activate student accounts upon submitting registration
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoApproveEnrollments}
                onChange={(e) => setAutoApproveEnrollments(e.target.checked)}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80">
              <div>
                <p className="text-xs font-bold text-white">System Maintenance Mode</p>
                <p className="text-[11px] text-slate-400">
                  Temporarily disable student classroom portal for database migrations
                </p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-accent hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-accent/20"
            >
              <Save className="w-4 h-4" /> Save Configurations
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
