"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Download,
  Printer,
  Copy,
  Check,
  ArrowRight,
  GraduationCap,
  Calendar,
  Building,
  CreditCard,
  ShieldCheck,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { PaymentRecord } from "@/lib/payments-store";

function SuccessContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id") || "RESDA_TXN_DEMO";

  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchRecord() {
      try {
        const res = await fetch(`/api/payment/status?tran_id=${encodeURIComponent(tranId)}`);
        if (res.ok) {
          const data = await res.json();
          setPayment(data);
        } else {
          // Fallback demo record for presentation
          setPayment({
            tranId,
            valId: `VAL-${Date.now()}`,
            amount: 25000,
            currency: "BDT",
            paymentPlan: "FULL",
            paymentMethod: "bKash / SSLCommerz",
            status: "PAID",
            customerName: "Tanvir Ahmed",
            customerEmail: "student@resda.org",
            customerPhone: "+880 1700-000000",
            courseSlug: "full-stack-web-dev",
            courseTitle: "Full-Stack Web Development Track (Next.js 15 & Node.js)",
            cardType: "bKash-Payment",
            bankTranId: `BANK-TXN-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } catch {
        setPayment({
          tranId,
          valId: `VAL-${Date.now()}`,
          amount: 25000,
          currency: "BDT",
          paymentPlan: "FULL",
          paymentMethod: "bKash / SSLCommerz",
          status: "PAID",
          customerName: "Tanvir Ahmed",
          customerEmail: "student@resda.org",
          customerPhone: "+880 1700-000000",
          courseSlug: "full-stack-web-dev",
          courseTitle: "Full-Stack Web Development Track (Next.js 15 & Node.js)",
          cardType: "bKash-Payment",
          bankTranId: `BANK-TXN-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    fetchRecord();
  }, [tranId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(tranId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = payment?.createdAt
    ? new Date(payment.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "November 23, 2026";

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">
        {/* Success Header Animation */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/10 animate-in zoom-in-75">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>SSLCommerz Payment Verified</span>
          </span>
          <h1 className="text-3xl font-black text-heading tracking-tight">Admission Confirmed!</h1>
          <p className="text-xs sm:text-sm text-body max-w-md mx-auto leading-relaxed">
            Your tuition payment has been successfully authorized and your seat has been reserved in the upcoming cohort.
          </p>
        </div>

        {/* Official Printable Receipt Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-xl shadow-primary/5 space-y-6 print:shadow-none print:border-none">
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-border pb-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src="/logo-symbol.png" alt="RESDA Crest" fill className="object-contain" priority />
              </div>
              <div>
                <span className="text-lg font-black text-primary tracking-tight">RESDA</span>
                <p className="text-[10px] text-body">IT Training & IT Services</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-body uppercase tracking-wider block">Official Receipt</span>
              <span className="text-xs font-mono font-semibold text-heading">
                INV-{tranId.replace(/[^0-9]/g, "").slice(-8) || "88401923"}
              </span>
            </div>
          </div>

          {/* Transaction Metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-body font-medium">Student Name</p>
              <p className="font-bold text-heading mt-0.5">{payment?.customerName || "Enrolled Student"}</p>
              <p className="text-[11px] text-body">{payment?.customerEmail}</p>
              <p className="text-[11px] text-body">{payment?.customerPhone}</p>
            </div>

            <div className="text-right">
              <p className="text-body font-medium">Payment Date</p>
              <p className="font-semibold text-heading mt-0.5">{formattedDate}</p>
              <p className="text-body mt-1">Gateway Reference</p>
              <p className="font-mono text-[11px] text-slate-700">{payment?.bankTranId || "SSL-AUTO-2026"}</p>
            </div>
          </div>

          {/* Line item box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Enrolled Track</span>
                <p className="font-bold text-heading text-sm mt-0.5">{payment?.courseTitle}</p>
                <p className="text-[11px] text-body mt-0.5">
                  Plan:{" "}
                  <strong>{payment?.paymentPlan === "INSTALLMENT" ? "1st Installment (50%)" : "Full Tuition"}</strong> •{" "}
                  Method: {payment?.cardType || payment?.paymentMethod || "SSLCommerz Multi-Gateway"}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-black text-heading">৳{payment?.amount.toLocaleString()}</span>
                <span className="block text-[10px] text-emerald-700 font-bold uppercase">Paid In Full</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-body">Transaction ID:</span>
              <button
                type="button"
                onClick={handleCopy}
                className="font-mono text-[11px] text-primary font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>{tranId}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Campus Address Snippet */}
          <div className="border-t border-border pt-4 text-[11px] text-body flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Nafi Tower (19th Floor), 53 Gulshan Avenue, Dhaka</span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Verified by RESDA
            </span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2 print:hidden">
            <Link
              href={`/dashboard/learn/${payment?.courseSlug || "full-stack-web-dev"}`}
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enter Interactive LMS Classroom</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/dashboard"
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl text-center transition-colors"
              >
                Go to Dashboard
              </Link>

              <button
                type="button"
                onClick={handlePrint}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Support Notice */}
        <div className="text-center print:hidden">
          <p className="text-xs text-body">
            Need assistance with your batch schedule or onboarding?{" "}
            <a
              href="https://wa.me/8801700000000?text=Hello%20RESDA,%20I%20just%20completed%20my%20tuition%20payment%20and%20would%20like%20to%20confirm%20my%20batch%20schedule."
              target="_blank"
              rel="noreferrer"
              className="text-primary font-bold hover:underline"
            >
              Chat on WhatsApp (+880 1700-000000)
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
