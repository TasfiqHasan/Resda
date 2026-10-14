"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Clock,
  BookOpen,
  BarChart3,
  Star,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  Award,
  Briefcase,
  Users,
  Code2,
  X,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Check,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: {
    name: string;
    role: string;
    initials: string;
  };
  description: string;
  duration: string;
  lessons: number;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviewsCount: number;
  gradient: string;
  badgeAccent?: string;
  popular?: boolean;
}

const INITIAL_COURSES: Course[] = [
  {
    id: "full-stack-web-dev",
    title: "Full-Stack Web Development",
    category: "Web Development",
    level: "Beginner",
    instructor: {
      name: "Tanvir Ahmed",
      role: "Lead Full-Stack Architect",
      initials: "TA",
    },
    description:
      "Master modern web development from fundamentals to full-stack applications with React, Node.js, Express, MongoDB, and Next.js.",
    duration: "6 months",
    lessons: 72,
    originalPrice: 22000,
    discountedPrice: 15000,
    rating: 4.9,
    reviewsCount: 248,
    gradient: "from-purple-700 via-indigo-600 to-purple-900",
    popular: true,
  },
  {
    id: "python-programming",
    title: "Python Programming Masterclass",
    category: "Programming",
    level: "Beginner",
    instructor: {
      name: "Dr. Rafiqul Islam",
      role: "Senior Software Engineer & AI Researcher",
      initials: "RI",
    },
    description:
      "Go from absolute zero to advanced Python programmer. Learn OOP, automated web scraping, data structures, and database integrations.",
    duration: "3 months",
    lessons: 42,
    originalPrice: 12000,
    discountedPrice: 8000,
    rating: 4.8,
    reviewsCount: 185,
    gradient: "from-emerald-600 via-teal-600 to-emerald-800",
  },
  {
    id: "data-science-ml",
    title: "Data Science & Machine Learning",
    category: "Data Science",
    level: "Intermediate",
    instructor: {
      name: "Nusrat Jahan",
      role: "Data Scientist & AI Specialist",
      initials: "NJ",
    },
    description:
      "Harness data insights using Python, Pandas, Scikit-Learn, and TensorFlow. Build predictive models and real-world ML applications.",
    duration: "4 months",
    lessons: 56,
    originalPrice: 18000,
    discountedPrice: 12000,
    rating: 4.9,
    reviewsCount: 162,
    gradient: "from-blue-600 via-cyan-600 to-indigo-800",
    popular: true,
  },
  {
    id: "react-nextjs-dev",
    title: "React & Next.js Development",
    category: "Web Development",
    level: "Intermediate",
    instructor: {
      name: "Mahmudul Hasan",
      role: "Senior Frontend Engineer",
      initials: "MH",
    },
    description:
      "Deep dive into production-ready React 19 and Next.js 15 App Router, Server Actions, Tailwind CSS, TypeScript, and state management.",
    duration: "3 months",
    lessons: 45,
    originalPrice: 15000,
    discountedPrice: 10000,
    rating: 4.9,
    reviewsCount: 210,
    gradient: "from-violet-600 via-purple-700 to-indigo-900",
  },
  {
    id: "flutter-mobile-dev",
    title: "Mobile App Development with Flutter",
    category: "Mobile Dev",
    level: "Intermediate",
    instructor: {
      name: "Fahim Shahriar",
      role: "Mobile App Team Lead",
      initials: "FS",
    },
    description:
      "Build visually stunning, high-performance cross-platform iOS and Android applications with Flutter, Dart, Firebase, and REST APIs.",
    duration: "4 months",
    lessons: 50,
    originalPrice: 18000,
    discountedPrice: 12000,
    rating: 4.8,
    reviewsCount: 145,
    gradient: "from-amber-500 via-orange-600 to-red-700",
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    category: "Cybersecurity",
    level: "Beginner",
    instructor: {
      name: "Tariqul Alam",
      role: "Certified Ethical Hacker & SecOps",
      initials: "TA",
    },
    description:
      "Learn essential network security, vulnerability assessments, penetration testing basics, cryptography, and defense tactics against threats.",
    duration: "3 months",
    lessons: 38,
    originalPrice: 14000,
    discountedPrice: 9000,
    rating: 4.7,
    reviewsCount: 128,
    gradient: "from-rose-600 via-red-600 to-rose-900",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Complete Course",
    category: "Digital Marketing",
    level: "Beginner",
    instructor: {
      name: "Sabrina Akter",
      role: "Head of Growth & Digital Strategy",
      initials: "SA",
    },
    description:
      "Dominate digital growth with hands-on training in SEO, Google Search & Display Ads, Meta advertising, content funnels, and analytics.",
    duration: "2 months",
    lessons: 32,
    originalPrice: 10000,
    discountedPrice: 6000,
    rating: 4.8,
    reviewsCount: 192,
    gradient: "from-pink-600 via-rose-500 to-purple-800",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Masterclass",
    category: "Web Development",
    level: "Beginner",
    instructor: {
      name: "Ayesha Siddiqa",
      role: "Principal Product Designer",
      initials: "AS",
    },
    description:
      "Transform ideas into intuitive digital experiences. Master Figma, user research, wireframing, interactive prototyping, and design systems.",
    duration: "3 months",
    lessons: 40,
    originalPrice: 12000,
    discountedPrice: 8000,
    rating: 4.9,
    reviewsCount: 174,
    gradient: "from-fuchsia-600 via-purple-600 to-indigo-700",
  },
  {
    id: "aws-cloud-computing",
    title: "Cloud Computing with AWS",
    category: "Programming",
    level: "Advanced",
    instructor: {
      name: "Kazi Nayeem",
      role: "AWS Certified Solutions Architect",
      initials: "KN",
    },
    description:
      "Deploy scalable, fault-tolerant infrastructure using Amazon EC2, S3, RDS, Lambda serverless, VPC, and automated DevOps CI/CD pipelines.",
    duration: "3 months",
    lessons: 44,
    originalPrice: 16000,
    discountedPrice: 11000,
    rating: 4.8,
    reviewsCount: 136,
    gradient: "from-sky-600 via-blue-700 to-indigo-900",
    popular: true,
  },
];

const EXTRA_COURSES: Course[] = [
  {
    id: "devops-docker-k8s",
    title: "DevOps, Docker & Kubernetes",
    category: "Programming",
    level: "Advanced",
    instructor: {
      name: "Shahnewaz Kabir",
      role: "Senior Cloud & DevOps Engineer",
      initials: "SK",
    },
    description:
      "Automate deployment pipelines, master containerization with Docker, orchestrate microservices with Kubernetes, and maintain cloud reliability.",
    duration: "4 months",
    lessons: 48,
    originalPrice: 19000,
    discountedPrice: 14000,
    rating: 4.9,
    reviewsCount: 118,
    gradient: "from-teal-600 via-cyan-700 to-blue-900",
  },
  {
    id: "ai-prompt-engineering",
    title: "Generative AI & Prompt Engineering",
    category: "Data Science",
    level: "Beginner",
    instructor: {
      name: "Zubair Hossain",
      role: "Applied AI Engineer",
      initials: "ZH",
    },
    description:
      "Unlock LLM capabilities with advanced prompting techniques, LangChain workflows, vector databases, and custom AI agent integrations.",
    duration: "2 months",
    lessons: 30,
    originalPrice: 11000,
    discountedPrice: 7500,
    rating: 4.8,
    reviewsCount: 95,
    gradient: "from-indigo-600 via-purple-600 to-violet-900",
  },
  {
    id: "golang-backend-dev",
    title: "Go (Golang) Microservices Engineering",
    category: "Programming",
    level: "Intermediate",
    instructor: {
      name: "Monirul Islam",
      role: "Principal Backend Engineer",
      initials: "MI",
    },
    description:
      "Build blazingly fast, concurrent, and scalable backend microservices with Go, gRPC, PostgreSQL, and Docker containerized deployment.",
    duration: "3 months",
    lessons: 42,
    originalPrice: 16000,
    discountedPrice: 11000,
    rating: 4.9,
    reviewsCount: 104,
    gradient: "from-blue-600 via-slate-700 to-indigo-900",
  },
];

const CATEGORIES = [
  "All",
  "Web Development",
  "Programming",
  "Data Science",
  "Mobile Dev",
  "Cybersecurity",
  "Digital Marketing",
];

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [coursesList, setCoursesList] = useState<Course[]>(INITIAL_COURSES);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // Enrollment modal state
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const [enrollFormSuccess, setEnrollFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "Weekend (Fri & Sat)",
  });

  const filteredCourses = useMemo(() => {
    return coursesList.filter((course) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      // Level filter
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      // Search term filter
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [coursesList, selectedCategory, selectedLevel, searchTerm]);

  const handleLoadMore = () => {
    if (!hasLoadedMore) {
      setCoursesList((prev) => [...prev, ...EXTRA_COURSES]);
      setHasLoadedMore(true);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLevel("All");
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollFormSuccess(true);
    setTimeout(() => {
      // Reset after 3 seconds
      setTimeout(() => {
        setEnrollingCourse(null);
        setEnrollFormSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          batch: "Weekend (Fri & Sat)",
        });
      }, 2500);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Page Header: Purple Gradient Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-16 md:py-24">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 -mb-24 w-80 h-80 rounded-full bg-primary-light/30 blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-sm text-primary-200 mb-6 font-medium"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-primary-300" />
            <span className="text-primary-200">Training</span>
            <ChevronRight className="w-4 h-4 text-primary-300" />
            <span className="text-accent font-semibold">Online Courses</span>
          </nav>

          {/* Heading & Intro */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-accent text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Skill Empowerment for the Nation&apos;s Future</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Online Courses
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 leading-relaxed max-w-2xl">
              Learn industry-ready tech skills directly from experienced practitioners.
              Gain practical, hands-on experience through project-based curricula,
              live mentorship, and career placement support in Bangladesh and beyond.
            </p>

            {/* Header Highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-white">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-accent">100%</span>
                <span className="text-xs text-primary-200 uppercase tracking-wide">
                  Project-Based
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-accent">12+</span>
                <span className="text-xs text-primary-200 uppercase tracking-wide">
                  Career Tracks
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-accent">15,000+</span>
                <span className="text-xs text-primary-200 uppercase tracking-wide">
                  Trained Students
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-accent">BDT (৳)</span>
                <span className="text-xs text-primary-200 uppercase tracking-wide">
                  Affordable Tuition
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search and Filter Bar */}
      <section className="sticky top-0 z-20 bg-surface/95 backdrop-blur-md border-b border-primary-100 shadow-sm py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-body">
                <Search className="w-4 h-4 text-primary" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses by title, topic, or instructor..."
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-primary-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-heading placeholder-body text-sm transition-all outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-body hover:text-heading"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
              {/* Category Filter Dropdown */}
              <div className="flex-1 sm:flex-initial min-w-[200px]">
                <label htmlFor="category-select" className="sr-only">
                  Filter by Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary">
                    <Filter className="w-4 h-4" />
                  </div>
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-background border border-primary-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-heading text-sm transition-all outline-none cursor-pointer appearance-none font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "All" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-body">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Level Filter Dropdown */}
              <div className="flex-1 sm:flex-initial min-w-[170px]">
                <label htmlFor="level-select" className="sr-only">
                  Filter by Level
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <select
                    id="level-select"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-background border border-primary-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-heading text-sm transition-all outline-none cursor-pointer appearance-none font-medium"
                  >
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl === "All" ? "All Skill Levels" : `${lvl} Level`}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-body">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Reset Button (Visible if active filter) */}
              {(searchTerm !== "" ||
                selectedCategory !== "All" ||
                selectedLevel !== "All") && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2.5 rounded-xl border border-primary-200 text-primary hover:bg-primary-50 text-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Category Badges Bar */}
          <div className="hidden md:flex items-center gap-2 mt-4 pt-3 border-t border-primary-100/60 overflow-x-auto pb-1 text-xs">
            <span className="text-body font-medium mr-1 flex items-center gap-1">
              Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-primary-50 text-primary-dark hover:bg-primary-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count & Active Tags */}
          <div className="flex items-center justify-between mt-3 text-xs text-body">
            <span>
              Showing{" "}
              <strong className="text-heading font-semibold">
                {filteredCourses.length}
              </strong>{" "}
              of {coursesList.length} courses
            </span>

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 text-primary bg-primary-50 px-2 py-0.5 rounded-md font-medium">
                Category: {selectedCategory}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 3. Course Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 px-4 bg-surface rounded-3xl border border-primary-100 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-primary-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-heading mb-2">
              No matching courses found
            </h3>
            <p className="text-body text-sm mb-6 max-w-md mx-auto">
              We couldn&apos;t find any courses matching your filter criteria. Try
              adjusting your search keywords or reset all filters.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const discountPercentage = Math.round(
                ((course.originalPrice - course.discountedPrice) /
                  course.originalPrice) *
                  100
              );

              return (
                <div
                  key={course.id}
                  className="card-hover group bg-surface rounded-2xl border border-primary-100/80 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Gradient colored top section */}
                    <div
                      className={`h-40 bg-gradient-to-r ${course.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}
                    >
                      {/* Subtle pattern background */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
                      <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />

                      {/* Header Row in Card: Category & Level Badge */}
                      <div className="flex items-center justify-between relative z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/25 shadow-sm">
                          {course.category}
                        </span>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/30 backdrop-blur-md text-white">
                          <BarChart3 className="w-3 h-3 text-accent" />
                          {course.level}
                        </span>
                      </div>

                      {/* Bottom row in top section: Popular indicator or course icon */}
                      <div className="relative z-10 flex items-center justify-between">
                        {course.popular ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-accent text-primary-dark uppercase tracking-wide">
                            <Sparkles className="w-3 h-3" />
                            Popular Choice
                          </span>
                        ) : (
                          <span className="text-xs text-white/80 font-medium">
                            Live Interactive Classes
                          </span>
                        )}
                        <GraduationCap className="w-6 h-6 text-white/40" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Star Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="flex text-accent">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-accent text-accent"
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-heading ml-1">
                            {course.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-xs text-body">
                          ({course.reviewsCount} reviews)
                        </span>
                      </div>

                      {/* Course Title */}
                      <h3 className="text-xl font-bold text-heading mb-2 leading-snug group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>

                      {/* Instructor */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-dark flex items-center justify-center font-bold text-xs ring-1 ring-primary/20">
                          {course.instructor.initials}
                        </div>
                        <div className="text-xs">
                          <span className="text-heading font-medium">
                            {course.instructor.name}
                          </span>
                          <span className="text-body block text-[11px] truncate max-w-[210px]">
                            {course.instructor.role}
                          </span>
                        </div>
                      </div>

                      {/* Brief Description (2 lines clamp) */}
                      <p className="text-sm text-body line-clamp-2 mb-4 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Duration, Lessons, Level indicators with Icons */}
                      <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-primary-50/50 rounded-xl border border-primary-100/50 text-xs text-heading mb-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center">
                          <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <BarChart3 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{course.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Enroll Button */}
                  <div className="px-6 pb-6 pt-2 border-t border-primary-100/50">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xs text-body block uppercase font-medium">
                          Tuition Fee
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-primary">
                            ৳{course.discountedPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-body line-through">
                            ৳{course.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                        {discountPercentage}% OFF
                      </span>
                    </div>

                    {/* Enroll Now Button */}
                    <button
                      onClick={() => {
                        setEnrollingCourse(course);
                        setEnrollFormSuccess(false);
                      }}
                      className="w-full bg-accent hover:bg-accent-light text-slate-900 font-bold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer group-hover:bg-accent-light active:scale-[0.98]"
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. Load More Button */}
        {filteredCourses.length > 0 && (
          <div className="mt-14 text-center">
            {!hasLoadedMore ? (
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-surface border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              >
                <span>Load More Courses</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="inline-flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary-50/70 border border-primary-100">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>All Available Courses Loaded</span>
                </div>
                <p className="text-xs text-body max-w-sm">
                  Need a customized corporate IT training program?{" "}
                  <Link
                    href="/contact"
                    className="text-primary font-semibold underline hover:text-primary-dark"
                  >
                    Contact our academic team
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. Why Learn With Us Section */}
      <section className="bg-surface border-t border-primary-100 py-16 md:py-24 relative overflow-hidden">
        {/* Subtle decorative background gradient circles */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-primary-50/50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-wider bg-primary-50 px-3.5 py-1 rounded-full border border-primary-100">
              The RESDA Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mt-4 mb-4">
              Why Learn With RESDA?
            </h2>
            <p className="text-body text-base sm:text-lg leading-relaxed">
              We bridge the gap between traditional curriculum and modern industry
              demands. Our rigorous training prepares you for high-paying roles in the
              global and domestic digital economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card-hover p-6 rounded-2xl bg-background border border-primary-100/70 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-5 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">
                Industry-Expert Mentors
              </h3>
              <p className="text-sm text-body leading-relaxed flex-1">
                Learn directly from lead engineers, tech managers, and certified
                architects with active experience in leading tech companies.
              </p>
              <div className="mt-4 pt-3 border-t border-primary-100/60 flex items-center gap-1.5 text-xs text-primary font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>1-on-1 Code Reviews</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card-hover p-6 rounded-2xl bg-background border border-primary-100/70 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary-dark text-white flex items-center justify-center mb-5 shadow-sm">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">
                Real-World Projects
              </h3>
              <p className="text-sm text-body leading-relaxed flex-1">
                Say goodbye to simple toy apps. You build production-grade web systems,
                robust APIs, and apps that impress hiring managers.
              </p>
              <div className="mt-4 pt-3 border-t border-primary-100/60 flex items-center gap-1.5 text-xs text-primary font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>GitHub Portfolio Ready</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card-hover p-6 rounded-2xl bg-background border border-primary-100/70 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-accent text-primary-dark flex items-center justify-center mb-5 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">
                Recognized Certification
              </h3>
              <p className="text-sm text-body leading-relaxed flex-1">
                Earn an official RESDA certificate verified with a unique digital credential
                ID, accepted by leading employers and client partners.
              </p>
              <div className="mt-4 pt-3 border-t border-primary-100/60 flex items-center gap-1.5 text-xs text-primary font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verifiable QR Code</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card-hover p-6 rounded-2xl bg-background border border-primary-100/70 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary-light text-white flex items-center justify-center mb-5 shadow-sm">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">
                Career Support & Internship
              </h3>
              <p className="text-sm text-body leading-relaxed flex-1">
                Receive personalized resume reviews, mock technical interview sessions,
                freelancing orientation, and direct internship recommendations.
              </p>
              <div className="mt-4 pt-3 border-t border-primary-100/60 flex items-center gap-1.5 text-xs text-primary font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Placement Assistance</span>
              </div>
            </div>
          </div>

          {/* Need help deciding consultation banner */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-primary-900 to-primary text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="max-w-xl">
              <h4 className="text-2xl font-bold mb-2">
                Not sure which course fits your career aspirations?
              </h4>
              <p className="text-primary-200 text-sm">
                Speak directly with an academic career counselor. We will assess your
                current skill level and guide you toward the ideal course path.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-light text-primary-900 font-bold text-sm transition-all shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Get Free Counseling</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Enrollment Modal */}
      {enrollingCourse && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-surface rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-primary-100 flex flex-col relative max-h-[90vh]">
            {/* Modal Header */}
            <div
              className={`p-6 bg-gradient-to-r ${enrollingCourse.gradient} text-white relative`}
            >
              <button
                onClick={() => setEnrollingCourse(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm inline-block mb-2">
                {enrollingCourse.category}
              </span>
              <h3 className="text-xl font-bold leading-tight">
                {enrollingCourse.title}
              </h3>
              <p className="text-xs text-white/90 mt-1">
                Instructor: {enrollingCourse.instructor.name} • {enrollingCourse.duration}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {enrollFormSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-heading mb-2">
                    Enrollment Request Received!
                  </h4>
                  <p className="text-sm text-body mb-4">
                    Thank you, <strong className="text-heading">{formData.name}</strong>.
                    Our academic counselor will contact you via WhatsApp / Phone at{" "}
                    <strong className="text-heading">{formData.phone}</strong> with
                    admission instructions and batch schedule.
                  </p>
                  <div className="bg-primary-50 p-3 rounded-xl text-xs text-primary font-medium">
                    Payment via bKash, Nagad, Rocket or Bank transfer will be collected
                    upon admission confirmation.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-primary-100 text-sm">
                    <span className="text-body font-medium">Course Tuition:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-primary">
                        ৳{enrollingCourse.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-body line-through">
                        ৳{enrollingCourse.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-heading mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Md. Ashraful Islam"
                      className="w-full px-3.5 py-2.5 bg-background border border-primary-100 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-heading mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="017XXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-background border border-primary-100 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-heading mb-1.5">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-background border border-primary-100 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-heading mb-1.5">
                      Preferred Batch Schedule
                    </label>
                    <select
                      value={formData.batch}
                      onChange={(e) =>
                        setFormData({ ...formData, batch: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-background border border-primary-100 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer font-medium"
                    >
                      <option value="Weekend (Fri & Sat)">
                        Weekend Batch (Friday & Saturday evening)
                      </option>
                      <option value="Weekday Evening">
                        Weekday Evening Batch (Mon & Wed 8:00 PM)
                      </option>
                      <option value="Flexible Self-Paced + Live Support">
                        Self-Paced with Weekly Live Mentorship
                      </option>
                    </select>
                  </div>

                  <div className="bg-primary-50/70 p-3 rounded-xl text-[12px] text-body flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      Seats are confirmed on a first-come, first-served basis. Payment
                      details will be shared after short eligibility verification.
                    </span>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEnrollingCourse(null)}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-primary-200 text-body hover:text-heading hover:bg-background text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-light text-slate-900 font-bold text-sm transition-all shadow-sm"
                    >
                      Confirm Enrollment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
