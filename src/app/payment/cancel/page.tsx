"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, BookOpen } from "lucide-react";

function CancelContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="min-h-screen bg-background py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-border shadow-xl shadow-primary/5">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full">
            Payment Cancelled
          </span>
          <h1 className="text-2xl font-black text-heading mt-2">Checkout Cancelled</h1>
          <p className="text-xs text-body mt-2 leading-relaxed">
            You cancelled the payment process. No charges have been made to your bank account or mobile wallet.
          </p>
        </div>

        {tranId && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="text-body">Reference: </span>
            <span className="font-mono font-semibold text-heading">{tranId}</span>
          </div>
        )}

        <div className="space-y-2.5 pt-2">
          <Link
            href="/courses"
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Return to Course Catalog</span>
          </Link>

          <Link
            href="/"
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors block text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CancelContent />
    </Suspense>
  );
}
