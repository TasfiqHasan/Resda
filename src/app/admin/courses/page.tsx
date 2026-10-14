"use client";

import { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  DollarSign,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  MoreVertical,
  X,
} from "lucide-react";

export default function AdminCoursesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([
    {
      id: "crs-1",
      title: "Full-Stack Web Development (MERN)",
      category: "Web Development",
      mode: "ONLINE",
      price: 15000,
      students: 48,
      duration: "6 Months",
      instructor: "Tanvir Ahmed",
      isPublished: true,
    },
    {
      id: "crs-2",
      title: "Python Programming & Data Science",
      category: "Data Science",
      mode: "HYBRID",
      price: 12000,
      students: 32,
      duration: "4 Months",
      instructor: "MD. Rafiqul Islam",
      isPublished: true,
    },
    {
      id: "crs-3",
      title: "Networking & System Administration",
      category: "Infrastructure",
      mode: "OFFLINE",
      price: 18000,
      students: 24,
      duration: "5 Months",
      instructor: "Shakil Hossain",
      isPublished: true,
    },
    {
      id: "crs-4",
      title: "Cybersecurity & Ethical Hacking",
      category: "Security",
      mode: "ONLINE",
      price: 9000,
      students: 19,
      duration: "3 Months",
      instructor: "Security Team",
      isPublished: false,
    },
    {
      id: "crs-5",
      title: "UI/UX Design Masterclass with Figma",
      category: "Design",
      mode: "ONLINE",
      price: 8000,
      students: 65,
      duration: "3 Months",
      instructor: "Nusrat Jahan",
      isPublished: true,
    },
  ]);

  // Form states for new course
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Web Development");
  const [newMode, setNewMode] = useState<"ONLINE" | "OFFLINE" | "HYBRID">("ONLINE");
  const [newPrice, setNewPrice] = useState("12000");
  const [newDuration, setNewDuration] = useState("4 Months");
  const [newInstructor, setNewInstructor] = useState("RESDA Senior Mentor");

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourseObj = {
      id: `crs-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      mode: newMode,
      price: parseFloat(newPrice),
      students: 0,
      duration: newDuration,
      instructor: newInstructor,
      isPublished: true,
    };
    setCourses([newCourseObj, ...courses]);
    setShowAddModal(false);
    setNewTitle("");
  };

  const togglePublish = (id: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-accent" /> Course & Syllabus Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, update pricing, assign classroom batches, and publish training programs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-accent hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by title, instructor, or category..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Course List Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Course Program</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Tuition Fee</th>
                <th className="py-3 px-4">Enrolled Students</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{c.title}</p>
                    <p className="text-[11px] text-slate-500">Lead: {c.instructor}</p>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">{c.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {c.mode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-accent">৳ {c.price.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{c.students} students</td>
                  <td className="py-3.5 px-4 text-slate-400">{c.duration}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublish(c.id)}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 transition-colors ${
                        c.isPublished
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-slate-900 text-slate-500 border border-slate-800"
                      }`}
                    >
                      {c.isPublished ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Course */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> Create New Training Course
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next.js 15 & Cloud Architecture"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category Track
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                  >
                    <option>Web Development</option>
                    <option>Data Science</option>
                    <option>Cybersecurity</option>
                    <option>Infrastructure</option>
                    <option>UI/UX Design</option>
                    <option>Digital Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Delivery Mode
                  </label>
                  <select
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as "ONLINE" | "OFFLINE" | "HYBRID")}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="ONLINE">Online Live</option>
                    <option value="OFFLINE">Offline (Nafi Tower)</option>
                    <option value="HYBRID">Hybrid Format</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tuition Fee (BDT ৳)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="e.g. 4 Months"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Lead Instructor
                </label>
                <input
                  type="text"
                  required
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-accent hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
