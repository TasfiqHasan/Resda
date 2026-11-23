import { NextResponse } from "next/server";
import { updatePaymentRecord } from "@/lib/payments-store";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const tran_id = (formData.get("tran_id") as string) || "";
    const errorMsg = (formData.get("error") as string) || "Payment was declined or cancelled by provider.";

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    if (tran_id) {
      await updatePaymentRecord(tran_id, { status: "PENDING" });
    }

    return NextResponse.redirect(
      `${baseUrl}/payment/fail?tran_id=${encodeURIComponent(tran_id)}&reason=${encodeURIComponent(errorMsg)}`,
      303
    );
  } catch (error) {
    console.error("[Payment Fail Handler Error]:", error);
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    return NextResponse.redirect(`${baseUrl}/payment/fail`, 303);
  }
}
