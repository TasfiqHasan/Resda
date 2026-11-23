"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Download, ExternalLink, ShieldCheck, CheckCircle2, BookOpen, RefreshCw } from "lucide-react";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enrollments?certificates=true");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCertificates(data);
        }
      }
    } catch (err) {
      console.warn("Failed to load certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleDownloadPdf = (cert: any) => {
    window.open(cert.verificationUrl, "_blank");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-heading">Verified Certificates & Credentials</h1>
          <p className="text-sm text-body mt-0.5">
            All certificates issued by RESDA contain cryptographic tamper-proof validation IDs suitable for LinkedIn & employer verifications.
          </p>
        </div>
        <button
          onClick={loadCertificates}
          className="p-2.5 rounded-xl border border-border bg-white text-body hover:text-heading transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {certificates.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-border text-body max-w-2xl mx-auto space-y-3">
          <Award className="w-12 h-12 text-primary/40 mx-auto" />
          <h3 className="text-base font-bold text-heading">No Certificates Issued Yet</h3>
          <p className="text-xs text-body leading-relaxed">
            Certificates are automatically awarded with unique verification codes when you complete 100% of the lessons in an enrolled course track.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/courses"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Go to My Enrolled Courses
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-md transition-all space-y-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Digitally Verified
                    </span>
                    <h3 className="text-base font-bold text-heading mt-1">{cert.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-body">Certificate ID:</span>
                  <span className="font-mono font-bold text-heading">{cert.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Recipient:</span>
                  <span className="font-medium text-heading">{cert.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Issued On:</span>
                  <span className="font-medium text-heading">{cert.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Evaluated Score:</span>
                  <span className="font-bold text-primary">{cert.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Authorized Lead:</span>
                  <span className="font-medium text-heading">{cert.instructor}</span>
                </div>
              </div>

              {/* Skills */}
              {cert.skills && cert.skills.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-heading mb-2">Accredited Skills & Competencies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium bg-primary-50 text-primary px-2.5 py-1 rounded-lg flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-primary" /> {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => handleDownloadPdf(cert)}
                  className="flex-1 py-2.5 px-3 bg-primary hover:bg-primary-dark text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" /> Download Certificate
                </button>
                <Link
                  href={cert.verificationUrl}
                  className="py-2.5 px-4 bg-white hover:bg-slate-50 border border-border text-heading text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3.5 h-3.5 text-body" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
