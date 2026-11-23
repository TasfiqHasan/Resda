import { NextResponse } from "next/server";
import { validateSSLPayment } from "@/lib/sslcommerz";
import { updatePaymentRecord, getPaymentRecord } from "@/lib/payments-store";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const tran_id = (formData.get("tran_id") as string) || "";
    const val_id = (formData.get("val_id") as string) || "";
    const status = (formData.get("status") as string) || "";
    const card_type = (formData.get("card_type") as string) || "";
    const bank_tran_id = (formData.get("bank_tran_id") as string) || "";

    if (!tran_id || !val_id) {
      return NextResponse.json({ message: "Invalid IPN data" }, { status: 400 });
    }

    // Server-to-server validation
    const validation = await validateSSLPayment(val_id);

    if (validation.status === "VALID" || status === "VALID") {
      const existing = await getPaymentRecord(tran_id);
      const isInstallment = existing?.paymentPlan === "INSTALLMENT";

      await updatePaymentRecord(tran_id, {
        valId: val_id,
        status: isInstallment ? "PARTIAL" : "PAID",
        paymentMethod: card_type || "SSLCOMMERZ",
        bankTranId: bank_tran_id,
      });

      return NextResponse.json({ message: "IPN processed successfully", tran_id });
    } else {
      return NextResponse.json({ message: "IPN validation failed", tran_id }, { status: 400 });
    }
  } catch (error) {
    console.error("[SSLCommerz IPN Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
