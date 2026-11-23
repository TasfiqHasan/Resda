"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Lock,
  RefreshCw,
  Info,
} from "lucide-react";
import { PaymentRecord } from "@/lib/payments-store";

function SimulatorContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id") || "RESDA_TXN_DEMO";

  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"mfs" | "card" | "net">("mfs");
  const [selectedMethod, setSelectedMethod] = useState<string>("bKash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`/api/payment/status?tran_id=${encodeURIComponent(tranId)}`);
        if (res.ok) {
          const data = await res.json();
          setPayment(data);
        } else {
          // Fallback mock payment for preview
          setPayment({
            tranId,
            amount: 25000,
            currency: "BDT",
            paymentPlan: "FULL",
            status: "PENDING",
            customerName: "Tanvir Ahmed",
            customerEmail: "student@resda.org",
            customerPhone: "+880 1700-000000",
            courseSlug: "full-stack-web-dev",
            courseTitle: "Full-Stack Web Development Track (Next.js 15 & Node.js)",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } catch {
        setPayment({
          tranId,
          amount: 25000,
          currency: "BDT",
          paymentPlan: "FULL",
          status: "PENDING",
          customerName: "Tanvir Ahmed",
          customerEmail: "student@resda.org",
          customerPhone: "+880 1700-000000",
          courseSlug: "full-stack-web-dev",
          courseTitle: "Full-Stack Web Development Track (Next.js 15 & Node.js)",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [tranId]);

  const mfsProviders = [
    { id: "bKash", name: "bKash Online", color: "bg-pink-600", desc: "Instant Mobile Wallet" },
    { id: "Nagad", name: "Nagad Wallet", color: "bg-orange-600", desc: "Instant Digital Post" },
    { id: "Rocket", name: "DBBL Rocket", color: "bg-purple-700", desc: "Dutch-Bangla Bank" },
    { id: "Upay", name: "Upay Payment", color: "bg-amber-600", desc: "UCB FinTech" },
  ];

  const cardProviders = [
    { id: "Visa", name: "Visa Card", color: "bg-blue-700", desc: "Debit / Credit / Prepaid" },
    { id: "MasterCard", name: "Mastercard", color: "bg-red-600", desc: "Global Mastercard" },
    { id: "Amex", name: "American Express", color: "bg-sky-600", desc: "City Bank AMEX" },
    { id: "UnionPay", name: "UnionPay Card", color: "bg-emerald-700", desc: "Dual Currency" },
  ];

  const netProviders = [
    { id: "DBBL-Nexus", name: "DBBL NexusPay", color: "bg-blue-900", desc: "Nexus Debit Card" },
    { id: "CityTouch", name: "City Touch", color: "bg-red-800", desc: "City Bank Internet Banking" },
    { id: "IBBL", name: "iBanking (IBBL)", color: "bg-green-700", desc: "Islami Bank Bangladesh" },
    { id: "EBL-Skybanking", name: "EBL Skybanking", color: "bg-blue-600", desc: "Eastern Bank PLC" },
  ];

  const triggerPost = (actionUrl: string, fields: Record<string, string>) => {
    setIsSubmitting(true);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = actionUrl;

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handlePaySuccess = () => {
    triggerPost("/api/payment/ssl/success", {
      tran_id: tranId,
      val_id: `SIM-VAL-${Date.now()}`,
      amount: String(payment?.amount || 25000),
      card_type: `${selectedMethod}-SecurePay`,
      bank_tran_id: `BANK-TXN-${Date.now()}`,
      card_issuer: "SSLCommerz Sandbox",
      card_brand: selectedMethod,
      status: "VALID",
    });
  };

  const handlePayFail = () => {
    triggerPost("/api/payment/ssl/fail", {
      tran_id: tranId,
      error: "User transaction cancelled or declined at merchant gateway simulation.",
    });
  };

  const handlePayCancel = () => {
    triggerPost("/api/payment/ssl/cancel", {
      tran_id: tranId,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-400" />
          <p className="text-sm font-semibold text-slate-300">Connecting to SSLCommerz Gateway...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 py-10 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* SSLCommerz Branded Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/logo-symbol.png" alt="RESDA Logo" fill className="object-contain" priority />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-wider">RESDA</span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Merchant ID: RESDA-BD
                </span>
              </div>
              <p className="text-xs text-slate-400">SSLCommerz EasyCheckout Gateway</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Total Payable</span>
            <span className="text-2xl font-black text-white tracking-tight">
              ৳{payment?.amount.toLocaleString()} <span className="text-xs text-slate-400 font-normal">BDT</span>
            </span>
          </div>
        </div>

        {/* Sandbox Simulation Notice Banner */}
        <div className="bg-amber-950/40 border-b border-amber-800/40 px-6 py-2.5 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>SSLCommerz Multi-Gateway Mode</strong> • Test environment ready
            </span>
          </div>
          <span className="text-[10px] font-mono bg-amber-900/60 px-2 py-0.5 rounded text-amber-200">
            {tranId}
          </span>
        </div>

        {/* Main Gateway Body */}
        <div className="p-6 space-y-6">
          {/* Order Summary Summary Bar */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <p className="text-slate-400">Course Admission:</p>
              <p className="font-bold text-white text-sm">{payment?.courseTitle}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-slate-400">Student Name:</p>
              <p className="font-semibold text-slate-200">{payment?.customerName}</p>
            </div>
          </div>

          {/* Payment Method Category Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mfs");
                  setSelectedMethod("bKash");
                }}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "mfs"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile Banking</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("card");
                  setSelectedMethod("Visa");
                }}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "card"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cards / Debit</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("net");
                  setSelectedMethod("DBBL-Nexus");
                }}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "net"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Net Banking</span>
              </button>
            </div>
          </div>

          {/* Providers Grid */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(activeTab === "mfs"
                ? mfsProviders
                : activeTab === "card"
                ? cardProviders
                : netProviders
              ).map((provider) => {
                const isSelected = selectedMethod === provider.id;
                return (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => setSelectedMethod(provider.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? "border-amber-400 bg-amber-400/10 ring-2 ring-amber-400/30"
                        : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-3 h-3 rounded-full ${provider.color}`} />
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-xs font-bold text-white">{provider.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{provider.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulated Input Fields */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                {activeTab === "mfs"
                  ? `${selectedMethod} Account Number`
                  : activeTab === "card"
                  ? "Card Number (16-digit)"
                  : "Account ID / Login"}
              </span>
              <span className="text-[10px] text-slate-500">256-bit TLS Encrypted</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                readOnly
                value={
                  activeTab === "mfs"
                    ? payment?.customerPhone || "01700-000000"
                    : activeTab === "card"
                    ? "4111 •••• •••• 1111"
                    : "ACC-9041289"
                }
                className="col-span-2 px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
              />
              <input
                type="password"
                readOnly
                value="••••"
                className="px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono text-center"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Payment will be authorized under RESDA merchant account via SSLCommerz payment gateway.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handlePaySuccess}
              className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    Complete Payment of ৳{payment?.amount.toLocaleString()} ({selectedMethod})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePayFail}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Simulate Decline</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePayCancel}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>Cancel & Return</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Secured by SSLCommerz Bangladesh • PCI-DSS Certified Level 1 Gateway
        </div>
      </div>
    </div>
  );
}

export default function SSLGatewaySimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SimulatorContent />
    </Suspense>
  );
}
