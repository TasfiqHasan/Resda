import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Monitor,
  Award,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  FileText,
  UserCheck,
  CreditCard,
  Rocket,
  Sparkles,
  Wifi,
  AirVent,
  BookOpen,
  Presentation,
  Zap,
  ShieldCheck,
  Building2,
  Check,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Offline IT Training Programs",
  description:
    "Immersive, hands-on classroom IT training at RESDA's modern Dhaka campus. Master Web Development, Graphic Design, Networking, Hardware, and Database Administration with individual computer lab access.",
};

// Interface for Training Programs
interface TrainingProgram {
  id: string;
  name: string;
  duration: string;
  batchSize: string;
  schedule: string;
  topics: string[];
  nextBatch: string;
  feeBDT: string;
  tag: string;
  accentBorder: string;
  accentBadge: string;
  badgeTextColor: string;
}

const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "web-development",
    name: "Professional Web Development",
    duration: "6 Months",
    batchSize: "15-20 Students",
    schedule: "Sun & Tue (3:00 PM – 6:00 PM)",
    topics: [
      "HTML5, Modern CSS3, Tailwind CSS & Responsive Layouts",
      "JavaScript (ES6+), TypeScript & DOM Manipulation",
      "React 19, Next.js 15 & Full-Stack Component Architecture",
      "Node.js, Express REST APIs, MongoDB & PostgreSQL",
    ],
    nextBatch: "November 15, 2026",
    feeBDT: "৳20,000",
    tag: "Most Popular",
    accentBorder: "border-l-primary",
    accentBadge: "bg-primary-50 text-primary border-primary-200",
    badgeTextColor: "text-primary",
  },
  {
    id: "graphic-design",
    name: "Graphic Design & Multimedia",
    duration: "4 Months",
    batchSize: "15 Students",
    schedule: "Mon & Wed (4:00 PM – 7:00 PM)",
    topics: [
      "Adobe Photoshop: Photo Retouching, Manipulation & Color Grading",
      "Adobe Illustrator: Vector Illustration, Logo & Visual Brand Identity",
      "Figma UI/UX Design, Wireframing & Interactive App Prototyping",
      "Video Editing Basics & Motion Content in Adobe Premiere Pro",
    ],
    nextBatch: "November 10, 2026",
    feeBDT: "৳15,000",
    tag: "Creative Track",
    accentBorder: "border-l-accent",
    accentBadge: "bg-amber-50 text-amber-800 border-amber-200",
    badgeTextColor: "text-amber-800",
  },
  {
    id: "networking-sysadmin",
    name: "Networking & System Admin",
    duration: "5 Months",
    batchSize: "12-15 Students",
    schedule: "Fri & Sat (9:00 AM – 12:00 PM)",
    topics: [
      "CCNA Fundamentals, IPv4/IPv6 Subnetting & Network Topologies",
      "Cisco Routing, Switching & VLAN Practical Lab Configurations",
      "Linux Server Administration (Ubuntu/RHEL) & Windows Server",
      "Firewall Configuration (MikroTik/Fortinet), VPNs & Security",
    ],
    nextBatch: "November 20, 2026",
    feeBDT: "৳18,000",
    tag: "Enterprise IT",
    accentBorder: "border-l-indigo-600",
    accentBadge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    badgeTextColor: "text-indigo-700",
  },
  {
    id: "office-applications",
    name: "Office Applications & IT Basics",
    duration: "2 Months",
    batchSize: "20 Students",
    schedule: "Sun, Tue & Thu (10:00 AM – 12:00 PM)",
    topics: [
      "Advanced MS Word: Technical Reports, Formats & Mail Merge",
      "MS Excel: Formulas, VLOOKUP/XLOOKUP, Pivot Tables & Analytics",
      "MS PowerPoint: Executive Business Decks & Slide Design",
      "Digital Workplace Productivity, Email Etiquette & Bangla/English Typing",
    ],
    nextBatch: "November 05, 2026",
    feeBDT: "৳5,000",
    tag: "Foundation",
    accentBorder: "border-l-emerald-600",
    accentBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeTextColor: "text-emerald-700",
  },
  {
    id: "hardware-troubleshooting",
    name: "Hardware & Troubleshooting",
    duration: "3 Months",
    batchSize: "12 Students",
    schedule: "Mon & Wed (10:00 AM – 1:00 PM)",
    topics: [
      "PC Hardware Architecture, Assembling & Component Diagnostics",
      "BIOS/UEFI Configuration, OS Installation & Dual Boot Setup",
      "Motherboard, RAM, SMPS & Storage Drive Benchmarking",
      "Peripheral Device Servicing, Network Cabling & Preventive Maintenance",
    ],
    nextBatch: "November 12, 2026",
    feeBDT: "৳10,000",
    tag: "Practical Lab",
    accentBorder: "border-l-amber-600",
    accentBadge: "bg-orange-50 text-orange-800 border-orange-200",
    badgeTextColor: "text-orange-800",
  },
  {
    id: "database-administration",
    name: "Database Administration",
    duration: "4 Months",
    batchSize: "15 Students",
    schedule: "Fri & Sat (3:00 PM – 6:00 PM)",
    topics: [
      "Relational Database Modeling, Normalization & Schema Design",
      "Complex SQL Queries, Indexing, Stored Procedures & Triggers",
      "MySQL & PostgreSQL Server Administration & User Access Control",
      "Database Backup, Disaster Recovery, Replication & Performance Tuning",
    ],
    nextBatch: "November 18, 2026",
    feeBDT: "৳14,000",
    tag: "High Demand",
    accentBorder: "border-l-violet-600",
    accentBadge: "bg-violet-50 text-violet-700 border-violet-200",
    badgeTextColor: "text-violet-700",
  },
];

interface BatchRow {
  program: string;
  batchNo: string;
  startDate: string;
  schedule: string;
  seatsTotal: number;
  seatsLeft: number;
  status: "Open" | "Filling Fast" | "Full";
}

const UPCOMING_BATCHES: BatchRow[] = [
  {
    program: "Professional Web Development",
    batchNo: "WD-48",
    startDate: "Nov 15, 2026",
    schedule: "Sun & Tue (3:00 PM – 6:00 PM)",
    seatsTotal: 20,
    seatsLeft: 4,
    status: "Filling Fast",
  },
  {
    program: "Graphic Design & Multimedia",
    batchNo: "GD-36",
    startDate: "Nov 10, 2026",
    schedule: "Mon & Wed (4:00 PM – 7:00 PM)",
    seatsTotal: 15,
    seatsLeft: 6,
    status: "Open",
  },
  {
    program: "Networking & System Admin",
    batchNo: "NET-29",
    startDate: "Nov 20, 2026",
    schedule: "Fri & Sat (9:00 AM – 12:00 PM)",
    seatsTotal: 15,
    seatsLeft: 2,
    status: "Filling Fast",
  },
  {
    program: "Office Applications & IT Basics",
    batchNo: "OA-64",
    startDate: "Nov 05, 2026",
    schedule: "Sun, Tue & Thu (10:00 AM – 12:00 PM)",
    seatsTotal: 20,
    seatsLeft: 0,
    status: "Full",
  },
  {
    program: "Hardware & Troubleshooting",
    batchNo: "HW-22",
    startDate: "Nov 12, 2026",
    schedule: "Mon & Wed (10:00 AM – 1:00 PM)",
    seatsTotal: 12,
    seatsLeft: 5,
    status: "Open",
  },
  {
    program: "Database Administration",
    batchNo: "DBA-17",
    startDate: "Nov 18, 2026",
    schedule: "Fri & Sat (3:00 PM – 6:00 PM)",
    seatsTotal: 15,
    seatsLeft: 7,
    status: "Open",
  },
];

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Application",
    icon: FileText,
    description:
      "Submit your application online or visit our Gulshan-1 office. Select your desired IT program and convenient batch timing.",
  },
  {
    step: "02",
    title: "Assessment",
    icon: UserCheck,
    description:
      "Participate in a friendly 1-on-1 counseling and skill evaluation session to ensure the track matches your career targets.",
  },
  {
    step: "03",
    title: "Enrollment",
    icon: CreditCard,
    description:
      "Secure your seat with course fee payment (full or flexible installments). Collect your official student ID and lab access pass.",
  },
  {
    step: "04",
    title: "Start Learning",
    icon: Rocket,
    description:
      "Attend the orientation session, get assigned your dedicated workstation, and start building job-ready practical projects.",
  },
];

const CAMPUS_FACILITIES = [
  {
    name: "Computer Lab",
    icon: Monitor,
    description: "60+ Core i7/32GB RAM workstations with dual monitors & preloaded developer tools.",
  },
  {
    name: "AC Classroom",
    icon: AirVent,
    description: "Centrally air-conditioned, sound-damped classrooms with ergonomic executive seating.",
  },
  {
    name: "Library",
    icon: BookOpen,
    description: "Extensive IT reference books, certification study guides, and quiet reading desks.",
  },
  {
    name: "High-Speed Wi-Fi",
    icon: Wifi,
    description: "Dedicated redundant 200 Mbps fiber-optic broadband coverage throughout the campus.",
  },
  {
    name: "Smart Projector",
    icon: Presentation,
    description: "Full HD interactive presentation boards and ultra-short throw projectors in every lab.",
  },
  {
    name: "24/7 Power Backup",
    icon: Zap,
    description: "Heavy-duty industrial generator and uninterrupted online UPS system for zero lab downtime.",
  },
];

export default function OfflineTrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Page Header */}
      <section className="relative bg-hero-gradient text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Subtle background glow elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(123,79,174,0.35),transparent_50%)]" />
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
            <span className="text-white font-medium">Offline Training</span>
          </nav>

          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-medium text-xs sm:text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Dhaka Campus • 100% Hands-On Practical Training</span>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Offline <span className="text-accent">Training Programs</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-primary-100 leading-relaxed max-w-2xl mb-8">
              Immerse yourself in structured classroom IT training at our modern
              Gulshan-1 office in Dhaka. Gain real-world software and networking
              skills with individual workstation access, dedicated mentors, and
              direct placement assistance.
            </p>

            {/* Quick Hero Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-accent">1:1</div>
                <div className="text-xs text-primary-200 mt-0.5">Workstation per Student</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">15-20</div>
                <div className="text-xs text-primary-200 mt-0.5">Students per Batch</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-accent">100%</div>
                <div className="text-xs text-primary-200 mt-0.5">Practical Lab Focus</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">50+</div>
                <div className="text-xs text-primary-200 mt-0.5">Hiring Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Offline Training Section */}
      <section className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary-50 border border-primary-100 text-primary text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                <Building2 className="w-3.5 h-3.5" />
                <span>The Classroom Advantage</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-6">
                Hands-On Classroom <span className="text-primary">Training</span>
              </h2>

              <p className="text-body text-base sm:text-lg leading-relaxed mb-6">
                While online tutorials provide theoretical guidance, mastery in
                technology comes from solving complex errors under the direct eye
                of experienced practitioners. At RESDA, in-person training is built
                around physical immersion, discipline, and immediate feedback.
              </p>

              <p className="text-body text-base leading-relaxed mb-8">
                Every learner gets assigned their own modern workstation in our
                dedicated computer labs. You won’t just watch videos—you will
                configure physical Cisco routers, assemble systems, write full-stack
                code, and defend projects before peer reviewers.
              </p>

              {/* Highlight Checklist */}
              <div className="space-y-3.5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium text-heading">
                    Zero waiting for replies—instant, live mentor debugging
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium text-heading">
                    Uninterrupted high-speed gigabit fiber & online UPS backup
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium text-heading">
                    Structured daily routine with dedicated lab practice hours
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="#batches"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group"
                >
                  <span>Explore Upcoming Batch Timings</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Benefits with Icons */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Benefit 1: Face-to-face Learning */}
              <div className="p-6 sm:p-7 rounded-2xl bg-background border border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-heading mb-2.5">
                  Face-to-face Learning
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  Engage directly with veteran software architects and system engineers.
                  Ask questions without delay, participate in group code reviews,
                  and learn from your batchmates’ challenges in real time.
                </p>
              </div>

              {/* Benefit 2: Computer Lab Access */}
              <div className="p-6 sm:p-7 rounded-2xl bg-background border border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-accent-dark flex items-center justify-center mb-5">
                  <Monitor className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-heading mb-2.5">
                  Computer Lab Access
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  Every student is provided an individual high-performance Core i7
                  workstation preloaded with industrial IDEs, design software,
                  virtual machines, and high-speed fiber connectivity.
                </p>
              </div>

              {/* Benefit 3: Industry Certification */}
              <div className="p-6 sm:p-7 rounded-2xl bg-background border border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-heading mb-2.5">
                  Industry Certification
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  Earn an accredited, verifiable certificate upon graduation and
                  project defense. Prepare for global vendor certifications including
                  CCNA, Adobe Certified Professional, and Red Hat Linux.
                </p>
              </div>

              {/* Benefit 4: Job Placement Assistance */}
              <div className="p-6 sm:p-7 rounded-2xl bg-background border border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-heading mb-2.5">
                  Job Placement Assistance
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  Access RESDA’s placement cell with professional resume audits,
                  technical mock interviews, soft skills training, and direct
                  referrals to over 50 leading software firms and corporate agencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Training Programs Grid */}
      <section id="programs" className="section-padding bg-background border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary border border-primary-200 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career-Oriented Tracks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-4">
              Explore Our Offline <span className="text-primary">Programs</span>
            </h2>
            <p className="text-body text-base sm:text-lg">
              Intensive, project-driven curriculums tailored to meet current tech
              hiring demands in Bangladesh and global freelance markets.
            </p>
          </div>

          {/* 6 Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRAINING_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className={`bg-surface rounded-2xl border border-gray-200 border-l-4 ${program.accentBorder} shadow-sm card-hover flex flex-col justify-between overflow-hidden`}
              >
                <div className="p-6 sm:p-7">
                  {/* Top Row: Tag & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${program.accentBadge}`}
                    >
                      {program.tag}
                    </span>
                    <span className="text-xs font-medium text-body flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {program.duration}
                    </span>
                  </div>

                  {/* Program Title */}
                  <h3 className="text-xl font-bold text-heading mb-4 min-h-[56px] flex items-center">
                    {program.name}
                  </h3>

                  {/* Batch & Schedule Info Pills */}
                  <div className="bg-background rounded-xl p-3.5 mb-5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-body">
                      <span className="font-medium text-heading">Batch Size:</span>
                      <span>{program.batchSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-body">
                      <span className="font-medium text-heading">Schedule:</span>
                      <span className="text-right truncate max-w-[180px]">{program.schedule}</span>
                    </div>
                    <div className="flex items-center justify-between text-body pt-1.5 border-t border-gray-200/60">
                      <span className="font-medium text-heading">Next Batch:</span>
                      <span className="font-semibold text-primary">{program.nextBatch}</span>
                    </div>
                  </div>

                  {/* Key Topics Covered */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-heading/70 mb-3">
                      Key Topics Covered:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-body">
                      {program.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Fee & Apply Button */}
                <div className="p-6 sm:p-7 pt-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-body">
                      Total Course Fee
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {program.feeBDT}
                    </div>
                  </div>

                  <Link
                    href={`/contact?program=${encodeURIComponent(program.name)}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/20 shrink-0"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice */}
          <div className="mt-10 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shrink-0" />
              <span>
                Need financial flexibility? We offer <strong>2-installment payment facilities</strong> and merit-based tuition waivers for students.
              </span>
            </div>
            <Link
              href="/contact"
              className="font-semibold text-amber-950 underline hover:text-primary shrink-0 transition-colors"
            >
              Contact Admission Desk →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Training Center Info Section */}
      <section id="center" className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary border border-primary-200 text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>State-of-the-Art Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-4">
              Visit Our <span className="text-primary">Training Center</span>
            </h2>
            <p className="text-body text-base sm:text-lg">
              Designed specifically for tech learners with dedicated workstation
              labs, climate-controlled comfort, and modern collaborative spaces.
            </p>
          </div>

          {/* Training Center Card */}
          <div className="bg-background rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left / Center Details (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Address Badge */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-heading">
                        RESDA IT Training Center
                      </h3>
                      <p className="text-body text-sm sm:text-base mt-1">
                        19th Floor, Nafi Tower, 53 Gulshan Avenue, Gulshan-1, Dhaka 1212, Bangladesh
                      </p>
                      <p className="text-xs text-primary font-medium mt-1">
                        Landmark: Near Gulshan-1 Circle / Gulshan Avenue
                      </p>
                    </div>
                  </div>

                  {/* Campus Facilities Grid */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-heading/70 mb-4">
                      Campus Facilities & Resources:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CAMPUS_FACILITIES.map((facility) => {
                        const FacilityIcon = facility.icon;
                        return (
                          <div
                            key={facility.name}
                            className="p-4 rounded-xl bg-surface border border-gray-200 flex items-start gap-3.5"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                              <FacilityIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-heading">
                                {facility.name}
                              </div>
                              <div className="text-xs text-body leading-relaxed mt-0.5">
                                {facility.description}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operating Hours & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs uppercase font-bold text-heading">
                          Operating Hours
                        </div>
                        <div className="text-xs text-body mt-0.5">
                          Saturday – Thursday: <span className="font-semibold text-heading">9:00 AM – 8:00 PM</span>
                        </div>
                        <div className="text-xs text-body">
                          Friday: <span className="font-semibold text-heading">9:00 AM – 6:00 PM</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs uppercase font-bold text-heading">
                          Admission Help Desk
                        </div>
                        <div className="text-xs text-body mt-0.5">
                          <a href="tel:+8801700000000" className="font-semibold text-primary hover:underline">
                            +880 1700-000000
                          </a>
                        </div>
                        <div className="text-xs text-body flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                          <a href="mailto:training@resda.org" className="hover:underline">
                            training@resda.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right / Map Placeholder (5 cols) */}
              <div className="lg:col-span-5 relative bg-gradient-to-br from-slate-900 via-primary-950 to-primary-900 text-white p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-200 min-h-[380px]">
                {/* Decorative Map Pattern */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-accent mb-4">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Campus Location Map</span>
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-2">
                    Central Dhaka Hub
                  </h4>
                  <p className="text-primary-200 text-sm leading-relaxed mb-6">
                    Easily accessible from all parts of Dhaka via public transport,
                    ride-sharing, and the Dhaka Metro Rail.
                  </p>

                  {/* Stylized Map View Box */}
                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-accent animate-ping" />
                      <div className="text-sm font-semibold text-white">
                        RESDA Campus • Gulshan-1, Gulshan Ave
                      </div>
                    </div>
                    <div className="text-xs text-primary-200 leading-relaxed pl-6.5">
                      Coordinates: 23.78125° N, 90.4164° E<br />
                      Gulshan Avenue, Gulshan-1
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-primary-100">
                        Nearby: Gulshan-1 Circle
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-primary-100">
                        Ample Parking Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map Action Buttons */}
                <div className="relative z-10 pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://maps.google.com/?q=Nafi+Tower+Gulshan+1+Dhaka+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-primary-900 font-bold text-sm hover:bg-accent-light transition-colors text-center shadow-lg"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20 text-center"
                  >
                    <span>Schedule Campus Visit</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Admission Process */}
      <section id="admission" className="section-padding bg-background border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary border border-primary-200 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Simple & Transparent</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-4">
              Your 4-Step <span className="text-primary">Admission Process</span>
            </h2>
            <p className="text-body text-base sm:text-lg">
              From application to your first hands-on lab class—here is how you
              join RESDA’s offline training cohort.
            </p>
          </div>

          {/* 4-Step Horizontal Process */}
          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-accent/40 to-primary-200 -translate-y-12 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {ADMISSION_STEPS.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="bg-surface rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col items-center text-center relative card-hover"
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-3.5 px-3 py-1 bg-primary text-white text-xs font-extrabold rounded-full shadow-sm">
                      STEP {step.step}
                    </div>

                    {/* Icon Circle */}
                    <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary border border-primary-100 flex items-center justify-center mb-5 mt-2 shadow-inner">
                      <StepIcon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-heading mb-3">
                      {step.title}
                    </h3>

                    <p className="text-body text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {index < ADMISSION_STEPS.length - 1 && (
                      <div className="lg:hidden mt-4 text-primary">
                        <ArrowRight className="w-5 h-5 mx-auto rotate-90 md:rotate-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Batches Table */}
      <section id="batches" className="section-padding bg-surface border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary border border-primary-200 text-xs font-semibold mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Next Intake Schedule</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-heading tracking-tight">
                Upcoming Offline <span className="text-primary">Batches</span>
              </h2>
              <p className="text-body text-base mt-2 max-w-xl">
                Batch sizes are strictly capped to ensure 1:1 computer lab workstation
                availability. Reserve early to lock in your preferred seat.
              </p>
            </div>

            {/* Quick Status Legend */}
            <div className="flex items-center gap-4 text-xs font-medium text-body bg-background p-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Open</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Filling Fast</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Full (Waitlist)</span>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-surface">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-primary text-white text-xs uppercase tracking-wider font-semibold">
                  <th scope="col" className="py-4 px-6">Program</th>
                  <th scope="col" className="py-4 px-4">Batch No</th>
                  <th scope="col" className="py-4 px-4">Start Date</th>
                  <th scope="col" className="py-4 px-6">Schedule</th>
                  <th scope="col" className="py-4 px-4">Seats Left</th>
                  <th scope="col" className="py-4 px-4">Status</th>
                  <th scope="col" className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {UPCOMING_BATCHES.map((batch, index) => {
                  const isFull = batch.status === "Full";
                  const isFillingFast = batch.status === "Filling Fast";

                  return (
                    <tr
                      key={batch.batchNo}
                      className={`hover:bg-primary-50/40 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {/* Program */}
                      <td className="py-4 px-6 font-semibold text-heading">
                        {batch.program}
                      </td>

                      {/* Batch No */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 rounded bg-gray-100 font-mono text-xs font-bold text-heading">
                          {batch.batchNo}
                        </span>
                      </td>

                      {/* Start Date */}
                      <td className="py-4 px-4 text-heading font-medium">
                        {batch.startDate}
                      </td>

                      {/* Schedule */}
                      <td className="py-4 px-6 text-body">
                        {batch.schedule}
                      </td>

                      {/* Seats Available */}
                      <td className="py-4 px-4">
                        {isFull ? (
                          <span className="text-xs font-bold text-red-600">
                            0 / {batch.seatsTotal}
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-heading">
                              {batch.seatsLeft} of {batch.seatsTotal}
                            </span>
                            <div className="w-14 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isFillingFast ? "bg-amber-500" : "bg-emerald-500"
                                }`}
                                style={{
                                  width: `${((batch.seatsTotal - batch.seatsLeft) / batch.seatsTotal) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {batch.status === "Open" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Open
                          </span>
                        )}
                        {batch.status === "Filling Fast" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            Filling Fast
                          </span>
                        )}
                        {batch.status === "Full" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Full
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-right">
                        {isFull ? (
                          <Link
                            href={`/contact?waitlist=${encodeURIComponent(batch.program)}`}
                            className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-body transition-colors"
                          >
                            Join Waitlist
                          </Link>
                        ) : (
                          <Link
                            href={`/contact?batch=${encodeURIComponent(batch.batchNo)}&program=${encodeURIComponent(batch.program)}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white shadow-sm transition-colors"
                          >
                            <span>Enroll</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-body mt-4 text-center sm:text-left">
            * Schedules are subject to minor adjustments based on public holidays. Weekend batch slots are popular and fill up quickly.
          </p>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="bg-primary-900 text-white relative overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Decorative background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,166,35,0.15),transparent_60%)]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-medium text-xs sm:text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Limited Batch Capacities for Maximum Quality</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Reserve Your Seat <span className="text-accent">Today</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed mb-10">
            Seats are strictly capped at 15–20 learners per batch so you always get
            your own high-spec lab PC and personalized mentor attention. Start
            your IT career transformation this month.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?type=training"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary-900 font-bold text-base rounded-xl hover:bg-accent-light transition-all duration-200 shadow-xl shadow-accent/20 hover:-translate-y-0.5"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="tel:+8801700000000"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-base rounded-xl transition-all duration-200 border border-white/20"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span>Call +880 1700-000000</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-primary-200">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Free Career Counseling</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Installment Payment Option</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Job Placement Support</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>100% Practical Computer Lab</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
