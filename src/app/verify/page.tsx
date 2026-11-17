"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Search,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  GraduationCap,
  Download,
  Share2,
  ExternalLink,
  QrCode,
  FileCheck,
  Building,
  Check,
  Printer,
  Copy,
} from "lucide-react";
import { SAMPLE_CREDENTIALS, VerifiedCredential } from "@/lib/credentials-data";

export default function CertificateVerificationPage({
  initialId,
}: {
  initialId?: string;
}) {
  const [searchId, setSearchId] = useState(initialId || "RESDA-CERT-2026-9041");
  const [activeCredential, setActiveCredential] = useState<VerifiedCredential | null>(
    SAMPLE_CREDENTIALS[initialId || "RESDA-CERT-2026-9041"] || SAMPLE_CREDENTIALS["RESDA-CERT-2026-9041"]
  );
  const [copied, setCopied] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const trimmed = searchId.trim().toUpperCase();
    if (SAMPLE_CREDENTIALS[trimmed]) {
      setActiveCredential(SAMPLE_CREDENTIALS[trimmed]);
    } else {
      setActiveCredential(null);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary" /> Official Credential Registry
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-heading tracking-tight">
            RESDA Certificate Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-body max-w-xl mx-auto leading-relaxed">
            Verify academic transcripts and completion diplomas issued by the RESDA IT Training Center & Enterprise Solutions.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-border shadow-sm max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Certificate ID (e.g. RESDA-CERT-2026-9041)"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-primary text-heading"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify Credential</span>
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 flex-wrap text-[11px] text-body">
            <span>Try sample IDs:</span>
            {Object.keys(SAMPLE_CREDENTIALS).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSearchId(id);
                  setActiveCredential(SAMPLE_CREDENTIALS[id]);
                  setHasSearched(true);
                }}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary font-mono text-[10px] transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display Area */}
        {activeCredential ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            {/* Verification Status Badge Bar */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-800 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-sm block">Authentic & Verified Credential</span>
                  <span className="text-[11px] text-emerald-700">
                    This document matches official database records at RESDA Headquarters (Nafi Tower, Dhaka).
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-white text-emerald-800 rounded-lg border border-emerald-200 font-semibold text-[11px] hover:bg-emerald-100/50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Link Copied!" : "Copy Share Link"}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-semibold text-[11px] hover:bg-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Official Digital Certificate Canvas */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border-4 border-double border-primary/30 shadow-2xl relative overflow-hidden text-slate-900 print:border-none print:shadow-none">
              {/* Subtle Guilloché Watermark Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#5b2d8e_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-5 pointer-events-none" />
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 pointer-events-none" />

              <div className="relative z-10 space-y-8">
                {/* Certificate Header */}
                <div className="text-center space-y-2 border-b border-primary/20 pb-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src="/logo-symbol.png"
                        alt="RESDA Seal"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-primary tracking-tight">RESDA</h2>
                      <p className="text-[10px] text-body uppercase font-bold tracking-widest">
                        Skill Empowerment for the Nation&apos;s
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs uppercase tracking-[0.25em] font-serif text-slate-500 font-bold block">
                      Certificate of Academic Excellence
                    </span>
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="text-center space-y-4">
                  <p className="text-xs text-slate-500 font-serif italic">This is proudly conferred upon</p>
                  <h3 className="text-3xl sm:text-4xl font-serif font-black text-primary tracking-tight">
                    {activeCredential.recipientName}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                    for successfully demonstrating industry mastery, passing rigorous practical evaluations, and defending commercial capstone projects in
                  </p>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {activeCredential.courseTitle}
                  </h4>
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary font-bold text-xs rounded-full border border-primary-200">
                    {activeCredential.grade}
                  </span>
                </div>

                {/* Accredited Competencies */}
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
                    Verified Competencies & Applied Technologies
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {activeCredential.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-semibold bg-white text-slate-800 px-3 py-1 rounded-lg border border-slate-200 shadow-2xs"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signatures & Security Verification Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 items-end text-center sm:text-left">
                  {/* Lead Instructor */}
                  <div className="space-y-1">
                    <p className="font-serif italic text-base text-primary font-bold">
                      {activeCredential.instructorName}
                    </p>
                    <div className="h-0.5 w-32 bg-slate-300 mx-auto sm:mx-0" />
                    <p className="text-xs font-bold text-slate-800">{activeCredential.instructorName}</p>
                    <p className="text-[10px] text-slate-500">{activeCredential.instructorRole}</p>
                  </div>

                  {/* QR Verification Emblem */}
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="w-16 h-16 rounded-xl border-2 border-primary/30 p-1 flex items-center justify-center bg-white shadow-xs">
                      <QrCode className="w-12 h-12 text-primary" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">Scan to Verify</span>
                  </div>

                  {/* Academic Director */}
                  <div className="space-y-1 text-center sm:text-right">
                    <p className="font-serif italic text-base text-primary font-bold">
                      Tanvir Ahmed
                    </p>
                    <div className="h-0.5 w-32 bg-slate-300 mx-auto sm:ml-auto" />
                    <p className="text-xs font-bold text-slate-800">Tanvir Ahmed</p>
                    <p className="text-[10px] text-slate-500">Founder & Academic Director</p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
                  <span>Certificate ID: <strong className="font-mono text-slate-700">{activeCredential.id}</strong></span>
                  <span>Issued: {activeCredential.issueDate}</span>
                  <span>Campus: Nafi Tower, Gulshan-1, Dhaka</span>
                </div>
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="text-center py-16 bg-surface rounded-3xl border border-border p-8 space-y-3">
            <Award className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-heading">Certificate Not Found</h3>
            <p className="text-xs text-body max-w-sm mx-auto leading-relaxed">
              No matching credential found for ID <strong>&quot;{searchId}&quot;</strong>. Please check the spelling or contact RESDA academic support at{" "}
              <a href="mailto:info@resda.org" className="text-primary font-semibold hover:underline">
                info@resda.org
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
