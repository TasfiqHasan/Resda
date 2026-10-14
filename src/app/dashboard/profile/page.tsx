"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Lock, CheckCircle2 } from "lucide-react";

export default function StudentProfilePage() {
  const [name, setName] = useState("Tanvir Ahmed");
  const [email] = useState("tanvir@resda.org");
  const [phone, setPhone] = useState("+880 1700-123456");
  const [location, setLocation] = useState("Dhaka, Bangladesh");
  const [bio, setBio] = useState("Full-Stack Web Development student at RESDA, focusing on Next.js, Node.js, and cloud deployments.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-heading">Student Profile & Settings</h1>
        <p className="text-sm text-body mt-0.5">
          Manage your personal details, verified contact channels, and account security.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes have been successfully updated.</span>
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-sm space-y-6">
        {/* Avatar header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-primary text-white font-black text-xl flex items-center justify-center shadow-lg shadow-primary/20">
            TA
          </div>
          <div>
            <h3 className="text-lg font-bold text-heading">{name}</h3>
            <p className="text-xs text-body">Student ID: RESDA-2026-ST-4890</p>
            <span className="inline-block mt-1 text-[10px] font-bold bg-primary-50 text-primary px-2.5 py-0.5 rounded-full">
              Full-Stack MERN Track
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-heading mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-heading mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-xs bg-slate-50 text-body cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-heading mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-heading mb-1.5">Location / City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-heading mb-1.5">Bio & Goals</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-xl border border-border text-xs focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-md shadow-primary/20"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>

        {/* Password Security Box */}
        <div className="pt-6 border-t border-slate-100">
          <h4 className="text-sm font-bold text-heading flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-primary" /> Security & Password
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
            <input
              type="password"
              placeholder="Current password"
              className="p-2.5 rounded-xl border border-border text-xs focus:outline-none focus:border-primary"
            />
            <input
              type="password"
              placeholder="New password"
              className="p-2.5 rounded-xl border border-border text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
