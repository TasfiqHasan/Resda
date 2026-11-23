import { prisma } from "@/lib/prisma";

export interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: "SERVICE" | "ENROLLMENT" | "GENERAL";
  status: "NEW" | "IN_PROGRESS" | "RESPONDED";
  replyNote?: string;
  date: string;
  createdAt: string;
}

const globalInquiries = global as unknown as {
  _resdaInquiries?: StoredInquiry[];
};

if (!globalInquiries._resdaInquiries) {
  globalInquiries._resdaInquiries = [
    {
      id: "inq-101",
      name: "Dr. Tariq Rahman",
      email: "tariq@cityhospital.com",
      phone: "+880 1711-987654",
      subject: "Hospital EMR Software Customization",
      message: "We need an integrated radiology and billing portal module for our clinic branch in Gulshan.",
      type: "SERVICE",
      status: "NEW",
      date: "Today • 04:30 PM",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "inq-102",
      name: "Sharmin Sultana",
      email: "sharmin.s@gmail.com",
      phone: "+880 1819-123456",
      subject: "Inquiry regarding November MERN Batch",
      message: "Can I pay the course tuition fee in two installments? I work as a junior QA engineer.",
      type: "ENROLLMENT",
      status: "IN_PROGRESS",
      date: "Today • 01:15 PM",
      createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
    {
      id: "inq-103",
      name: "Mahbubul Alam",
      email: "mahbub@quickbite.com.bd",
      phone: "+880 1912-345678",
      subject: "Food Delivery App Upgrade Consultation",
      message: "Looking for Flutter mobile app maintenance and backend API performance optimization.",
      type: "SERVICE",
      status: "NEW",
      date: "Yesterday • 11:20 AM",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "inq-104",
      name: "Farhan Kabir",
      email: "farhan@yahoo.com",
      phone: "+880 1622-456789",
      subject: "Offline Lab Training Hours at Nafi Tower",
      message: "Are the computer labs open for practice on Saturdays after class hours?",
      type: "GENERAL",
      status: "RESPONDED",
      replyNote: "Informed via email: Labs are open 9am to 9pm including Saturdays for all registered students.",
      date: "2 days ago • 05:40 PM",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
  ];
}

const memoryInquiries = globalInquiries._resdaInquiries!;

export async function getAllInquiries(): Promise<StoredInquiry[]> {
  try {
    const dbInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbInquiries && dbInquiries.length > 0) {
      const dbMapped: StoredInquiry[] = dbInquiries.map((d) => ({
        id: d.id,
        name: d.name,
        email: d.email,
        phone: d.phone || undefined,
        subject: d.subject,
        message: d.message,
        type: (d.type as any) || "GENERAL",
        status: (d.status as any) || "NEW",
        date: new Date(d.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        createdAt: d.createdAt.toISOString(),
      }));

      // Merge ensuring no duplicate ids
      const dbIds = new Set(dbMapped.map((i) => i.id));
      const remainingMem = memoryInquiries.filter((i) => !dbIds.has(i.id));
      return [...dbMapped, ...remainingMem];
    }
  } catch (err) {
    // DB offline, fallback to memory
  }
  return [...memoryInquiries];
}

export async function createInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type?: "SERVICE" | "ENROLLMENT" | "GENERAL";
}): Promise<StoredInquiry> {
  const newInq: StoredInquiry = {
    id: `inq-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    subject: data.subject,
    message: data.message,
    type: data.type || "GENERAL",
    status: "NEW",
    date: "Just now",
    createdAt: new Date().toISOString(),
  };

  memoryInquiries.unshift(newInq);

  try {
    await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        type: (data.type as any) || "GENERAL",
      },
    });
  } catch (err) {
    // DB write skipped
  }

  return newInq;
}

export async function updateInquiryStatus(
  id: string,
  status: "NEW" | "IN_PROGRESS" | "RESPONDED",
  replyNote?: string
): Promise<StoredInquiry | null> {
  const inq = memoryInquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    if (replyNote) inq.replyNote = replyNote;
  }

  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status: status as any },
    });
  } catch (err) {
    // Ignore db err
  }

  return inq || null;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const idx = memoryInquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    memoryInquiries.splice(idx, 1);
  }

  try {
    await prisma.inquiry.delete({ where: { id } });
  } catch (err) {
    // Ignore db err
  }

  return true;
}
