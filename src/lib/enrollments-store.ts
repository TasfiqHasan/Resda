import { prisma } from "@/lib/prisma";

export interface StoredEnrollment {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseSlug: string;
  title: string;
  category: string;
  mode: string;
  batch: string;
  instructor: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  status: "IN_PROGRESS" | "COMPLETED";
  nextClass: string;
  hasCertificate: boolean;
  certificateId?: string;
  enrolledAt: string;
  completedLessonMap: Record<string, boolean>;
}

export interface StudentCertificate {
  id: string;
  title: string;
  studentName: string;
  issueDate: string;
  grade: string;
  instructor: string;
  skills: string[];
  verificationUrl: string;
}

const globalEnrollments = global as unknown as {
  _resdaEnrollments?: StoredEnrollment[];
  _resdaCertificates?: StudentCertificate[];
};

if (!globalEnrollments._resdaEnrollments) {
  globalEnrollments._resdaEnrollments = [
    {
      id: "enr-1",
      userId: "demo-student-001",
      userName: "Tanvir Ahmed",
      courseId: "full-stack-web-dev",
      courseSlug: "full-stack-web-dev",
      title: "Full-Stack Web Development (MERN + Next.js)",
      category: "Web Development",
      mode: "Online Live",
      batch: "Batch WD-48",
      instructor: "Tanvir Ahmed",
      progress: 68,
      lessonsCompleted: 28,
      totalLessons: 42,
      status: "IN_PROGRESS",
      nextClass: "Tonight, 8:00 PM (Zoom)",
      hasCertificate: false,
      enrolledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
      completedLessonMap: {
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
      },
    },
    {
      id: "enr-2",
      userId: "demo-student-001",
      userName: "Tanvir Ahmed",
      courseId: "python-programming",
      courseSlug: "python-programming",
      title: "Python Programming & Data Engineering",
      category: "Data Science",
      mode: "Hybrid",
      batch: "Batch PY-19",
      instructor: "Dr. Rafiqul Islam",
      progress: 35,
      lessonsCompleted: 11,
      totalLessons: 30,
      status: "IN_PROGRESS",
      nextClass: "Friday, 3:30 PM (Lab 302, Nafi Tower)",
      hasCertificate: false,
      enrolledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
      completedLessonMap: {
        "0-0": true,
        "0-1": true,
        "1-0": true,
      },
    },
    {
      id: "enr-3",
      userId: "demo-student-001",
      userName: "Tanvir Ahmed",
      courseId: "ui-ux-design",
      courseSlug: "ui-ux-design",
      title: "UI/UX Design Masterclass with Figma",
      category: "Web Development",
      mode: "Online Recorded",
      batch: "Self-Paced UI-04",
      instructor: "Ayesha Siddiqa",
      progress: 100,
      lessonsCompleted: 24,
      totalLessons: 24,
      status: "COMPLETED",
      nextClass: "Graduated",
      hasCertificate: true,
      certificateId: "RESDA-CERT-2026-9041",
      enrolledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
      completedLessonMap: {
        "0-0": true,
        "0-1": true,
        "0-2": true,
        "1-0": true,
        "1-1": true,
        "1-2": true,
        "2-0": true,
        "2-1": true,
        "2-2": true,
      },
    },
  ];

  globalEnrollments._resdaCertificates = [
    {
      id: "RESDA-CERT-2026-9041",
      title: "UI/UX Design Masterclass with Figma",
      studentName: "Tanvir Ahmed",
      issueDate: "September 15, 2026",
      grade: "Distinction (94%)",
      instructor: "Ayesha Siddiqa",
      skills: ["Figma Design Systems", "Prototyping", "User Research", "WCAG 2.1 AAA Accessibility"],
      verificationUrl: "/verify/RESDA-CERT-2026-9041",
    },
  ];
}

const memoryEnrollments = globalEnrollments._resdaEnrollments!;
const memoryCertificates = globalEnrollments._resdaCertificates!;

export async function getStudentEnrollments(userId?: string): Promise<StoredEnrollment[]> {
  try {
    const dbEnrollments = await prisma.enrollment.findMany({
      where: userId ? { userId } : {},
      include: {
        course: true,
        user: true,
      },
      orderBy: { enrolledAt: "desc" },
    });

    if (dbEnrollments && dbEnrollments.length > 0) {
      // Merge db and memory
      const list: StoredEnrollment[] = dbEnrollments.map((e) => ({
        id: e.id,
        userId: e.userId,
        userName: e.user?.name || "Student",
        courseId: e.courseId,
        courseSlug: e.course?.slug || e.courseId,
        title: e.course?.title || "Course",
        category: e.course?.category || "General",
        mode: e.course?.mode === "OFFLINE" ? "Offline Campus" : "Online Live",
        batch: e.batchNo || "Batch Current",
        instructor: e.course?.instructor || "RESDA Lead Mentor",
        progress: e.progress,
        lessonsCompleted: Math.round((e.progress / 100) * (e.course?.lessons || 30)),
        totalLessons: e.course?.lessons || 30,
        status: e.status === "COMPLETED" ? "COMPLETED" : "IN_PROGRESS",
        nextClass: "Upcoming Schedule",
        hasCertificate: e.status === "COMPLETED" || e.progress >= 100 || !!e.completedAt,
        enrolledAt: e.enrolledAt.toISOString(),
        completedLessonMap: {},
      }));

      const dbIds = new Set(list.map((i) => i.id));
      const remainingMem = memoryEnrollments.filter((i) => !dbIds.has(i.id));
      return [...list, ...remainingMem];
    }
  } catch (err) {
    // Database offline
  }

  return [...memoryEnrollments];
}

export async function enrollStudentInCourse(data: {
  userId?: string;
  userName?: string;
  courseId: string;
  courseSlug: string;
  title: string;
  category: string;
  mode?: string;
  batch?: string;
  instructor?: string;
}): Promise<StoredEnrollment> {
  const existing = memoryEnrollments.find(
    (e) => e.courseSlug === data.courseSlug || e.courseId === data.courseId
  );
  if (existing) {
    return existing;
  }

  const newEnrollment: StoredEnrollment = {
    id: `enr-${Date.now()}`,
    userId: data.userId || "demo-student-001",
    userName: data.userName || "Tanvir Ahmed",
    courseId: data.courseId,
    courseSlug: data.courseSlug,
    title: data.title,
    category: data.category,
    mode: data.mode || "Online Live",
    batch: data.batch || "Admissions Batch 2026",
    instructor: data.instructor || "RESDA Technical Mentor",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 36,
    status: "IN_PROGRESS",
    nextClass: "Next Batch Launch • Sunday 8:00 PM",
    hasCertificate: false,
    enrolledAt: new Date().toISOString(),
    completedLessonMap: {},
  };

  memoryEnrollments.unshift(newEnrollment);

  try {
    await prisma.enrollment.create({
      data: {
        userId: data.userId || "demo-student-001",
        courseId: data.courseId,
        batchNo: newEnrollment.batch,
        status: "ACTIVE",
        paymentStatus: "PAID",
      },
    });
  } catch (err) {
    // DB skipped
  }

  return newEnrollment;
}

export async function updateLessonProgress(
  courseSlug: string,
  lessonKey: string,
  completed: boolean
): Promise<{ progress: number; lessonsCompleted: number; totalLessons: number; isCompleted: boolean }> {
  const enr = memoryEnrollments.find(
    (e) => e.courseSlug.toLowerCase() === courseSlug.toLowerCase() || e.courseId.toLowerCase() === courseSlug.toLowerCase()
  );

  if (!enr) {
    return { progress: 0, lessonsCompleted: 0, totalLessons: 36, isCompleted: false };
  }

  enr.completedLessonMap = enr.completedLessonMap || {};
  enr.completedLessonMap[lessonKey] = completed;

  const completedCount = Object.values(enr.completedLessonMap).filter(Boolean).length;
  enr.lessonsCompleted = completedCount;
  enr.progress = Math.min(100, Math.round((completedCount / enr.totalLessons) * 100));

  if (enr.progress >= 100 && !enr.hasCertificate) {
    enr.status = "COMPLETED";
    enr.hasCertificate = true;
    enr.certificateId = `RESDA-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Add certificate
    memoryCertificates.unshift({
      id: enr.certificateId,
      title: enr.title,
      studentName: enr.userName,
      issueDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      grade: "Distinction (95%)",
      instructor: enr.instructor,
      skills: ["Production Deployment", "Full-Stack Architecture", "Software Security", "Cloud DevOps"],
      verificationUrl: `/verify/${enr.certificateId}`,
    });
  }

  return {
    progress: enr.progress,
    lessonsCompleted: enr.lessonsCompleted,
    totalLessons: enr.totalLessons,
    isCompleted: enr.status === "COMPLETED",
  };
}

export async function getStudentCertificates(userId?: string): Promise<StudentCertificate[]> {
  return [...memoryCertificates];
}
