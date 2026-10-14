"use client";

import Link from "next/link";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  PlayCircle,
  TrendingUp,
  Award,
  ArrowRight,
  ExternalLink,
  Laptop,
} from "lucide-react";

export default function StudentDashboardPage() {
  const stats = [
    { label: "Enrolled Courses", value: "3", icon: BookOpen, change: "+1 this month" },
    { label: "Attendance Rate", value: "96%", icon: TrendingUp, change: "Excellent" },
    { label: "Hours Learned", value: "48 hrs", icon: Clock, change: "12 hrs this week" },
    { label: "Certificates Earned", value: "1", icon: Award, change: "Verified" },
  ];

  const ongoingCourses = [
    {
      id: "1",
      title: "Full-Stack Web Development (MERN)",
      batch: "Batch WD-48 (Online Live)",
      instructor: "Tanvir Ahmed",
      progress: 68,
      nextLesson: "Module 14: Next.js Server Components & Prisma ORM",
      nextDate: "Today, 8:00 PM",
      totalLessons: 42,
      completedLessons: 28,
    },
    {
      id: "2",
      title: "Python Programming & Data Engineering",
      batch: "Batch PY-19 (Weekend)",
      instructor: "MD. Rafiqul Islam",
      progress: 35,
      nextLesson: "Module 6: Pandas DataFrames & NumPy Arrays",
      nextDate: "Friday, 3:30 PM",
      totalLessons: 30,
      completedLessons: 11,
    },
  ];

  const upcomingSchedule = [
    {
      time: "08:00 PM - 10:00 PM",
      day: "Today",
      title: "Full-Stack Live Mentorship Session",
      instructor: "Tanvir Ahmed",
      mode: "Online (Zoom)",
      link: "#",
    },
    {
      time: "03:30 PM - 05:30 PM",
      day: "Friday",
      title: "Python Hands-on Lab Session",
      instructor: "MD. Rafiqul Islam",
      mode: "Offline • Lab 302, Nafi Tower",
      link: "#",
    },
    {
      time: "07:00 PM - 08:30 PM",
      day: "Sunday",
      title: "Weekly Code Review & Sprint Demo",
      instructor: "Lead Mentors",
      mode: "Online (Discord)",
      link: "#",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-hero-gradient text-white relative overflow-hidden shadow-xl shadow-primary/20">
        <div className="absolute right-0 top-0 w-80 h-full bg-white/5 skew-x-12 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-accent font-semibold text-xs mb-3 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Live Batch WD-48
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, Tanvir! 👋
          </h1>
          <p className="mt-2 text-primary-100 text-sm leading-relaxed">
            You are making steady progress in your Full-Stack Web Development track. Your next live workshop begins at 8:00 PM tonight.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-primary-900 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-accent/20"
            >
              <PlayCircle className="w-4 h-4" /> Join Live Classroom
            </a>
            <Link
              href="/dashboard/schedule"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs backdrop-blur-sm transition-colors border border-white/20"
            >
              <Calendar className="w-4 h-4" /> View Full Timetable
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-body">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-heading mt-2">{stat.value}</p>
              <span className="text-[11px] text-emerald-600 font-medium inline-block mt-1">
                {stat.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Continue Learning + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrolled Courses - 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-heading">Continue Learning</h2>
            <Link
              href="/dashboard/courses"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              All Courses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {ongoingCourses.map((course) => (
              <div
                key={course.id}
                className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:border-primary/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary-50 px-2.5 py-0.5 rounded-full">
                      {course.batch}
                    </span>
                    <h3 className="text-base font-bold text-heading mt-1.5">{course.title}</h3>
                    <p className="text-xs text-body mt-0.5">Instructor: {course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-primary">{course.progress}%</span>
                    <p className="text-[11px] text-body">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                {/* Next up snippet & action */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-body">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="truncate max-w-sm">
                      <strong className="text-heading font-medium">Up Next:</strong> {course.nextLesson}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto">
                    <PlayCircle className="w-3.5 h-3.5" /> Resume Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule / Announcements - 1 col */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-heading">Live & Lab Schedule</h2>
            <Link
              href="/dashboard/schedule"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Full Calendar
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border shadow-sm space-y-4">
            {upcomingSchedule.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-primary uppercase">{item.day}</span>
                  <span className="text-body font-medium">{item.time}</span>
                </div>
                <h4 className="text-xs font-bold text-heading">{item.title}</h4>
                <p className="text-[11px] text-body flex items-center gap-1">
                  <Laptop className="w-3 h-3 text-primary" /> {item.mode}
                </p>
              </div>
            ))}

            <div className="pt-2">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-primary-50 text-primary hover:bg-primary-100 rounded-xl text-xs font-semibold transition-colors"
              >
                <span>Join RESDA Student Community</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
