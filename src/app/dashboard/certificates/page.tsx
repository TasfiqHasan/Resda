"use client";

import { Award, Download, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CertificatesPage() {
  const certificates = [
    {
      id: "RESDA-CERT-2026-9041",
      title: "UI/UX Design Masterclass with Figma",
      issueDate: "September 15, 2026",
      grade: "Distinction (94%)",
      instructor: "Nusrat Jahan",
      skills: ["Figma Design Systems", "Prototyping", "User Research", "WCAG 2.1 AAA Accessibility"],
      verificationUrl: "/verify/RESDA-CERT-2026-9041",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-heading">Verified Certificates & Credentials</h1>
        <p className="text-sm text-body mt-0.5">
          All certificates issued by RESDA contain cryptographic tamper-proof validation IDs suitable for LinkedIn & employer verifications.
        </p>
      </div>

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
            <div>
              <p className="text-xs font-semibold text-heading mb-2">Accredited Skills & Competencies</p>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-medium bg-primary-50 text-primary px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <button className="flex-1 py-2.5 px-3 bg-primary hover:bg-primary-dark text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Download className="w-4 h-4" /> Download PDF Certificate
              </button>
              <a
                href={cert.verificationUrl}
                className="py-2.5 px-4 bg-white hover:bg-slate-50 border border-border text-heading text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Verify</span>
                <ExternalLink className="w-3.5 h-3.5 text-body" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
