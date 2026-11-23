"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, RotateCcw, ArrowLeft, MessageSquare, ShieldAlert } from "lucide-react";

function FailContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");
  const reason = searchParams.get("reason") || "Your payment could not be processed by your bank or provider.";

  return (
    <div className="min-h-screen bg-background py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-border shadow-xl shadow-primary/5">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full">
            Payment Unsuccessful
          </span>
          <h1 className="text-2xl font-black text-heading mt-2">Transaction Declined</h1>
          <p className="text-xs text-body mt-2 leading-relaxed">{reason}</p>
        </div>

        {tranId && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="text-body">Transaction Ref: </span>
            <span className="font-mono font-semibold text-heading">{tranId}</span>
          </div>
        )}

        <div className="space-y-2.5 pt-2">
          <Link
            href="/courses"
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Payment Again</span>
          </Link>

          <a
            href="https://wa.me/8801700000000?text=Hello%20RESDA,%20I%20encountered%20an%20issue%20with%20my%20course%20payment."
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Contact Admissions Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <FailContent />
    </Suspense>
  );
}
