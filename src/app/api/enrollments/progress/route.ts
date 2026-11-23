import { NextResponse } from "next/server";
import { updateLessonProgress } from "@/lib/enrollments-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseSlug, lessonKey, completed } = body;

    if (!courseSlug || !lessonKey) {
      return NextResponse.json(
        { error: "courseSlug and lessonKey are required" },
        { status: 400 }
      );
    }

    const result = await updateLessonProgress(courseSlug, lessonKey, !!completed);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating lesson progress:", error);
    return NextResponse.json(
      { error: "Failed to update lesson progress" },
      { status: 500 }
    );
  }
}
