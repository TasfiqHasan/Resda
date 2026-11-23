import { NextResponse } from "next/server";
import { initiateSSLSession } from "@/lib/sslcommerz";
import { createPaymentRecord } from "@/lib/payments-store";
import { getCourseBySlug } from "@/lib/courses-data";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      courseSlug,
      paymentPlan = "FULL",
      customerName,
      customerEmail,
      customerPhone,
      method = "SSLCOMMERZ",
    } = body;

    if (!courseSlug || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required booking details (course, name, email, phone)." },
        { status: 400 }
      );
    }

    const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid Bangladeshi mobile number. Please provide a valid 11-digit number starting with 013-019 (e.g. 01712345678)." },
        { status: 400 }
      );
    }

    const course = getCourseBySlug(courseSlug);
    if (!course) {
      return NextResponse.json({ error: "Invalid course selected." }, { status: 404 });
    }

    // Determine amount based on plan
    const totalAmount =
      paymentPlan === "INSTALLMENT"
        ? Math.round(course.discountedPrice / 2)
        : course.discountedPrice;

    // Generate unique transaction ID
    const tranId = `RESDA_TXN_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

    // Get current logged-in user if available
    let userId: string | null = null;
    try {
      const session = await auth();
      userId = session?.user?.id || null;
    } catch {
      // preview/unauthenticated session is ok
    }

    // Record initial transaction
    await createPaymentRecord({
      tranId,
      amount: totalAmount,
      currency: "BDT",
      paymentMethod: method,
      paymentPlan: paymentPlan as "FULL" | "INSTALLMENT",
      status: "PENDING",
      customerName,
      customerEmail,
      customerPhone,
      courseSlug: course.slug,
      courseTitle: course.title,
      userId,
    });

    // Determine baseUrl
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    // Initiate SSL session
    const sslRes = await initiateSSLSession({
      tranId,
      totalAmount,
      currency: "BDT",
      productName: `${course.title} (${paymentPlan === "INSTALLMENT" ? "1st Installment" : "Full Tuition"})`,
      productCategory: "IT Professional Training",
      customerName,
      customerEmail,
      customerPhone,
      paymentPlan: paymentPlan as "FULL" | "INSTALLMENT",
      courseSlug: course.slug,
      baseUrl,
    });

    return NextResponse.json({
      success: true,
      gatewayUrl: sslRes.gatewayUrl,
      tranId,
      amount: totalAmount,
      courseTitle: course.title,
      isSandbox: sslRes.isSandbox,
      isSimulated: sslRes.isSimulated,
    });
  } catch (error) {
    console.error("[API Payment Init Error]:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment session. Please try again." },
      { status: 500 }
    );
  }
}
