"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, GraduationCap, Briefcase } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "CLIENT">("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-28 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-symbol.png"
                alt="RESDA Emblem"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-3xl font-black tracking-tight text-primary">RESDA</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-heading">Create an account</h2>
          <p className="mt-2 text-sm text-body">
            Join RESDA to enroll in courses or manage commercial IT projects
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-border">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800 text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <p className="font-semibold">Account created successfully!</p>
                <p className="text-xs text-emerald-700 mt-0.5">Redirecting you to login...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-heading mb-2">I want to join as</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("STUDENT")}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    role === "STUDENT"
                      ? "border-primary bg-primary-50/50 text-primary ring-2 ring-primary/20"
                      : "border-border hover:border-slate-300 text-heading"
                  }`}
                >
                  <GraduationCap className={`w-5 h-5 ${role === "STUDENT" ? "text-primary" : "text-body"}`} />
                  <div>
                    <p className="text-xs font-bold leading-tight">Student</p>
                    <p className="text-[10px] text-body">Learn IT skills</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("CLIENT")}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    role === "CLIENT"
                      ? "border-primary bg-primary-50/50 text-primary ring-2 ring-primary/20"
                      : "border-border hover:border-slate-300 text-heading"
                  }`}
                >
                  <Briefcase className={`w-5 h-5 ${role === "CLIENT" ? "text-primary" : "text-body"}`} />
                  <div>
                    <p className="text-xs font-bold leading-tight">Client</p>
                    <p className="text-[10px] text-body">Order IT services</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-heading mb-1">Full Name</label>
              <div className="relative">
                <User className="w-5 h-5 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-heading mb-1">Email address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-heading mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="w-5 h-5 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1700-000000"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-heading mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-body hover:text-heading"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-body">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:text-primary-dark hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
