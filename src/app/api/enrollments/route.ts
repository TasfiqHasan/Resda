import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/enrollments — Get current user's enrollments or all (admin)
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.user.role === "ADMIN";

    const enrollments = await prisma.enrollment.findMany({
      where: isAdmin ? {} : { userId: session.user.id },
      include: {
        course: {
          select: {
            title: true,
            slug: true,
            category: true,
            duration: true,
            instructor: true,
            thumbnail: true,
            level: true,
          },
        },
        user: isAdmin
          ? { select: { name: true, email: true } }
          : undefined,
      },
      orderBy: { enrolledAt: "desc" },
    });

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
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Please log in to enroll" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { courseId, batchNo } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Check course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "You are already enrolled in this course" },
        { status: 409 }
      );
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
        batchNo: batchNo || null,
        status: "ACTIVE",
        paymentStatus: "PENDING",
      },
      include: {
        course: { select: { title: true } },
      },
    });

    // Increment totalStudents on course
    await prisma.course.update({
      where: { id: courseId },
      data: { totalStudents: { increment: 1 } },
    });

    return NextResponse.json(
      {
        message: `Successfully enrolled in ${enrollment.course.title}`,
        enrollment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json(
      { error: "Failed to enroll" },
      { status: 500 }
    );
  }
}
