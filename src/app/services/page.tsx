import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Code,
  Smartphone,
  Palette,
  TrendingUp,
  Search,
  Cloud,
  Shield,
  Wrench,
  Network,
  Database,
  Settings,
  Compass,
  Rocket,
  ChevronRight,
  Home,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
  ShieldCheck,
  Headphones,
  Award,
  Layers,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "IT Services - Comprehensive Technology Solutions",
  description:
    "Explore RESDA's comprehensive suite of 12 IT services: Web Development, Custom Software, Mobile Apps, UI/UX, Cloud Solutions, Cyber Security, IT Support, Network Management, and more.",
  keywords: [
    "IT services Bangladesh",
    "web development services",
    "software development",
    "mobile app development",
    "UI UX design",
    "cyber security",
    "cloud solutions",
    "network management",
    "IT support and maintenance",
    "database solutions",
    "RESDA IT services",
  ],
};

interface ServiceItem {
  id: string;
  icon: typeof Globe;
  title: string;
  category: string;
  description: string;
  features: string[];
  slug: string;
  highlight?: boolean;
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-development",
    icon: Globe,
    title: "Web Development Services",
    category: "Web & Digital",
    description:
      "Modern, ultra-responsive, and high-performance websites and web applications built with cutting-edge frameworks. We engineer scalable digital platforms optimized for conversions, speed, and seamless cross-device compatibility.",
    features: [
      "Custom Web Applications & Enterprise Portals",
      "Responsive, Mobile-First & Accessible UI",
      "E-Commerce & Secure Payment Gateway Integration",
      "Core Web Vitals & Speed Optimization",
    ],
    slug: "web-development",
    highlight: true,
  },
  {
    id: "software-development",
    icon: Code,
    title: "Software Development",
    category: "Engineering",
    description:
      "End-to-end custom software engineering designed to solve mission-critical business challenges and automate workflows. We build resilient, modular systems using clean architecture and automated quality assurance.",
    features: [
      "Enterprise Resource Planning (ERP) & CRM Systems",
      "Business Process & Workflow Automation",
      "Scalable Microservices & REST/GraphQL API Design",
      "Legacy Code Modernization & Refactoring",
    ],
    slug: "software-development",
    highlight: true,
  },
  {
    id: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile App Development",
    category: "Mobile",
    description:
      "Native and cross-platform mobile apps for iOS and Android that deliver engaging, frictionless user experiences. We leverage React Native and Flutter to ship robust applications with native-tier performance.",
    features: [
      "iOS & Android App Engineering (Swift & Kotlin)",
      "Cross-Platform Apps with Flutter & React Native",
      "Offline-First Data Storage & Real-Time Sync",
      "App Store & Google Play Deployment & Support",
    ],
    slug: "mobile-apps",
    highlight: true,
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design Services",
    category: "Product Design",
    description:
      "User-centered digital product design that bridges aesthetic brilliance with effortless usability. We craft clickable prototypes, design systems, and intuitive interfaces that maximize customer retention.",
    features: [
      "User Research, Personas & Journey Mapping",
      "Interactive Wireframing & Clickable Prototypes",
      "Comprehensive Multi-Platform Design Systems",
      "Usability Testing & Conversion Rate Optimization",
    ],
    slug: "ui-ux-design",
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing Services",
    category: "Growth",
    description:
      "Data-driven marketing campaigns that elevate your brand visibility and generate predictable customer pipelines. From multi-channel social media ads to automated email journeys, we maximize your marketing ROI.",
    features: [
      "Multi-Platform Social Media Strategy & Ads",
      "Google Search & Display PPC Campaign Management",
      "Conversion Funnel Strategy & Tracking Analytics",
      "High-Impact Content Strategy & Copywriting",
    ],
    slug: "digital-marketing",
  },
  {
    id: "seo-services",
    icon: Search,
    title: "SEO Services",
    category: "Organic Search",
    description:
      "Strategic search engine optimization that elevates your domain to the top of Google organic rankings. We combine thorough technical audits, strategic keyword targeting, and authoritative backlink building.",
    features: [
      "Technical SEO Audits & Core Web Vitals Fixes",
      "Keyword Research & Competitive Intelligence",
      "On-Page Optimization & Schema Structured Data",
      "Local SEO & Google Business Profile Mastery",
    ],
    slug: "seo-services",
  },
  {
    id: "cloud-solutions",
    icon: Cloud,
    title: "Cloud Solutions",
    category: "Infrastructure",
    description:
      "Scalable, resilient cloud architecture and zero-downtime migration powered by AWS, Microsoft Azure, and Google Cloud. Reduce operational overhead while gaining elastic compute capacity and enterprise uptime.",
    features: [
      "Cloud Migration & Infrastructure Architecture",
      "Containerization with Docker & Kubernetes (K8s)",
      "Automated CI/CD Deployment Pipelines (DevOps)",
      "Cost Optimization & 24/7 Cloud Monitoring",
    ],
    slug: "cloud-solutions",
  },
  {
    id: "cyber-security",
    icon: Shield,
    title: "Cyber Security Services",
    category: "Security",
    description:
      "Proactive security evaluations, vulnerability assessments, and threat defense to protect your mission-critical infrastructure. Protect your business from malicious breaches and maintain compliance with global standards.",
    features: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Enterprise Security Audits & Compliance Reviews",
      "Zero-Trust Architecture & Data Encryption",
      "Incident Response Planning & 24/7 Threat Defense",
    ],
    slug: "cyber-security",
  },
  {
    id: "it-support-maintenance",
    icon: Wrench,
    title: "IT Support & Maintenance",
    category: "Managed Support",
    description:
      "Reliable round-the-clock technical support and proactive system maintenance designed to keep your business operating without disruption. Our engineers resolve bottlenecks before they impact your users.",
    features: [
      "24/7 Technical Helpdesk & Remote Support SLA",
      "Continuous Server Patching & Security Updates",
      "Automated Backup Management & Disaster Recovery",
      "Hardware Diagnostics & Software Fleet Management",
    ],
    slug: "it-support",
  },
  {
    id: "network-setup-management",
    icon: Network,
    title: "Network Setup & Management",
    category: "Networking",
    description:
      "Enterprise networking solutions engineered for high bandwidth, security, and stability. We design, configure, and maintain LAN/WAN topologies, managed firewalls, and encrypted corporate VPN tunnels.",
    features: [
      "Structured Cabling, LAN & WAN Architecture",
      "Next-Gen Enterprise Firewall & Secure VPN Setup",
      "High-Density Office Wi-Fi Design & Tuning",
      "Network Bandwidth Optimization & Traffic Auditing",
    ],
    slug: "network-management",
  },
  {
    id: "database-solutions",
    icon: Database,
    title: "Database Solutions",
    category: "Data Systems",
    description:
      "Enterprise database architecture, administration, migration, and performance optimization for SQL and NoSQL engines. We ensure your mission-critical data remains blazingly fast, fault-tolerant, and secure.",
    features: [
      "High-Performance Schema Design & Query Tuning",
      "Relational (PostgreSQL, MySQL) & NoSQL (MongoDB, Redis)",
      "Zero-Loss Data Migration & Multi-Region Replication",
      "Automated Failover & High Availability Clustering",
    ],
    slug: "database-solutions",
  },
  {
    id: "custom-software-solutions",
    icon: Settings,
    title: "Custom Software Solutions",
    category: "Bespoke Systems",
    description:
      "Bespoke software built precisely to match your unique operational workflows when standard commercial software falls short. We engineer tailor-made digital tools that fit your exact business goals.",
    features: [
      "Custom Internal Portals & Departmental Dashboards",
      "Supply Chain & Multi-Branch Inventory Systems",
      "Custom Middleware & Third-Party API Bridges",
      "Dedicated Engineering Support & SLA Backing",
    ],
    slug: "custom-software",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Strategy",
    icon: Compass,
    description:
      "We begin by thoroughly understanding your business objectives, operational workflows, and technical constraints to formulate a detailed project roadmap, architecture plan, and clear milestones.",
    deliverables: ["Requirement Analysis", "Technical Scope", "Milestone Roadmap"],
  },
  {
    step: "02",
    title: "UI/UX & Architecture Design",
    icon: Palette,
    description:
      "Our designers and system architects craft intuitive wireframes, clickable prototypes, and database schemas to ensure optimal user experience and scalable system structure before coding begins.",
    deliverables: ["Wireframes & Prototypes", "Database Schema", "Design System"],
  },
  {
    step: "03",
    title: "Agile Development & QA",
    icon: Code,
    description:
      "We build clean, robust code in agile 2-week sprints with continuous integration, automated unit and integration tests, strict code reviews, and regular transparent demo sessions for your team.",
    deliverables: ["Sprint Demos", "Automated QA Tests", "CI/CD Pipeline"],
  },
  {
    step: "04",
    title: "Deployment & Ongoing Support",
    icon: Rocket,
    description:
      "We orchestrate smooth production rollout with zero downtime, provide hands-on user training, and back your product with proactive 24/7 monitoring, security updates, and SLA guarantees.",
    deliverables: ["Zero-Downtime Launch", "User Documentation", "Post-Launch SLA"],
  },
];

const TECH_CATEGORIES = [
  {
    name: "Frontend & Mobile",
    description: "Modern frameworks for blazing-fast user interfaces",
    items: [
      { name: "React", tag: "Library", color: "#61DAFB" },
      { name: "Next.js", tag: "Framework", color: "#000000" },
      { name: "Vue.js", tag: "Framework", color: "#42B883" },
      { name: "TypeScript", tag: "Language", color: "#3178C6" },
      { name: "Tailwind CSS", tag: "Styling", color: "#06B6D4" },
      { name: "Flutter", tag: "Mobile SDK", color: "#02569B" },
      { name: "React Native", tag: "Mobile", color: "#61DAFB" },
      { name: "iOS / Swift", tag: "Native", color: "#F05138" },
      { name: "Android / Kotlin", tag: "Native", color: "#7F52FF" },
    ],
  },
  {
    name: "Backend & APIs",
    description: "Robust servers, microservices, and secure APIs",
    items: [
      { name: "Node.js", tag: "Runtime", color: "#339933" },
      { name: "Python", tag: "Language", color: "#3776AB" },
      { name: "Django", tag: "Framework", color: "#092E20" },
      { name: "FastAPI", tag: "Framework", color: "#009688" },
      { name: "Express.js", tag: "Framework", color: "#4A4A4A" },
      { name: "PHP / Laravel", tag: "Framework", color: "#FF2D20" },
      { name: "Java Spring Boot", tag: "Enterprise", color: "#6DB33F" },
      { name: "Go / Golang", tag: "Language", color: "#00ADD8" },
      { name: "REST & GraphQL", tag: "APIs", color: "#E10098" },
    ],
  },
  {
    name: "Cloud & DevOps",
    description: "Scalable cloud infrastructure and automated pipelines",
    items: [
      { name: "AWS", tag: "Cloud", color: "#FF9900" },
      { name: "Microsoft Azure", tag: "Cloud", color: "#0078D4" },
      { name: "Google Cloud", tag: "Cloud", color: "#4285F4" },
      { name: "Docker", tag: "Containers", color: "#2496ED" },
      { name: "Kubernetes", tag: "Orchestration", color: "#326CE5" },
      { name: "GitHub Actions", tag: "CI/CD", color: "#2088FF" },
      { name: "Nginx", tag: "Web Server", color: "#009639" },
      { name: "Terraform", tag: "IaC", color: "#7B42BC" },
      { name: "Linux / Ubuntu", tag: "OS", color: "#E95420" },
    ],
  },
  {
    name: "Databases & Security",
    description: "High-performance data storage and enterprise security",
    items: [
      { name: "PostgreSQL", tag: "SQL", color: "#4169E1" },
      { name: "MongoDB", tag: "NoSQL", color: "#47A248" },
      { name: "MySQL", tag: "SQL", color: "#4479A1" },
      { name: "Redis", tag: "In-Memory", color: "#DC382D" },
      { name: "Supabase", tag: "BaaS", color: "#3ECF8E" },
      { name: "Firebase", tag: "Platform", color: "#FFCA28" },
      { name: "OpenSSL / TLS", tag: "Security", color: "#721412" },
      { name: "Cloudflare", tag: "CDN & WAF", color: "#F38020" },
      { name: "Elasticsearch", tag: "Search", color: "#005571" },
    ],
  },
];

const VALUE_PROPOSITIONS = [
  {
    icon: Award,
    title: "Senior Engineering Talent",
    description:
      "Work directly with seasoned software architects, certified cloud engineers, and UX researchers with a proven track record across South Asia and global markets.",
  },
  {
    icon: Layers,
    title: "Agile & Transparent Delivery",
    description:
      "Bi-weekly sprint demos, shared code repositories, and real-time project management dashboards ensure you are always in complete control of project progress.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security & NDA",
    description:
      "Your intellectual property is protected by strict non-disclosure agreements, end-to-end data encryption, and secure development lifecycle practices.",
  },
  {
    icon: Headphones,
    title: "Guaranteed SLA & Support",
    description:
      "We stand firmly behind our deliverables with comprehensive post-deployment support, SLA uptime guarantees, and responsive 24/7 technical incident assistance.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Page Header */}
      <section className="relative bg-hero-gradient text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Decorative background glows and subtle accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(123,79,174,0.35),transparent_50%)] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-primary-200 mb-6"
          >
            <Link
              href="/"
              className="hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
            <span className="text-white font-medium">IT Services</span>
          </nav>

          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-medium text-xs sm:text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Enterprise & SME Technology Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Our <span className="text-accent">IT Services</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-primary-100 leading-relaxed max-w-2xl">
              From robust enterprise web applications to scalable cloud infrastructure and cybersecurity, RESDA delivers end-to-end technology solutions tailored to accelerate your business growth. Our seasoned engineers turn your vision into reliable, high-performance digital reality.
            </p>

            {/* Quick highlight pills */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-primary-100">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                <Check className="w-4 h-4 text-accent" />
                <span>12 Core Technology Domains</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                <Check className="w-4 h-4 text-accent" />
                <span>Agile Development & Delivery</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                <Check className="w-4 h-4 text-accent" />
                <span>24/7 Dedicated SLA Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Grid Section */}
      <section id="services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary-50 px-3.5 py-1.5 rounded-full mb-3 border border-primary-100">
            What We Deliver
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading">
            Comprehensive IT Solutions for Modern Enterprises
          </h2>
          <p className="mt-4 text-body text-base sm:text-lg leading-relaxed">
            Whether you require a complete digital transformation, a scalable mobile app, or managed cloud security, our multidisciplinary teams deliver custom solutions built for reliability and impact.
          </p>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                className="group relative bg-surface rounded-2xl p-7 sm:p-8 border border-primary-100/70 shadow-xs card-hover flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-primary/40"
              >
                {/* Subtle top gradient accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar with Icon and Category Tag */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-xs">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-medium text-primary-dark/80 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-heading group-hover:text-primary transition-colors duration-200 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="pt-5 border-t border-gray-100 mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-700 mb-3">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-heading/90 leading-snug"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-gray-100 mt-2">
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm text-primary bg-primary-50 hover:bg-primary hover:text-white transition-all duration-200 group-hover:shadow-xs"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Our Process Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary-50 px-3.5 py-1.5 rounded-full mb-3 border border-primary-100">
              Our Proven Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading">
              How We Deliver Excellence
            </h2>
            <p className="mt-4 text-body text-base sm:text-lg leading-relaxed">
              Our structured 4-step engineering lifecycle guarantees predictable timelines, crystal-clear communication, and robust deliverables at every phase.
            </p>
          </div>

          {/* 4 Steps in Horizontal Flow */}
          <div className="relative">
            {/* Desktop Horizontal Connecting Line */}
            <div
              className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 border-t-2 border-dashed border-primary-200 -z-0"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {PROCESS_STEPS.map((stepItem) => {
                const StepIcon = stepItem.icon;
                return (
                  <div
                    key={stepItem.step}
                    className="bg-background rounded-2xl p-6 sm:p-7 border border-primary-100/60 card-hover flex flex-col justify-between"
                  >
                    <div>
                      {/* Step Icon Badge & Number */}
                      <div className="relative w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-md shadow-primary/20">
                        <StepIcon className="w-8 h-8" />
                        <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-accent text-primary-dark font-extrabold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                          {stepItem.step}
                        </span>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-lg font-bold text-heading mb-3">
                        {stepItem.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-body text-sm leading-relaxed mb-6">
                        {stepItem.description}
                      </p>
                    </div>

                    {/* Deliverables tags */}
                    <div className="pt-4 border-t border-gray-200/70">
                      <span className="text-xs font-semibold text-primary block mb-2">
                        Key Deliverables:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {stepItem.deliverables.map((d, i) => (
                          <span
                            key={i}
                            className="inline-block text-[11px] font-medium bg-white px-2 py-0.5 rounded-md border border-gray-200 text-heading"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Partner With RESDA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary-50 px-3.5 py-1.5 rounded-full mb-3 border border-primary-100">
            Why Choose RESDA
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading">
            Engineering Standards You Can Rely On
          </h2>
          <p className="mt-4 text-body text-base sm:text-lg leading-relaxed">
            We merge domain expertise with dedicated accountability to ensure every software product and IT service we deliver exceeds expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PROPOSITIONS.map((prop, idx) => {
            const PropIcon = prop.icon;
            return (
              <div
                key={idx}
                className="bg-surface rounded-2xl p-6 border border-primary-100/70 shadow-xs card-hover flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-4">
                  <PropIcon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-heading mb-2">
                  {prop.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Technology Stack */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary-50 px-3.5 py-1.5 rounded-full mb-3 border border-primary-100">
              Technology Stack
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading">
              Modern Technologies & Enterprise Frameworks
            </h2>
            <p className="mt-4 text-body text-base sm:text-lg leading-relaxed">
              We leverage modern, battle-tested programming languages, cloud platforms, and security tools to build dependable software for long-term scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TECH_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="bg-background rounded-2xl p-6 sm:p-8 border border-primary-100/60 card-hover"
              >
                <div className="mb-5 pb-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-heading">
                    {cat.name}
                  </h3>
                  <p className="text-body text-xs sm:text-sm mt-1">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((tech, techIdx) => (
                    <div
                      key={techIdx}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-2xs hover:border-primary/50 hover:shadow-xs transition-all duration-200"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: tech.color }}
                      />
                      <span className="text-xs sm:text-sm font-semibold text-heading">
                        {tech.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-primary-light bg-primary-50 px-1.5 py-0.5 rounded">
                        {tech.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="relative bg-hero-gradient text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-dark/80 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-medium text-xs sm:text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Ready to Build Something Remarkable?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Have a Project in Mind?
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-primary-100 leading-relaxed mb-10">
            Whether you need a custom web application, enterprise software overhaul, mobile application, or proactive cloud security management, our engineering team is here to help you succeed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-primary-dark font-bold text-base hover:bg-accent-light shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Get a Free Project Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="tel:+8801700000000"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-xs border border-white/20 transition-all duration-200"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span>Call Us: +880 1700-000000</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-primary-200">
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-accent" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-accent" />
              <span>Strict NDA Protected</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-accent" />
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-accent" />
              <span>South Asia & Global Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
