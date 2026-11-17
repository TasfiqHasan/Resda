export interface VerifiedCredential {
  id: string;
  recipientName: string;
  studentId: string;
  courseTitle: string;
  track: string;
  issueDate: string;
  status: "VERIFIED" | "REVOKED";
  grade: string;
  instructorName: string;
  instructorRole: string;
  directorName: string;
  skills: string[];
  duration: string;
  credentialUrl: string;
}

export const SAMPLE_CREDENTIALS: Record<string, VerifiedCredential> = {
  "RESDA-CERT-2026-9041": {
    id: "RESDA-CERT-2026-9041",
    recipientName: "Tanvir Ahmed",
    studentId: "RESDA-2026-ST-4890",
    courseTitle: "UI/UX Design Masterclass with Figma",
    track: "Design & Product Innovation",
    issueDate: "September 15, 2026",
    status: "VERIFIED",
    grade: "Distinction • 96%",
    instructorName: "Tanvir Ahmed",
    instructorRole: "Head of Product Design, RESDA",
    directorName: "Tanvir Ahmed, Founder & Director",
    skills: ["Figma Design Systems", "User Research & Heuristics", "Design Tokens", "Wireframing & Interactive Prototyping"],
    duration: "4 Months (48 Lecture Hours)",
    credentialUrl: "https://resda.org/verify/RESDA-CERT-2026-9041",
  },
  "RESDA-CERT-2026-8812": {
    id: "RESDA-CERT-2026-8812",
    recipientName: "Mahmud Hasan",
    studentId: "RESDA-2026-ST-1209",
    courseTitle: "Full-Stack Web Development Track",
    track: "Full-Stack Engineering",
    issueDate: "August 28, 2026",
    status: "VERIFIED",
    grade: "Honors • 94%",
    instructorName: "Tanvir Ahmed",
    instructorRole: "Lead Full-Stack Architect",
    directorName: "Tanvir Ahmed, Founder & Director",
    skills: ["React 19 & Next.js 15", "Node.js & Express", "MongoDB & Prisma ORM", "TypeScript & Cloud Deployment"],
    duration: "6 Months (72 Lecture Hours)",
    credentialUrl: "https://resda.org/verify/RESDA-CERT-2026-8812",
  },
  "RESDA-CERT-2026-7734": {
    id: "RESDA-CERT-2026-7734",
    recipientName: "Sharmin Sultana",
    studentId: "RESDA-2026-ST-2940",
    courseTitle: "Python Programming & Data Engineering",
    track: "Data Science & AI",
    issueDate: "July 10, 2026",
    status: "VERIFIED",
    grade: "Distinction • 92%",
    instructorName: "Dr. Rafiqul Islam",
    instructorRole: "Senior Software Engineer & AI Researcher",
    directorName: "Tanvir Ahmed, Founder & Director",
    skills: ["Python 3 Automation", "Pandas & Data Wrangling", "FastAPI Microservices", "Web Scraping & Selenium"],
    duration: "4 Months (48 Lecture Hours)",
    credentialUrl: "https://resda.org/verify/RESDA-CERT-2026-7734",
  },
};
