"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  PlayCircle,
  FileText,
  CheckCircle2,
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

export default function StudentCoursesPage() {
  const [filter, setFilter] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enrollments");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCourses(data);
        }
      }
    } catch (err) {
      console.warn("Failed to load enrolled courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesFilter = filter === "ALL" || course.status === filter;
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-heading">My Enrolled Courses</h1>
          <p className="text-sm text-body mt-0.5">
            Track your ongoing IT training courses, syllabus modules, and course completion certificates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadCourses}
            title="Refresh Courses"
            className="p-2.5 rounded-xl border border-border bg-white text-body hover:text-heading transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Explore More Courses
          </Link>
        </div>
      </div>

      {/* Controls Bar: Search + Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-body absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course name or track..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-border rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-body mr-1 hidden sm:block" />
          {(["ALL", "IN_PROGRESS", "COMPLETED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-50 text-body hover:text-heading hover:bg-slate-100"
              }`}
            >
              {tab === "ALL" ? "All Courses" : tab === "IN_PROGRESS" ? "In Progress" : "Completed"}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-border text-body">
            <BookOpen className="w-8 h-8 text-primary/40 mx-auto mb-2" />
            <p className="text-base font-bold text-heading">No enrolled courses found</p>
            <p className="text-xs text-body mt-1">Browse our catalog to enroll in upcoming batches.</p>
            <Link
              href="/courses"
              className="mt-4 inline-block px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col overflow-hidden"
            >
              {/* Top Badge & Category */}
              <div className="p-5 border-b border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary-50 px-2.5 py-0.5 rounded-full">
                    {course.category}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      course.status === "COMPLETED" || course.progress >= 100
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {course.status === "COMPLETED" || course.progress >= 100 ? "Completed" : "In Progress"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-heading line-clamp-1">{course.title}</h3>
                <p className="text-xs text-body">
                  Mentor: <span className="text-heading font-medium">{course.instructor}</span> • {course.batch}
                </p>
              </div>

              {/* Progress & Lessons Info */}
              <div className="p-5 flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-body font-medium">Syllabus Completion</span>
                    <span className="font-bold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progress === 100 ? "bg-emerald-500" : "bg-primary"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-body pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{course.duration || "4 Months"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {course.lessonsCompleted}/{course.totalLessons} Lessons
                    </span>
                  </div>
                </div>

                {course.status !== "COMPLETED" && course.progress < 100 && (
                  <div className="p-2.5 rounded-xl bg-primary-50/60 border border-primary-100 text-[11px] text-primary flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">Next: {course.nextClass}</span>
                  </div>
                )}
              </div>

              {/* Card Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-border flex items-center justify-between gap-2">
                <Link
                  href={`/courses/${course.courseSlug || course.courseId}`}
                  className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 border border-border text-heading text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-body" /> Syllabus
                </Link>

                {course.hasCertificate || course.progress >= 100 ? (
                  <Link
                    href="/dashboard/certificates"
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Certificate
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/learn/${course.courseSlug || course.courseId}`}
                    className="flex-1 py-2 px-3 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <PlayCircle className="w-3.5 h-3.5" /> Continue
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
