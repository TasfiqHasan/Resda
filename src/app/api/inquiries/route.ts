import { NextResponse } from "next/server";
import {
  getAllInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from "@/lib/inquiries-store";

// GET /api/inquiries — List inquiries
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    let inquiries = await getAllInquiries();

    if (type && type !== "ALL") {
      inquiries = inquiries.filter((i) => i.type.toUpperCase() === type.toUpperCase());
    }
    if (status && status !== "ALL") {
      inquiries = inquiries.filter((i) => i.status.toUpperCase() === status.toUpperCase());
    }

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

// POST /api/inquiries — Submit a new inquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, type } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = await createInquiry({
      name,
      email,
      phone,
      subject,
      message,
      type: type || "GENERAL",
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully", inquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

// PATCH /api/inquiries — Update status & reply note
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, replyNote } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

    const updated = await updateInquiryStatus(id, status, replyNote);
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Inquiry updated successfully", inquiry: updated });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

// DELETE /api/inquiries — Delete an inquiry
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id parameter required" }, { status: 400 });
    }

    await deleteInquiry(id);
    return NextResponse.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
