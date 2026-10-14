import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  ChevronRight,
  Home,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Monitor,
  Wifi,
  Tv,
  Zap,
  Users,
  Briefcase,
  BookOpen,
  Coffee,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  GraduationCap,
} from "lucide-react";
import { StatsCounter } from "./StatsCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about RESDA, our founding story, mission, vision, expert leadership team, and modern IT training facilities dedicated to empowering skills for the nation.",
};

// Team Members Data
const teamMembers = [
  {
    name: "Tanvir Ahmed",
    initials: "TA",
    designation: "Chief Executive Officer",
    avatarBg: "bg-gradient-to-br from-primary to-primary-dark text-white",
    bio: "Tech entrepreneur with 14+ years of leadership in enterprise software delivery and educational technology. Passionate about empowering South Asian youth with high-impact digital careers.",
    department: "Executive Leadership",
  },
  {
    name: "MD. Rafiqul Islam",
    initials: "RI",
    designation: "Chief Technology Officer",
    avatarBg: "bg-gradient-to-br from-primary-700 to-indigo-900 text-white",
    bio: "Senior systems and cloud architect with deep expertise in distributed microservices, scalable web platforms, and mentoring engineering teams on cutting-edge stacks.",
    department: "Technology & Engineering",
  },
  {
    name: "Farhana Rahman",
    initials: "FR",
    designation: "Head of Training",
    avatarBg: "bg-gradient-to-br from-primary-600 to-primary-800 text-white",
    bio: "Veteran academician and EdTech specialist with over a decade of experience in pedagogical design, technical curriculum development, and project-based bootcamp instruction.",
    department: "Academic Affairs",
  },
  {
    name: "Shakil Hossain",
    initials: "SH",
    designation: "Lead Developer",
    avatarBg: "bg-gradient-to-br from-primary-800 to-purple-950 text-white",
    bio: "Full-stack specialist excelling in Next.js, TypeScript, cloud deployments, and RESTful architectures. Mentors trainees through practical, commercial-grade application builds.",
    department: "Software Development",
  },
  {
    name: "Nusrat Jahan",
    initials: "NJ",
    designation: "Marketing Head",
    avatarBg: "bg-gradient-to-br from-primary-500 to-purple-700 text-white",
    bio: "Dynamic growth strategist committed to youth tech evangelism, university outreach, digital community empowerment, and building strategic institutional collaborations.",
    department: "Brand & Growth",
  },
  {
    name: "Kamrul Hasan",
    initials: "KH",
    designation: "HR Manager",
    avatarBg: "bg-gradient-to-br from-primary-900 to-slate-900 text-white",
    bio: "Human capital strategist overseeing corporate placement partnerships, soft-skills development, resume workshops, and industry recruitment drives for RESDA graduates.",
    department: "People & Placements",
  },
];

// Training Centers Data
const trainingCenters = [
  {
    name: "Gulshan-1 Main Campus",
    type: "Main Training & Innovation Center",
    address: "19th Floor, Nafi Tower, 53 Gulshan Avenue, Gulshan-1, Dhaka 1212, Bangladesh",
    phone: "+880 1700-000000",
    email: "dhaka@resda.org",
    hours: "Saturday – Thursday: 9:00 AM – 9:00 PM | Friday: 2:00 PM – 8:00 PM",
    badge: "Flagship Campus",
  },
  {
    name: "Chittagong Regional Center",
    type: "Regional Training & Certification Hub",
    address: "Commercial Center, Agrabad C/A, Chittagong - 4100, Bangladesh",
    phone: "+880 1711-000000",
    email: "ctg@resda.org",
    hours: "Sunday – Thursday: 10:00 AM – 8:00 PM | Friday – Saturday: Closed",
    badge: "Regional Hub",
  },
];

// Facilities List
const facilities = [
  {
    icon: Monitor,
    title: "High-Spec Workstations",
    description: "Core i7/i9 processors, 32GB RAM, dedicated GPUs, and dual-monitor development setups for every learner.",
  },
  {
    icon: Wifi,
    title: "Gigabit Redundant Internet",
    description: "High-speed dual-ISP optical fiber connection guaranteeing 99.9% uptime for cloud labs and remote sessions.",
  },
  {
    icon: Tv,
    title: "Smart Interactive Labs",
    description: "Acoustically treated classrooms equipped with 4K interactive presentation displays and real-time screen sharing.",
  },
  {
    icon: Zap,
    title: "24/7 Power Backup",
    description: "Heavy-duty online industrial UPS systems backed by automatic generator units ensuring zero learning interruption.",
  },
  {
    icon: Users,
    title: "Collaboration Lounges",
    description: "Breakout brainstorm zones with magnetic whiteboards and comfortable seating for group projects and hackathons.",
  },
  {
    icon: Briefcase,
    title: "Career Placement Cell",
    description: "Dedicated interview suites for 1-on-1 career counseling, resume optimization, and mock technical assessments.",
  },
  {
    icon: BookOpen,
    title: "Digital Tech Library",
    description: "Free access to thousands of premium tech books, research publications, cloud sandboxes, and documentation repos.",
  },
  {
    icon: Coffee,
    title: "Cafeteria & Rest Zones",
    description: "Hygienic pantry, refreshment zone, and recreational space for peer networking and informal discussions.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* =========================================================================
          SECTION 1: PAGE HEADER / BANNER
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white py-16 md:py-24">
        {/* Subtle decorative background accents */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-accent/10 blur-2xl pointer-events-none" />
        
        {/* Subtle geometric pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-primary-200">
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-primary-300/70" />
            <span className="font-medium text-accent">About Us</span>
          </nav>

          {/* Heading Content */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Empowering Future Innovators</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              About RESDA
            </h1>
            <p className="text-lg md:text-xl text-primary-100 font-normal leading-relaxed">
              Skill Empowerment for the Nation&apos;s Future. We are a premier IT training institution and digital services company bridging the technology skills gap through world-class practical education and enterprise software solutions.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR STORY SECTION
          ========================================================================= */}
      <section className="section-padding bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-semibold text-xs tracking-wider uppercase">
                <Award className="w-4 h-4 text-primary" />
                <span>Our Origin & Journey</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-tight">
                Founded to Bridge the <span className="text-gradient-purple">IT Skills Gap</span> in Our Nation
              </h2>

              <p className="text-body text-base sm:text-lg leading-relaxed">
                In a rapidly digitizing global economy, South Asia holds immense potential with one of the youngest and most ambitious populations. Yet, a persistent divide has existed between theoretical academic syllabi and the dynamic requirements of the global software industry.
              </p>

              <p className="text-body text-base leading-relaxed">
                RESDA was established with a singular, transformative vision: to close this gap by empowering youth, professionals, and organizations with cutting-edge, hands-on technical skills. From our initial cohort of eager students in Dhaka to becoming a comprehensive IT training and software solutions powerhouse, our journey has been fueled by relentless passion and tangible outcomes.
              </p>

              {/* Core Pillars Checklist */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="text-heading font-semibold text-sm sm:text-base">
                      Practical, Project-Centric Pedagogy:
                    </strong>
                    <span className="text-body text-sm sm:text-base ml-1">
                      Learners build real-world applications instead of merely memorizing syntax, creating portfolio-ready code from day one.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="text-heading font-semibold text-sm sm:text-base">
                      Dual Synergy of Training & IT Services:
                    </strong>
                    <span className="text-body text-sm sm:text-base ml-1">
                      Our active software development wing informs our training curricula with live industry practices, tooling, and market standards.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="text-heading font-semibold text-sm sm:text-base">
                      Dedicated Placement & Career Support:
                    </strong>
                    <span className="text-body text-sm sm:text-base ml-1">
                      We guide candidates through resume building, technical mock interviews, and direct referrals to our network of hiring partners.
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote / Highlight Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-primary-50/70 border-l-4 border-primary mt-6">
                <p className="text-sm sm:text-base italic text-primary-900 font-medium leading-relaxed">
                  &ldquo;We don&apos;t just teach technology; we cultivate career resilience, creative problem-solving, and digital self-reliance for our nation&apos;s youth.&rdquo;
                </p>
                <span className="block text-xs font-bold text-primary mt-2">
                  — The RESDA Founding Team
                </span>
              </div>
            </div>

            {/* Right Column: Colored Placeholder Image Area */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Purple-tinted Gradient Rectangle Container */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-800 via-primary to-primary-dark p-8 sm:p-10 text-white shadow-2xl shadow-primary/25 border border-primary-400/20 aspect-[4/3] sm:aspect-auto sm:min-h-[460px] flex flex-col justify-between">
                  
                  {/* Decorative Radial Lighting */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-light/30 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

                  {/* Top Badge & Header in Placeholder */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-accent">
                      <GraduationCap className="w-4 h-4" />
                      <span>Skill Empowerment</span>
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-primary-200">
                      Est. 2018
                    </span>
                  </div>

                  {/* Center Visual Articulation inside Placeholder */}
                  <div className="relative z-10 my-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner mb-4 group-hover:scale-105 transition-transform duration-300">
                      <ShieldCheck className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      RESDA IT Academy
                    </h3>
                    <p className="text-xs sm:text-sm text-primary-100/90 max-w-xs leading-relaxed">
                      Nurturing talent across web development, cloud computing, mobile applications, and digital innovation.
                    </p>

                    {/* Skill Tags Pill Grid */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-5 max-w-sm">
                      {["Full-Stack Web", "Python & AI", "Flutter Apps", "Cloud & DevOps", "UI/UX"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-white/15 text-[11px] font-medium text-white/95 border border-white/10 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Stats Highlight Banner in Placeholder */}
                  <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-primary-200">Impact Metric</div>
                      <div className="text-lg font-extrabold text-white">95% Success Rate</div>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div className="text-right">
                      <div className="text-xs text-primary-200">Hands-on Focus</div>
                      <div className="text-lg font-extrabold text-accent">100% Practical</div>
                    </div>
                  </div>
                </div>

                {/* Floating Decorative Accent Badge */}
                <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 bg-surface p-4 rounded-2xl shadow-xl border border-primary-100 hidden sm:flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-heading">Certified Excellence</div>
                    <div className="text-[11px] text-body">National IT Development</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: MISSION, VISION, VALUES
          ========================================================================= */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-semibold text-xs tracking-wider uppercase mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Our Guiding Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Mission, Vision & Values
            </h2>
            <p className="text-body text-base sm:text-lg mt-3">
              The foundational pillars that guide every course we design, every software solution we architect, and every student we mentor.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Mission */}
            <div className="bg-surface rounded-2xl p-8 border border-primary-100/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 card-hover flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-heading tracking-tight mb-3">
                  Our Mission
                </h3>
                <p className="text-body leading-relaxed text-sm sm:text-base">
                  To democratize access to industry-grade technical skills by delivering immersive, affordable, and practical IT training alongside enterprise-ready software solutions that accelerate national productivity.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Market-relevant technical curricula</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Inclusive skill empowerment for all</span>
                </div>
              </div>
            </div>

            {/* Card 2: Vision */}
            <div className="bg-surface rounded-2xl p-8 border border-primary-100/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 card-hover flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-heading tracking-tight mb-3">
                  Our Vision
                </h3>
                <p className="text-body leading-relaxed text-sm sm:text-base">
                  To establish South Asia as a premier global talent hub by cultivating visionary software architects, resilient developers, and creative tech entrepreneurs who shape the digital landscape of tomorrow.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Global engineering competitiveness</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Regional technological self-sufficiency</span>
                </div>
              </div>
            </div>

            {/* Card 3: Values */}
            <div className="bg-surface rounded-2xl p-8 border border-primary-100/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 card-hover flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary mb-6">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-heading tracking-tight mb-3">
                  Our Core Values
                </h3>
                <p className="text-body leading-relaxed text-sm sm:text-base">
                  We believe in uncompromising integrity, empathetic mentorship, relentless technical curiosity, and putting learner success at the very heart of everything we undertake.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Student-first mentorship & empathy</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Excellence, merit & ethical practices</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: STATS COUNTER SECTION (FULL-WIDTH PURPLE BACKGROUND)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white py-16 md:py-20 relative overflow-hidden">
        {/* Visual Background Embellishments */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Empowerment In Numbers
            </h2>
            <p className="text-primary-100 text-sm sm:text-base mt-2">
              Reflecting our commitment to qualitative tech education and sustainable software solutions.
            </p>
          </div>

          {/* Interactive Animated Stats Counters */}
          <StatsCounter />
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: OUR TEAM SECTION (6 TEAM MEMBER CARDS)
          ========================================================================= */}
      <section className="section-padding bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-semibold text-xs tracking-wider uppercase mb-3">
              <Users className="w-4 h-4 text-primary" />
              <span>Leadership & Faculty</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Meet Our Expert Team
            </h2>
            <p className="text-body text-base sm:text-lg mt-3">
              Passionate educators, seasoned software architects, and dedicated professionals committed to your lifelong learning and career growth.
            </p>
          </div>

          {/* 6 Team Member Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-background rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/40 hover:bg-white transition-all duration-300 card-hover flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Top Header with Avatar & Department */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* Colored Circle Avatar with Initials */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl tracking-wider shadow-md shrink-0 border-2 border-white ${member.avatarBg}`}
                    >
                      {member.initials}
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary-50 inline-block mb-1">
                        {member.department}
                      </span>
                      <h3 className="text-lg font-bold text-heading leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-primary mt-0.5">
                        {member.designation}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-body text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Footer contact / social badge */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-body">
                  <span className="font-medium">RESDA Core Faculty</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success inline-block" />
                    <span className="text-heading font-medium">Active Mentor</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: OUR TRAINING CENTERS (LOCATION & FACILITIES)
          ========================================================================= */}
      <section className="section-padding bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-semibold text-xs tracking-wider uppercase mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Modern Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
              Our Training Centers
            </h2>
            <p className="text-body text-base sm:text-lg mt-3">
              Designed to foster focused concentration, collaboration, and high-performance hands-on technical skill mastery.
            </p>
          </div>

          {/* Training Center Locations Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {trainingCenters.map((center) => (
              <div
                key={center.name}
                className="bg-surface rounded-2xl p-6 sm:p-8 border border-primary-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent top border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-dark font-bold text-xs uppercase tracking-wider mb-2">
                      {center.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-heading">
                      {center.name}
                    </h3>
                    <p className="text-sm font-medium text-primary mt-0.5">
                      {center.type}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3.5 text-sm text-body mt-6 border-t border-border pt-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href={`tel:${center.phone}`} className="hover:text-primary transition-colors font-medium">
                      {center.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href={`mailto:${center.email}`} className="hover:text-primary transition-colors font-medium">
                      {center.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{center.hours}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-success flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Campus Open for Physical Visits
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 group"
                  >
                    <span>Schedule Visit</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Comprehensive Facilities List */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-heading">
                  World-Class Campus Facilities
                </h3>
                <p className="text-sm text-body mt-1">
                  Everything you need for an immersive, uninterrupted learning experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((facility) => {
                const Icon = facility.icon;
                return (
                  <div
                    key={facility.title}
                    className="bg-surface rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 card-hover flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-heading mb-2">
                        {facility.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-body leading-relaxed">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CTA SECTION (JOIN RESDA BANNER WITH BUTTON)
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white p-8 sm:p-12 md:p-16 shadow-2xl">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Begin Your Tech Career Journey</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Ready to Join RESDA and Build Your Digital Future?
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-primary-100 font-normal leading-relaxed mb-8">
                Whether you are an ambitious student seeking market-ready IT certifications or an enterprise looking for top-tier software development solutions, we are here to empower your success.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary-900 font-extrabold text-base rounded-xl hover:bg-accent-light transition-all duration-200 shadow-lg shadow-black/20 hover:scale-[1.02]"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Explore All Courses</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-base rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/25 backdrop-blur-sm"
                >
                  <span>Talk to an Advisor</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-primary-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Free Initial Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Online & Offline Hybrid Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Industry-Certified Instructors</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
