export interface Lesson {
  title: string;
  duration: string;
  isFree?: boolean;
}

export interface Module {
  title: string;
  duration: string;
  description: string;
  lessons: Lesson[];
}

export interface CapstoneProject {
  title: string;
  description: string;
  tech: string[];
}

export interface DetailedCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: "Online Live" | "Offline Campus" | "Hybrid Format";
  duration: string;
  lessonsCount: number;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviewsCount: number;
  gradient: string;
  popular?: boolean;
  tagline: string;
  description: string;
  nextBatch: string;
  schedule: string;
  seatsLeft: number;
  instructor: {
    name: string;
    role: string;
    initials: string;
    bio: string;
    company: string;
    experience: string;
  };
  highlights: string[];
  outcomes: string[];
  prerequisites: string[];
  toolsLearned: string[];
  capstoneProjects: CapstoneProject[];
  modules: Module[];
}

export const DETAILED_COURSES: Record<string, DetailedCourse> = {
  "full-stack-web-dev": {
    id: "full-stack-web-dev",
    slug: "full-stack-web-dev",
    title: "Full-Stack Web Development (MERN + Next.js)",
    category: "Web Development",
    level: "Beginner",
    mode: "Hybrid Format",
    duration: "6 Months",
    lessonsCount: 72,
    originalPrice: 22000,
    discountedPrice: 15000,
    rating: 4.9,
    reviewsCount: 248,
    gradient: "from-purple-700 via-indigo-600 to-purple-900",
    popular: true,
    tagline: "Become a job-ready full-stack engineer building production apps with React 19, Next.js 15, Node.js, and MongoDB.",
    description:
      "A rigorous, project-driven software engineering boot camp designed for aspiring developers in Bangladesh and South Asia. You will advance from core JavaScript to distributed full-stack cloud applications, automated testing, and CI/CD pipelines.",
    nextBatch: "December 01, 2026",
    schedule: "Every Sunday & Wednesday • 8:00 PM – 10:00 PM",
    seatsLeft: 6,
    instructor: {
      name: "Tanvir Ahmed",
      role: "Lead Full-Stack Architect & Founder",
      initials: "TA",
      bio: "Former Lead Engineer with 10+ years building scalable SaaS applications across South Asia and Europe. Trained over 2,000 engineers.",
      company: "RESDA Technology Solutions",
      experience: "10+ Years Industry Experience",
    },
    highlights: [
      "100% Hands-on Coding from Day 1",
      "5 Commercial Capstone Projects",
      "Direct Code Reviews by Senior Engineers",
      "Resume & Mock Technical Interview Coaching",
      "Guaranteed Internship Interview for Top 15%",
      "Lifetime Alumni Discord & Community Access",
    ],
    outcomes: [
      "Design and deploy production-grade full-stack web applications from scratch",
      "Master modern React 19, Next.js 15 App Router, and Server Actions",
      "Build robust RESTful and GraphQL APIs with Node.js, Express, and TypeScript",
      "Implement secure authentication, JWT tokens, RBAC, and OAuth 2.0 flows",
      "Architect complex databases using MongoDB, Mongoose, and Prisma ORM",
      "Deploy scalable systems to AWS, Vercel, and Dockerize multi-service applications",
    ],
    prerequisites: [
      "Basic computer literacy and enthusiasm to write code",
      "A laptop or PC with at least 8GB RAM (or access to our Nafi Tower campus labs)",
      "No prior coding background required; we start from programming foundations",
    ],
    toolsLearned: [
      "HTML5 & CSS3",
      "Modern JavaScript ES6+",
      "TypeScript",
      "Tailwind CSS",
      "React 19",
      "Next.js 15",
      "Node.js",
      "Express.js",
      "MongoDB & Mongoose",
      "Prisma ORM",
      "Git & GitHub",
      "Docker & AWS",
    ],
    capstoneProjects: [
      {
        title: "OmniStore Multi-Vendor E-Commerce",
        description: "A production marketplace with cart management, bKash & card payment gateway, merchant dashboards, and order tracking.",
        tech: ["Next.js 15", "Tailwind CSS", "Node.js", "MongoDB", "SSLCommerz"],
      },
      {
        title: "CarePulse Health & Clinic Management",
        description: "An EMR patient portal with appointment booking, doctor rosters, telemedicine video rooms, and medical record encryption.",
        tech: ["React 19", "Express", "Prisma", "PostgreSQL", "Socket.io"],
      },
      {
        title: "SprintFlow Team Collaboration & Task Board",
        description: "Real-time Kanban collaboration board with drag-and-drop sprints, live notifications, and role permissions.",
        tech: ["TypeScript", "Next.js", "Redis", "MongoDB", "Zustand"],
      },
    ],
    modules: [
      {
        title: "Module 1: Modern Web Foundations & Responsive UI",
        duration: "Weeks 1 – 3 • 12 Lessons",
        description: "Master modern semantic HTML5, CSS Grid, Flexbox, Tailwind CSS v4, and mobile-first responsive architecture.",
        lessons: [
          { title: "HTML5 Semantic Structure & Web Accessibility Standards", duration: "1h 45m", isFree: true },
          { title: "Advanced CSS Layouts: Flexbox vs. Modern CSS Grid", duration: "2h 10m", isFree: true },
          { title: "Tailwind CSS v4: Utility-First Styling & Custom Themes", duration: "2h 00m" },
          { title: "Project: Modern SaaS Landing Page with Dark/Light Themes", duration: "3h 15m" },
        ],
      },
      {
        title: "Module 2: Advanced JavaScript ES6+ & TypeScript",
        duration: "Weeks 4 – 7 • 16 Lessons",
        description: "Dive deep into asynchronous programming, Event Loop, closures, prototypes, TypeScript generics, and strict types.",
        lessons: [
          { title: "Execution Context, Call Stack & Closures Explained", duration: "2h 00m" },
          { title: "Async/Await, Promises & Fetch API Architecture", duration: "2h 30m" },
          { title: "TypeScript Core: Types, Interfaces, Unions & Generics", duration: "2h 45m" },
          { title: "Project: Interactive Financial Dashboard with Type Safety", duration: "3h 30m" },
        ],
      },
      {
        title: "Module 3: React 19 Frontend Engineering",
        duration: "Weeks 8 – 12 • 18 Lessons",
        description: "State management, React hooks, performance optimization, compound components, and client-side data caching.",
        lessons: [
          { title: "React 19 Core: Components, Props & Virtual DOM Reconciliation", duration: "2h 15m" },
          { title: "Hooks Mastery: useState, useEffect, useMemo, useCallback & Custom Hooks", duration: "2h 45m" },
          { title: "Global State Management with Zustand & React Query", duration: "2h 30m" },
          { title: "Project: Real-Time Crypto Portfolio Tracker", duration: "3h 45m" },
        ],
      },
      {
        title: "Module 4: Next.js 15 Full-Stack & Server Components",
        duration: "Weeks 13 – 17 • 14 Lessons",
        description: "Full-stack web development using Next.js 15 App Router, Server Actions, SEO metadata, streaming, and caching.",
        lessons: [
          { title: "Next.js 15 App Router & Server vs. Client Components", duration: "2h 30m" },
          { title: "Server Actions, Form Mutations & Zod Validation", duration: "2h 15m" },
          { title: "Authentication with NextAuth.js v5, Sessions & JWT", duration: "2h 45m" },
          { title: "Project: Full-Stack Content Management & Blog Platform", duration: "4h 00m" },
        ],
      },
      {
        title: "Module 5: Backend Engineering with Node.js, Express & MongoDB",
        duration: "Weeks 18 – 21 • 12 Lessons",
        description: "Scalable REST APIs, middleware, security hardening, database schema modeling, aggregation pipelines, and Prisma.",
        lessons: [
          { title: "Node.js Event-Driven Architecture & Express Server Setup", duration: "2h 00m" },
          { title: "MongoDB Schema Design, Indexing & Aggregations", duration: "2h 30m" },
          { title: "Prisma ORM Setup, Database Migrations & Relations", duration: "2h 15m" },
          { title: "Security Best Practices: Rate Limiting, Helmet & CORS", duration: "2h 00m" },
        ],
      },
      {
        title: "Module 6: Cloud Deployment, DevOps & Capstone Showcase",
        duration: "Weeks 22 – 24 • 10 Lessons",
        description: "Dockerize applications, automate CI/CD with GitHub Actions, deploy to AWS/Vercel, and present your capstone project.",
        lessons: [
          { title: "Docker Basics: Creating Dockerfiles & Docker Compose", duration: "2h 15m" },
          { title: "Continuous Integration & Deployment via GitHub Actions", duration: "2h 00m" },
          { title: "Cloud Deployment to AWS EC2 & S3 Asset Storage", duration: "2h 45m" },
          { title: "Final Capstone Presentation & Technical Portfolio Defense", duration: "4h 00m" },
        ],
      },
    ],
  },
  "python-programming": {
    id: "python-programming",
    slug: "python-programming",
    title: "Python Programming & Automation Masterclass",
    category: "Programming",
    level: "Beginner",
    mode: "Online Live",
    duration: "3 Months",
    lessonsCount: 42,
    originalPrice: 12000,
    discountedPrice: 8000,
    rating: 4.8,
    reviewsCount: 185,
    gradient: "from-emerald-600 via-teal-600 to-emerald-800",
    popular: false,
    tagline: "Master Python from syntax fundamentals to automated bots, web scraping, and REST APIs.",
    description:
      "A complete hands-on journey from core programming concepts to building real-world automation scripts, web scrapers, data parsers, and backend web services with FastAPI.",
    nextBatch: "December 05, 2026",
    schedule: "Every Tuesday & Friday • 7:30 PM – 9:30 PM",
    seatsLeft: 8,
    instructor: {
      name: "Dr. Rafiqul Islam",
      role: "Senior Software Engineer & AI Researcher",
      initials: "RI",
      bio: "12+ years of experience in distributed backend systems, Python automation, and machine learning research.",
      company: "TechCorp Global",
      experience: "12+ Years Experience",
    },
    highlights: [
      "No Prior Math or Coding Background Required",
      "Build 8 Practical Automation Tools",
      "Web Scraping with BeautifulSoup & Selenium",
      "FastAPI Microservices Development",
      "Industry Certified Completion Credential",
    ],
    outcomes: [
      "Write clean, idiomatic, PEP8-compliant Python 3 code",
      "Master Object-Oriented Programming (OOP), design patterns, and generators",
      "Scrape websites and automate data collection pipelines",
      "Process Excel spreadsheets, PDFs, and automate email workflows",
      "Build high-speed RESTful API backends with FastAPI and SQLite/PostgreSQL",
    ],
    prerequisites: [
      "Any laptop or desktop capable of running Python 3.12+",
      "Curiosity to automate repetitive work",
    ],
    toolsLearned: [
      "Python 3.12",
      "VS Code",
      "Virtualenv & Poetry",
      "BeautifulSoup4",
      "Selenium",
      "FastAPI & Pydantic",
      "SQLAlchemy",
      "Git",
    ],
    capstoneProjects: [
      {
        title: "Automated Job Aggregator & Alert Bot",
        description: "Scrapes regional tech job portals daily, analyzes salary keywords, and dispatches customized Telegram alerts.",
        tech: ["Python", "Selenium", "FastAPI", "Telegram Bot API"],
      },
      {
        title: "Enterprise Invoice PDF Extraction Tool",
        description: "Parses hundreds of incoming supplier PDF invoices, extracts table figures, and generates structured CSV/Excel records.",
        tech: ["Python", "PyPDF2", "Pandas", "OpenPyXL"],
      },
    ],
    modules: [
      {
        title: "Module 1: Core Python Syntax, Data Structures & Logic",
        duration: "Weeks 1 – 3 • 12 Lessons",
        description: "Variables, conditional logic, loops, lists, dictionaries, tuples, and error handling.",
        lessons: [
          { title: "Installing Python 3 & Setting up VS Code Environment", duration: "1h 30m", isFree: true },
          { title: "Control Flow, Dynamic Typing & Custom Functions", duration: "2h 00m", isFree: true },
          { title: "Mastering Lists, Sets & Dictionary Manipulations", duration: "2h 15m" },
          { title: "Error Handling, Try-Except Blocks & Custom Exceptions", duration: "1h 45m" },
        ],
      },
      {
        title: "Module 2: Object-Oriented Programming (OOP) & File I/O",
        duration: "Weeks 4 – 7 • 14 Lessons",
        description: "Classes, objects, inheritance, polymorphism, working with JSON, CSV, and text streams.",
        lessons: [
          { title: "OOP Architecture: Classes, Constructors & Encapsulation", duration: "2h 15m" },
          { title: "Inheritance, Polymorphism & Dunder Magic Methods", duration: "2h 30m" },
          { title: "Reading, Writing & Parsing JSON/CSV Datasets", duration: "2h 00m" },
          { title: "Project: Banking Simulator CLI with Ledger Persistence", duration: "3h 00m" },
        ],
      },
      {
        title: "Module 3: Web Scraping, Automation & APIs",
        duration: "Weeks 8 – 12 • 16 Lessons",
        description: "Extracting web data, headless browsers, automated browser actions, and building APIs.",
        lessons: [
          { title: "Web Scraping HTML with Requests & BeautifulSoup4", duration: "2h 30m" },
          { title: "Browser Automation with Selenium & Chromium Drivers", duration: "2h 45m" },
          { title: "Building Modern REST APIs using FastAPI & Pydantic", duration: "2h 30m" },
          { title: "Final Project Defense & Script Packaging with PyInstaller", duration: "3h 30m" },
        ],
      },
    ],
  },
  "data-science-ml": {
    id: "data-science-ml",
    slug: "data-science-ml",
    title: "Data Science & Machine Learning Bootcamp",
    category: "Data Science",
    level: "Intermediate",
    mode: "Hybrid Format",
    duration: "4 Months",
    lessonsCount: 56,
    originalPrice: 18000,
    discountedPrice: 12000,
    rating: 4.9,
    reviewsCount: 162,
    gradient: "from-blue-600 via-cyan-600 to-indigo-800",
    popular: true,
    tagline: "Turn raw data into business intelligence and predictive ML models using Python, Pandas, and Scikit-Learn.",
    description:
      "A comprehensive curriculum bridging mathematical statistics, exploratory data analysis, interactive visualizations, and applied machine learning algorithms for commercial industry forecasting.",
    nextBatch: "December 10, 2026",
    schedule: "Every Monday & Thursday • 8:00 PM – 10:00 PM",
    seatsLeft: 5,
    instructor: {
      name: "Nusrat Jahan",
      role: "Lead Data Scientist & AI Specialist",
      initials: "NJ",
      bio: "8+ years analyzing big datasets and engineering predictive customer churn algorithms for banking and telecom giants.",
      company: "DataMinds Analytics",
      experience: "8+ Years Analytics Experience",
    },
    highlights: [
      "Jupyter Notebooks & Google Colab Workflow",
      "Exploratory Data Analysis with Pandas & Seaborn",
      "Supervised & Unsupervised Machine Learning",
      "Real-world Telecom & Retail Datasets",
      "Model Deployment with Streamlit Cloud",
    ],
    outcomes: [
      "Perform data cleaning, handling missing values, and feature engineering",
      "Create interactive business visualization charts using Matplotlib, Seaborn, and Plotly",
      "Train Regression, Classification, and Clustering ML models",
      "Evaluate models with Precision, Recall, ROC-AUC, and Cross-Validation",
      "Deploy interactive prediction web dashboards with Streamlit",
    ],
    prerequisites: [
      "Basic familiarity with Python programming",
      "High school mathematics (algebra & basic probability)",
    ],
    toolsLearned: [
      "Python 3",
      "Jupyter & Colab",
      "NumPy",
      "Pandas",
      "Matplotlib & Seaborn",
      "Plotly",
      "Scikit-Learn",
      "Streamlit",
    ],
    capstoneProjects: [
      {
        title: "Customer Churn Prediction Engine",
        description: "Identifies telecom customers likely to cancel their subscriptions using Random Forest and XGBoost with 92% accuracy.",
        tech: ["Pandas", "Scikit-Learn", "XGBoost", "Streamlit"],
      },
      {
        title: "Real Estate Housing Price Valuation Model",
        description: "Multi-variable regression analyzing location, square footage, and amenities across Dhaka real estate listings.",
        tech: ["NumPy", "Pandas", "Seaborn", "Scikit-Learn"],
      },
    ],
    modules: [
      {
        title: "Module 1: Data Manipulation with NumPy & Pandas",
        duration: "Weeks 1 – 4 • 14 Lessons",
        description: "Vectorized arrays, DataFrames, indexing, filtering, merging, and reshaping datasets.",
        lessons: [
          { title: "NumPy Arrays, Matrix Operations & Vectorization", duration: "2h 00m", isFree: true },
          { title: "Pandas DataFrames: Cleaning, Imputation & Wrangling", duration: "2h 30m", isFree: true },
          { title: "Grouping, Aggregation & Pivot Table Analytics", duration: "2h 15m" },
          { title: "Exploratory Data Analysis (EDA) on Real Datasets", duration: "3h 00m" },
        ],
      },
      {
        title: "Module 2: Visual Storytelling & Applied Statistics",
        duration: "Weeks 5 – 8 • 14 Lessons",
        description: "Distributions, hypothesis testing, correlation matrices, Matplotlib, Seaborn, and Plotly charts.",
        lessons: [
          { title: "Statistical Measures: Mean, Variance, IQR & Normal Distribution", duration: "2h 00m" },
          { title: "Interactive Dashboards with Plotly & Seaborn Heatmaps", duration: "2h 30m" },
          { title: "Hypothesis Testing, T-Tests & A/B Experimentation", duration: "2h 15m" },
        ],
      },
      {
        title: "Module 3: Machine Learning Algorithms & Model Deployment",
        duration: "Weeks 9 – 16 • 28 Lessons",
        description: "Supervised & unsupervised learning, Hyperparameter tuning, Cross-validation, and Streamlit app creation.",
        lessons: [
          { title: "Linear & Logistic Regression Fundamentals", duration: "2h 30m" },
          { title: "Decision Trees, Random Forests & Ensemble Boosting", duration: "3h 00m" },
          { title: "K-Means Clustering & Dimensionality Reduction (PCA)", duration: "2h 30m" },
          { title: "Deploying Your ML App Live on Streamlit Cloud", duration: "3h 00m" },
        ],
      },
    ],
  },
  "flutter-mobile-dev": {
    id: "flutter-mobile-dev",
    slug: "flutter-mobile-dev",
    title: "Mobile App Development with Flutter & Dart",
    category: "Mobile Dev",
    level: "Intermediate",
    mode: "Hybrid Format",
    duration: "4 Months",
    lessonsCount: 50,
    originalPrice: 18000,
    discountedPrice: 12000,
    rating: 4.8,
    reviewsCount: 145,
    gradient: "from-amber-500 via-orange-600 to-red-700",
    popular: false,
    tagline: "Build beautiful, native cross-platform iOS & Android mobile apps from a single Dart codebase.",
    description:
      "Master Flutter widget architecture, reactive state management (Bloc / Provider), Google Firebase integration, and hardware device integrations like GPS, Camera, and Push Notifications.",
    nextBatch: "December 15, 2026",
    schedule: "Every Saturday & Wednesday • 6:30 PM – 8:30 PM",
    seatsLeft: 7,
    instructor: {
      name: "Fahim Shahriar",
      role: "Mobile App Team Lead",
      initials: "FS",
      bio: "Creator of 15+ published Play Store and App Store apps with combined 500,000+ active downloads.",
      company: "AppStudio BD",
      experience: "7+ Years Mobile Experience",
    },
    highlights: [
      "Single Codebase for Both iOS & Android",
      "State Management using Provider & BLoC",
      "Firebase Auth, Firestore & Cloud Messaging",
      "Google Maps & Payment Integration",
      "App Store & Google Play Publishing Guide",
    ],
    outcomes: [
      "Build fluid 60fps native mobile apps for iOS and Android",
      "Master Dart 3 features: records, pattern matching, async streams",
      "Connect REST APIs and cache offline data locally with Hive",
      "Implement real-time push notifications and geolocation tracking",
      "Publish apps to Google Play Store and Apple App Store",
    ],
    prerequisites: [
      "Any laptop (Windows, Mac, or Linux) with at least 8GB RAM",
      "Basic understanding of programming logic or OOP",
    ],
    toolsLearned: [
      "Flutter SDK",
      "Dart 3",
      "Android Studio",
      "Firebase",
      "Provider & BLoC",
      "REST APIs & Dio",
      "Hive Database",
    ],
    capstoneProjects: [
      {
        title: "FoodExpress On-Demand Delivery App",
        description: "Complete restaurant ordering mobile app with live GPS delivery tracking, cart, and push updates.",
        tech: ["Flutter", "Firebase", "Google Maps API", "bKash SDK"],
      },
    ],
    modules: [
      {
        title: "Module 1: Dart Programming & Flutter Widget Architecture",
        duration: "Weeks 1 – 4 • 14 Lessons",
        description: "Dart OOP, StatelessWidget, StatefulWidget, Material Design 3, and navigation routing.",
        lessons: [
          { title: "Dart Language Fundamentals & Async Programming", duration: "2h 00m", isFree: true },
          { title: "Stateless vs. Stateful Widgets & Layout Trees", duration: "2h 30m", isFree: true },
          { title: "Material 3 Component Kit & Custom Themes", duration: "2h 00m" },
        ],
      },
      {
        title: "Module 2: State Management & Backend API Integration",
        duration: "Weeks 5 – 10 • 20 Lessons",
        description: "Managing state with Provider and BLoC, networking with Dio, and local offline storage.",
        lessons: [
          { title: "State Management with Provider and Riverpod", duration: "2h 45m" },
          { title: "BLoC Pattern: Events, States & Streams", duration: "3h 00m" },
          { title: "REST API Integration using Dio & JSON Serialization", duration: "2h 30m" },
        ],
      },
      {
        title: "Module 3: Firebase, Hardware Features & Store Deployment",
        duration: "Weeks 11 – 16 • 16 Lessons",
        description: "Authentication, Firestore, Cloud Functions, Camera, Location, and Store publishing.",
        lessons: [
          { title: "Firebase Authentication & Cloud Firestore Setup", duration: "2h 30m" },
          { title: "Push Notifications with Firebase Cloud Messaging (FCM)", duration: "2h 15m" },
          { title: "Preparing Release Bundles & App Store Guidelines", duration: "3h 00m" },
        ],
      },
    ],
  },
  "cybersecurity-fundamentals": {
    id: "cybersecurity-fundamentals",
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity & Ethical Hacking Fundamentals",
    category: "Cybersecurity",
    level: "Beginner",
    mode: "Online Live",
    duration: "3 Months",
    lessonsCount: 38,
    originalPrice: 14000,
    discountedPrice: 9000,
    rating: 4.7,
    reviewsCount: 128,
    gradient: "from-rose-600 via-red-600 to-rose-900",
    popular: false,
    tagline: "Learn defensive security, vulnerability scanning, penetration testing basics, and digital forensics.",
    description:
      "A hands-on cybersecurity foundational program covering network defense, Kali Linux tooling, OWASP Top 10 vulnerabilities, and security audit workflows.",
    nextBatch: "December 08, 2026",
    schedule: "Every Saturday & Tuesday • 8:30 PM – 10:30 PM",
    seatsLeft: 9,
    instructor: {
      name: "Tariqul Alam",
      role: "Certified Ethical Hacker & SecOps Lead",
      initials: "TA",
      bio: "10+ years auditing enterprise banking networks and cloud infrastructures across South Asia.",
      company: "SecureShield BD",
      experience: "10+ Years SecOps",
    },
    highlights: [
      "Virtual Lab Practice with Kali Linux",
      "Hands-on OWASP Top 10 Exploitation & Remediation",
      "Wireshark Packet Analysis & Network Reconnaissance",
      "Preparation for CompTIA Security+ & CEH",
    ],
    outcomes: [
      "Understand network topologies, ports, protocols, and security layers",
      "Perform vulnerability scans using Nmap, Nessus, and Burp Suite",
      "Identify SQL Injection, XSS, and authentication bypass flaws",
      "Apply security hardening on Linux and Windows server environments",
    ],
    prerequisites: [
      "Basic understanding of computers and internet networking",
      "Laptop with virtualization enabled (VirtualBox / VMware)",
    ],
    toolsLearned: [
      "Kali Linux",
      "Wireshark",
      "Nmap",
      "Burp Suite Community",
      "Metasploit",
      "OWASP ZAP",
    ],
    capstoneProjects: [
      {
        title: "Enterprise Web App Vulnerability Assessment Report",
        description: "Comprehensive security audit report identifying 8 critical web flaws with remediation steps.",
        tech: ["Burp Suite", "OWASP ZAP", "Nmap", "Markdown Docs"],
      },
    ],
    modules: [
      {
        title: "Module 1: Networking Protocols & Kali Linux Environment",
        duration: "Weeks 1 – 4 • 12 Lessons",
        description: "TCP/IP model, DNS, subnets, packet sniffing with Wireshark, and Linux CLI navigation.",
        lessons: [
          { title: "Networking Fundamentals for Cybersecurity", duration: "2h 00m", isFree: true },
          { title: "Setting Up Kali Linux in VirtualBox", duration: "1h 45m", isFree: true },
          { title: "Packet Sniffing & Traffic Analysis with Wireshark", duration: "2h 30m" },
        ],
      },
      {
        title: "Module 2: Network Reconnaissance & Penetration Testing",
        duration: "Weeks 5 – 8 • 14 Lessons",
        description: "Port scanning, service discovery, vulnerability scanning, and social engineering vectors.",
        lessons: [
          { title: "Active & Passive Reconnaissance with Nmap", duration: "2h 30m" },
          { title: "Vulnerability Scanning & CVE Analysis", duration: "2h 15m" },
          { title: "Exploitation Frameworks & Metasploit Basics", duration: "2h 45m" },
        ],
      },
      {
        title: "Module 3: Web Application Security & OWASP Top 10",
        duration: "Weeks 9 – 12 • 12 Lessons",
        description: "SQLi, XSS, CSRF, broken authentication, and security audit documentation.",
        lessons: [
          { title: "Deep Dive into OWASP Top 10 Vulnerabilities", duration: "3h 00m" },
          { title: "Intercepting HTTP Requests with Burp Suite", duration: "2h 30m" },
          { title: "Writing Professional Security Audit & Compliance Reports", duration: "2h 00m" },
        ],
      },
    ],
  },
  "ui-ux-design": {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design Masterclass with Figma",
    category: "Web Development",
    level: "Beginner",
    mode: "Online Live",
    duration: "3 Months",
    lessonsCount: 36,
    originalPrice: 12000,
    discountedPrice: 8000,
    rating: 4.9,
    reviewsCount: 178,
    gradient: "from-fuchsia-600 via-purple-600 to-indigo-800",
    popular: true,
    tagline: "Design engaging user interfaces, interactive wireframes, and scalable design systems in Figma.",
    description:
      "From user psychology and wireframing to modern auto-layout, interactive micro-animations, design tokens, and developer handoff.",
    nextBatch: "December 05, 2026",
    schedule: "Every Sunday & Thursday • 7:00 PM – 9:00 PM",
    seatsLeft: 8,
    instructor: {
      name: "Ayesha Siddiqa",
      role: "Principal Product Designer",
      initials: "AS",
      bio: "Lead UI/UX architect specializing in fintech and healthcare products with WCAG AAA accessibility compliance.",
      company: "DesignPulse Studio",
      experience: "9+ Years Experience",
    },
    highlights: [
      "100% Figma Practical Workflow",
      "Comprehensive Design System Creation",
      "Interactive Prototyping & Smart Animate",
      "Real Case Studies for Your Dribbble / Behance",
    ],
    outcomes: [
      "Conduct user research, personas, and competitive benchmarking",
      "Master Figma Auto-Layout 5.0, component properties, and variants",
      "Build accessible color palettes and typography scales adhering to WCAG 2.1",
      "Create high-fidelity clickable prototypes with realistic micro-interactions",
    ],
    prerequisites: [
      "Any laptop or desktop capable of running a modern web browser",
      "No drawing or prior design tool experience required",
    ],
    toolsLearned: [
      "Figma",
      "FigJam",
      "Miro",
      "Design Systems",
      "WCAG Accessibility Tools",
      "Notion",
    ],
    capstoneProjects: [
      {
        title: "Digital Banking & Wealth Management Mobile App",
        description: "Complete UI/UX case study from user interviews to wireframes and a high-fidelity prototype in Figma.",
        tech: ["Figma", "Design System", "Auto-Layout", "Smart Animate"],
      },
    ],
    modules: [
      {
        title: "Module 1: Design Fundamentals, Typography & Color Theory",
        duration: "Weeks 1 – 4 • 12 Lessons",
        description: "Visual hierarchy, grid systems, modern typography pairing, and color harmony.",
        lessons: [
          { title: "UX Principles: Hick's Law, Fitts's Law & Visual Hierarchy", duration: "1h 45m", isFree: true },
          { title: "Figma Interface, Vector Networks & Frame Architecture", duration: "2h 00m", isFree: true },
          { title: "Building Scalable Color & Typography Tokens", duration: "2h 15m" },
        ],
      },
      {
        title: "Module 2: Auto-Layout, Components & Design Systems",
        duration: "Weeks 5 – 8 • 12 Lessons",
        description: "Mastering advanced Auto-Layout, reusable component libraries, and interactive variants.",
        lessons: [
          { title: "Auto-Layout Mastery: Responsive Flex containers & Spacing", duration: "2h 30m" },
          { title: "Component Variants, Boolean Properties & Slot Architecture", duration: "2h 45m" },
          { title: "Building a Full Design System from Scratch", duration: "3h 00m" },
        ],
      },
      {
        title: "Module 3: Prototyping, Usability Testing & Developer Handoff",
        duration: "Weeks 9 – 12 • 12 Lessons",
        description: "Smart Animate, micro-interactions, testing with real users, and inspecting CSS code.",
        lessons: [
          { title: "Advanced Prototyping, Scrolling & Smart Animate Transitions", duration: "2h 30m" },
          { title: "Conducting Usability Testing & Synthesizing Feedback", duration: "2h 00m" },
          { title: "Developer Handoff, Specs, Redlines & Export Best Practices", duration: "2h 15m" },
        ],
      },
    ],
  },
};

export function getCourseBySlug(slug: string): DetailedCourse | undefined {
  if (DETAILED_COURSES[slug]) return DETAILED_COURSES[slug];
  // Fallback to match by partial id or default to full-stack
  const found = Object.values(DETAILED_COURSES).find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
  );
  return found || DETAILED_COURSES["full-stack-web-dev"];
}
