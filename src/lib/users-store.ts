import { prisma } from "@/lib/prisma";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "CLIENT";
  batch: string;
  phone: string;
  status: "ACTIVE" | "SUSPENDED";
  joined: string;
  createdAt: string;
}

const globalUsers = global as unknown as {
  _resdaUsers?: StoredUser[];
};

if (!globalUsers._resdaUsers) {
  globalUsers._resdaUsers = [
    {
      id: "usr-1",
      name: "Tanvir Ahmed",
      email: "tanvir@resda.org",
      role: "STUDENT",
      batch: "WD-48 (MERN)",
      phone: "+880 1700-123456",
      status: "ACTIVE",
      joined: "Oct 01, 2026",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-2",
      name: "MD. Rafiqul Islam",
      email: "rafiq@resda.org",
      role: "INSTRUCTOR",
      batch: "Python & Data Track",
      phone: "+880 1711-234567",
      status: "ACTIVE",
      joined: "Jan 12, 2026",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-3",
      name: "Nusrat Jahan",
      email: "nusrat@resda.org",
      role: "INSTRUCTOR",
      batch: "UI/UX Design Track",
      phone: "+880 1722-345678",
      status: "ACTIVE",
      joined: "Mar 05, 2026",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-4",
      name: "Apex Global Retail",
      email: "sarah@apexglobal.com",
      role: "CLIENT",
      batch: "E-Commerce System Project",
      phone: "+880 1733-456789",
      status: "ACTIVE",
      joined: "Aug 19, 2026",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-5",
      name: "Mahmud Hasan",
      email: "mahmud@gmail.com",
      role: "STUDENT",
      batch: "NET-29 (Network Admin)",
      phone: "+880 1744-567890",
      status: "ACTIVE",
      joined: "Sep 25, 2026",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-6",
      name: "System Admin",
      email: "admin@resda.org",
      role: "ADMIN",
      batch: "All Access",
      phone: "+880 1700-000000",
      status: "ACTIVE",
      joined: "Jan 01, 2026",
      createdAt: new Date().toISOString(),
    },
  ];
}

const memoryUsers = globalUsers._resdaUsers!;

export async function getAllUsers(): Promise<StoredUser[]> {
  try {
    const dbUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbUsers && dbUsers.length > 0) {
      const mapped: StoredUser[] = dbUsers.map((u) => ({
        id: u.id,
        name: u.name || "User",
        email: u.email,
        role: (u.role as any) || "STUDENT",
        batch: "General Admission",
        phone: u.phone || "+880 1700-000000",
        status: u.isActive ? "ACTIVE" : "SUSPENDED",
        joined: new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        createdAt: u.createdAt.toISOString(),
      }));

      const dbIds = new Set(mapped.map((u) => u.id));
      const remainingMem = memoryUsers.filter((u) => !dbIds.has(u.id));
      return [...mapped, ...remainingMem];
    }
  } catch (err) {
    // Database offline
  }
  return [...memoryUsers];
}

export async function createUser(data: {
  name: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "CLIENT";
  batch?: string;
  phone?: string;
}): Promise<StoredUser> {
  const newUser: StoredUser = {
    id: `usr-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    batch: data.batch || (data.role === "STUDENT" ? "Batch 2026" : "Faculty"),
    phone: data.phone || "+880 1700-000000",
    status: "ACTIVE",
    joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    createdAt: new Date().toISOString(),
  };

  memoryUsers.unshift(newUser);

  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role as any,
        phone: data.phone,
        isActive: true,
      },
    });
  } catch (err) {
    // DB skipped
  }

  return newUser;
}

export async function updateUserRole(id: string, role: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "CLIENT"): Promise<StoredUser | null> {
  const user = memoryUsers.find((u) => u.id === id);
  if (user) {
    user.role = role;
  }
  try {
    await prisma.user.update({
      where: { id },
      data: { role: role as any },
    });
  } catch (err) {
    // Ignore db err
  }
  return user || null;
}

export async function toggleUserStatus(id: string): Promise<StoredUser | null> {
  const user = memoryUsers.find((u) => u.id === id);
  if (user) {
    user.status = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      await prisma.user.update({
        where: { id },
        data: { isActive: user.status === "ACTIVE" },
      });
    } catch (err) {
      // Ignore db err
    }
  }
  return user || null;
}

export async function deleteUser(id: string): Promise<boolean> {
  const idx = memoryUsers.findIndex((u) => u.id === id);
  if (idx !== -1) {
    memoryUsers.splice(idx, 1);
  }
  try {
    await prisma.user.delete({ where: { id } });
  } catch (err) {
    // Ignore db err
  }
  return true;
}
