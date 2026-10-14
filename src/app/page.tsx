"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Monitor,
  Users,
  Code,
  GraduationCap,
  Laptop,
  CheckCircle2,
  ArrowRight,
  Star,
  Award,
  Briefcase,
  Clock,
  BarChart3,
  Send,
  Check,
  ChevronRight,
  Globe,
  Building2,
  Sparkles,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Server,
  Palette,
  Mail,
  ExternalLink,
  Code2,
  Zap,
} from "lucide-react";

// Animated counter hook / component
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// Course Data
interface Course {
  id: string;
  title: string;
  category: string;
  categoryType: "all" | "web" | "python" | "mobile" | "security" | "marketing";
  description: string;
  duration: string;
  level: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  students: number;
  topBarColor: string;
  badgeBg: string;
  icon: React.ElementType;
}

const coursesData: Course[] = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development (MERN & Next.js)",
    category: "Web Development",
    categoryType: "web",
    description:
      "Master modern frontend and backend development with React, Next.js, Node.js, Express, and MongoDB. Build and deploy 5+ full-stack production apps.",
    duration: "4 Months (120 hrs)",
    level: "Beginner to Advanced",
    price: "৳ 15,000",
    originalPrice: "৳ 20,000",
    discount: "25% OFF",
    rating: 4.9,
    students: 240,
    topBarColor: "from-purple-600 to-indigo-600",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Globe,
  },
  {
    id: "python-prog",
    title: "Python Programming & Practical Automation",
    category: "Python Programming",
    categoryType: "python",
    description:
      "From programming core principles to automated scripts, data scraping with BeautifulSoup, API development with FastAPI, and desktop bots.",
    duration: "3 Months (90 hrs)",
    level: "Beginner Friendly",
    price: "৳ 12,000",
    originalPrice: "৳ 16,000",
    discount: "25% OFF",
    rating: 4.8,
    students: 195,
    topBarColor: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    icon: Code2,
  },
  {
    id: "data-science",
    title: "Data Science & Machine Learning with Python",
    category: "Data Science",
    categoryType: "python",
    description:
      "Deep dive into exploratory data analysis, statistics, data visualization, Pandas, NumPy, and real-world predictive models using Scikit-Learn.",
    duration: "4 Months (110 hrs)",
    level: "Intermediate",
    price: "৳ 18,000",
    originalPrice: "৳ 24,000",
    discount: "25% OFF",
    rating: 4.9,
    students: 160,
    topBarColor: "from-emerald-500 to-teal-600",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: BarChart3,
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development (Flutter & React Native)",
    category: "Mobile App Dev",
    categoryType: "mobile",
    description:
      "Build blazing-fast cross-platform iOS and Android applications from a single codebase with dynamic UI, State Management, and Firebase integration.",
    duration: "3.5 Months (100 hrs)",
    level: "Intermediate",
    price: "৳ 16,000",
    originalPrice: "৳ 22,000",
    discount: "27% OFF",
    rating: 4.8,
    students: 145,
    topBarColor: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
    icon: Smartphone,
  },
  {
    id: "cyber-security",
    title: "Cyber Security & Ethical Hacking Mastery",
    category: "Cyber Security",
    categoryType: "security",
    description:
      "Master network defense, penetration testing methodologies, Kali Linux toolkits, OWASP Top 10 vulnerabilities, and practical digital forensics.",
    duration: "4 Months (100 hrs)",
    level: "All Levels",
    price: "৳ 20,000",
    originalPrice: "৳ 28,000",
    discount: "28% OFF",
    rating: 4.9,
    students: 180,
    topBarColor: "from-rose-500 to-red-600",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200",
    icon: ShieldCheck,
  },
  {
    id: "digital-marketing",
    title: "Advanced Digital Marketing & Performance SEO",
    category: "Digital Marketing",
    categoryType: "marketing",
    description:
      "Drive real business outcomes with technical SEO, Google Ads PPC, Meta advertising, conversion funnel design, and data-backed analytics.",
    duration: "2.5 Months (70 hrs)",
    level: "Beginner to Advanced",
    price: "৳ 10,000",
    originalPrice: "৳ 14,000",
    discount: "28% OFF",
    rating: 4.7,
    students: 210,
    topBarColor: "from-purple-500 to-pink-500",
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
    icon: TrendingUp,
  },
];

export default function HomePage() {
  const [activeCourseTab, setActiveCourseTab] = useState<string>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const filteredCourses =
    activeCourseTab === "all"
      ? coursesData
      : coursesData.filter((c) => c.categoryType === activeCourseTab);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative bg-hero-gradient text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        {/* Ambient background glows and mesh accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-10 w-[30rem] h-[30rem] bg-accent/15 rounded-full blur-3xl pointer-events-none translate-y-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-sm font-semibold shadow-inner">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span>Skill Empowerment for the Nation</span>
                <span className="hidden sm:inline text-white/50">•</span>
                <span className="hidden sm:inline text-white/90">
                  IT Training & Services
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Empowering <span className="text-accent">IT Skills</span> &amp;{" "}
                <span className="text-white">Solutions</span> for the Nation
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Transform your career with world-class online &amp; offline IT
                training, and accelerate your business growth with our
                commercial-grade software development &amp; tech consultancy.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-accent text-primary-900 font-bold text-base shadow-lg shadow-accent/30 hover:bg-accent-light hover:shadow-accent/40 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold text-base border-2 border-white/70 hover:bg-white hover:text-primary-900 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Code className="w-5 h-5" />
                  <span>Our Services</span>
                </Link>
              </div>

              {/* Value checkmarks */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-primary-100/90 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Govt. Approved Curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>100% Practical Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Job Placement Support</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary-light rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-1000"></div>

                <div className="relative rounded-2xl bg-primary-900/80 backdrop-blur-xl border border-white/20 p-6 sm:p-8 shadow-2xl text-white">
                  {/* Card Header / Status */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Admissions Open 2026
                    </span>
                  </div>

                  {/* Terminal / Interactive Highlight */}
                  <div className="py-6 space-y-4">
                    <div className="bg-primary-950/70 rounded-xl p-4 border border-white/10 font-mono text-xs sm:text-sm text-primary-200">
                      <p className="text-accent flex items-center gap-2">
                        <span>$</span> resda --empower --next-generation
                      </p>
                      <p className="text-emerald-400 mt-2">
                        ✔ 50+ Modern Courses Active
                      </p>
                      <p className="text-white/80">
                        ✔ 100+ Enterprise Projects Delivered
                      </p>
                      <p className="text-primary-300">
                        ✔ 94% Career Placement Success
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-primary-200">
                          Next Batch
                        </div>
                        <div className="text-base font-bold text-white mt-0.5">
                          Weekend &amp; Evening
                        </div>
                        <div className="text-xs text-accent mt-1">
                          Online + Offline Lab
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-primary-200">
                          IT Solutions
                        </div>
                        <div className="text-base font-bold text-white mt-0.5">
                          Enterprise Ready
                        </div>
                        <div className="text-xs text-emerald-400 mt-1">
                          Free Tech Audit
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action in Hero Card */}
                  <div className="pt-2">
                    <Link
                      href="/courses"
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-accent" />
                        Explore Next Upcoming Batch
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/70" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Counters Section (High Impact Glass Strip) */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-white/15">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Stat 1 */}
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  Students Trained
                </div>
                <div className="text-xs text-primary-200 mt-0.5">
                  Online &amp; Campus
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  Professional Courses
                </div>
                <div className="text-xs text-primary-200 mt-0.5">
                  Industry-Aligned
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  IT Projects Delivered
                </div>
                <div className="text-xs text-primary-200 mt-0.5">
                  Commercial &amp; Enterprise
                </div>
              </div>

              {/* Stat 4 */}
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent tracking-tight">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  Expert Trainers
                </div>
                <div className="text-xs text-primary-200 mt-0.5">
                  Senior Industry Leads
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FEATURES SECTION (3 Cards: Online, Offline, IT Services)
          ========================================================================= */}
      <section className="section-padding bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-semibold text-xs tracking-wide uppercase mb-3">
              <Zap className="w-3.5 h-3.5 text-accent" />
              Comprehensive Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Flexible Learning &amp; Enterprise Solutions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-body">
              Whether you are an aspiring developer looking to build in-demand
              skills or a business seeking dependable technology execution,
              RESDA provides the ideal platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Online Training */}
            <div className="group rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-primary-light" />
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Monitor className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Learn Remotely
                </span>
                <h3 className="text-2xl font-bold text-heading mt-1 mb-3">
                  Online Training
                </h3>
                <p className="text-body text-sm sm:text-base leading-relaxed mb-6">
                  Live interactive mentor-led classes designed for remote
                  learners. Access recorded sessions, participate in real-time
                  code debugging, and study flexibly with 24/7 community
                  mentorship.
                </p>

                <ul className="space-y-2.5 mb-8 text-sm text-heading font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Live virtual classrooms with screen share</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Lifetime access to lecture recordings</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Daily 1-on-1 mentor support hours</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-accent transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Learn More About Online Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Offline Training */}
            <div className="group rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent to-accent-light" />
              <div>
                <div className="w-14 h-14 rounded-xl bg-amber-50 text-accent-dark flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary-900 transition-colors duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold text-accent-dark uppercase tracking-wider">
                  Campus Learning
                </span>
                <h3 className="text-2xl font-bold text-heading mt-1 mb-3">
                  Offline Training
                </h3>
                <p className="text-body text-sm sm:text-base leading-relaxed mb-6">
                  Immerse yourself in our high-spec physical computer labs. Work
                  shoulder-to-shoulder with peer cohorts, build team projects,
                  and receive immediate hands-on debugging directly from onsite
                  trainers.
                </p>

                <ul className="space-y-2.5 mb-8 text-sm text-heading font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>High-performance workstations provided</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Collaborative team sprints &amp; hackathons</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Dedicated career grooming on campus</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/training"
                className="inline-flex items-center gap-2 text-accent-dark font-bold text-sm hover:text-primary transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Learn More About Offline Labs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: IT Services */}
            <div className="group rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-light to-primary-dark" />
              <div>
                <div className="w-14 h-14 rounded-xl bg-purple-50 text-primary-light flex items-center justify-center mb-6 group-hover:bg-primary-dark group-hover:text-white transition-colors duration-300">
                  <Code className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Business Solutions
                </span>
                <h3 className="text-2xl font-bold text-heading mt-1 mb-3">
                  IT Services
                </h3>
                <p className="text-body text-sm sm:text-base leading-relaxed mb-6">
                  End-to-end software development and digital transformation for
                  enterprises and growing companies. From custom web portals and
                  mobile apps to cloud infrastructure and cybersecurity.
                </p>

                <ul className="space-y-2.5 mb-8 text-sm text-heading font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Full-stack custom software engineering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Cloud architecture &amp; DevOps integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>Continuous support &amp; SLA-backed maintenance</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-accent transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Explore Enterprise IT Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. POPULAR COURSES SECTION (Grid of 6 Cards)
          ========================================================================= */}
      <section className="section-padding bg-background relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 text-accent-dark font-semibold text-xs tracking-wide uppercase mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                Featured Curriculums
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
                Our Most Popular IT Courses
              </h2>
              <p className="mt-2 text-body max-w-xl text-base">
                Curated by industry veterans with continuous updates to meet
                current hiring demands.
              </p>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
              {[
                { label: "All Courses", value: "all" },
                { label: "Web Dev", value: "web" },
                { label: "Python & Data", value: "python" },
                { label: "Mobile Apps", value: "mobile" },
                { label: "Cyber Security", value: "security" },
                { label: "Digital Marketing", value: "marketing" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveCourseTab(tab.value)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeCourseTab === tab.value
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-white text-body hover:text-heading hover:bg-gray-100 border border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const IconComp = course.icon;
              return (
                <div
                  key={course.id}
                  className="rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Colored Top Bar */}
                  <div
                    className={`h-2.5 bg-gradient-to-r ${course.topBarColor}`}
                  />

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Badge & Rating */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full border ${course.badgeBg}`}
                        >
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-heading">
                          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                          <span>{course.rating}</span>
                          <span className="text-body font-normal">
                            ({course.students})
                          </span>
                        </div>
                      </div>

                      {/* Course Title */}
                      <h3 className="text-xl font-bold text-heading group-hover:text-primary transition-colors leading-snug mb-3">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-body text-sm leading-relaxed mb-6">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      {/* Meta Pills (Duration & Level) */}
                      <div className="grid grid-cols-2 gap-2 py-3 border-y border-border mb-6 text-xs text-body font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span>{course.level}</span>
                        </div>
                      </div>

                      {/* Price & Enroll Button */}
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-heading">
                              {course.price}
                            </span>
                            <span className="text-xs text-body line-through">
                              {course.originalPrice}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-success">
                            {course.discount} Special Discount
                          </span>
                        </div>

                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
                        >
                          <span>Enroll Now</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Bottom CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-border text-primary font-bold text-base hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span>Explore All 50+ Certified Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. IT SERVICES OVERVIEW (Left: description + bullets, Right: service cards)
          ========================================================================= */}
      <section className="section-padding bg-surface relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Description, Bullets, Link */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-semibold text-xs tracking-wide uppercase">
                <Code className="w-3.5 h-3.5 text-accent" />
                Enterprise IT Services
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-tight">
                Architecting Modern Digital Solutions That Scale
              </h2>

              <p className="text-body text-base sm:text-lg leading-relaxed">
                At RESDA, our engineering unit works as an extended technology
                arm for modern businesses. We design, build, deploy, and manage
                secure web platforms, mobile systems, and enterprise automation
                tailored to your exact business workflow.
              </p>

              {/* Key Service Areas Bullets */}
              <div className="space-y-3 pt-2">
                {[
                  "Custom Web & SaaS Application Engineering",
                  "Native & Cross-Platform Mobile Apps (iOS & Android)",
                  "Enterprise ERP, CRM & Business Process Automation",
                  "Cloud Architecture, DevOps & High-Availability Migration",
                  "UI/UX Product Design, Prototyping & Design Systems",
                  "Comprehensive Cybersecurity Audits & Code Reviews",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-accent-dark font-bold" />
                    </div>
                    <span className="text-heading text-sm font-semibold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md shadow-primary/20 transition-all duration-200"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-heading font-semibold text-sm transition-all duration-200"
                >
                  <span>Book Free Consultation</span>
                </Link>
              </div>

              {/* Free Consultation Callout Card */}
              <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 flex items-center gap-4 mt-6">
                <div className="w-10 h-10 rounded-lg bg-primary text-accent flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-heading">
                    Have an upcoming project in mind?
                  </p>
                  <p className="text-body mt-0.5">
                    Our senior solutions architect will provide a free technical
                    scope and cost assessment within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Grid of Service Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service 1 */}
                <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-heading mb-2">
                    Web App Development
                  </h3>
                  <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
                    High-performance web apps built with Next.js, React,
                    Node.js, and TypeScript with fast load times and clean
                    architecture.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-primary font-semibold">
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      Next.js
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      TypeScript
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      PostgreSQL
                    </span>
                  </div>
                </div>

                {/* Service 2 */}
                <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent-dark flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-primary-900 transition-colors">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-heading mb-2">
                    Mobile App Engineering
                  </h3>
                  <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
                    Intuitive, buttery smooth iOS and Android mobile apps
                    developed using Flutter and React Native for fast time to
                    market.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-accent-dark font-semibold">
                    <span className="px-2 py-0.5 bg-amber-50 rounded">
                      Flutter
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 rounded">
                      React Native
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 rounded">
                      Firebase
                    </span>
                  </div>
                </div>

                {/* Service 3 */}
                <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-heading mb-2">
                    Enterprise ERP &amp; Automation
                  </h3>
                  <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
                    Custom business workflow automation, inventory management,
                    billing, and employee portals tailored to your operational
                    needs.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-primary font-semibold">
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      Python
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      FastAPI
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      Docker
                    </span>
                  </div>
                </div>

                {/* Service 4 */}
                <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-primary-light flex items-center justify-center mb-4 group-hover:bg-primary-light group-hover:text-white transition-colors">
                    <Server className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-heading mb-2">
                    Cloud &amp; DevOps
                  </h3>
                  <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
                    Scalable cloud setup on AWS and Google Cloud, CI/CD automated
                    deployment pipelines, container orchestration, and uptime
                    monitoring.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-primary font-semibold">
                    <span className="px-2 py-0.5 bg-primary-50 rounded">AWS</span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      CI/CD
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      Kubernetes
                    </span>
                  </div>
                </div>

                {/* Service 5 */}
                <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent-dark flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-primary-900 transition-colors">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-heading mb-2">
                    UI/UX &amp; Product Design
                  </h3>
                  <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
                    Human-centric UI/UX design, interactive prototypes, design
                    systems, and usability testing to turn casual visitors into
                    loyal users.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-accent-dark font-semibold">
                    <span className="px-2 py-0.5 bg-amber-50 rounded">
                      Figma
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 rounded">
                      Wireframing
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 rounded">
                      Design System
                    </span>
                  </div>
                </div>

                {/* Service 6 */}
                <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-heading mb-2">
                    Cybersecurity &amp; Audits
                  </h3>
                  <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
                    Application penetration testing, vulnerability discovery,
                    compliance checklists, and server hardening against digital
                    threats.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-primary font-semibold">
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      PenTesting
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      OWASP
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50 rounded">
                      SSL/TLS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY CHOOSE RESDA (4 Feature Blocks: Expert Trainers, Hands-on Projects, Industry Certifications, Job Placement Support)
          ========================================================================= */}
      <section className="section-padding bg-background relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-semibold text-xs tracking-wide uppercase mb-3">
              <Award className="w-3.5 h-3.5 text-accent" />
              The RESDA Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Why Aspiring Tech Leaders Choose RESDA
            </h2>
            <p className="mt-4 text-base sm:text-lg text-body">
              We merge deep academic pedagogy with commercial software
              engineering practices to ensure real career breakthroughs.
            </p>
          </div>

          {/* 4 Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Block 1: Expert Trainers */}
            <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-heading mb-3">
                Expert Trainers
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Learn directly from seasoned software architects and engineering
                leads with 8+ years of commercial track record in global and
                local tech companies.
              </p>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Active Industry Practitioners</span>
              </div>
            </div>

            {/* Block 2: Hands-on Projects */}
            <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-accent-dark flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary-900 transition-all duration-300 shadow-sm">
                <Laptop className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-heading mb-3">
                Hands-on Projects
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Build 5+ production-grade, deployed capstone applications
                addressing real business problems to showcase directly in your
                GitHub portfolio.
              </p>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-accent-dark flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>100% Practical GitHub Codebase</span>
              </div>
            </div>

            {/* Block 3: Industry Certifications */}
            <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-primary-light flex items-center justify-center mb-6 group-hover:bg-primary-dark group-hover:text-white transition-all duration-300 shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-heading mb-3">
                Industry Certifications
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Receive verifiable digital credentials recognized across
                software firms, government projects, and multinational tech
                recruiting panels.
              </p>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Globally Verifiable Certificates</span>
              </div>
            </div>

            {/* Block 4: Job Placement Support */}
            <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-heading mb-3">
                Job Placement Support
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Dedicated career counseling, resume polishing, mock technical
                interviews, and direct hiring referrals through our corporate
                partner network.
              </p>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>94% Placement Success Rate</span>
              </div>
            </div>
          </div>

          {/* Value Metric Highlights Bar */}
          <div className="mt-12 rounded-2xl bg-primary text-white p-6 sm:p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-accent">
                  94%
                </div>
                <div className="text-xs sm:text-sm font-medium text-primary-100 mt-1">
                  Placement Rate
                </div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-accent">
                  1:1
                </div>
                <div className="text-xs sm:text-sm font-medium text-primary-100 mt-1">
                  Mentorship Sessions
                </div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-accent">
                  100%
                </div>
                <div className="text-xs sm:text-sm font-medium text-primary-100 mt-1">
                  Hands-on Labs
                </div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-accent">
                  Lifetime
                </div>
                <div className="text-xs sm:text-sm font-medium text-primary-100 mt-1">
                  Alumni Community
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TESTIMONIALS SECTION (3 Testimonial Cards)
          ========================================================================= */}
      <section className="section-padding bg-surface relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 text-accent-dark font-semibold text-xs tracking-wide uppercase mb-3">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              Student Success Stories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
              What Our Graduates Say About Us
            </h2>
            <p className="mt-4 text-base sm:text-lg text-body">
              Read how RESDA&apos;s practical training helped students switch
              careers, earn promotions, and secure lucrative IT roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-heading text-sm sm:text-base leading-relaxed italic mb-8">
                  &ldquo;RESDA completely changed my career trajectory. The
                  hands-on React and Next.js projects helped me clear technical
                  interviews with confidence. The trainers were always
                  supportive whenever I hit roadblocks in state management and
                  backend APIs.&rdquo;
                </p>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {/* Colored circle placeholder with initials */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-light text-white font-bold flex items-center justify-center text-base shrink-0 shadow-md">
                  TR
                </div>
                <div>
                  <h4 className="font-bold text-heading text-base leading-tight">
                    Tanvir Rahman
                  </h4>
                  <p className="text-xs text-primary font-medium mt-0.5">
                    Full-Stack Web Graduate
                  </p>
                  <p className="text-[11px] text-body mt-0.5">
                    Software Engineer at TechVision
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-heading text-sm sm:text-base leading-relaxed italic mb-8">
                  &ldquo;Coming from a non-CS background, I was intimidated by
                  Python and math. RESDA&apos;s step-by-step guidance, patient
                  mentors, and real-world dataset analysis gave me the practical
                  skills I needed. I secured a Data Analyst role within two
                  months!&rdquo;
                </p>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {/* Colored circle placeholder with initials */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-accent-dark text-primary-900 font-bold flex items-center justify-center text-base shrink-0 shadow-md">
                  SK
                </div>
                <div>
                  <h4 className="font-bold text-heading text-base leading-tight">
                    Shamima Khatun
                  </h4>
                  <p className="text-xs text-accent-dark font-medium mt-0.5">
                    Data Science Graduate
                  </p>
                  <p className="text-[11px] text-body mt-0.5">
                    Data Analyst at FinTech Global
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-2xl bg-white border border-border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-heading text-sm sm:text-base leading-relaxed italic mb-8">
                  &ldquo;The offline training lab with state-of-the-art computers
                  and dedicated instructors made all the difference. Our
                  capstone Flutter app was published live on Google Play, which
                  became the strongest proof of skill in my client proposals.&rdquo;
                </p>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {/* Colored circle placeholder with initials */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-base shrink-0 shadow-md">
                  MH
                </div>
                <div>
                  <h4 className="font-bold text-heading text-base leading-tight">
                    Md. Hasan Mahmud
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5">
                    Mobile App Dev Graduate
                  </p>
                  <p className="text-[11px] text-body mt-0.5">
                    Mobile Engineer &amp; Freelancer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. PARTNERS / TRUSTED BY SECTION (Row of styled placeholder logos)
          ========================================================================= */}
      <section className="py-16 bg-background relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs sm:text-sm font-bold text-body uppercase tracking-widest">
              Trusted by Leading Organizations &amp; Hiring Partners
            </p>
          </div>

          {/* Row of styled placeholder company logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
            {[
              {
                name: "TechCorp Asia",
                role: "Hiring Partner",
                color: "group-hover:border-primary group-hover:text-primary",
              },
              {
                name: "Apex Digital",
                role: "Client Enterprise",
                color: "group-hover:border-accent group-hover:text-accent-dark",
              },
              {
                name: "NextGen Solutions",
                role: "Hiring Partner",
                color: "group-hover:border-primary group-hover:text-primary",
              },
              {
                name: "CloudNet Systems",
                role: "Tech Sponsor",
                color: "group-hover:border-emerald-500 group-hover:text-emerald-700",
              },
              {
                name: "Dhaka Softworks",
                role: "Hiring Partner",
                color: "group-hover:border-primary group-hover:text-primary",
              },
              {
                name: "Prime Global IT",
                role: "Solution Client",
                color: "group-hover:border-accent group-hover:text-accent-dark",
              },
            ].map((partner, index) => (
              <div
                key={index}
                className={`group p-4 rounded-xl bg-white border border-border text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-24 ${partner.color}`}
              >
                <span className="font-extrabold text-sm sm:text-base text-heading group-hover:text-primary transition-colors tracking-tight">
                  {partner.name}
                </span>
                <span className="text-[10px] uppercase font-semibold text-body mt-1">
                  {partner.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. NEWSLETTER CTA SECTION (Purple gradient background + interactive email form)
          ========================================================================= */}
      <section className="relative bg-hero-gradient text-white py-16 sm:py-20 overflow-hidden">
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-dark/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-30" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs sm:text-sm font-semibold mb-6">
            <Mail className="w-4 h-4 text-accent" />
            <span>Join Our Tech Community</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Stay Ahead in the Fast-Paced Tech World
          </h2>

          <p className="mt-4 text-base sm:text-lg text-primary-100 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive course discounts, free
            workshop invitations, code tutorials, and weekly IT career insights.
          </p>

          {/* Interactive Form */}
          <form
            onSubmit={handleNewsletterSubmit}
            className="mt-8 sm:mt-10 max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus === "error") setNewsletterStatus("idle");
                  }}
                  placeholder="Enter your personal or work email..."
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-heading placeholder-gray-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-4 focus:ring-accent/50 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-primary-900 font-bold text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 transform hover:-translate-y-0.5 transition-all duration-200 shrink-0 disabled:opacity-75"
              >
                {newsletterStatus === "loading" ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Validation / Success Messages */}
            {newsletterStatus === "success" && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 font-bold" />
                <span>
                  Thank you for subscribing! Check your inbox for free tech
                  resources.
                </span>
              </div>
            )}

            {newsletterStatus === "error" && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-400/40 text-red-200 text-sm font-medium">
                Please enter a valid email address.
              </div>
            )}

            {/* Trust Perks Under Form */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-primary-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Free weekly workshops
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                No spam ever
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Unsubscribe anytime
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
