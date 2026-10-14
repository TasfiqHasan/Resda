import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Determine providers dynamically
const providers = [];

// Google OAuth (only activate when keys are actually provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Credentials Provider with Demo & Database authentication
providers.push(
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password are required");
      }

      const email = (credentials.email as string).trim().toLowerCase();
      const password = credentials.password as string;

      // 1. Built-in Demo Accounts (Instant access even without MongoDB online)
      if (email === "student@resda.org" && (password === "Password123!" || password === "password")) {
        return {
          id: "demo-student-001",
          name: "Tanvir Ahmed",
          email: "student@resda.org",
          role: "STUDENT",
        };
      }

      if (email === "admin@resda.org" && (password === "Password123!" || password === "password")) {
        return {
          id: "demo-admin-001",
          name: "System Administrator",
          email: "admin@resda.org",
          role: "ADMIN",
        };
      }

      // 2. Query Database for registered users
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
          throw new Error("Account is temporarily disabled. Please contact RESDA support.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      } catch (dbError: unknown) {
        // If it's our own thrown validation error, rethrow it
        if (dbError instanceof Error && dbError.message === "Invalid email or password") {
          throw dbError;
        }

        console.warn("Database query skipped or unreachable:", dbError);
        throw new Error("Database connection is offline. Please use the instant preview accounts (student@resda.org or admin@resda.org with Password123!)");
      }
    },
  })
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "STUDENT";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "user";
        session.user.role = (token.role as string) || "STUDENT";
      }
      return session;
    },
  },
});
