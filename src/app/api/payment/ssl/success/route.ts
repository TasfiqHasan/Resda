import { NextResponse } from "next/server";
import { validateSSLPayment } from "@/lib/sslcommerz";
import { updatePaymentRecord, getPaymentRecord } from "@/lib/payments-store";
import { enrollStudentInCourse } from "@/lib/enrollments-store";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const tran_id = (formData.get("tran_id") as string) || "";
    const val_id = (formData.get("val_id") as string) || "";
    const card_type = (formData.get("card_type") as string) || "SSLCOMMERZ-Payment";
    const bank_tran_id = (formData.get("bank_tran_id") as string) || "";
    const card_issuer = (formData.get("card_issuer") as string) || "";
    const card_brand = (formData.get("card_brand") as string) || "";

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    if (!tran_id) {
      return NextResponse.redirect(`${baseUrl}/payment/fail?error=Missing+transaction+ID`, 303);
    }

    // Verify transaction with SSLCommerz server
    const validation = await validateSSLPayment(val_id);

    if (validation.status === "VALID") {
      const existing = await getPaymentRecord(tran_id);
      const isInstallment = existing?.paymentPlan === "INSTALLMENT";

      // Mark payment as PAID or PARTIAL
      await updatePaymentRecord(tran_id, {
        valId: val_id || validation.val_id,
        status: isInstallment ? "PARTIAL" : "PAID",
        paymentMethod: card_type,
        cardType: card_type,
        bankTranId: bank_tran_id || validation.bank_tran_id,
        cardIssuer: card_issuer || validation.card_issuer,
        cardBrand: card_brand || validation.card_brand,
      });

      // Update in-memory enrollment store for instant student portal visibility
      if (existing?.courseSlug) {
        enrollStudentInCourse({
          userId: existing.userId || "demo-student-001",
          userName: existing.customerName || "Tanvir Ahmed",
          courseId: existing.courseSlug,
          courseSlug: existing.courseSlug,
          title: existing.courseTitle || existing.courseSlug,
          category: "Live Program",
          batch: "Admissions Cohort 2026",
        });
      }

      // If there is an associated user & course in DB, update or create enrollment
      if (existing?.userId && existing?.courseSlug) {
        try {
          const course = await prisma.course.findUnique({
            where: { slug: existing.courseSlug },
          });

          if (course) {
            await prisma.enrollment.upsert({
              where: {
                userId_courseId: {
                  userId: existing.userId,
                  courseId: course.id,
                },
              },
              create: {
                userId: existing.userId,
                courseId: course.id,
                status: "ACTIVE",
                paymentStatus: isInstallment ? "PARTIAL" : "PAID",
              },
              update: {
                status: "ACTIVE",
                paymentStatus: isInstallment ? "PARTIAL" : "PAID",
              },
            });
          }
        } catch (dbErr) {
          console.warn("[Payment Success] Enrollment sync skipped (preview DB):", (dbErr as Error)?.message);
        }
      }

      // Redirect to beautiful branded payment success receipt page
      return NextResponse.redirect(`${baseUrl}/payment/success?tran_id=${encodeURIComponent(tran_id)}`, 303);
    } else {
      await updatePaymentRecord(tran_id, { status: "PENDING" });
      return NextResponse.redirect(`${baseUrl}/payment/fail?tran_id=${encodeURIComponent(tran_id)}`, 303);
    }
  } catch (error) {
    console.error("[Payment Success Handler Error]:", error);
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    return NextResponse.redirect(`${baseUrl}/payment/fail?error=Server+validation+error`, 303);
  }
}
