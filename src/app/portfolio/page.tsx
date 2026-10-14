"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  Users,
  Globe,
  Award,
  Star,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  X,
  Code2,
  Smartphone,
  Laptop,
  Palette,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Building,
  Sparkles,
} from "lucide-react";

// Portfolio Categories
type Category =
  | "All"
  | "Web Development"
  | "Mobile Apps"
  | "Software"
  | "UI/UX Design"
  | "Digital Marketing";

interface Project {
  id: string;
  title: string;
  client: string;
  category: Category;
  description: string;
  detailedDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  duration: string;
  year: string;
  statsHighlight: {
    label: string;
    value: string;
  };
  gradient: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  icon: typeof Code2;
}

const CATEGORIES: Category[] = [
  "All",
  "Web Development",
  "Mobile Apps",
  "Software",
  "UI/UX Design",
  "Digital Marketing",
];

const PROJECTS: Project[] = [
  {
    id: "ecommerce-platform",
    title: "Enterprise E-Commerce Platform",
    client: "Apex Global Retail",
    category: "Web Development",
    description:
      "A scalable multi-vendor e-commerce platform with real-time inventory management, automated order fulfillment, and multi-currency checkout.",
    detailedDescription:
      "Apex Global needed an enterprise-grade digital storefront capable of handling 50,000+ daily concurrent shoppers, synchronized inventory across 14 physical warehouse hubs, and lightning-fast checkout.",
    challenge:
      "Slow legacy monolithic infrastructure caused cart abandonment during flash sale campaigns, along with frequent stock discrepancies between physical outlets and online listings.",
    solution:
      "Engineered a headless commerce solution using Next.js on the frontend, resilient microservices with Node.js on AWS, Redis caching, and integrated multi-channel payment gateways.",
    results: [
      "99.98% uptime achieved during Black Friday sale events",
      "Page load speed accelerated from 4.8s to 0.9s",
      "62% increase in mobile checkout conversion rate",
    ],
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe API", "Tailwind CSS"],
    duration: "4 Months",
    year: "2024",
    statsHighlight: {
      label: "Conversion Boost",
      value: "+62%",
    },
    gradient: "from-purple-600 via-indigo-600 to-blue-700",
    accentColor: "text-purple-600",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    badgeText: "text-purple-700",
    icon: Laptop,
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management & EMR System",
    client: "City General Hospital & Diagnostics",
    category: "Software",
    description:
      "Comprehensive electronic medical records (EMR), patient admission, doctor scheduling, diagnostic lab reporting, and automated pharmacy billing.",
    detailedDescription:
      "A multi-specialty healthcare facility operating 400 beds required a secure, HIPAA-compliant clinical operations platform to eliminate paper records and coordinate doctor rotations.",
    challenge:
      "Fragmented paperwork led to delayed test reporting, double-booked operating theaters, and inefficient patient transfer communications across departments.",
    solution:
      "Built a secure web and intranet portal utilizing Python and Django, with role-based access control (RBAC), automated HL7-compatible diagnostic lab sync, and SMS patient notifications.",
    results: [
      "Patient waiting queue times slashed by 45%",
      "100% paperless diagnostic workflow across 18 departments",
      "Over 120,000 secure medical records handled seamlessly",
    ],
    techStack: ["Python", "Django", "PostgreSQL", "Docker", "Redis", "Celery", "Tailwind CSS"],
    duration: "6 Months",
    year: "2024",
    statsHighlight: {
      label: "Wait Time Cut",
      value: "-45%",
    },
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    accentColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeText: "text-emerald-700",
    icon: Code2,
  },
  {
    id: "food-delivery-app",
    title: "On-Demand Food Delivery Platform",
    client: "QuickBite Express",
    category: "Mobile Apps",
    description:
      "High-speed on-demand food delivery app featuring live driver GPS tracking, instant kitchen order dispatch, and integrated cashless payments.",
    detailedDescription:
      "QuickBite Express connects hungry urban foodies with over 350 local restaurants, offering a 30-minute delivery guarantee with real-time rider tracking.",
    challenge:
      "High battery drain and erratic GPS geolocation on budget Android devices caused missed deliveries and frustrated consumers.",
    solution:
      "Created cross-platform iOS and Android applications with Flutter, powered by Firebase real-time database listeners and optimized Google Maps geofencing algorithms.",
    results: [
      "Over 75,000 active monthly app users",
      "Average dispatch time lowered to under 4.2 minutes",
      "4.8/5 App Store & Play Store user satisfaction rating",
    ],
    techStack: ["Flutter", "Dart", "Firebase", "Node.js", "Google Maps API", "WebSockets"],
    duration: "3.5 Months",
    year: "2023",
    statsHighlight: {
      label: "Active Users",
      value: "75K+",
    },
    gradient: "from-amber-500 via-orange-600 to-red-600",
    accentColor: "text-orange-600",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    badgeText: "text-orange-700",
    icon: Smartphone,
  },
  {
    id: "banking-dashboard",
    title: "Next-Gen Fintech Banking Dashboard",
    client: "TrustBank International",
    category: "UI/UX Design",
    description:
      "Modern fintech banking interface with high-contrast accessibility, financial analytics visualization, and streamlined wire transfer workflows.",
    detailedDescription:
      "TrustBank required an ultra-clean corporate dashboard design for institutional clients managing multi-account cash flows, treasury limits, and global FX wires.",
    challenge:
      "Financial administrators found legacy interfaces cluttered, leading to human entry errors and time-consuming compliance authorizations.",
    solution:
      "Crafted an exhaustive design system in Figma encompassing 140+ reusable design tokens, WCAG AAA accessibility compliance, and interactive data visualization dashboards.",
    results: [
      "94% usability testing benchmark score across 80 corporate treasurers",
      "Wire transfer execution steps reduced from 8 clicks to 3 clicks",
      "Adopted as the bank's core global design standard",
    ],
    techStack: ["Figma", "Design Systems", "Prototyping", "User Research", "WCAG AAA", "Micro-Interactions"],
    duration: "2.5 Months",
    year: "2024",
    statsHighlight: {
      label: "Usability Score",
      value: "94%",
    },
    gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
    accentColor: "text-purple-600",
    badgeBg: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    badgeText: "text-fuchsia-700",
    icon: Palette,
  },
  {
    id: "restaurant-chain-website",
    title: "Multi-Location Restaurant Group Website",
    client: "Royal Spice Dining Group",
    category: "Web Development",
    description:
      "Elegant dining chain portal featuring interactive table reservations, multi-location digital menus, and private banqueting event bookings.",
    detailedDescription:
      "A hospitality group managing 6 boutique restaurants wanted a unified digital identity that showcased their culinary heritage and drove direct table reservations.",
    challenge:
      "Heavy dependence on 3rd party booking portals took 15-20% commission per reservation and failed to capture repeat customer dining preferences.",
    solution:
      "Built a blazing fast Next.js static and dynamic web experience with integrated Sanity CMS for daily menu updates and a custom SMS-confirmed table reservation engine.",
    results: [
      "400+ online table reservations processed weekly with zero commissions",
      "Direct catering inquiries increased by 130%",
      "Sub-second load times on mobile across all restaurant branches",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Sanity CMS", "Vercel", "Twilio SMS", "TypeScript"],
    duration: "2 Months",
    year: "2023",
    statsHighlight: {
      label: "Direct Bookings",
      value: "+130%",
    },
    gradient: "from-rose-600 via-pink-600 to-amber-600",
    accentColor: "text-rose-600",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    badgeText: "text-rose-700",
    icon: Laptop,
  },
  {
    id: "inventory-management-system",
    title: "Enterprise ERP & Inventory System",
    client: "TransLogistics & Warehousing Ltd.",
    category: "Software",
    description:
      "Enterprise inventory automation suite with barcode scanning, warehouse multi-zone tracking, automated audits, and predictive restocking alerts.",
    detailedDescription:
      "A regional logistics hub handling 150,000 sq ft of cold chain and dry cargo needed unified management software to track incoming consignments and fleet loading.",
    challenge:
      "Manual ledger reconciliations caused warehouse bottlenecks, shipment misplacements, and slow turnaround times for freight clients.",
    solution:
      "Developed a mission-critical enterprise desktop and web application using .NET Core, SQL Server, and handheld Bluetooth scanner integrations with automated audit trails.",
    results: [
      "99.4% warehouse item location precision verified by external audit",
      "Order picking cycle time reduced from 22 minutes to 7 minutes",
      "Automated stock-out warnings prevented $180,000 in supply shortages",
    ],
    techStack: [".NET Core", "C#", "SQL Server", "Angular", "Azure Cloud", "Docker"],
    duration: "5 Months",
    year: "2023",
    statsHighlight: {
      label: "Picking Speed",
      value: "3x Faster",
    },
    gradient: "from-blue-600 via-sky-600 to-cyan-700",
    accentColor: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    badgeText: "text-blue-700",
    icon: Code2,
  },
  {
    id: "fitness-tracking-app",
    title: "AI-Powered Fitness & Wellness App",
    client: "FitPulse Health Club",
    category: "Mobile Apps",
    description:
      "Cross-platform wellness application with AI-driven personalized workout routines, biometric wearable sync, and interactive community fitness challenges.",
    detailedDescription:
      "FitPulse sought to bridge the gap between their in-gym trainers and members at home through an intelligent daily coaching app that adapts to user energy levels.",
    challenge:
      "High churn rate among gym beginners who lacked guided support between scheduled physical coaching sessions.",
    solution:
      "Engineered a React Native mobile application integrating Apple HealthKit & Google Fit APIs, AI-tailored meal/workout recommendations, and real-time community leaderboards.",
    results: [
      "Over 45,000 active app members with 81% 30-day retention rate",
      "Biometric tracking sync for 12 popular smartwatches and bands",
      "Named 'App of the Week' on regional lifestyle tech publications",
    ],
    techStack: ["React Native", "TypeScript", "Node.js", "GraphQL", "AWS Amplify", "HealthKit"],
    duration: "4 Months",
    year: "2024",
    statsHighlight: {
      label: "User Retention",
      value: "81%",
    },
    gradient: "from-teal-600 via-emerald-600 to-green-600",
    accentColor: "text-teal-600",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    badgeText: "text-teal-700",
    icon: Smartphone,
  },
  {
    id: "real-estate-portal",
    title: "Smart Property & Real Estate Portal",
    client: "PrimeHaven Properties",
    category: "Web Development",
    description:
      "Property discovery and brokerage portal featuring 3D virtual walkthroughs, mortgage calculators, and direct agent video scheduling.",
    detailedDescription:
      "PrimeHaven wanted to revolutionize residential and commercial real estate purchases with rich interactive maps, floor plan navigators, and transparent buyer escrow steps.",
    challenge:
      "Prospective buyers struggled with misleading property photos and slow responses from individual real estate listing agents.",
    solution:
      "Crafted a full-stack MERN portal featuring interactive Mapbox geospatial mapping, high-definition panoramic tours, automated valuation calculators, and verified agent badges.",
    results: [
      "Property lead inquiry conversion skyrocketed by 88%",
      "Over 12,000 verified property listings active in database",
      "Average time on site tripled to 6.4 minutes per visitor",
    ],
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "Mapbox GL", "AWS S3", "Tailwind CSS"],
    duration: "4.5 Months",
    year: "2023",
    statsHighlight: {
      label: "Lead Inquiries",
      value: "+88%",
    },
    gradient: "from-indigo-600 via-blue-700 to-slate-800",
    accentColor: "text-indigo-600",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    badgeText: "text-indigo-700",
    icon: Laptop,
  },
  {
    id: "social-media-campaign",
    title: "Omnichannel Growth & Marketing Campaign",
    client: "Aura Lifestyle Brands",
    category: "Digital Marketing",
    description:
      "Full-funnel digital growth campaign delivering 340% increase in brand reach, conversion-optimized landing pages, and viral social media engagement.",
    detailedDescription:
      "Aura Lifestyle launched a new premium consumer goods line and needed high-velocity market penetration across digital, social, and search channels.",
    challenge:
      "High customer acquisition costs (CAC) through generic paid ad bidding with poor return on ad spend (ROAS).",
    solution:
      "Devised a hyper-targeted meta and Google performance marketing strategy paired with custom conversion-focused landing pages, automated email nurturing, and influencer co-campaigns.",
    results: [
      "340% overall boost in online reach and impressions",
      "Return on Ad Spend (ROAS) improved from 1.8x to 5.2x",
      "Generated over 18,500 qualified leads in first 90 days",
    ],
    techStack: ["Meta Ads Manager", "Google Ads", "Google Analytics 4", "SEO", "Klaviyo", "Canva Pro"],
    duration: "Ongoing (6 Mo)",
    year: "2024",
    statsHighlight: {
      label: "ROAS Return",
      value: "5.2x",
    },
    gradient: "from-pink-600 via-rose-600 to-purple-700",
    accentColor: "text-pink-600",
    badgeBg: "bg-pink-50 text-pink-700 border-pink-200",
    badgeText: "text-pink-700",
    icon: TrendingUp,
  },
];

const STATS = [
  {
    number: "100+",
    label: "Projects Completed",
    description: "Across diverse industries and modern tech stacks",
    icon: Layers,
  },
  {
    number: "80+",
    label: "Satisfied Clients",
    description: "Startups, SMEs, and enterprise leaders",
    icon: Users,
  },
  {
    number: "12+",
    label: "Countries Served",
    description: "Delivering solutions across South Asia & globally",
    icon: Globe,
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    description: "Verified on-time delivery & ongoing support",
    icon: Award,
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "RESDA's custom Hospital Management System transformed our clinical operations. Their engineering team delivered an EMR and diagnostic billing solution that reduced our patient wait times by 45% and handles thousands of patient encounters daily with zero downtime.",
    name: "Dr. Tariq Rahman",
    role: "Medical Director",
    company: "City General Hospital & Diagnostics",
    location: "Dhaka, Bangladesh",
    project: "Hospital Management & EMR System",
    rating: 5,
    avatarText: "TR",
    avatarBg: "bg-emerald-700",
  },
  {
    id: "t2",
    quote:
      "Partnering with RESDA for our multi-vendor e-commerce platform was one of the best technical decisions we made. From high-concurrency checkout handling to real-time inventory synchronization, they delivered a rock-solid product on schedule.",
    name: "Sarah Jenkins",
    role: "VP of Digital Operations",
    company: "Apex Global Retail",
    location: "Singapore & Regional",
    project: "Enterprise E-Commerce Platform",
    rating: 5,
    avatarText: "SJ",
    avatarBg: "bg-purple-700",
  },
  {
    id: "t3",
    quote:
      "The food delivery mobile application built by RESDA exceeded all our expectations. Real-time driver GPS tracking and instant kitchen dispatch run flawlessly. Their engineering discipline and code quality rival top international tech agencies.",
    name: "Mahbubul Alam",
    role: "Founder & CEO",
    company: "QuickBite Express",
    location: "Chittagong, Bangladesh",
    project: "On-Demand Food Delivery App",
    rating: 5,
    avatarText: "MA",
    avatarBg: "bg-orange-600",
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  // Calculate count per category for tabs
  const getCategoryCount = (cat: Category) => {
    if (cat === "All") return PROJECTS.length;
    return PROJECTS.filter((p) => p.category === cat).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Page Header */}
      <section className="relative bg-hero-gradient text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Decorative background grid and blurs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(123,79,174,0.3),transparent_50%)]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-primary-200 mb-6"
          >
            <Link
              href="/"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-primary-300" />
            <span className="text-white font-medium">Portfolio</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-medium text-xs sm:text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Proven Track Record • 100+ Digital Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Our <span className="text-accent">Portfolio</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-primary-100 leading-relaxed max-w-2xl">
              Explore how we help ambitious startups, forward-thinking enterprises,
              and healthcare institutions turn complex challenges into sleek,
              high-performance digital realities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* 2. Category Filter Tabs */}
        <div className="mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-heading">
                Featured Case Studies
              </h2>
              <p className="text-sm text-body mt-0.5">
                Showing {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "project" : "projects"}{" "}
                {selectedCategory !== "All" && `in ${selectedCategory}`}
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-primary bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>South Asia & International Clients</span>
            </div>
          </div>

          {/* Horizontal Scrollable Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((category) => {
              const count = getCategoryCount(category);
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25 ring-2 ring-primary/20 scale-[1.02]"
                      : "bg-surface text-body hover:text-heading hover:bg-primary-50/60 border border-gray-200"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-body group-hover:bg-primary-100 group-hover:text-primary"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Portfolio Grid - 9 Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const ProjectIcon = project.icon;

            return (
              <div
                key={project.id}
                className="group flex flex-col bg-surface rounded-2xl border border-gray-200 overflow-hidden card-hover transition-all duration-300"
              >
                {/* Large Colored Gradient Placeholder (representing project screenshot) */}
                <div
                  className={`relative h-56 sm:h-60 w-full bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Subtle Background Pattern Elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)]" />
                  <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl transform group-hover:scale-125 transition-transform duration-700" />

                  {/* Mock Browser/App Header Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-mono text-white/80 ml-2 tracking-wide">
                        {project.id}.app
                      </span>
                    </div>

                    <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/20">
                      {project.year}
                    </span>
                  </div>

                  {/* Center Decorative UI Symbol & Highlight */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center transform group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg text-white mb-2">
                      <ProjectIcon className="w-7 h-7" />
                    </div>
                    <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
                      {project.client}
                    </span>
                  </div>

                  {/* Bottom Screenshot Strip / Key Metric */}
                  <div className="relative z-10 flex items-center justify-between text-white/90 text-xs pt-2 border-t border-white/15">
                    <span className="font-medium">{project.duration} Delivery</span>
                    <span className="font-bold text-accent-light bg-black/30 px-2 py-0.5 rounded">
                      {project.statsHighlight.label}: {project.statsHighlight.value}
                    </span>
                  </div>

                  {/* Hover Overlay with Button */}
                  <div className="absolute inset-0 bg-primary-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 z-20">
                    <p className="text-white text-sm text-center font-medium max-w-xs line-clamp-2">
                      {project.title}
                    </p>
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-primary-900 font-bold text-sm rounded-xl transition-all duration-200 shadow-lg transform group-hover:scale-105 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <span className="text-white/70 text-xs">
                      Click to explore case study & tech stack
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Badge & Client */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${project.badgeBg}`}
                      >
                        {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-body font-medium truncate max-w-[150px]">
                        <Building className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{project.client}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-heading group-hover:text-primary transition-colors leading-snug mb-2">
                      {project.title}
                    </h3>

                    {/* Brief Description */}
                    <p className="text-body text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Technology Tags */}
                    <div className="pt-3 border-t border-gray-100 mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-md font-medium">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Details Action */}
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-primary-50 text-heading hover:text-primary font-semibold text-sm transition-colors border border-gray-200 hover:border-primary-200 cursor-pointer group/btn"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if filtering has 0 results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-surface rounded-2xl border border-dashed border-gray-300">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-heading">No projects found</h3>
            <p className="text-sm text-body max-w-sm mx-auto mt-1 mb-4">
              We are constantly adding new client case studies in this category.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Reset Category Filter
            </button>
          </div>
        )}
      </section>

      {/* 4. Project Stats Banner */}
      <section className="bg-primary-900 text-white relative overflow-hidden py-16 lg:py-20 border-y border-primary-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,45,142,0.6),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-accent">
              Delivering Measurable Impact
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
              Proven Results Across Every Engagement
            </h2>
            <p className="text-primary-200 text-sm sm:text-base mt-2">
              From fast-paced MVPs to enterprise high-load software architectures,
              our numbers reflect our dedication to technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-primary-800/60 backdrop-blur-md rounded-2xl p-6 border border-primary-700/60 hover:border-accent/40 transition-colors text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4">
                    <StatIcon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-accent-light mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-primary-200">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-heading">
            What Our IT Services Clients Say
          </h2>
          <p className="text-body text-base mt-3">
            Real feedback from business leaders and executives whose digital products
            we built, scaled, and continue to support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-surface rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                  <span className="text-xs text-body font-semibold ml-2">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author & Project info */}
              <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${t.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0`}
                >
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="font-bold text-heading text-sm">{t.name}</h4>
                  <p className="text-xs text-primary font-medium">
                    {t.role}, {t.company}
                  </p>
                  <p className="text-[11px] text-body mt-0.5">
                    {t.location} • <span className="font-semibold text-gray-600">{t.project}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality guarantee row */}
        <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-heading">
                Enterprise Standards & NDA Protection
              </h4>
              <p className="text-xs text-body">
                All client source code, customer data, and intellectual property
                are safeguarded by strict confidentiality agreements.
              </p>
            </div>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-primary hover:text-primary-dark whitespace-nowrap inline-flex items-center gap-1"
          >
            Explore Our IT Services
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. CTA - Start Your Project */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.15),transparent_60%)]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-xs sm:text-sm mb-6 border border-accent/30">
            <Sparkles className="w-4 h-4" />
            <span>Have a Web, Mobile, or Enterprise Software Vision?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Start Your Project With Us
          </h2>

          <p className="text-primary-100 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you need a full-scale enterprise software solution, a high-converting
            web portal, or a cross-platform mobile application, our dedicated engineers
            and designers are ready to deliver.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary-950 font-bold rounded-xl hover:bg-accent-light transition-all duration-200 shadow-xl shadow-accent/20"
            >
              <span>Get Free Technical Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="tel:+8801700000000"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200"
            >
              <span>Speak with an Architect</span>
            </a>
          </div>

          {/* Quick perks footer */}
          <div className="mt-10 pt-8 border-t border-primary-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-primary-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Free Architecture Review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Guaranteed Delivery Timelines</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Full Source Code Ownership</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Project Details Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Project Gradient */}
            <div
              className={`p-6 sm:p-8 bg-gradient-to-r ${activeModalProject.gradient} text-white relative rounded-t-2xl`}
            >
              <button
                onClick={() => setActiveModalProject(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3 border border-white/25">
                <span>{activeModalProject.category}</span>
                <span>•</span>
                <span>{activeModalProject.year}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                {activeModalProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/90 mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-accent-light" />
                  <span>Client: {activeModalProject.client}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-accent-light" />
                  <span>Duration: {activeModalProject.duration}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Executive Overview */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-primary mb-2">
                  Project Overview
                </h4>
                <p className="text-body text-sm sm:text-base leading-relaxed">
                  {activeModalProject.detailedDescription}
                </p>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-100">
                  <h5 className="text-xs font-bold text-red-800 uppercase tracking-wide mb-1">
                    The Challenge
                  </h5>
                  <p className="text-xs text-red-950/80 leading-relaxed">
                    {activeModalProject.challenge}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
                    RESDA Solution
                  </h5>
                  <p className="text-xs text-emerald-950/80 leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Key Results / Deliverables */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-heading mb-3">
                  Key Achievements & Deliverables
                </h4>
                <div className="space-y-2">
                  {activeModalProject.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-body"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-heading mb-2.5">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <span>Inquire About Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-body font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
