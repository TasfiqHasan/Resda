"use client";

import { useState, useEffect } from "react";
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
  RefreshCw,
} from "lucide-react";

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const res = await fetch("/api/enrollments");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setEnrollments(data);
          }
        }
      } catch (err) {
        console.warn("Failed to load student enrollments:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const totalLessons = enrollments.reduce((sum, e) => sum + (e.lessonsCompleted || 0), 0);
  const hoursLearned = Math.max(totalLessons * 2, 48);
  const certificatesCount = enrollments.filter((e) => e.hasCertificate || e.progress >= 100).length;
  const activeCourse = enrollments.find((e) => e.status !== "COMPLETED") || enrollments[0];

  const stats = [
    { label: "Enrolled Courses", value: enrollments.length.toString(), icon: BookOpen, change: "+1 this month" },
    { label: "Attendance Rate", value: "96%", icon: TrendingUp, change: "Excellent" },
    { label: "Hours Learned", value: `${hoursLearned} hrs`, icon: Clock, change: "Active pacing" },
    { label: "Certificates Earned", value: certificatesCount.toString(), icon: Award, change: "Verified" },
  ];

  const upcomingSchedule = [
    {
      time: "08:00 PM - 10:00 PM",
      day: "Today",
      title: activeCourse ? `${activeCourse.title} Live Workshop` : "Full-Stack Live Mentorship Session",
      instructor: activeCourse ? activeCourse.instructor : "Tanvir Ahmed",
      mode: "Online (Zoom Virtual Lab)",
      link: activeCourse ? `/dashboard/learn/${activeCourse.courseSlug || activeCourse.courseId}` : "#",
    },
    {
      time: "03:30 PM - 05:30 PM",
      day: "Friday",
      title: "Hands-on Computer Lab Session",
      instructor: "Dr. Rafiqul Islam",
      mode: "Offline • Lab 302, Nafi Tower",
      link: "/dashboard/schedule",
    },
    {
      time: "07:00 PM - 08:30 PM",
      day: "Sunday",
      title: "Weekly Code Review & Sprint Demo",
      instructor: "RESDA Lead Mentors",
      mode: "Online (Live Code Share)",
      link: activeCourse ? `/dashboard/learn/${activeCourse.courseSlug || activeCourse.courseId}` : "#",
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
            You are enrolled in {enrollments.length} professional IT tracks. Your next live workshop begins at 8:00 PM tonight.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {activeCourse ? (
              <Link
                href={`/dashboard/learn/${activeCourse.courseSlug || activeCourse.courseId}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-primary-900 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-accent/20"
              >
                <PlayCircle className="w-4 h-4" /> Continue: {activeCourse.title.split(" ")[0]}
              </Link>
            ) : (
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-primary-900 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-accent/20"
              >
                <PlayCircle className="w-4 h-4" /> Explore Courses
              </Link>
            )}
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
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-black text-heading">{stat.value}</p>
                <span className="text-[11px] text-emerald-600 font-semibold">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column: Ongoing Courses & Live Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ongoing Courses (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-heading flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Active Enrolled Programs
            </h2>
            <Link
              href="/dashboard/courses"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View All ({enrollments.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {enrollments.map((course) => (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-primary bg-primary-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      {course.batch} • {course.mode}
                    </span>
                    <h3 className="text-base font-bold text-heading">{course.title}</h3>
                    <p className="text-xs text-body mt-0.5">Instructor: {course.instructor}</p>
                  </div>
                  <Link
                    href={`/dashboard/learn/${course.courseSlug || course.courseId}`}
                    className="self-start px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-xl transition-colors shrink-0 shadow-sm"
                  >
                    Enter Classroom
                  </Link>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-body font-medium">Syllabus Completion</span>
                    <span className="font-bold text-heading">
                      {course.progress}% ({course.lessonsCompleted} / {course.totalLessons} lessons)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-body">
                  <span className="truncate max-w-[280px]">
                    Schedule: <strong className="text-heading font-medium">{course.nextClass}</strong>
                  </span>
                  {course.hasCertificate ? (
                    <Link
                      href="/dashboard/certificates"
                      className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" /> Certificate Ready
                    </Link>
                  ) : (
                    <span className="text-primary font-medium">Ongoing Cohort</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Schedule Sidebar (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-heading flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Upcoming Sessions
            </h2>
            <Link
              href="/dashboard/schedule"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Full Calendar
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border shadow-sm space-y-4">
            {upcomingSchedule.map((item, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 hover:bg-primary-50/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-primary-dark px-2 py-0.5 rounded">
                    {item.day}
                  </span>
                  <span className="text-xs font-semibold text-body flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {item.time}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-heading leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-body mt-0.5">Lead: {item.instructor}</p>
                </div>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-primary font-medium truncate max-w-[170px]">{item.mode}</span>
                  <Link
                    href={item.link}
                    className="text-primary font-bold hover:underline flex items-center gap-0.5"
                  >
                    Open <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <a
                href="https://zoom.us"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <PlayCircle className="w-4 h-4" /> Launch Zoom Client
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
