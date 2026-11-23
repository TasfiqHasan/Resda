import { NextResponse } from "next/server";
import { getPaymentRecord } from "@/lib/payments-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tranId = searchParams.get("tran_id");

  if (!tranId) {
    return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
  }

  const payment = await getPaymentRecord(tranId);

  if (!payment) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  return NextResponse.json(payment);
}
