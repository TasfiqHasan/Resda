"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function StudentSchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Wednesday");

  const weekDays = [
    { day: "Sunday", date: "Oct 18" },
    { day: "Monday", date: "Oct 19" },
    { day: "Tuesday", date: "Oct 20" },
    { day: "Wednesday", date: "Today" },
    { day: "Thursday", date: "Oct 22" },
    { day: "Friday", date: "Oct 23" },
    { day: "Saturday", date: "Oct 24" },
  ];

  const classSchedule = [
    {
      id: "cls-1",
      day: "Wednesday",
      course: "Full-Stack Web Development",
      module: "Module 14: Prisma Schema & NextAuth Integration",
      time: "08:00 PM - 10:00 PM",
      instructor: "Tanvir Ahmed",
      type: "ONLINE",
      location: "Zoom Virtual Classroom",
      joinUrl: "https://zoom.us",
      isToday: true,
      notes: "Please have Node.js 18+ and VS Code ready before joining.",
    },
    {
      id: "cls-2",
      day: "Friday",
      course: "Python & Data Science",
      module: "Module 6: Hands-on Lab • Pandas & Data Cleaning",
      time: "03:30 PM - 06:30 PM",
      instructor: "MD. Rafiqul Islam",
      type: "OFFLINE",
      location: "19th Floor, Nafi Tower, Gulshan-1 • Lab 3",
      joinUrl: "#",
      isToday: false,
      notes: "Dedicated desktop workstation provided with dual monitors.",
    },
    {
      id: "cls-3",
      day: "Saturday",
      course: "Career Grooming & Mock Technical Interviews",
      module: "Sprint Review & Resume Polishing",
      time: "11:00 AM - 01:00 PM",
      instructor: "Farhana Rahman",
      type: "HYBRID",
      location: "Auditorium / Stream",
      joinUrl: "https://zoom.us",
      isToday: false,
      notes: "Open for all graduating students of 2026 batches.",
    },
  ];

  const currentClasses = classSchedule.filter((c) => c.day === selectedDay);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-heading">Class Schedule & Timetable</h1>
          <p className="text-sm text-body mt-0.5">
            Weekly live classes, physical lab practicals at Nafi Tower, and mentor code review sprints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl border border-border bg-white text-body hover:text-heading">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-heading px-3 py-1.5 bg-white border border-border rounded-xl">
            October 2026
          </span>
          <button className="p-2 rounded-xl border border-border bg-white text-body hover:text-heading">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Selector Bar */}
      <div className="grid grid-cols-7 gap-2 bg-white p-2.5 rounded-2xl border border-border shadow-sm">
        {weekDays.map((item) => {
          const isSelected = selectedDay === item.day;
          return (
            <button
              key={item.day}
              onClick={() => setSelectedDay(item.day)}
              className={`p-3 rounded-xl text-center transition-all ${
                isSelected
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "hover:bg-slate-50 text-body hover:text-heading"
              }`}
            >
              <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">{item.day.slice(0, 3)}</p>
              <p className={`text-xs font-black mt-1 ${isSelected ? "text-accent" : "text-heading"}`}>
                {item.date}
              </p>
            </button>
          );
        })}
      </div>

      {/* Schedule Content */}
      <div className="space-y-4">
        {currentClasses.length > 0 ? (
          currentClasses.map((cls) => (
            <div
              key={cls.id}
              className={`p-6 rounded-3xl bg-white border shadow-sm transition-all ${
                cls.isToday ? "border-primary/50 ring-2 ring-primary/10" : "border-border"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        cls.type === "ONLINE"
                          ? "bg-blue-50 text-blue-700"
                          : cls.type === "OFFLINE"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {cls.type === "ONLINE" ? "Live Online Session" : cls.type === "OFFLINE" ? "In-Person Classroom Lab" : "Hybrid Format"}
                    </span>
                    {cls.isToday && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-accent text-primary-900 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Scheduled Today
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-heading">{cls.course}</h3>
                  <p className="text-sm font-semibold text-primary">{cls.module}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-body pt-1">
                    <span className="flex items-center gap-1.5 font-medium text-heading">
                      <Clock className="w-4 h-4 text-primary" /> {cls.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {cls.type === "ONLINE" ? (
                        <Video className="w-4 h-4 text-blue-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-purple-600" />
                      )}
                      {cls.location}
                    </span>
                    <span>Mentor: {cls.instructor}</span>
                  </div>

                  {cls.notes && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-2xl">
                      💡 <strong>Prep note:</strong> {cls.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {cls.type === "ONLINE" ? (
                    <a
                      href={cls.joinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
                    >
                      <Video className="w-4 h-4" /> Join Live Zoom Class
                    </a>
                  ) : (
                    <a
                      href="https://maps.google.com/?q=Nafi+Tower+Gulshan+1+Dhaka"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 bg-white hover:bg-slate-50 border border-border text-heading text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-primary" /> Campus Directions <ExternalLink className="w-3.5 h-3.5 text-body" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-border p-8">
            <Calendar className="w-12 h-12 text-body/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-heading">No classes scheduled for {selectedDay}</h3>
            <p className="text-xs text-body mt-1 max-w-sm mx-auto">
              Use this self-paced study window to review previous lecture recordings, complete coding assignments, or practice in the computer lab.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
