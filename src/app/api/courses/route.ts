import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/courses — List courses (public)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const mode = searchParams.get("mode");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { isPublished: true };

    if (category) where.category = category;
    if (level) where.level = level;
    if (mode) where.mode = mode;
    if (featured === "true") where.isFeatured = true;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { instructor: { contains: search, mode: "insensitive" } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST /api/courses — Create a course (admin only)
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (
      !session?.user ||
      (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      category,
      level,
      mode,
      price,
      originalPrice,
      duration,
      lessons,
      instructor,
      syllabus,
      thumbnail,
    } = body;

    if (!title || !description || !category || !price || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check slug uniqueness
    const existingCourse = await prisma.course.findUnique({ where: { slug } });
    if (existingCourse) {
      return NextResponse.json(
        { error: "A course with a similar title already exists" },
        { status: 409 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        category,
        level: level || "BEGINNER",
        mode: mode || "ONLINE",
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        duration,
        lessons: lessons ? parseInt(lessons) : 0,
        instructor: instructor || session.user.name || "RESDA Instructor",
        syllabus: syllabus || [],
        thumbnail: thumbnail || null,
        isPublished: false,
      },
    });

    return NextResponse.json(
      { message: "Course created successfully", course },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
