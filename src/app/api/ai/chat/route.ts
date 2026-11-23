import { NextResponse } from "next/server";
import { DETAILED_COURSES, getCourseBySlug } from "@/lib/courses-data";

export interface ChatNavigationCard {
  title: string;
  description: string;
  link: string;
  badge?: string;
  ctaText: string;
}

export interface AIChatResponse {
  reply: string;
  navigationCard?: ChatNavigationCard;
  suggestedFollowUps?: string[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage: string = (body.message || "").trim();

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const lower = userMessage.toLowerCase();

    // 1. Try Google Gemini API if GEMINI_API_KEY is provided
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are RESDA AI Counselor, an expert academic advisor for RESDA IT Training & IT Services located at 19th Floor, Nafi Tower, 53 Gulshan Avenue, Gulshan-1, Dhaka 1212, Bangladesh.
Hotline: +880 1700-000000, Email: info@resda.org.
Courses offered:
1. Full-Stack Web Development Track (React 19, Next.js 15, Node.js, MongoDB, TypeScript) - ৳25,000 (Installment ৳12,500), 6 months, /courses/full-stack-web-dev
2. Python Programming & Automation (FastAPI, Selenium, OOP) - ৳18,000 (Installment ৳9,000), 4 months, /courses/python-programming
3. Data Science & Machine Learning (Pandas, Scikit-learn, TensorFlow) - ৳30,000 (Installment ৳15,000), 5 months, /courses/data-science-ml
4. Flutter Mobile App Development (iOS & Android) - ৳22,000 (Installment ৳11,000), 4 months, /courses/flutter-mobile-dev
5. Ethical Hacking & Cybersecurity Fundamentals - ৳26,000 (Installment ৳13,000), 4 months, /courses/cybersecurity-fundamentals
6. UI/UX Design Masterclass with Figma - ৳16,000 (Installment ৳8,000), 3 months, /courses/ui-ux-design

Payment methods: SSLCommerz (bKash, Nagad, Rocket, Visa, Mastercard, DBBL Nexus), 2-installment option, or Pay at Campus.
Key pages: /courses, /services, /portfolio, /contact, /verify (certificate verification), /login (student portal).

Be concise, warm, professional, and guide the user with Markdown formatting.

User asks: "${userMessage}"`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const textReply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textReply) {
            // Find appropriate navigation card based on context
            let navigationCard: ChatNavigationCard | undefined = undefined;
            if (lower.includes("web") || lower.includes("react") || lower.includes("next")) {
              navigationCard = {
                title: "Full-Stack Web Development Track",
                description: "6 Months • React 19, Next.js 15, Node.js & MongoDB • ৳25,000",
                link: "/courses/full-stack-web-dev",
                badge: "Most Popular",
                ctaText: "View Syllabus & Enroll",
              };
            } else if (lower.includes("python")) {
              navigationCard = {
                title: "Python Programming & Automation",
                description: "4 Months • Python 3, FastAPI & Web Scraping • ৳18,000",
                link: "/courses/python-programming",
                badge: "Beginner Friendly",
                ctaText: "Explore Python Syllabus",
              };
            } else if (lower.includes("verify") || lower.includes("certificate")) {
              navigationCard = {
                title: "Public Certificate Verification",
                description: "Verify credentials, student distinction grades & QR seals",
                link: "/verify",
                badge: "Official Portal",
                ctaText: "Open Verification Desk",
              };
            } else if (lower.includes("office") || lower.includes("address") || lower.includes("location") || lower.includes("visit")) {
              navigationCard = {
                title: "RESDA Gulshan Campus",
                description: "19th Floor, Nafi Tower, 53 Gulshan Avenue, Dhaka",
                link: "/contact",
                badge: "Campus Labs",
                ctaText: "Get Campus Directions",
              };
            }

            return NextResponse.json({
              reply: textReply,
              navigationCard,
              suggestedFollowUps: [
                "Tuition fee installment options",
                "Where is the Gulshan campus located?",
                "Which course is best for absolute beginners?",
              ],
            });
          }
        }
      } catch (err) {
        console.warn("[AI API] Gemini call failed, falling back to heuristic engine:", err);
      }
    }

    // 2. Intelligent Built-in Academic Counselor & Navigator Engine (Offline & 100% resilient)
    let reply = "";
    let navigationCard: ChatNavigationCard | undefined = undefined;
    let suggestedFollowUps: string[] = [];

    // Course Queries
    if (
      lower.includes("web") ||
      lower.includes("full stack") ||
      lower.includes("react") ||
      lower.includes("next") ||
      lower.includes("javascript") ||
      lower.includes("frontend") ||
      lower.includes("backend")
    ) {
      reply =
        "Our flagship **Full-Stack Web Development Track** is designed for modern industry careers! It covers React 19, Next.js 15, Node.js, Express, MongoDB, Prisma ORM, and cloud deployment.\n\n" +
        "• **Duration:** 6 Months (72 lecture hours)\n" +
        "• **Tuition Fee:** ৳25,000 (or 2 installments of ৳12,500)\n" +
        "• **Mode:** Hybrid (Live online + In-person lab access at Nafi Tower, Gulshan-1)\n" +
        "• **Next Cohort:** December 15, 2026";
      navigationCard = {
        title: "Full-Stack Web Development Track",
        description: "React 19, Next.js 15, Node.js, MongoDB & Prisma • ৳25,000",
        link: "/courses/full-stack-web-dev",
        badge: "Bestseller",
        ctaText: "View Week-by-Week Syllabus & Enroll",
      };
      suggestedFollowUps = [
        "How do installments work for Web Dev?",
        "Do I get a verified certificate?",
        "Can I visit the campus labs before enrolling?",
      ];
    } else if (lower.includes("python") || lower.includes("django") || lower.includes("fastapi")) {
      reply =
        "Our **Python Programming & Automation** course is ideal for both beginners and developers wanting to master backend automation!\n\n" +
        "• **Curriculum:** Python 3 Fundamentals, OOP, FastAPI microservices, Web Scraping with Selenium & BeautifulSoup\n" +
        "• **Tuition:** ৳18,000 (or 2 installments of ৳9,000)\n" +
        "• **Duration:** 4 Months • Instructor: Dr. Rafiqul Islam";
      navigationCard = {
        title: "Python Programming & Automation",
        description: "Python 3, OOP, FastAPI & Web Scraping • ৳18,000",
        link: "/courses/python-programming",
        badge: "Beginner Friendly",
        ctaText: "View Python Curriculum",
      };
      suggestedFollowUps = [
        "What is the next batch date for Python?",
        "Can I learn Data Science after Python?",
        "Payment options via bKash",
      ];
    } else if (lower.includes("data") || lower.includes("machine learning") || lower.includes("ai") || lower.includes("ml")) {
      reply =
        "Our **Data Science & Machine Learning** program teaches you real-world data pipelines and predictive modeling!\n\n" +
        "• **Skills:** Python, Pandas, NumPy, Scikit-learn, TensorFlow, Data Visualization with PowerBI\n" +
        "• **Tuition:** ৳30,000 (or 2 installments of ৳15,000)\n" +
        "• **Duration:** 5 Months • Includes 4 Industry Capstone Projects";
      navigationCard = {
        title: "Data Science & Machine Learning",
        description: "Pandas, Scikit-learn, TensorFlow & PowerBI • ৳30,000",
        link: "/courses/data-science-ml",
        badge: "High Demand",
        ctaText: "Explore Machine Learning Track",
      };
      suggestedFollowUps = [
        "What are the prerequisites for Data Science?",
        "How do installments work?",
        "Where is your Gulshan campus?",
      ];
    } else if (lower.includes("flutter") || lower.includes("mobile") || lower.includes("android") || lower.includes("ios") || lower.includes("app")) {
      reply =
        "Our **Mobile App Development with Flutter & Dart** enables you to build cross-platform native iOS & Android applications with a single codebase!\n\n" +
        "• **Highlights:** State Management (Bloc/Provider), REST APIs, Firebase Auth & Push Notifications\n" +
        "• **Tuition:** ৳22,000 (or 2 installments of ৳11,000)\n" +
        "• **Duration:** 4 Months • Live projects published to Google Play";
      navigationCard = {
        title: "Flutter & Dart Mobile App Development",
        description: "Cross-platform iOS & Android, Bloc, Firebase • ৳22,000",
        link: "/courses/flutter-mobile-dev",
        badge: "Cross-Platform",
        ctaText: "View Flutter Syllabus",
      };
      suggestedFollowUps = [
        "Do I need a Mac to learn Flutter?",
        "View tuition fee plans",
        "How do I enroll via bKash?",
      ];
    } else if (lower.includes("cyber") || lower.includes("security") || lower.includes("hack") || lower.includes("ethical")) {
      reply =
        "Our **Ethical Hacking & Cybersecurity Fundamentals** track prepares you for hands-on defensive and offensive security roles!\n\n" +
        "• **Coverage:** Network Security, Penetration Testing, SOC Operations, Kali Linux, Wireshark, OWASP Top 10\n" +
        "• **Tuition:** ৳26,000 (or 2 installments of ৳13,000)\n" +
        "• **Duration:** 4 Months • Conducted in dedicated hands-on virtual lab sandboxes";
      navigationCard = {
        title: "Ethical Hacking & Cybersecurity",
        description: "Penetration Testing, SOC, Kali Linux & Network Security • ৳26,000",
        link: "/courses/cybersecurity-fundamentals",
        badge: "Advanced",
        ctaText: "View Cybersecurity Curriculum",
      };
      suggestedFollowUps = [
        "Is this course beginner friendly?",
        "Do you provide certificate verification?",
        "Contact admission counseling",
      ];
    } else if (lower.includes("ui") || lower.includes("ux") || lower.includes("design") || lower.includes("figma")) {
      reply =
        "Our **UI/UX Design Masterclass with Figma** teaches end-to-end digital product design, heuristics, and interactive prototyping!\n\n" +
        "• **Core Tools:** Figma, Design Systems, Auto-layout, User Research, Wireframing, WCAG 2.1 Accessibility\n" +
        "• **Tuition:** ৳16,000 (or 2 installments of ৳8,000)\n" +
        "• **Duration:** 3 Months • Lead Mentor: Nusrat Jahan";
      navigationCard = {
        title: "UI/UX Design Masterclass with Figma",
        description: "Design Systems, Prototyping & UX Research • ৳16,000",
        link: "/courses/ui-ux-design",
        badge: "Fast Track",
        ctaText: "View Design Syllabus & Portfolio Projects",
      };
      suggestedFollowUps = [
        "Do I need prior graphic design skills?",
        "How do I enroll?",
        "Talk to mentor on WhatsApp",
      ];
    }

    // Recommendation / Beginner Queries
    else if (
      lower.includes("recommend") ||
      lower.includes("beginner") ||
      lower.includes("start") ||
      lower.includes("confused") ||
      lower.includes("suggest") ||
      lower.includes("which course")
    ) {
      reply =
        "If you are an absolute beginner or switching to tech, we recommend starting with either:\n\n" +
        "1. **Full-Stack Web Development** — If you want to build websites, SaaS platforms, and get hired as a software engineer.\n" +
        "2. **UI/UX Design with Figma** — If you enjoy visual creativity, user psychology, and non-coding design roles.\n" +
        "3. **Python Programming & Automation** — If you prefer logic, automation, and data handling.\n\n" +
        "Would you prefer a coding or non-coding career path?";
      navigationCard = {
        title: "Explore All 50+ Certified Courses",
        description: "Browse curricula, tuition fees in BDT, mentors & schedules",
        link: "/courses",
        badge: "Catalog",
        ctaText: "Browse Full Course Catalog",
      };
      suggestedFollowUps = [
        "Tell me about Full-Stack Web Development",
        "Tell me about UI/UX Design",
        "How much are the tuition fees?",
      ];
    }

    // Pricing / Installments / Payment
    else if (
      lower.includes("fee") ||
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("installment") ||
      lower.includes("bkash") ||
      lower.includes("nagad") ||
      lower.includes("pay") ||
      lower.includes("ssl")
    ) {
      reply =
        "At RESDA, all courses include flexible payment structures:\n\n" +
        "• **Full Payment:** Includes instant tuition fee discounts of up to 30%.\n" +
        "• **2-Installment Plan:** Pay 50% upon enrollment to reserve your seat, and the remaining 50% next month.\n" +
        "• **Accepted Payment Gateways:** SSLCommerz Multi-Gateway (bKash, Nagad, Rocket, Upay, Visa, Mastercard, DBBL Nexus), or in-person at our Gulshan campus.\n\n" +
        "Select any course to view its exact installment calculator!";
      navigationCard = {
        title: "Course Catalog & Fee Breakdown",
        description: "Compare course tuition fees, batch dates & installment plans",
        link: "/courses",
        badge: "Pricing & Admissions",
        ctaText: "Compare Course Fees",
      };
      suggestedFollowUps = [
        "How to pay via bKash or SSLCommerz?",
        "Where is your campus located?",
        "How to verify student certificates?",
      ];
    }

    // Office Location / Campus Visits
    else if (
      lower.includes("office") ||
      lower.includes("address") ||
      lower.includes("location") ||
      lower.includes("nafi tower") ||
      lower.includes("gulshan") ||
      lower.includes("visit") ||
      lower.includes("where")
    ) {
      reply =
        "Our headquarters and hands-on computer labs are located in the heart of Dhaka's commercial district:\n\n" +
        "📍 **RESDA Campus Address:**\n" +
        "**19th Floor, Nafi Tower, 53 Gulshan Avenue, Gulshan-1, Dhaka 1212, Bangladesh**\n\n" +
        "• **Visiting Hours:** Saturday – Thursday, 10:00 AM – 7:00 PM\n" +
        "• **Admissions Hotline:** +880 1700-000000\n" +
        "• **Email:** info@resda.org\n\n" +
        "Feel free to drop by for in-person academic counseling and a tour of our high-spec labs!";
      navigationCard = {
        title: "Visit RESDA Gulshan Campus",
        description: "19th Floor, Nafi Tower, 53 Gulshan Avenue, Dhaka",
        link: "/contact",
        badge: "Campus Tour",
        ctaText: "Get Campus Directions & Book Visit",
      };
      suggestedFollowUps = [
        "What are your lab facilities like?",
        "Talk to counselor on WhatsApp",
        "View upcoming batch schedule",
      ];
    }

    // Certificate Verification
    else if (lower.includes("verify") || lower.includes("certificate") || lower.includes("credential") || lower.includes("qr")) {
      reply =
        "All RESDA course graduates receive an **Industry Recognized Verified Certificate** equipped with a tamper-proof QR code and unique Credential ID.\n\n" +
        "Employers and institutions can verify certificates instantly 24/7 on our public verification portal at `/verify` by entering the Certificate ID (e.g. `RESDA-CERT-2026-9041`).";
      navigationCard = {
        title: "Public Certificate Verification Portal",
        description: "Verify graduate authenticity, course distinction & director signature",
        link: "/verify",
        badge: "Credential Verification",
        ctaText: "Open Certificate Verification",
      };
      suggestedFollowUps = [
        "Test with sample certificate RESDA-CERT-2026-9041",
        "Are certificates recognized internationally?",
        "Explore professional courses",
      ];
    }

    // Login / Dashboard
    else if (lower.includes("login") || lower.includes("portal") || lower.includes("dashboard") || lower.includes("sign in")) {
      reply =
        "You can access the **Student Portal** and **Admin Control Panel** from our sign-in page!\n\n" +
        "• **Instant Preview Demo Access:** You can enter using the 1-click **Student Portal** or **Admin Panel** preview buttons without needing database credentials.\n" +
        "• **Student Features:** Watch video lectures, download course slides, view class schedules, and manage verified certificates.";
      navigationCard = {
        title: "Sign In to RESDA Portals",
        description: "Access student learning dashboard, courses & admin control center",
        link: "/login",
        badge: "Portal Access",
        ctaText: "Go to Login Page",
      };
      suggestedFollowUps = [
        "What is inside the Student Dashboard?",
        "Where is the LMS video classroom?",
        "Browse course catalog",
      ];
    }

    // Services / Corporate IT Solutions
    else if (lower.includes("service") || lower.includes("corporate") || lower.includes("company") || lower.includes("hire") || lower.includes("enterprise")) {
      reply =
        "In addition to IT training, RESDA provides full-lifecycle **Enterprise IT Services** for corporations, startups, and institutions:\n\n" +
        "1. **Custom Web & SaaS Development** (Next.js, Node.js, Cloud)\n" +
        "2. **Mobile App Engineering** (iOS & Android via Flutter)\n" +
        "3. **Cybersecurity & Vulnerability Assessment**\n" +
        "4. **Custom Corporate IT Training & Employee Upskilling**\n\n" +
        "Contact our enterprise team to request a formal proposal quote!";
      navigationCard = {
        title: "Enterprise IT Services & Solutions",
        description: "Software engineering, cloud infrastructure & corporate upskilling",
        link: "/services",
        badge: "B2B Solutions",
        ctaText: "View Services & Request Quote",
      };
      suggestedFollowUps = [
        "Request corporate training quotation",
        "View our completed client portfolio",
        "Contact corporate relations on WhatsApp",
      ];
    }

    // General Greeting & Fallback
    else {
      reply =
        "Hello! I am your **RESDA AI Counselor & Navigator**. I can help you with:\n\n" +
        "• 🎓 Finding the best IT course for your career goals\n" +
        "• 💰 Checking tuition fees and 2-installment payment plans\n" +
        "• 🏢 Visiting our Nafi Tower campus labs in Gulshan-1\n" +
        "• 📜 Verifying student certificates and credentials\n" +
        "• 💼 Inquiring about enterprise software development & IT services\n\n" +
        "What would you like to explore today?";
      navigationCard = {
        title: "RESDA IT Training & IT Services",
        description: "Explore courses, offline batches, and enterprise IT projects",
        link: "/courses",
        badge: "Directory",
        ctaText: "Browse Popular Courses",
      };
      suggestedFollowUps = [
        "Which course is best for beginners?",
        "Tuition fees & 2-installment options",
        "Where is your Gulshan campus located?",
        "How do I verify a certificate?",
      ];
    }

    return NextResponse.json({
      reply,
      navigationCard,
      suggestedFollowUps,
    });
  } catch (error) {
    console.error("[AI Chat API Error]:", error);
    return NextResponse.json(
      { error: "AI assistant encountered an issue. Please try again." },
      { status: 500 }
    );
  }
}
