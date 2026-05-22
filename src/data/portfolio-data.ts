export interface Project {
  id: string;
  name: string;
  category: 'AI/ML' | 'SaaS' | 'Tool' | 'Creative Web';
  badge: 'Featured' | 'Live' | 'New' | '';
  shortDesc: string;
  longDesc: string;
  techStack: string[];
  highlights: string[];
  github: string;
  live: string;
  status: 'production' | 'beta' | 'archived';
  caseStudy: {
    problem: string;
    solution: string;
    architecture: string[];
    challenges: string;
    results: string;
  };
}

export interface SecondaryProject {
  id: string;
  name: string;
  shortDesc: string;
  techStack: string[];
  github: string;
  live: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logoLetter: string;
  duration: string;
  type: string;
  techStack: string[];
  achievements: string[];
  isCurrent?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  grade: string;
  gradeLabel: string;
  year: string;
  icon: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Srijan Kumar",
    fullName: "Budige Srijan Kumar Goud",
    roles: [
      "Full Stack Developer",
      "AI Product Builder",
      "SaaS UI Engineer",
      "Frontend Systems Engineer",
    ],
    tagline: "Building premium SaaS experiences, AI-powered applications, and modern interactive web systems.",
    bio: "Computer Science student focused on building AI-powered SaaS products, premium frontend systems, and immersive modern web experiences.",
    location: "Hyderabad, India",
    resumeUrl: "/resume/Srijan_Kumar_Goud_Resume.pdf",
    email: "srijansk1304@gmail.com",
    availability: "Open to internships, projects & collaborations",
    responseTime: "Usually < 4 hours",
    socials: {
      github: "https://github.com/srijansk13",
      linkedin: "https://www.linkedin.com/in/srijan-kumar-sk13/",
      email: "mailto:srijansk1304@gmail.com",
      whatsapp: "https://wa.me/918019682137",
    }
  },

  skills: [
    // Frontend
    { name: "React", category: "Frontend", level: 90 },
    { name: "Next.js", category: "Frontend", level: 88 },
    { name: "TypeScript", category: "Frontend", level: 85 },
    { name: "Tailwind CSS", category: "Frontend", level: 92 },
    { name: "Framer Motion", category: "Frontend", level: 82 },
    { name: "Vite", category: "Frontend", level: 80 },
    { name: "HTML5 / CSS3", category: "Frontend", level: 95 },
    { name: "JavaScript", category: "Frontend", level: 90 },
    // Backend
    { name: "Node.js", category: "Backend", level: 82 },
    { name: "MongoDB", category: "Backend", level: 80 },
    { name: "Mongoose", category: "Backend", level: 78 },
    { name: "JWT Authentication", category: "Backend", level: 85 },
    { name: "API Routes", category: "Backend", level: 88 },
    { name: "OTP Authentication", category: "Backend", level: 75 },
    // State & Architecture
    { name: "Zustand", category: "State & Architecture", level: 82 },
    { name: "SaaS Architecture", category: "State & Architecture", level: 78 },
    { name: "Component Systems", category: "State & Architecture", level: 85 },
    { name: "Responsive Systems", category: "State & Architecture", level: 90 },
    // AI & Advanced
    { name: "AI Workflow Systems", category: "AI & Advanced", level: 76 },
    { name: "ATS Intelligence", category: "AI & Advanced", level: 80 },
    { name: "Semantic Processing", category: "AI & Advanced", level: 74 },
    { name: "AI Orchestration", category: "AI & Advanced", level: 72 },
    // UI/UX
    { name: "Glassmorphism", category: "UI/UX", level: 90 },
    { name: "Motion Design", category: "UI/UX", level: 85 },
    { name: "Dashboard UI", category: "UI/UX", level: 88 },
    { name: "Responsive UX", category: "UI/UX", level: 92 },
    { name: "Visual Hierarchy", category: "UI/UX", level: 86 },
  ],

  projects: [
    {
      id: "career-copilot",
      name: "Career Copilot",
      category: "AI/ML",
      badge: "Featured",
      shortDesc: "A production-grade AI-powered Career Operating System engineered to optimize resumes, simulate ATS evaluations, generate career intelligence insights, and deliver a premium SaaS experience.",
      longDesc: "Career Copilot is a full-stack AI Career OS built to help job seekers transform their resumes with real intelligence. It simulates how Applicant Tracking Systems score resumes, provides STAR-method optimized suggestions, and delivers a premium SaaS dashboard experience backed by a robust multi-key AI rotation system.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Framer Motion", "JWT Auth", "AI Workflow"],
      highlights: [
        "ATS Intelligence Engine",
        "Resume Semantic Analysis",
        "STAR Method Optimization",
        "AI Reanalysis System",
        "Interactive Resume Sandbox",
        "Premium SaaS Dashboard",
        "Multi-Key AI Rotation",
      ],
      github: "https://github.com/srijansk13",
      live: "https://ai-resume-analyzer-career-copilot-s.vercel.app/",
      status: "production",
      caseStudy: {
        problem: "Job seekers lack real, actionable intelligence on why their resumes fail ATS filters. Generic advice doesn't account for keyword density, formatting penalties, or role-specific scoring algorithms.",
        solution: "Built a full AI Career OS that simulates ATS scoring, extracts semantic gaps, and delivers role-optimized suggestions using a multi-key AI rotation pipeline with fallback handling to ensure 100% uptime.",
        architecture: [
          "Next.js App Router with JWT-protected dashboard routes and secure session management",
          "MongoDB persistence layer storing resume history, analysis snapshots, and user profiles",
          "Multi-key AI rotation gateway with circuit breaker fallbacks ensuring zero downtime",
          "Semantic ATS scoring engine mapping resume content to job description keyword clusters",
        ],
        challenges: "Maintaining consistent AI response quality across multiple API keys while preventing rate-limit failures. Solved using a weighted round-robin rotation with exponential backoff and deterministic local fallbacks.",
        results: "Deployed to production on Vercel. Delivers sub-3-second analysis with premium dashboard UX, supporting full resume workflows from upload to AI reanalysis.",
      },
    },
    {
      id: "quizify",
      name: "Quizify",
      category: "SaaS",
      badge: "Live",
      shortDesc: "A futuristic SaaS quiz ecosystem combining gamification, quiz creation, dashboard analytics, and immersive learning experiences with XP progression and multi-user architecture.",
      longDesc: "Quizify is a gamified SaaS platform for creating, discovering, and competing in quizzes. Built with a modern React + Zustand architecture, it features XP-based progression, quiz creator workflows, and an interactive analytics dashboard.",
      techStack: ["React", "TypeScript", "Zustand", "Tailwind CSS", "Framer Motion", "Vite"],
      highlights: [
        "Gamification System",
        "XP & Progression Engine",
        "Quiz Creator Workflow",
        "Interactive Dashboard",
        "Quiz Discovery Ecosystem",
        "Multi-User Architecture",
      ],
      github: "https://github.com/srijansk13/Online_quiz_maker",
      live: "https://srijansk13.github.io/Online_quiz_maker/",
      status: "production",
      caseStudy: {
        problem: "Existing quiz platforms feel static and disengaging, offering no progression system, no discovery, and generic UX that kills retention.",
        solution: "Engineered a gamified quiz SaaS with XP rewards, leaderboards, and a structured creator workflow, all inside a premium Framer Motion-powered dashboard.",
        architecture: [
          "React + Zustand state architecture for quiz session management and XP calculation",
          "Framer Motion page transitions with quiz progress animations",
          "Vite-optimized build pipeline for fast static deployment on GitHub Pages",
        ],
        challenges: "Designing a gamification engine that feels rewarding without becoming noisy. Solved by implementing discrete XP thresholds with subtle level-up animations rather than constant notifications.",
        results: "Live on GitHub Pages with a complete quiz creation, discovery, and gamification flow. Demonstrates SaaS architecture thinking with modern frontend tooling.",
      },
    },
  ] as Project[],

  secondaryProjects: [
    {
      id: "career-landing",
      name: "Career Copilot Landing",
      shortDesc: "Premium marketing landing page for the Career Copilot AI product — built during the CodSoft internship.",
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/srijansk13/CODSOFT",
      live: "https://srijansk13.github.io/CODSOFT/",
    },
    {
      id: "auracalc-x",
      name: "AuraCalc X",
      shortDesc: "A premium, animated scientific calculator with glass UI, dark aesthetic, and smooth micro-interactions.",
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/srijansk13/AuraCalc-X",
      live: "https://srijansk13.github.io/AuraCalc-X/",
    },
    {
      id: "cipherkey",
      name: "CipherKey",
      shortDesc: "A sleek encryption & decryption tool with real-time cipher processing and a futuristic terminal-style UI.",
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/srijansk13/CipherKey",
      live: "https://srijansk13.github.io/CipherKey/",
    },
    {
      id: "smart-task-manager",
      name: "Smart Task Manager",
      shortDesc: "A productivity-focused task manager with priority sorting, status tracking, and clean minimal UI.",
      techStack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/srijansk13/smart-task-manager",
      live: "https://srijansk13.github.io/smart-task-manager/",
    },
  ] as SecondaryProject[],

  experience: [
    {
      id: "exp-yuva",
      role: "Junior Node.js Developer Intern",
      company: "Yuva Intern",
      logoLetter: "Y",
      duration: "2025 — Present",
      type: "Current Internship",
      isCurrent: true,
      techStack: ["Node.js", "Express", "MongoDB", "REST APIs", "JWT"],
      achievements: [
        "Building and maintaining RESTful API endpoints for production backend services.",
        "Implementing JWT-based authentication flows with secure session management.",
        "Contributing to MongoDB schema design and query optimization for scalable data models.",
      ],
    },
    {
      id: "exp-codsoft",
      role: "Web Development Intern",
      company: "CodSoft",
      logoLetter: "C",
      duration: "April 15 – May 15, 2026",
      type: "Internship · Completed",
      isCurrent: false,
      techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      achievements: [
        "Completed a 4-week structured web development internship program.",
        "Built and shipped the Career Copilot landing page as the primary internship deliverable.",
        "Applied responsive design principles and modern CSS techniques across multiple pages.",
      ],
    },
  ] as Experience[],

  education: [
    {
      id: "edu-btech",
      degree: "B.Tech — Computer Science Engineering",
      institution: "Global Institute of Engineering and Technology",
      grade: "8.95",
      gradeLabel: "CGPA",
      year: "2024 — 2028",
      icon: "🎓",
    },
    {
      id: "edu-intermediate",
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College",
      grade: "90.7%",
      gradeLabel: "Percentage",
      year: "2022 — 2024",
      icon: "📚",
    },
    {
      id: "edu-school",
      degree: "Secondary School (Class X)",
      institution: "Sri Chaitanya School",
      grade: "9.5",
      gradeLabel: "GPA",
      year: "Completed 2022",
      icon: "🏫",
    },
  ] as Education[],
};
