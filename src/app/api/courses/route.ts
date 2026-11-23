import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAllCourses,
  createNewCourse,
  toggleCoursePublish,
  deleteCourseById,
} from "@/lib/courses-store";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";
    const category = searchParams.get("category");
    const mode = searchParams.get("mode");
    const search = searchParams.get("search");

    let courses = await getAllCourses(isAdmin);

    if (category && category !== "All" && category !== "All Courses") {
      courses = courses.filter((c) => c.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (mode && mode !== "ALL") {
      courses = courses.filter((c) => c.mode.toLowerCase().includes(mode.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, mode, price, originalPrice, duration, instructor, description, level } = body;

    if (!title || !category || !price) {
      return NextResponse.json(
        { error: "Missing required fields (title, category, price)" },
        { status: 400 }
      );
    }

    const course = await createNewCourse({
      title,
      category,
      mode: mode || "Online Live",
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      duration: duration || "4 Months",
      instructor: instructor || "RESDA Senior Mentor",
      description,
      level,
    });

    return NextResponse.json({ message: "Course created successfully", course }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, action } = body;
    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    if (action === "togglePublish") {
      const isPublished = await toggleCoursePublish(id);
      return NextResponse.json({ success: true, isPublished });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const deleted = await deleteCourseById(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
