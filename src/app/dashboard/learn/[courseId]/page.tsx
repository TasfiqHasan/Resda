"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileCode,
  Download,
  MessageSquare,
  Sparkles,
  Share2,
  Clock,
  Layers,
  ExternalLink,
  ThumbsUp,
  Send,
  HelpCircle,
  Copy,
  Check,
  Award,
} from "lucide-react";
import { getCourseBySlug } from "@/lib/courses-data";

function LMSClassroomContent() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "full-stack-web-dev";
  const [course, setCourse] = useState(() => {
    return getCourseBySlug(courseId) || getCourseBySlug("full-stack-web-dev")!;
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamicCourse() {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.title) {
            setCourse(data);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic LMS course details:", err);
      }
    }
    fetchDynamicCourse();
    return () => {
      isMounted = false;
    };
  }, [courseId]);

  // Video player simulator state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(38); // 38% through current lecture
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources" | "discussion">("overview");

  // Active lecture state
  const [activeModuleIdx, setActiveModuleIdx] = useState(3); // Module 4
  const [activeLessonIdx, setActiveLessonIdx] = useState(0); // Lesson 1

  // Completion tracking
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    "0-0": true,
    "0-1": true,
    "0-2": true,
    "0-3": true,
    "1-0": true,
    "1-1": true,
    "1-2": true,
    "2-0": true,
    "2-1": true,
    "2-2": true,
    "3-0": false,
  });

  const [copiedCode, setCopiedCode] = useState(false);

  // Q&A Comments state
  const [comments, setComments] = useState([
    {
      id: "c1",
      author: "Shakil Ahmed",
      time: "2 hours ago",
      text: "Is it better to use Server Actions directly inside a form action, or wrap it in a useTransition hook for optimistic updates?",
      likes: 4,
      replies: 1,
      instructorReply: "Great question Shakil! For simple form submissions, the direct `action={formAction}` is super clean. If you want instant UI feedback (like a pending spinner or optimistic row), `useTransition` with `isPending` is recommended.",
    },
    {
      id: "c2",
      author: "Farhana Yasmin",
      time: "Yesterday",
      text: "The explanation about React Server Components vs. Client Component boundaries at 14:20 was crystal clear! Thank you Tanvir bhai.",
      likes: 7,
      replies: 0,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const currentModule = course.modules[activeModuleIdx] || course.modules[0];
  const currentLesson = currentModule?.lessons[activeLessonIdx] || {
    title: "Next.js 15 App Router & Server Components",
    duration: "2h 30m",
  };

  const currentLessonKey = `${activeModuleIdx}-${activeLessonIdx}`;
  const isCurrentLessonCompleted = !!completedLessons[currentLessonKey];

  const handleToggleComplete = async () => {
    const nextVal = !isCurrentLessonCompleted;
    setCompletedLessons({
      ...completedLessons,
      [currentLessonKey]: nextVal,
    });

    try {
      await fetch("/api/enrollments/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: courseId,
          lessonKey: currentLessonKey,
          completed: nextVal,
        }),
      });
    } catch (err) {
      console.error("Failed to sync progress with server:", err);
    }
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: `c-${Date.now()}`,
        author: "Tanvir Ahmed (You)",
        time: "Just now",
        text: newComment,
        likes: 0,
        replies: 0,
      },
      ...comments,
    ]);
    setNewComment("");
  };

  // Calculate overall course completion %
  const totalLessonsInCourse = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompletedCount = Object.values(completedLessons).filter(Boolean).length;
  const overallPercentage = Math.round((totalCompletedCount / Math.max(totalLessonsInCourse, 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 1. LMS Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/dashboard/courses"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to My Courses</span>
          </Link>
          <div className="h-5 w-px bg-slate-800 hidden sm:block" />
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-white truncate">{course.title}</h1>
            <p className="text-[11px] text-slate-400 truncate">
              {currentModule.title} • {currentLesson.title}
            </p>
          </div>
        </div>

        {/* Progress gauge & action */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Course Progress:</span>
            <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all duration-300"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <span className="text-xs font-bold text-accent">{overallPercentage}%</span>
          </div>

          <button
            onClick={handleToggleComplete}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isCurrentLessonCompleted
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-accent hover:bg-amber-400 text-slate-950 shadow-sm"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCurrentLessonCompleted ? "Lesson Completed" : "Mark as Complete"}</span>
          </button>
        </div>
      </header>

      {/* 2. Main Workspace: Video Player + Modules Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        {/* Left Column: Video Theater + Lesson Details */}
        <div className="flex-1 flex flex-col min-w-0 bg-black">
          {/* Simulated Video Player Screen */}
          <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
            {/* Ambient Background Simulation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-slate-950 to-indigo-950/40 pointer-events-none" />

            {/* Video Watermark & Title overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider border border-white/10 uppercase">
                RESDA HD • 1080p
              </span>
              <span className="px-2.5 py-1 rounded-md bg-accent/20 backdrop-blur-md text-accent text-[10px] font-semibold border border-accent/20">
                Live Classroom Recording
              </span>
            </div>

            {/* Simulated Center Player Graphic */}
            <div className="relative z-10 text-center space-y-3 p-6 max-w-lg">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-accent hover:bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-accent/40 transition-transform active:scale-95 cursor-pointer group-hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-slate-950 text-slate-950" />
                ) : (
                  <Play className="w-8 h-8 fill-slate-950 text-slate-950 ml-1" />
                )}
              </button>

              <h2 className="text-base sm:text-lg font-bold text-white drop-shadow">
                {currentLesson.title}
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Mentor: {course.instructor.name} • {currentLesson.duration}
              </p>
            </div>

            {/* Video Player Control Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 z-20 space-y-2">
              {/* Scrubber Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                  setVideoProgress(pct);
                }}
                className="w-full h-1.5 bg-slate-700/80 hover:h-2.5 rounded-full cursor-pointer relative transition-all"
              >
                <div
                  className="bg-accent h-full rounded-full relative"
                  style={{ width: `${videoProgress}%` }}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-white absolute right-0 top-1/2 -translate-y-1/2 shadow-md" />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {Math.round((videoProgress / 100) * 45)}:12 / 45:00
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Playback speed toggle */}
                  <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-700 text-[11px]">
                    {[1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaybackSpeed(s)}
                        className={`px-1.5 py-0.5 rounded ${
                          playbackSpeed === s ? "bg-accent text-slate-950 font-bold" : "hover:text-white"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <button className="p-1 hover:text-white transition-colors cursor-pointer">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Under Video Content: Tabs Navigation */}
          <div className="bg-slate-900 border-t border-slate-800">
            <div className="px-4 sm:px-6 flex items-center gap-2 border-b border-slate-800 overflow-x-auto">
              {[
                { id: "overview", label: "Lecture Overview", icon: BookOpen },
                { id: "notes", label: "Code & Notes", icon: FileCode },
                { id: "resources", label: "Downloads & Files", icon: Download },
                { id: "discussion", label: `Class Discussion (${comments.length})`, icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3.5 px-3 border-b-2 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "border-accent text-accent"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="p-4 sm:p-6 text-sm text-slate-300">
              {activeTab === "overview" && (
                <div className="space-y-5 max-w-3xl">
                  <div>
                    <h3 className="text-base font-bold text-white">{currentLesson.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      In this core engineering lecture, we dissect React Server Components (RSC) and understand how Next.js executes components on the Node.js server before streaming lightweight HTML to the client browser.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider text-accent">
                      Key Takeaways & Learning Objectives:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5 leading-relaxed">
                      <li>Understand the boundary between `&quot;use client&quot;` and Server Components</li>
                      <li>Eliminate large client-side JavaScript bundle sizes by leveraging server-side data fetching</li>
                      <li>Direct Prisma ORM database queries inside Server Components without writing separate API routes</li>
                      <li>Streaming UI states with React Suspense and loading skeleton fallbacks</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 text-accent flex items-center justify-center font-bold">
                        TA
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{course.instructor.name}</p>
                        <p className="text-[11px] text-slate-400">Next Live Q&A Session: Wednesday, 8:00 PM</p>
                      </div>
                    </div>

                    <a
                      href="https://discord.gg"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs transition-colors border border-slate-700 flex items-center gap-1.5"
                    >
                      <span>Ask in Discord</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-accent" /> Sample Server Component Code
                    </h3>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400 leading-relaxed">
                    <pre>{`// app/dashboard/courses/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function EnrolledCoursesPage() {
  const session = await auth();

  // Direct server query — zero client bundle overhead!
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session?.user?.id },
    include: { course: true },
    orderBy: { enrolledAt: "desc" }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {enrollments.map((item) => (
        <CourseCard key={item.id} data={item.course} progress={item.progress} />
      ))}
    </div>
  );
}`}</pre>
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-3 max-w-2xl">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                    Attached Files for this Lecture:
                  </h3>
                  {[
                    { name: "Module-14-Architecture-Slides.pdf", size: "4.8 MB", type: "PDF Slides" },
                    { name: "Starter-Source-Code.zip", size: "12.4 MB", type: "ZIP Archive" },
                    { name: "CheatSheet-Server-Actions-2026.md", size: "18 KB", type: "Reference Doc" },
                  ].map((res, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-4 h-4 text-accent shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white">{res.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {res.type} • {res.size}
                          </p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "discussion" && (
                <div className="space-y-6 max-w-3xl">
                  {/* Post new question */}
                  <form onSubmit={handlePostComment} className="space-y-2.5">
                    <textarea
                      rows={2}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Have a question about this lecture? Ask your mentors and peers..."
                      className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-accent resize-none placeholder-slate-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-accent hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Question</span>
                      </button>
                    </div>
                  </form>

                  {/* Comments feed */}
                  <div className="space-y-4">
                    {comments.map((comm) => (
                      <div
                        key={comm.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{comm.author}</span>
                          <span className="text-slate-500 text-[11px]">{comm.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{comm.text}</p>

                        {comm.instructorReply && (
                          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1 mt-2 text-xs">
                            <span className="text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Instructor Verified Reply
                            </span>
                            <p className="text-slate-200 leading-relaxed">{comm.instructorReply}</p>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                          <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{comm.likes}</span>
                          </button>
                          <button className="hover:text-white transition-colors cursor-pointer">Reply</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Course Curriculum Playlist Sidebar */}
        <aside className="w-full lg:w-96 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-accent" /> Course Modules
              </h2>
              <p className="text-[11px] text-slate-400">
                {course.modules.length} Modules • {totalCompletedCount}/{totalLessonsInCourse} Lessons Done
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
            {course.modules.map((mod, mIdx) => {
              const isCurrentModule = activeModuleIdx === mIdx;
              return (
                <div key={mIdx} className="bg-slate-950">
                  <button
                    onClick={() => setActiveModuleIdx(mIdx)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                        Module {mIdx + 1}
                      </span>
                      <h3 className="text-xs font-bold text-white leading-snug mt-0.5">{mod.title}</h3>
                      <p className="text-[11px] text-slate-400">{mod.duration}</p>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{mod.lessons.length}</span>
                  </button>

                  {/* Lessons in this module */}
                  {isCurrentModule && (
                    <div className="bg-slate-900/60 divide-y divide-slate-800/40">
                      {mod.lessons.map((les, lIdx) => {
                        const key = `${mIdx}-${lIdx}`;
                        const isCurrent = activeModuleIdx === mIdx && activeLessonIdx === lIdx;
                        const isDone = !!completedLessons[key];

                        return (
                          <button
                            key={lIdx}
                            onClick={() => {
                              setActiveModuleIdx(mIdx);
                              setActiveLessonIdx(lIdx);
                              setVideoProgress(0);
                            }}
                            className={`w-full p-3.5 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                              isCurrent
                                ? "bg-primary/20 border-l-4 border-accent text-white"
                                : "hover:bg-slate-800/50 text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[9px] font-mono text-slate-400">
                                  {lIdx + 1}
                                </div>
                              )}
                              <span className="text-xs font-medium truncate">{les.title}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-mono shrink-0">
                              {les.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function LMSClassroomPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LMSClassroomContent />
    </Suspense>
  );
}
