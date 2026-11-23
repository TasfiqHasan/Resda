import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getStudentEnrollments,
  enrollStudentInCourse,
  getStudentCertificates,
} from "@/lib/enrollments-store";
import { getCourseBySlug } from "@/lib/courses-data";

// GET /api/enrollments — List current enrollments
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;
    const certificates = searchParams.get("certificates") === "true";

    if (certificates) {
      const certs = await getStudentCertificates(userId);
      return NextResponse.json(certs);
    }

    const enrollments = await getStudentEnrollments(userId);
    return NextResponse.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}

// POST /api/enrollments — Enroll in a course
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId, courseSlug, title, category, mode, batch, instructor, studentName, userId } = body;

    const targetSlug = courseSlug || courseId;
    if (!targetSlug) {
      return NextResponse.json({ error: "courseSlug or courseId is required" }, { status: 400 });
    }

    const detailed = getCourseBySlug(targetSlug);

    const enrollment = await enrollStudentInCourse({
      userId: userId || "demo-student-001",
      userName: studentName || "Tanvir Ahmed",
      courseId: detailed?.id || targetSlug,
      courseSlug: targetSlug,
      title: title || detailed?.title || targetSlug,
      category: category || detailed?.category || "Technology",
      mode: mode || detailed?.mode || "Online Live",
      batch: batch || "Batch WD-48",
      instructor: instructor || detailed?.instructor?.name || "Senior Mentor",
    });

    return NextResponse.json(
      { message: `Successfully enrolled in ${enrollment.title}`, enrollment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json(
      { error: "Failed to create enrollment" },
      { status: 500 }
    );
  }
}
