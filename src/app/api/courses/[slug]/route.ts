import { NextResponse } from "next/server";
import { getDetailedCourseBySlug } from "@/lib/courses-store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const course = getDetailedCourseBySlug(slug);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (err) {
    console.error("Error fetching course by slug:", err);
    return NextResponse.json({ error: "Failed to fetch course details" }, { status: 500 });
  }
}
