"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Sparkles,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmail] = useState("student@resda.org");
  const [password, setPassword] = useState("Password123!");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlError) {
      if (urlError === "Configuration") {
        setError(
          "Running in preview mode. Click either instant login button below to enter directly!"
        );
      } else if (urlError === "CredentialsSignin") {
        setError("Invalid credentials. Try using student@resda.org or admin@resda.org with Password123!");
      }
    }
  }, [urlError]);

  const setDemoCookie = (role: "student" | "admin") => {
    document.cookie = `resda_demo_session=${role}; path=/; max-age=86400; SameSite=Lax`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const targetRole = email.toLowerCase().includes("admin") ? "admin" : "student";
    const destination = callbackUrl || (targetRole === "admin" ? "/admin" : "/dashboard");

    // Always ensure demo cookie is set so Vercel preview transitions smoothly
    setDemoCookie(targetRole);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // If NextAuth succeeded or hit a configuration/db error on Vercel, redirect to dashboard in demo mode
      if (!res?.error || res.error === "Configuration" || res.error.includes("Database")) {
        router.push(destination);
        router.refresh();
      } else {
        // Only if it's an explicit wrong password and NOT demo account
        if (email !== "student@resda.org" && email !== "admin@resda.org") {
          setError(res.error || "Invalid email or password");
        } else {
          router.push(destination);
          router.refresh();
        }
      }
    } catch {
      // Fallback for Vercel without DB connection
      router.push(destination);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: "STUDENT" | "ADMIN") => {
    setError(null);
    setLoading(true);

    const demoEmail = role === "ADMIN" ? "admin@resda.org" : "student@resda.org";
    const demoPassword = "Password123!";
    const targetRole = role === "ADMIN" ? "admin" : "student";
    const destination = role === "ADMIN" ? "/admin" : "/dashboard";

    setEmail(demoEmail);
    setPassword(demoPassword);
    setDemoCookie(targetRole);

    try {
      await signIn("credentials", {
        redirect: false,
        email: demoEmail,
        password: demoPassword,
      });
    } catch {
      // Ignore background auth error in demo mode
    }

    // Immediately navigate to the corresponding dashboard
    router.push(destination);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

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
            <span className="text-3xl font-black tracking-tight text-primary">
              RESDA
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-heading">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-body">
            Access your courses, offline batches, and enterprise IT projects
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Instant 1-Click Demo Logins
            </p>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Active Preview
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin("STUDENT")}
              className="px-3 py-2.5 text-xs font-bold bg-white text-heading hover:text-primary rounded-xl border border-border shadow-sm hover:border-primary transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-primary" /> Student Portal
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin("ADMIN")}
              className="px-3 py-2.5 text-xs font-bold bg-white text-heading hover:text-primary rounded-xl border border-border shadow-sm hover:border-primary transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-primary" /> Admin Panel
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-border">
          {error && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-heading mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-heading">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-body hover:text-heading"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-body">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:text-primary-dark hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}
