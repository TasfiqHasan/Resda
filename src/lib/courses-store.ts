import { prisma } from "@/lib/prisma";
import { DetailedCourse, DETAILED_COURSES } from "@/lib/courses-data";

export interface StoredCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: "Online Live" | "Offline Campus" | "Hybrid Format";
  price: number;
  originalPrice: number;
  duration: string;
  lessonsCount: number;
  instructor: {
    name: string;
    role: string;
    initials: string;
  };
  description: string;
  syllabus?: string[];
  isPublished: boolean;
  isFeatured?: boolean;
  totalStudents: number;
  rating: number;
  reviewsCount: number;
  gradient: string;
  nextBatch: string;
  createdAt: string;
}

// In-memory global store so courses survive across API routes and page requests in server runtime
const globalCourses = global as unknown as {
  _resdaCourseList?: StoredCourse[];
  _resdaDetailedMap?: Map<string, DetailedCourse>;
};

if (!globalCourses._resdaCourseList) {
  // Initialize with the 6 core detailed courses
  const initialList: StoredCourse[] = Object.values(DETAILED_COURSES).map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    category: c.category,
    level: c.level,
    mode: c.mode,
    price: c.discountedPrice,
    originalPrice: c.originalPrice,
    duration: c.duration,
    lessonsCount: c.lessonsCount,
    instructor: {
      name: c.instructor.name,
      role: c.instructor.role,
      initials: c.instructor.initials || "RA",
    },
    description: c.description,
    isPublished: true,
    isFeatured: c.popular || false,
    totalStudents: c.reviewsCount || 48,
    rating: c.rating,
    reviewsCount: c.reviewsCount,
    gradient: c.gradient,
    nextBatch: c.nextBatch,
    createdAt: new Date().toISOString(),
  }));

  globalCourses._resdaCourseList = initialList;
  globalCourses._resdaDetailedMap = new Map<string, DetailedCourse>(
    Object.entries(DETAILED_COURSES)
  );
}

const memoryCourses = globalCourses._resdaCourseList!;
const memoryDetailedMap = globalCourses._resdaDetailedMap!;

export async function getAllCourses(includeUnpublished = false): Promise<StoredCourse[]> {
  // If DB is accessible, try reading newly synced courses from Prisma
  try {
    const dbCourses = await prisma.course.findMany({
      where: includeUnpublished ? {} : { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbCourses && dbCourses.length > 0) {
      // Merge with memory courses ensuring uniqueness by slug
      const slugSet = new Set<string>();
      const merged: StoredCourse[] = [];

      for (const dbc of dbCourses) {
        slugSet.add(dbc.slug);
        merged.push({
          id: dbc.id,
          slug: dbc.slug,
          title: dbc.title,
          category: dbc.category,
          level: dbc.level as any,
          mode: dbc.mode === "ONLINE" ? "Online Live" : dbc.mode === "OFFLINE" ? "Offline Campus" : "Hybrid Format",
          price: dbc.price,
          originalPrice: dbc.originalPrice || dbc.price * 1.3,
          duration: dbc.duration,
          lessonsCount: dbc.lessons,
          instructor: {
            name: dbc.instructor,
            role: "Senior Mentor, RESDA",
            initials: dbc.instructor.slice(0, 2).toUpperCase(),
          },
          description: dbc.description,
          syllabus: dbc.syllabus,
          isPublished: dbc.isPublished,
          isFeatured: dbc.isFeatured,
          totalStudents: dbc.totalStudents,
          rating: dbc.rating || 4.9,
          reviewsCount: Math.max(dbc.totalStudents * 3, 25),
          gradient: "from-purple-700 via-indigo-600 to-purple-900",
          nextBatch: "Next Month Cohort",
          createdAt: dbc.createdAt.toISOString(),
        });
      }

      for (const mc of memoryCourses) {
        if (!slugSet.has(mc.slug)) {
          if (includeUnpublished || mc.isPublished) {
            merged.push(mc);
          }
        }
      }

      return merged;
    }
  } catch {
    // If DB is offline, continue using memory courses
  }

  return includeUnpublished
    ? [...memoryCourses]
    : memoryCourses.filter((c) => c.isPublished);
}

export async function createNewCourse(data: {
  title: string;
  category: string;
  mode: "ONLINE" | "OFFLINE" | "HYBRID" | "Online Live" | "Offline Campus" | "Hybrid Format";
  price: number;
  originalPrice?: number;
  duration: string;
  instructor: string;
  description?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
}): Promise<StoredCourse> {
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const modeFormatted =
    data.mode === "ONLINE" || data.mode === "Online Live"
      ? "Online Live"
      : data.mode === "OFFLINE" || data.mode === "Offline Campus"
      ? "Offline Campus"
      : "Hybrid Format";

  const originalPrice = data.originalPrice || Math.round(data.price * 1.3);
  const now = new Date().toISOString();

  const newCourse: StoredCourse = {
    id: `crs-${Date.now()}`,
    slug,
    title: data.title,
    category: data.category,
    level: data.level || "Beginner",
    mode: modeFormatted,
    price: data.price,
    originalPrice,
    duration: data.duration,
    lessonsCount: 36,
    instructor: {
      name: data.instructor || "Tanvir Ahmed",
      role: "Lead Technical Instructor, RESDA",
      initials: (data.instructor || "TA").slice(0, 2).toUpperCase(),
    },
    description:
      data.description ||
      `Comprehensive hands-on training in ${data.title}. Master fundamental to advanced real-world skills with expert mentorship and live project practice.`,
    isPublished: true,
    isFeatured: true,
    totalStudents: 0,
    rating: 5.0,
    reviewsCount: 1,
    gradient: "from-purple-700 via-indigo-600 to-purple-900",
    nextBatch: "Upcoming Cohort (Admissions Open)",
    createdAt: now,
  };

  // Add to in-memory list (at the beginning so newly added courses appear first!)
  memoryCourses.unshift(newCourse);

  // Also construct a DetailedCourse so /courses/[slug] and /dashboard/learn/[slug] work immediately!
  const detailed: DetailedCourse = {
    id: newCourse.id,
    slug: newCourse.slug,
    title: newCourse.title,
    category: newCourse.category,
    level: newCourse.level,
    mode: newCourse.mode,
    duration: newCourse.duration,
    lessonsCount: newCourse.lessonsCount,
    originalPrice: newCourse.originalPrice,
    discountedPrice: newCourse.price,
    rating: newCourse.rating,
    reviewsCount: newCourse.reviewsCount,
    gradient: newCourse.gradient,
    popular: true,
    tagline: `Master ${newCourse.title} with industry mentors`,
    description: newCourse.description,
    nextBatch: newCourse.nextBatch,
    schedule: "Sunday & Tuesday • 8:00 PM – 10:00 PM",
    seatsLeft: 18,
    instructor: {
      name: newCourse.instructor.name,
      role: newCourse.instructor.role,
      initials: newCourse.instructor.initials,
      bio: "Industry specialist with extensive hands-on enterprise development and mentoring experience.",
      company: "RESDA IT Services",
      experience: "8+ Years",
    },
    highlights: [
      "Live interactive classes with hands-on computer labs",
      "Real-world commercial project building",
      "Tamper-proof verifiable completion certificate",
      "1-on-1 code reviews and career counseling",
    ],
    outcomes: [
      `Build enterprise-grade applications in ${newCourse.title}`,
      "Deploy live production projects to cloud infrastructure",
      "Prepare a job-ready portfolio for local and global remote roles",
    ],
    prerequisites: ["Basic computer and internet browsing knowledge", "A computer with at least 8GB RAM"],
    toolsLearned: ["Industry IDEs", "Git & GitHub", "Cloud Hosting", "Terminal CLI"],
    capstoneProjects: [
      {
        title: `${newCourse.title} Enterprise Capstone`,
        description: "An end-to-end practical solution designed to showcase in tech interviews.",
        tech: ["Production Architecture", "Security", "Cloud Deployment"],
      },
    ],
    modules: [
      {
        title: "Module 1: Foundations & Architecture Setup",
        duration: "Week 1 - 2 (12 Hours)",
        description: "Core concepts, development environment setup, and baseline principles.",
        lessons: [
          { title: "Introduction & Tooling Setup", duration: "2h 00m" },
          { title: "Core Syntax & Practical Walkthrough", duration: "2h 30m" },
          { title: "Hands-on Lab Exercise 1", duration: "1h 45m" },
        ],
      },
      {
        title: "Module 2: Advanced Techniques & Implementation",
        duration: "Week 3 - 4 (14 Hours)",
        description: "Building production-grade modules and handling edge cases.",
        lessons: [
          { title: "Architectural Patterns & Best Practices", duration: "2h 30m" },
          { title: "Database & Backend API Integration", duration: "2h 15m" },
          { title: "Performance Optimization & Security", duration: "2h 00m" },
        ],
      },
      {
        title: "Module 3: Capstone Project & Cloud Delivery",
        duration: "Week 5 - 6 (16 Hours)",
        description: "Final project completion, code review, and cloud release.",
        lessons: [
          { title: "Capstone Project Architecture", duration: "3h 00m" },
          { title: "Production Deployment & CI/CD", duration: "2h 30m" },
          { title: "Graduation Assessment & Certificate Issuance", duration: "1h 30m" },
        ],
      },
    ],
  };

  memoryDetailedMap.set(slug, detailed);
  DETAILED_COURSES[slug] = detailed;

  // Try saving to Prisma MongoDB if DB is online
  try {
    await prisma.course.create({
      data: {
        title: data.title,
        slug,
        description: newCourse.description,
        category: data.category,
        level: data.level === "Advanced" ? "ADVANCED" : data.level === "Intermediate" ? "INTERMEDIATE" : "BEGINNER",
        mode: data.mode === "OFFLINE" || data.mode === "Offline Campus" ? "OFFLINE" : data.mode === "HYBRID" ? "HYBRID" : "ONLINE",
        price: data.price,
        originalPrice,
        duration: data.duration,
        lessons: newCourse.lessonsCount,
        instructor: newCourse.instructor.name,
        isPublished: true,
        isFeatured: true,
      },
    });
  } catch (dbErr) {
    console.warn("[CoursesStore] DB write skipped (running in demo mode):", (dbErr as Error)?.message);
  }

  return newCourse;
}

export function getDetailedCourseBySlug(slug: string): DetailedCourse | undefined {
  if (memoryDetailedMap.has(slug)) {
    return memoryDetailedMap.get(slug);
  }
  // Fallback to match case-insensitively
  for (const [key, course] of memoryDetailedMap.entries()) {
    if (key.toLowerCase() === slug.toLowerCase()) {
      return course;
    }
  }
  return memoryDetailedMap.get("full-stack-web-dev");
}

export async function toggleCoursePublish(id: string): Promise<boolean> {
  const course = memoryCourses.find((c) => c.id === id);
  if (!course) return false;

  course.isPublished = !course.isPublished;

  try {
    await prisma.course.update({
      where: { id },
      data: { isPublished: course.isPublished },
    });
  } catch {
    // Demo fallback
  }

  return course.isPublished;
}

export async function deleteCourseById(id: string): Promise<boolean> {
  const index = memoryCourses.findIndex((c) => c.id === id);
  if (index !== -1) {
    const slug = memoryCourses[index].slug;
    memoryCourses.splice(index, 1);
    memoryDetailedMap.delete(slug);

    try {
      await prisma.course.delete({ where: { id } });
    } catch {
      // Demo fallback
    }

    return true;
  }
  return false;
}
