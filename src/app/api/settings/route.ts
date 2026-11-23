import { NextResponse } from "next/server";
import { getPlatformSettings, updatePlatformSettings } from "@/lib/settings-store";

export async function GET() {
  try {
    const settings = getPlatformSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = updatePlatformSettings(body);
    return NextResponse.json({ message: "Settings updated successfully", settings: updated });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
