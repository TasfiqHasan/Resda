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
  KeyRound,
  RotateCcw,
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

  // Interactive Payment Steps
  // 1 = Enter Account / Card, 2 = OTP Verification, 3 = PIN Entry
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [mfsNumber, setMfsNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");

  // Card Fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Errors
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`/api/payment/status?tran_id=${encodeURIComponent(tranId)}`);
        if (res.ok) {
          const data = await res.json();
          setPayment(data);
          if (data.customerPhone) {
            setMfsNumber(data.customerPhone.replace(/[^0-9]/g, ""));
          }
        } else {
          setPayment({
            tranId,
            amount: 25000,
            currency: "BDT",
            paymentPlan: "FULL",
            status: "PENDING",
            customerName: "Student",
            customerEmail: "student@resda.org",
            customerPhone: "01700000000",
            courseSlug: "full-stack-web-dev",
            courseTitle: "Full-Stack Web Development Track",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } catch {
        // Mock fallback
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [tranId]);

  // Bangladesh Mobile Number Validator: Must be 11 digits, starts with 013, 014, 015, 016, 017, 018, 019
  const isValidBdPhone = (phone: string) => {
    const clean = phone.replace(/[^0-9]/g, "");
    return /^01[3-9]\d{8}$/.test(clean);
  };

  // Basic Luhn or 16-digit card validator
  const isValidCard = (card: string) => {
    const clean = card.replace(/[^0-9]/g, "");
    return clean.length >= 15 && clean.length <= 16;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (activeTab === "mfs") {
      if (step === 1) {
        if (!isValidBdPhone(mfsNumber)) {
          setErrorMessage(
            `Invalid ${selectedMethod} Account Number! Bangladeshi mobile accounts must be 11 digits starting with 013-019 (e.g. 01712345678).`
          );
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (otp.trim().length !== 6) {
          setErrorMessage("Invalid OTP. Please enter the 6-digit verification code (e.g. 123456).");
          return;
        }
        setStep(3);
      } else if (step === 3) {
        if (pin.trim().length !== 5) {
          setErrorMessage("Invalid PIN. Please enter your 5-digit account PIN (e.g. 12345).");
          return;
        }
        handlePaySuccess();
      }
    } else if (activeTab === "card") {
      if (!isValidCard(cardNumber)) {
        setErrorMessage("Invalid card number. Please enter a valid 16-digit Visa/Mastercard number.");
        return;
      }
      if (!cardExpiry || cardExpiry.length < 4) {
        setErrorMessage("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        setErrorMessage("Please enter a valid 3-digit CVV.");
        return;
      }
      handlePaySuccess();
    } else {
      handlePaySuccess();
    }
  };

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
      val_id: `VAL-${Date.now()}`,
      amount: String(payment?.amount || 25000),
      card_type: `${selectedMethod}-Account-${mfsNumber.slice(-4) || "1234"}`,
      bank_tran_id: `BANK-${Date.now()}`,
      card_issuer: "SSLCommerz Gateway",
      card_brand: selectedMethod,
      status: "VALID",
    });
  };

  const handlePayFail = () => {
    triggerPost("/api/payment/ssl/fail", {
      tran_id: tranId,
      error: "User cancelled or bank declined the transaction.",
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
          <p className="text-sm font-semibold text-slate-300">Loading Payment Gateway...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 py-10 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
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
              <p className="text-xs text-slate-400">SSLCommerz Multi-Gateway Portal</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Total Tuition</span>
            <span className="text-2xl font-black text-white tracking-tight">
              ৳{payment?.amount.toLocaleString()} <span className="text-xs text-slate-400 font-normal">BDT</span>
            </span>
          </div>
        </div>

        {/* Notice on Test Mode */}
        <div className="bg-amber-950/40 border-b border-amber-800/40 px-6 py-2.5 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>SSLCommerz Gateway Simulation</strong> • Strict Account Validation Active
            </span>
          </div>
          <span className="text-[10px] font-mono bg-amber-900/60 px-2 py-0.5 rounded text-amber-200">
            {tranId}
          </span>
        </div>

        {/* Main Body */}
        <div className="p-6 space-y-5">
          {/* Course Details */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <p className="text-slate-400">Enrolling Course:</p>
              <p className="font-bold text-white truncate max-w-xs">{payment?.courseTitle}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400">Student:</p>
              <p className="font-semibold text-slate-200">{payment?.customerName}</p>
            </div>
          </div>

          {/* Payment Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Payment Channel
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mfs");
                  setSelectedMethod("bKash");
                  setStep(1);
                  setErrorMessage(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                  setStep(1);
                  setErrorMessage(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                  setStep(1);
                  setErrorMessage(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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

          {/* Method Selector Pills */}
          {activeTab === "mfs" && (
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "bKash", name: "bKash", color: "bg-pink-600" },
                { id: "Nagad", name: "Nagad", color: "bg-orange-600" },
                { id: "Rocket", name: "Rocket", color: "bg-purple-700" },
                { id: "Upay", name: "Upay", color: "bg-amber-600" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(m.id);
                    setStep(1);
                    setErrorMessage(null);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedMethod === m.id
                      ? "border-amber-400 bg-amber-400/10 text-white font-bold"
                      : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${m.color} mx-auto mb-1`} />
                  <span className="text-xs">{m.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Validation Error Message Alert */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Dynamic Interactive Flow Form */}
          <form onSubmit={handleNextStep} className="space-y-4">
            {activeTab === "mfs" && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                {/* Step indicator */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        selectedMethod === "bKash" ? "bg-pink-600" : "bg-orange-600"
                      } text-white`}
                    >
                      {selectedMethod[0]}
                    </span>
                    {selectedMethod} Payment Checkout
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Step {step} of 3</span>
                </div>

                {/* Step 1: Account Number */}
                {step === 1 && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Your {selectedMethod} Account Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={mfsNumber}
                        onChange={(e) => {
                          setMfsNumber(e.target.value);
                          setErrorMessage(null);
                        }}
                        placeholder="e.g. 01712345678"
                        maxLength={11}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Must be a valid 11-digit Bangladeshi mobile wallet (013 - 019). Fake numbers will be rejected.
                    </p>
                  </div>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-300">
                        Enter {selectedMethod} Verification Code (OTP)
                      </label>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-[10px] text-amber-400 hover:underline"
                      >
                        Change Number ({mfsNumber})
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                          setErrorMessage(null);
                        }}
                        placeholder="Enter 6-digit OTP (e.g. 123456)"
                        maxLength={6}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white font-mono tracking-widest text-center focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Test Simulation OTP Code:</span>
                      <span className="font-mono font-bold text-amber-400">123456</span>
                    </div>
                  </div>
                )}

                {/* Step 3: PIN Entry */}
                {step === 3 && (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-300">
                        Enter Your {selectedMethod} 5-Digit PIN
                      </label>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" /> 256-bit Encrypted
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={pin}
                        onChange={(e) => {
                          setPin(e.target.value);
                          setErrorMessage(null);
                        }}
                        placeholder="•••••"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white font-mono tracking-widest text-center focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Test Simulation PIN:</span>
                      <span className="font-mono font-bold text-amber-400">12345</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Card Inputs */}
            {activeTab === "card" && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Card Number (16-Digit)
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(e.target.value);
                      setErrorMessage(null);
                    }}
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY (e.g. 12/28)"
                      maxLength={5}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono text-center focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking */}
            {activeTab === "net" && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p>
                  You will be redirected to the secure internet banking portal of <strong>{selectedMethod}</strong>.
                </p>
                <p className="text-slate-400">Click below to proceed to authorization.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {activeTab === "mfs"
                        ? step === 1
                          ? `Verify ${selectedMethod} Account`
                          : step === 2
                          ? "Verify OTP"
                          : `Confirm & Pay ৳${payment?.amount.toLocaleString()}`
                        : `Pay ৳${payment?.amount.toLocaleString()}`}
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
                  <span>Simulate Bank Decline</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePayCancel}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>Cancel Transaction</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
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
