"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock,
  BookOpen,
  BarChart3,
  Star,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Download,
  Share2,
  Play,
  Briefcase,
  Check,
  Laptop,
  MessageCircle,
  FileText,
  X,
  Phone,
} from "lucide-react";
import { getCourseBySlug, DetailedCourse } from "@/lib/courses-data";

function CourseDetailContent() {
  const params = useParams();
  const slug = (params?.slug as string) || "full-stack-web-dev";
  const course: DetailedCourse = getCourseBySlug(slug) || getCourseBySlug("full-stack-web-dev")!;

  // Syllabus accordion state
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  // Enrollment & Payment Modal
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"full" | "installment">("full");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "card" | "offline">("bkash");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    batchPreference: "Weekend Cohort",
  });
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Download syllabus notification state
  const [syllabusDownloaded, setSyllabusDownloaded] = useState(false);

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const handleDownloadSyllabus = () => {
    setSyllabusDownloaded(true);
    setTimeout(() => setSyllabusDownloaded(false), 4000);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    // Validate phone number format (must be 11 digits BD number)
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      setPaymentError("Invalid phone number! Please enter a valid 11-digit Bangladeshi mobile number starting with 013-019 (e.g. 01712345678).");
      return;
    }

    // If user explicitly chose pay at campus offline
    if (paymentMethod === "offline") {
      setEnrollSubmitted(true);
      return;
    }

    // Process via SSLCommerz payment gateway
    setIsProcessingPayment(true);
    try {
      const res = await fetch("/api/payment/ssl/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: course.slug,
          paymentPlan: paymentOption === "installment" ? "INSTALLMENT" : "FULL",
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          method: paymentMethod.toUpperCase(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.gatewayUrl) {
        window.location.href = data.gatewayUrl;
      } else {
        setPaymentError(data.error || "Failed to initialize payment gateway. Please try again.");
        setIsProcessingPayment(false);
      }
    } catch {
      setPaymentError("Could not connect to payment gateway. Please verify your connection.");
      setIsProcessingPayment(false);
    }
  };

  const discountPercent = Math.round(
    ((course.originalPrice - course.discountedPrice) / course.originalPrice) * 100
  );

  const installmentAmount = Math.round(course.discountedPrice / 2);

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="bg-hero-gradient text-white pt-12 pb-20 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-primary-200 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <span>/</span>
            <span className="text-accent font-medium truncate max-w-xs">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left 2 Cols: Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-sm">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-slate-950 flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  {course.rating.toFixed(1)} ({course.reviewsCount} verified reviews)
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/30 backdrop-blur-md text-primary-100 border border-white/10">
                  {course.mode}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-primary-100 leading-relaxed max-w-3xl font-light">
                {course.tagline}
              </p>

              {/* Quick stats pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
                  <span className="text-[11px] text-primary-200 block uppercase font-medium">Duration</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-accent" /> {course.duration}
                  </span>
                </div>
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
                  <span className="text-[11px] text-primary-200 block uppercase font-medium">Curriculum</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-accent" /> {course.lessonsCount} Lectures
                  </span>
                </div>
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
                  <span className="text-[11px] text-primary-200 block uppercase font-medium">Skill Level</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <BarChart3 className="w-3.5 h-3.5 text-accent" /> {course.level}
                  </span>
                </div>
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
                  <span className="text-[11px] text-primary-200 block uppercase font-medium">Certification</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Award className="w-3.5 h-3.5 text-accent" /> Verified ID
                  </span>
                </div>
              </div>

              {/* Lead Instructor Bar */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 max-w-xl">
                <div className="w-11 h-11 rounded-full bg-accent text-slate-950 flex items-center justify-center font-black text-sm shadow">
                  {course.instructor.initials}
                </div>
                <div>
                  <p className="text-xs text-primary-200">Lead Mentor & Course Architect</p>
                  <p className="text-sm font-bold text-white">{course.instructor.name}</p>
                  <p className="text-xs text-primary-200 truncate">{course.instructor.role}</p>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Floating Enrollment Card for Desktop */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-primary-100 text-slate-900 sticky top-24">
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-xs text-body uppercase tracking-wider font-semibold">Tuition Investment</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-primary">
                      ৳{course.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-base text-body line-through">
                      ৳{course.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                  {discountPercent}% OFF
                </span>
              </div>

              {/* Installment Badge */}
              <div className="p-3 rounded-xl bg-primary-50/80 border border-primary-100 text-xs text-primary mb-5 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary shrink-0" />
                <span>
                  Or pay in <strong>2 installments</strong> of <strong>৳{installmentAmount.toLocaleString()}/mo</strong>
                </span>
              </div>

              {/* Intake status */}
              <div className="space-y-2.5 text-xs text-body mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-heading font-medium">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> Next Batch Starts:
                  </span>
                  <span className="font-bold text-primary">{course.nextBatch}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-heading font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary" /> Class Schedule:
                  </span>
                  <span className="font-semibold text-slate-700 text-right">{course.schedule}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-heading font-medium">
                    <Users className="w-3.5 h-3.5 text-primary" /> Seat Availability:
                  </span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    Only {course.seatsLeft} seats left!
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="w-full py-3.5 px-4 bg-accent hover:bg-accent-light text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Enroll in Next Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDownloadSyllabus}
                  className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-primary" />
                  <span>Download Full Syllabus PDF</span>
                </button>

                {syllabusDownloaded && (
                  <p className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-100 animate-in fade-in">
                    ✓ Full syllabus prospectus downloaded!
                  </p>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-body">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 7-Day Refund Policy
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-primary" /> Verifiable Certificate
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Outcomes, Curriculum, Projects & Instructor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left 2 Cols: Comprehensive Curriculum */}
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <div className="bg-surface rounded-3xl p-7 sm:p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                What You Will Master in this Program
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-sm text-body leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Tech Stack */}
            <div className="bg-surface rounded-3xl p-7 sm:p-8 border border-border shadow-sm">
              <h2 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-primary" />
                Industry Tools & Technologies Covered
              </h2>
              <p className="text-xs text-body mb-5">
                You will practice hands-on with standard developer tools used by high-growth startups and tech enterprises worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                {course.toolsLearned.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary-50 text-primary border border-primary-100 shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-heading flex items-center gap-2.5">
                    <FileText className="w-6 h-6 text-primary" />
                    Detailed Course Curriculum
                  </h2>
                  <p className="text-xs text-body mt-0.5">
                    {course.modules.length} Modules • {course.lessonsCount} Interactive Lectures • 100% Practical
                  </p>
                </div>
                <button
                  onClick={() =>
                    setOpenModuleIndex(openModuleIndex === null ? 0 : null)
                  }
                  className="text-xs font-semibold text-primary hover:underline self-start sm:self-auto cursor-pointer"
                >
                  {openModuleIndex === null ? "Expand First Module" : "Collapse Modules"}
                </button>
              </div>

              <div className="space-y-3">
                {course.modules.map((mod, index) => {
                  const isOpen = openModuleIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleModule(index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                            {mod.duration}
                          </span>
                          <h3 className="text-base font-bold text-heading leading-snug">{mod.title}</h3>
                          <p className="text-xs text-body line-clamp-1">{mod.description}</p>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 transition-transform ${
                            isOpen ? "rotate-180 bg-primary text-white" : ""
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-2.5 bg-slate-50/40">
                          {mod.lessons.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between text-xs text-body hover:border-primary/40 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-primary-50 text-primary flex items-center justify-center font-bold text-[11px] shrink-0">
                                  {lIdx + 1}
                                </div>
                                <span className="font-medium text-heading">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                {lesson.isFree && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    Free Preview
                                  </span>
                                )}
                                <span className="text-[11px] text-body">{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Capstone Projects Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-heading flex items-center gap-2.5">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Commercial Capstone Projects You Will Build
                </h2>
                <p className="text-xs text-body mt-0.5">
                  Stand out in hiring pipelines with verified, production-ready portfolio projects deployed live to the cloud.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {course.capstoneProjects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-3 hover:border-primary/40 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-primary-900 text-white px-2.5 py-0.5 rounded">
                      Project {pIdx + 1}
                    </span>
                    <h3 className="text-base font-bold text-heading">{proj.title}</h3>
                    <p className="text-xs text-body leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-surface rounded-3xl p-7 border border-border space-y-3">
              <h3 className="text-lg font-bold text-heading">Course Prerequisites & Eligibility</h3>
              <ul className="space-y-2 text-xs text-body list-disc pl-5 leading-relaxed">
                {course.prerequisites.map((req, rIdx) => (
                  <li key={rIdx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 1 Col: Mentor Bio & Campus Support */}
          <div className="space-y-8">
            {/* Lead Mentor Card */}
            <div className="bg-surface rounded-3xl p-7 border border-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-heading">Your Lead Mentor</h3>
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-md shadow-primary/20 shrink-0">
                  {course.instructor.initials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-heading">{course.instructor.name}</h4>
                  <p className="text-xs text-primary font-medium">{course.instructor.role}</p>
                  <p className="text-[11px] text-body">{course.instructor.experience}</p>
                </div>
              </div>
              <p className="text-xs text-body leading-relaxed border-t border-slate-100 pt-3">
                {course.instructor.bio}
              </p>
            </div>

            {/* Offline Campus Facilities Note */}
            <div className="p-6 rounded-3xl bg-primary-50/60 border border-primary-100 space-y-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-primary-200">
                On-Campus Lab Access
              </span>
              <h4 className="text-sm font-bold text-heading">19th Floor, Nafi Tower Lab Hub</h4>
              <p className="text-xs text-body leading-relaxed">
                Enrolled students are welcome to use our high-spec computer labs at 53 Gulshan Avenue, Gulshan-1 for hands-on practice, mentor debugging, and team hackathons.
              </p>
              <Link
                href="/training"
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>View Campus Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Direct Counseling Trigger */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
              <h4 className="text-base font-bold">Have Questions About This Track?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Schedule a 15-minute free career consultation with our senior academic counselors.
              </p>
              <div className="pt-1">
                <a
                  href="tel:+8801700000000"
                  className="w-full py-2.5 px-4 bg-accent text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-accent-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call +880 1700-000000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Enrollment & Payment Modal */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsEnrollModalOpen(false);
                setEnrollSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSubmitted ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary-50 px-2.5 py-0.5 rounded-full">
                    Official Batch Admission
                  </span>
                  <h3 className="text-xl font-black text-heading mt-1.5">{course.title}</h3>
                  <p className="text-xs text-body mt-0.5">
                    Batch intake starts <strong>{course.nextBatch}</strong>. Select your preferred tuition plan.
                  </p>
                </div>

                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  {/* Payment Option: Full vs 50% Installment */}
                  <div>
                    <label className="block text-xs font-bold text-heading mb-2">Tuition Payment Structure</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentOption("full")}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          paymentOption === "full"
                            ? "border-primary bg-primary-50 text-primary ring-2 ring-primary/20"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <p className="text-xs font-bold">Full Payment</p>
                        <p className="text-sm font-black text-primary mt-0.5">
                          ৳{course.discountedPrice.toLocaleString()}
                        </p>
                        <span className="text-[10px] text-emerald-700 font-semibold">Includes {discountPercent}% discount</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentOption("installment")}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          paymentOption === "installment"
                            ? "border-primary bg-primary-50 text-primary ring-2 ring-primary/20"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <p className="text-xs font-bold">2 Installments</p>
                        <p className="text-sm font-black text-primary mt-0.5">
                          ৳{installmentAmount.toLocaleString()} <span className="text-xs font-medium text-body">now</span>
                        </p>
                        <span className="text-[10px] text-slate-500 font-medium">Remaining 50% next month</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-heading">Payment Method</label>
                      <span className="text-[10px] text-primary font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> SSLCommerz Verified
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: "bkash", label: "bKash" },
                        { id: "nagad", label: "Nagad" },
                        { id: "card", label: "Cards / SSL" },
                        { id: "offline", label: "Pay at Campus" },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                            paymentMethod === m.id
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-white"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {paymentMethod !== "offline" && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-[11px] text-purple-900">
                        <span className="font-semibold flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-primary" />
                          SSLCommerz Gateway: Instant bKash, Nagad, Visa, Mastercard
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
                          0% Gateway Fee
                        </span>
                      </div>
                    )}
                  </div>

                  {paymentError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {paymentError}
                    </div>
                  )}

                  {/* Student Details */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-heading mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 1700-000000"
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-primary/25 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Connecting to SSLCommerz Gateway...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>
                            {paymentMethod === "offline"
                              ? "Confirm & Reserve Seat (Pay at Campus)"
                              : `Pay ৳${(paymentOption === "full" ? course.discountedPrice : installmentAmount).toLocaleString()} via SSLCommerz`}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-heading">Seat Reservation Confirmed!</h3>
                  <p className="text-xs text-body mt-1 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || "Student"}</strong>. Your application for{" "}
                    <strong>{course.title}</strong> has been received. Our admissions officer will contact your phone (
                    {formData.phone || "+880..."}) within 2 hours with invoice receipt and onboarding details.
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <Link
                    href="/dashboard"
                    className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow transition-colors"
                  >
                    Go to Student Dashboard
                  </Link>
                  <button
                    onClick={() => setIsEnrollModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CourseDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CourseDetailContent />
    </Suspense>
  );
}
