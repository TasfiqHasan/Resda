import { prisma } from "@/lib/prisma";

export interface PaymentRecord {
  tranId: string;
  valId?: string | null;
  amount: number;
  currency: string;
  paymentMethod?: string | null;
  paymentPlan: "FULL" | "INSTALLMENT";
  status: "PENDING" | "PAID" | "PARTIAL" | "REFUNDED";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  courseSlug: string;
  courseTitle: string;
  cardType?: string | null;
  bankTranId?: string | null;
  cardIssuer?: string | null;
  cardBrand?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// In-memory fallback storage for serverless preview / demo deployments
const globalPayments = global as unknown as {
  _resdaPayments?: Map<string, PaymentRecord>;
};

if (!globalPayments._resdaPayments) {
  globalPayments._resdaPayments = new Map<string, PaymentRecord>();
}

const memoryStore = globalPayments._resdaPayments;

export async function createPaymentRecord(data: Omit<PaymentRecord, "createdAt" | "updatedAt">): Promise<PaymentRecord> {
  const now = new Date().toISOString();
  const record: PaymentRecord = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  // Always save to memory store
  memoryStore.set(record.tranId, record);

  // Try saving to Prisma if DB is accessible
  try {
    await prisma.payment.create({
      data: {
        tranId: record.tranId,
        valId: record.valId || null,
        amount: record.amount,
        currency: record.currency,
        paymentMethod: record.paymentMethod || null,
        paymentPlan: record.paymentPlan,
        status: record.status as any,
        customerName: record.customerName,
        customerEmail: record.customerEmail,
        customerPhone: record.customerPhone,
        courseSlug: record.courseSlug,
        courseTitle: record.courseTitle,
        cardType: record.cardType || null,
        bankTranId: record.bankTranId || null,
        cardIssuer: record.cardIssuer || null,
        cardBrand: record.cardBrand || null,
        userId: record.userId || null,
      },
    });
  } catch (err) {
    console.warn("[PaymentsStore] DB write skipped (running in preview/demo mode):", (err as Error)?.message);
  }

  return record;
}

export async function updatePaymentRecord(
  tranId: string,
  updates: Partial<PaymentRecord>
): Promise<PaymentRecord | null> {
  const now = new Date().toISOString();
  const existing = memoryStore.get(tranId);

  let updatedRecord: PaymentRecord;
  if (existing) {
    updatedRecord = {
      ...existing,
      ...updates,
      updatedAt: now,
    };
    memoryStore.set(tranId, updatedRecord);
  } else {
    updatedRecord = {
      tranId,
      amount: updates.amount || 0,
      currency: updates.currency || "BDT",
      paymentPlan: updates.paymentPlan || "FULL",
      status: updates.status || "PAID",
      customerName: updates.customerName || "Student",
      customerEmail: updates.customerEmail || "",
      customerPhone: updates.customerPhone || "",
      courseSlug: updates.courseSlug || "full-stack-web-dev",
      courseTitle: updates.courseTitle || "Professional IT Training Course",
      ...updates,
      createdAt: now,
      updatedAt: now,
    };
    memoryStore.set(tranId, updatedRecord);
  }

  // Try updating in Prisma
  try {
    await prisma.payment.update({
      where: { tranId },
      data: {
        valId: updates.valId,
        status: updates.status as any,
        paymentMethod: updates.paymentMethod,
        cardType: updates.cardType,
        bankTranId: updates.bankTranId,
        cardIssuer: updates.cardIssuer,
        cardBrand: updates.cardBrand,
      },
    });
  } catch (err) {
    console.warn("[PaymentsStore] DB update skipped:", (err as Error)?.message);
  }

  return updatedRecord;
}

export async function getPaymentRecord(tranId: string): Promise<PaymentRecord | null> {
  // Try DB first
  try {
    const dbRecord = await prisma.payment.findUnique({
      where: { tranId },
    });
    if (dbRecord) {
      return {
        tranId: dbRecord.tranId,
        valId: dbRecord.valId,
        amount: dbRecord.amount,
        currency: dbRecord.currency,
        paymentMethod: dbRecord.paymentMethod,
        paymentPlan: dbRecord.paymentPlan as any,
        status: dbRecord.status as any,
        customerName: dbRecord.customerName,
        customerEmail: dbRecord.customerEmail,
        customerPhone: dbRecord.customerPhone,
        courseSlug: dbRecord.courseSlug,
        courseTitle: dbRecord.courseTitle,
        cardType: dbRecord.cardType,
        bankTranId: dbRecord.bankTranId,
        cardIssuer: dbRecord.cardIssuer,
        cardBrand: dbRecord.cardBrand,
        userId: dbRecord.userId,
        createdAt: dbRecord.createdAt.toISOString(),
        updatedAt: dbRecord.updatedAt.toISOString(),
      };
    }
  } catch {
    // Fall back to memory store
  }

  return memoryStore.get(tranId) || null;
}
