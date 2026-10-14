"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Calendar,
  Sparkles,
  User,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Headphones,
  Check,
  Copy,
  Building2,
  GraduationCap,
  Briefcase,
  ShieldAlert,
} from "lucide-react";

// --- Social Icons (Clean inline SVGs for brand fidelity) ---
function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function TwitterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.677.15-.2.302-.777.98-.953 1.181-.176.201-.351.226-.652.075-.302-.15-1.273-.469-2.427-1.498-.897-.801-1.503-1.791-1.68-2.092-.176-.302-.019-.465.132-.615.136-.135.302-.351.452-.527.151-.176.201-.301.302-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.235-.245-.588-.493-.509-.678-.518-.175-.009-.376-.011-.577-.011s-.527.075-.802.376c-.276.302-1.054 1.03-1.054 2.511s1.079 2.911 1.229 3.112c.151.201 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.58-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.352zm-5.467 7.426h-.005a10.02 10.02 0 0 1-5.112-1.396l-.367-.218-3.799.996 1.014-3.702-.239-.38a10.01 10.01 0 0 1-1.536-5.304c0-5.529 4.498-10.027 10.035-10.027 2.68 0 5.199 1.044 7.094 2.94 1.895 1.897 2.938 4.417 2.937 7.098 0 5.531-4.499 10.031-10.027 10.031zm8.508-18.535A11.94 11.94 0 0 0 12.005 0C5.385 0 .007 5.378.007 12a11.96 11.96 0 0 0 1.624 6.012L0 24l6.166-1.617A11.96 11.96 0 0 0 12.005 24c6.619 0 11.999-5.379 11.999-12 0-3.206-1.249-6.22-3.518-8.489z" />
    </svg>
  );
}

// --- Data Types ---
interface FormDataState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: "Enrollment" | "Payment" | "Certificates" | "Services" | "Placement";
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: "Enrollment",
    question: "How do I enroll in an IT training course?",
    answer:
      "You can enroll online through our course catalog by selecting your desired program and clicking 'Enroll Now'. Alternatively, you can visit our Gulshan-1, Dhaka office in person or submit this contact form. Our admissions counselor will contact you within 24 hours to guide you through batch schedules, prerequisite assessments, and seat confirmation.",
  },
  {
    category: "Payment",
    question: "What payment methods and installment options do you accept?",
    answer:
      "We accept all major payment channels including bKash, Nagad, Rocket, Direct Bank Deposit (EFT/NPSB), and credit/debit cards (Visa, Mastercard, Amex). For long-term bootcamps, we provide 0% interest EMI up to 12 months with 18+ partner banks, as well as customized two-installment semester plans.",
  },
  {
    category: "Certificates",
    question: "Will I receive an industry-recognized certificate upon completion?",
    answer:
      "Yes. Every student who completes course projects, attendance criteria (min. 80%), and passes the final capstone assessment receives an accredited, digitally verifiable RESDA Certificate. Our curriculum is also benchmarked against international standards (AWS, Oracle, Microsoft, and Cisco certification syllabi).",
  },
  {
    category: "Services",
    question: "What custom IT services do you provide for businesses and startups?",
    answer:
      "RESDA delivers full-cycle enterprise IT solutions including Full-Stack Web Development, Custom SaaS Architectures, Native & Cross-Platform Mobile Apps (Flutter/React Native), UI/UX Product Design, Cloud Infrastructure Setup (AWS/GCP), and Data Analytics. We sign NDAs and provide dedicated sprint teams.",
  },
  {
    category: "Enrollment",
    question: "Can I attend training classes online if I cannot travel to Dhaka?",
    answer:
      "Yes! We offer live interactive online batches alongside physical classroom sessions. Online students join real-time Zoom sessions with live coding, Q&A with instructors, dedicated Discord community access, and recorded 1080p class archives available 24/7 on our student portal.",
  },
  {
    category: "Placement",
    question: "Do you offer job placement or internship support for graduates?",
    answer:
      "Absolutely. Our dedicated Career Placement Cell (CPC) works actively with over 50+ hiring partner software companies and tech startups across South Asia and abroad. Top performers receive guaranteed interview opportunities, portfolio reviews, mock technical interview drill sessions, and resume-polishing workshops.",
  },
];

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // FAQ Accordion State (stores active index or null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Live Chat Trigger Simulation
  const [liveChatActive, setLiveChatActive] = useState(false);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Form Validation
  const validateField = (field: keyof FormDataState, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address (e.g., name@example.com)";
        }
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^[0-9+()\- ]{7,20}$/.test(value.trim())) {
          return "Please enter a valid phone number (at least 7 digits)";
        }
        return "";
      case "subject":
        if (!value) return "Please select an inquiry subject";
        return "";
      case "message":
        if (!value.trim()) return "Message cannot be empty";
        if (value.trim().length < 10) {
          return "Please provide at least 10 characters describing your inquiry";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    field: keyof FormDataState,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change if already touched
    if (errors[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg || undefined }));
    }
  };

  const handleInputBlur = (field: keyof FormDataState) => {
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg || undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof FormDataState)[]).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll smoothly to form
      const formElement = document.getElementById("contact-form-card");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Process client-side simulation
    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* =========================================================================
          1. PAGE HEADER - Purple Gradient Banner with Breadcrumb & Heading
      ========================================================================= */}
      <section className="relative bg-hero-gradient text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(123,79,174,0.35),transparent_55%)]" />
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-light/25 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-primary-200 mb-6"
          >
            <Link
              href="/"
              className="hover:text-accent transition-colors flex items-center gap-1 font-medium"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-primary-300 shrink-0" />
            <span className="text-white font-semibold">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-medium text-xs sm:text-sm mb-4 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>We&apos;re Here To Assist • Skill Empowerment For The Nation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Contact <span className="text-accent">Us</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-primary-100 leading-relaxed max-w-2xl font-normal">
              Have questions about our professional IT courses, corporate training,
              or digital software services? Reach out to our dedicated counseling
              and development teams today.
            </p>

            {/* Quick Status Pill */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-primary-200">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                <span>Admissions Desk: Open Sunday – Thursday</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Average Response: Under 2 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CONTACT INFO CARDS - 3 Cards in a Row (Phone, Email, Location)
      ========================================================================= */}
      <section className="relative -mt-10 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone */}
          <div className="bg-surface rounded-2xl p-7 shadow-xl shadow-primary/5 border border-primary/10 card-hover flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                  Call Hotline
                </span>
              </div>

              <h2 className="text-xl font-bold text-heading mb-2">Phone Inquiries</h2>
              <p className="text-sm text-body leading-relaxed mb-4">
                Speak directly with our academic counselors and technical project managers.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background hover:bg-primary-50/60 transition-colors">
                  <a
                    href="tel:+8801700000000"
                    className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    +880 1700-000000
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("+8801700000000", "phone1")}
                    className="text-body hover:text-primary p-1 rounded transition-colors"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    {copiedText === "phone1" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background hover:bg-primary-50/60 transition-colors">
                  <a
                    href="tel:+8801900000000"
                    className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    +880 1900-000000
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("+8801900000000", "phone2")}
                    className="text-body hover:text-primary p-1 rounded transition-colors"
                    title="Copy hotline number"
                    aria-label="Copy hotline number"
                  >
                    {copiedText === "phone2" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <a
              href="tel:+8801700000000"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/20"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us Now</span>
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-surface rounded-2xl p-7 shadow-xl shadow-primary/5 border border-primary/10 card-hover flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-accent/15 text-accent-dark flex items-center justify-center group-hover:bg-accent group-hover:text-primary-900 transition-all duration-300 shadow-sm">
                  <Mail className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary-50 px-2.5 py-1 rounded-full">
                  Email Support
                </span>
              </div>

              <h2 className="text-xl font-bold text-heading mb-2">Email Inquiries</h2>
              <p className="text-sm text-body leading-relaxed mb-4">
                Write to us for detailed syllabus breakdowns, enterprise proposals, or billing.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background hover:bg-primary-50/60 transition-colors">
                  <a
                    href="mailto:info@resda.org"
                    className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors truncate"
                  >
                    info@resda.org
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("info@resda.org", "email1")}
                    className="text-body hover:text-primary p-1 rounded transition-colors shrink-0"
                    title="Copy email"
                    aria-label="Copy general email"
                  >
                    {copiedText === "email1" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background hover:bg-primary-50/60 transition-colors">
                  <a
                    href="mailto:admissions@resda.org"
                    className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors truncate"
                  >
                    admissions@resda.org
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("admissions@resda.org", "email2")}
                    className="text-body hover:text-primary p-1 rounded transition-colors shrink-0"
                    title="Copy admissions email"
                    aria-label="Copy admissions email"
                  >
                    {copiedText === "email2" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <a
              href="mailto:info@resda.org"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/20"
            >
              <Mail className="w-4 h-4" />
              <span>Send An Email</span>
            </a>
          </div>

          {/* Card 3: Location */}
          <div className="bg-surface rounded-2xl p-7 shadow-xl shadow-primary/5 border border-primary/10 card-hover flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <MapPin className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-success bg-emerald-50 px-2.5 py-1 rounded-full">
                  Dhaka Campus
                </span>
              </div>

              <h2 className="text-xl font-bold text-heading mb-2">Our Campus</h2>
              <p className="text-sm text-body leading-relaxed mb-4">
                Visit our state-of-the-art computer labs, seminar halls, and project hub.
              </p>

              <div className="p-3 rounded-lg bg-background mb-6 border border-border">
                <p className="text-sm font-semibold text-heading">
                  RESDA IT Training Center & Services
                </p>
                <p className="text-xs text-body mt-1 leading-relaxed">
                  19th Floor, Nafi Tower, 53 Gulshan Avenue, Gulshan-1, Dhaka 1212, Bangladesh
                </p>
                <p className="text-[11px] text-primary-light font-medium mt-1">
                  Near Gulshan-1 Circle
                </p>
              </div>
            </div>

            <a
              href="#map-section"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/20"
            >
              <MapPin className="w-4 h-4" />
              <span>View On Map</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ADDITIONAL CONTACT METHODS - WhatsApp, Live Chat & Counseling Badges
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.15),transparent_70%)] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Connect Options</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Need Fast Answers or Free Career Counseling?
              </h2>
              <p className="text-sm sm:text-base text-primary-200 mt-1 max-w-2xl">
                Choose an instant channel below to talk directly with our tech counselors
                or verify course schedules right from your phone.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* WhatsApp Badge */}
              <a
                href="https://wa.me/8801700000000?text=Hello%20RESDA!%20I%20would%20like%20to%20learn%20more%20about%20your%20IT%20courses%20and%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20ba59] transition-all duration-200 shadow-lg shadow-black/20 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Live Chat Badge */}
              <button
                type="button"
                onClick={() => setLiveChatActive((prev) => !prev)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-200 border border-white/20 hover:-translate-y-0.5"
              >
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-primary-900 animate-pulse" />
                </div>
                <span>{liveChatActive ? "Hide Live Support" : "Live Chat Support"}</span>
              </button>

              {/* Career Counseling Tour */}
              <a
                href="#contact-form-card"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    subject: "Course Enrollment",
                    message: "Hi, I would like to schedule a 1-on-1 campus visit and free career counseling session.",
                  }));
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-accent text-primary-900 font-bold text-sm hover:bg-accent-light transition-all duration-200 shadow-lg shadow-accent/20 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Campus Tour</span>
              </a>
            </div>
          </div>

          {/* Simulated Live Chat Modal Bar if activated */}
          {liveChatActive && (
            <div className="mt-6 pt-6 border-t border-white/15 bg-white/5 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Live Advisor: Fahim Ahmed (Senior Admissions Lead)
                    </p>
                    <p className="text-xs text-primary-200">
                      Average reply time: <span className="text-emerald-300 font-medium">Under 2 minutes</span> • Status: Online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="https://wa.me/8801700000000?text=Hello%20Fahim,%20I'm%20inquiring%20via%20the%20RESDA%20website%20Live%20Chat."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-primary-900 font-semibold text-xs hover:bg-white/90 transition-colors"
                  >
                    <span>Start Chat Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          3. CONTACT FORM SECTION - Two Columns (Form on Left, Info & Map on Right)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ----------------- LEFT COLUMN: CONTACT FORM ----------------- */}
          <div
            id="contact-form-card"
            className="lg:col-span-7 bg-surface rounded-2xl p-6 sm:p-10 shadow-xl shadow-primary/5 border border-border"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-semibold mb-2">
                <Send className="w-3.5 h-3.5" />
                <span>Direct Message</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-heading">
                Send Us a Message
              </h2>
              <p className="text-sm sm:text-base text-body mt-2">
                Fill in the details below. Whether you want to enroll in a batch,
                request a corporate IT solution quote, or ask a question, we will
                get back to you shortly.
              </p>
            </div>

            {/* Success Notification Alert */}
            {isSubmitted ? (
              <div
                role="alert"
                className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 animate-in fade-in zoom-in-95 duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success text-white flex items-center justify-center shrink-0 shadow-md shadow-success/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-emerald-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-emerald-800 mt-1 leading-relaxed">
                      Thank you, <span className="font-semibold">{formData.name}</span>. Your inquiry regarding{" "}
                      <span className="font-semibold">{formData.subject}</span> has been logged into our support queue.
                      Our team will reach out via <span className="font-semibold">{formData.email}</span> or{" "}
                      <span className="font-semibold">{formData.phone}</span> within 24 hours.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors"
                      >
                        Send Another Message
                      </button>
                      <Link
                        href="/courses"
                        className="px-4 py-2 bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-semibold text-xs rounded-lg transition-colors"
                      >
                        Browse Courses Meanwhile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-heading mb-1.5"
                  >
                    Your Full Name <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={() => handleInputBlur("name")}
                      placeholder="e.g. Tanvir Hasan"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-heading placeholder:text-body/60 transition-all outline-none ${
                        errors.name
                          ? "border-error focus:ring-2 focus:ring-error/20 bg-red-50/20"
                          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-error flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-heading mb-1.5"
                    >
                      Email Address <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onBlur={() => handleInputBlur("email")}
                        placeholder="e.g. tanvir@gmail.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-heading placeholder:text-body/60 transition-all outline-none ${
                          errors.email
                            ? "border-error focus:ring-2 focus:ring-error/20 bg-red-50/20"
                            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-error flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold text-heading mb-1.5"
                    >
                      Phone Number <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        onBlur={() => handleInputBlur("phone")}
                        placeholder="+880 1700-000000"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-heading placeholder:text-body/60 transition-all outline-none ${
                          errors.phone
                            ? "border-error focus:ring-2 focus:ring-error/20 bg-red-50/20"
                            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="mt-1.5 text-xs text-error flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold text-heading mb-1.5"
                  >
                    Subject of Inquiry <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      onBlur={() => handleInputBlur("subject")}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm text-heading transition-all outline-none appearance-none ${
                        !formData.subject ? "text-body/70" : "text-heading"
                      } ${
                        errors.subject
                          ? "border-error focus:ring-2 focus:ring-error/20 bg-red-50/20"
                          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                      }`}
                    >
                      <option value="" disabled>
                        Select a category...
                      </option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Course Enrollment">Course Enrollment (Online / Offline)</option>
                      <option value="IT Service Inquiry">IT Service Inquiry (Web, App, Software)</option>
                      <option value="Support">Student or Client Support</option>
                      <option value="Partnership">Corporate Partnership & Training</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-body">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.subject && (
                    <p id="subject-error" className="mt-1.5 text-xs text-error flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-heading"
                    >
                      Message / Project Details <span className="text-error">*</span>
                    </label>
                    <span className="text-xs text-body">
                      {formData.message.length} characters
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onBlur={() => handleInputBlur("message")}
                    placeholder="Tell us about the course you want to enroll in, or describe your project requirements and preferred timeline..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-heading placeholder:text-body/60 transition-all outline-none resize-y ${
                      errors.message
                        ? "border-error focus:ring-2 focus:ring-error/20 bg-red-50/20"
                        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-error flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-accent text-primary-900 font-bold text-base hover:bg-accent-dark transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-primary-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-body">
                  🔒 We respect your privacy. Your information is never shared with third parties.
                </p>
              </form>
            )}
          </div>

          {/* ----------------- RIGHT COLUMN: ADDITIONAL INFO & MAP ----------------- */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Office Hours */}
            <div className="bg-surface rounded-2xl p-6 sm:p-7 shadow-lg shadow-primary/5 border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-heading">Office Hours</h3>
                  <p className="text-xs text-body">Counseling & Administrative Support</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/60 text-sm">
                  <span className="font-medium text-heading">Sunday – Thursday</span>
                  <span className="font-semibold text-primary">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/60 text-sm">
                  <span className="font-medium text-heading">Saturday</span>
                  <span className="font-semibold text-heading">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium text-heading">Friday</span>
                  <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                    Closed (Workshops Only)
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-primary-50/70 border border-primary-100 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
                </span>
                <p className="text-xs text-primary-900 font-medium">
                  Counseling desks are active now. Walk-ins are warmly welcome!
                </p>
              </div>
            </div>

            {/* Card 2: Social Media Links */}
            <div className="bg-surface rounded-2xl p-6 sm:p-7 shadow-lg shadow-primary/5 border border-border">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-heading">Join Our Tech Community</h3>
                <p className="text-xs text-body mt-0.5">
                  Connect on social media for free masterclasses, student showcases & job notices.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all duration-200 group border border-[#1877F2]/20"
                >
                  <FacebookIcon className="w-5 h-5 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold leading-tight">Facebook</p>
                    <p className="text-[10px] text-body group-hover:text-white/80 transition-colors">
                      @resda.official
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all duration-200 group border border-[#0A66C2]/20"
                >
                  <LinkedinIcon className="w-5 h-5 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold leading-tight">LinkedIn</p>
                    <p className="text-[10px] text-body group-hover:text-white/80 transition-colors">
                      RESDA IT Services
                    </p>
                  </div>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/10 hover:bg-slate-900 text-slate-900 hover:text-white transition-all duration-200 group border border-slate-900/20"
                >
                  <TwitterIcon className="w-5 h-5 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold leading-tight">Twitter / X</p>
                    <p className="text-[10px] text-body group-hover:text-white/80 transition-colors">
                      @resda_bd
                    </p>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white transition-all duration-200 group border border-[#FF0000]/20"
                >
                  <YoutubeIcon className="w-5 h-5 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold leading-tight">YouTube</p>
                    <p className="text-[10px] text-body group-hover:text-white/80 transition-colors">
                      Free Code Tutorials
                    </p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-1 sm:col-span-2 flex items-center gap-3 p-3 rounded-xl bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white transition-all duration-200 group border border-[#E4405F]/20"
                >
                  <InstagramIcon className="w-5 h-5 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold leading-tight">Instagram</p>
                    <p className="text-[10px] text-body group-hover:text-white/80 transition-colors">
                      Campus Life, Hackathons & Tech Culture (@resda_life)
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Card 3: Small Map Placeholder (Styled to look like an interactive map) */}
            <div
              id="map-section"
              className="bg-surface rounded-2xl overflow-hidden shadow-lg shadow-primary/5 border border-border"
            >
              {/* Map Canvas Mockup */}
              <div className="relative h-64 bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                {/* Simulated Map Grid and Roads */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-35"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid-pattern"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="0.8"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  {/* Stylized simulated highway / arterial road */}
                  <path
                    d="M-20,120 Q150,80 320,140 T600,100"
                    fill="none"
                    stroke="#F5A623"
                    strokeWidth="4"
                    strokeOpacity="0.7"
                  />
                  <path
                    d="M100,-20 Q160,120 220,300"
                    fill="none"
                    stroke="#5B2D8E"
                    strokeWidth="5"
                    strokeOpacity="0.8"
                  />
                  <path
                    d="M-40,200 L500,60"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                  />
                </svg>

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                {/* Geographic Coordinate Pill */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-300 border border-slate-700 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>23.7813° N, 90.4164° E · Gulshan-1, Dhaka</span>
                </div>

                {/* Central Radar Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute h-12 w-12 rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-10 w-10 bg-primary text-white border-2 border-accent items-center justify-center shadow-2xl">
                      <MapPin className="w-5 h-5 fill-accent text-primary-dark" />
                    </span>
                  </div>

                  <div className="mt-2 bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-accent/40 text-center shadow-lg">
                    <p className="text-xs font-bold text-white flex items-center gap-1 justify-center">
                      <span className="text-accent font-extrabold">RESDA</span> Campus
                    </p>
                    <p className="text-[10px] text-slate-300">Gulshan-1, Dhaka</p>
                  </div>
                </div>

                {/* Map Controls Mockup */}
                <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
                  <div className="bg-slate-800/90 text-white text-xs px-2 py-1 rounded border border-slate-700 font-mono shadow">
                    +
                  </div>
                  <div className="bg-slate-800/90 text-white text-xs px-2 py-1 rounded border border-slate-700 font-mono shadow">
                    −
                  </div>
                </div>
              </div>

              {/* Map Footer Bar */}
              <div className="p-4 bg-surface border-t border-border flex items-center justify-between gap-3">
                <div className="truncate">
                  <p className="text-xs font-semibold text-heading truncate">
                    19th Floor, Nafi Tower, Gulshan-1
                  </p>
                  <p className="text-[11px] text-body">Dhaka 1212, Bangladesh</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Nafi+Tower+Gulshan+1+Dhaka+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary hover:bg-primary hover:text-white font-semibold text-xs transition-colors shrink-0"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FAQ SECTION - 6 Expandable Accordion Items
      ========================================================================= */}
      <section className="bg-surface border-t border-border py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-body mt-3 leading-relaxed">
              Find quick answers regarding course admissions, certifications,
              corporate services, and flexible payment arrangements.
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-primary/40 bg-background shadow-md shadow-primary/5"
                      : "border-border bg-surface hover:border-primary/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 pr-2">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? "bg-primary text-white"
                            : "bg-primary-50 text-primary"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-heading">
                        {item.question}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-primary text-white rotate-180"
                          : "bg-background text-body"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-body leading-relaxed border-t border-border/50 animate-in fade-in duration-200">
                      <p>{item.answer}</p>
                      <div className="mt-4 pt-3 flex items-center justify-between text-xs text-primary font-medium">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-semibold">
                          Category: {item.category}
                        </span>
                        <a
                          href="#contact-form-card"
                          className="hover:text-primary-dark transition-colors inline-flex items-center gap-1 font-semibold"
                        >
                          <span>Ask more about this</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Help Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-primary-50 border border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-heading">
                  Still have questions not answered above?
                </h4>
                <p className="text-xs sm:text-sm text-body mt-0.5">
                  Our friendly support team is ready to assist you right away.
                </p>
              </div>
            </div>
            <a
              href="tel:+8801700000000"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-md shadow-primary/20 shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to Counselor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
