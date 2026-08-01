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
      "Full Stack Software Engineer",
      "AI Product Builder",
      "Product Engineer",
      "Software Engineer",
    ],
    tagline: "Building production-ready AI-powered SaaS platforms and scalable web applications.",
    bio: "Full Stack Developer with hands-on experience building production-ready AI-powered SaaS platforms and scalable web applications using Next.js, React, TypeScript, Node.js, MongoDB, and Supabase. Passionate about engineering intelligent software with clean architecture, modern practices, and exceptional user experiences, with products serving 100+ real users.",
    location: "Hyderabad, India",
    resumeUrl: "/resume/Srijan_kumar.Resume.pdf",
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
    { name: "Next.js", category: "Frontend", level: 92 },
    { name: "TypeScript", category: "Frontend", level: 88 },
    { name: "Tailwind CSS", category: "Frontend", level: 90 },
    { name: "Framer Motion", category: "Frontend", level: 85 },
    { name: "JavaScript", category: "Frontend", level: 92 },
    // Backend
    { name: "Node.js", category: "Backend", level: 85 },
    { name: "Express.js", category: "Backend", level: 85 },
    { name: "REST APIs", category: "Backend", level: 90 },
    { name: "JWT Authentication", category: "Backend", level: 88 },
    { name: "MongoDB Atlas", category: "Backend", level: 85 },
    { name: "Supabase", category: "Backend", level: 80 },
    // State & Architecture
    { name: "Modern UI Engineering", category: "State & Architecture", level: 90 },
    { name: "Component Architecture", category: "State & Architecture", level: 88 },
    { name: "State Management", category: "State & Architecture", level: 86 },
    { name: "Responsive Design", category: "State & Architecture", level: 95 },
    // AI & Advanced
    { name: "Gemini AI", category: "AI & Advanced", level: 88 },
    { name: "AI Orchestration", category: "AI & Advanced", level: 85 },
    { name: "LLM App Development", category: "AI & Advanced", level: 82 },
    { name: "Intelligent Workflow", category: "AI & Advanced", level: 84 },
    // UI/UX
    { name: "Product Development", category: "UI/UX", level: 90 },
    { name: "Dashboard UI", category: "UI/UX", level: 88 },
    { name: "Visual Hierarchy", category: "UI/UX", level: 86 },
    { name: "Git / GitHub", category: "UI/UX", level: 90 },
  ],

  projects: [
    {
      id: "career-copilot",
      name: "Career Copilot",
      category: "AI/ML",
      badge: "Featured",
      shortDesc: "A production-grade AI Career Intelligence Platform serving 100+ users. Features AI orchestration, Gemini integration, and real-time ATS synchronization.",
      longDesc: "Career Copilot is a flagship SaaS platform engineered for full-stack AI career intelligence. It features a robust AI orchestration layer using Gemini AI with round-robin API key rotation, automatic fallback models, and intelligent retry mechanisms for scale and reliability.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB Atlas", "Gemini AI", "JWT Auth", "Vercel"],
      highlights: [
        "100+ real users & 165+ AI analyses",
        "AI orchestration layer with round-robin",
        "Gemini AI integration with failover",
        "Live AI Resume Editor with ATS sync",
        "23 professionally designed templates",
        "Scalable production architecture",
        "Secure JWT authentication",
      ],
      github: "https://github.com/srijansk13/career-copilot",
      live: "https://careercopilotapp.vercel.app/",
      status: "production",
      caseStudy: {
        problem: "Users needed a reliable, intelligent career tool that goes beyond simple keyword matching, while addressing the challenge of maintaining high availability with AI APIs under load.",
        solution: "Engineered a scalable SaaS AI Career Intelligence Platform with an advanced AI orchestration layer, delivering personalized career insights, semantic resume optimization, and a responsive Live AI Resume Editor.",
        architecture: [
          "Resilient AI orchestration layer using Gemini AI with round-robin API key rotation and fallback models",
          "Modular full-stack architecture with Next.js App Router, reusable components, and JWT authentication",
          "MongoDB Atlas persistence layer handling resume history, user profiles, and AI analysis data",
          "Real-time ATS score synchronization mapped to 23 LaTeX/Canva inspired templates",
        ],
        challenges: "Ensuring 100% uptime for AI features and maintaining low latency during heavy analysis. Solved by architecting an intelligent retry mechanism with automatic fallback models and optimized state management for faster rendering.",
        results: "Successfully executed a production deployment serving 100+ real users and completing 165+ AI-powered analyses. Demonstrated strong returning-user engagement through continuous product enhancements.",
      },
    },
    {
      id: "quizify",
      name: "Quizify",
      category: "SaaS",
      badge: "Live",
      shortDesc: "A SaaS-inspired quiz platform supporting personalized learning, analytics dashboards, and interactive workflows.",
      longDesc: "Quizify is an interactive quiz ecosystem built with a modern React architecture. It features an engaging user experience with timers, keyboard navigation, result analytics, and fully responsive user interfaces.",
      techStack: ["React", "TypeScript", "Zustand", "Tailwind CSS", "Vite"],
      highlights: [
        "SaaS-inspired analytics dashboard",
        "XP progression workflows",
        "Interactive timer & keyboard nav",
        "Zustand state management",
        "Fully responsive UI design",
      ],
      github: "https://github.com/srijansk13/Online_quiz_maker",
      live: "https://srijansk13.github.io/Online_quiz_maker/",
      status: "production",
      caseStudy: {
        problem: "Static learning tools suffer from low retention. There was a need for a highly interactive, responsive assessment platform that feels like a modern application rather than a static form.",
        solution: "Developed a SaaS-inspired quiz platform with real-time feedback, analytics dashboards, and an XP progression system to keep users engaged and learning.",
        architecture: [
          "React + Zustand for predictable, centralized state management of quiz sessions",
          "Responsive Tailwind CSS design system ensuring perfect layouts on mobile and desktop",
          "Optimized Vite build pipeline for fast loading and deployment",
        ],
        challenges: "Managing complex quiz state (timers, answers, score) across multiple components without prop drilling. Solved elegantly using Zustand to create a centralized, reactive state store.",
        results: "Delivered a fully functional, highly interactive quiz application that showcases modern frontend engineering practices, clean code architecture, and a strong eye for UI/UX.",
      },
    },
  ] as Project[],

  secondaryProjects: [] as SecondaryProject[],

  experience: [
    {
      id: "exp-optern",
      role: "AI & Full Stack Development Intern",
      company: "Optern",
      logoLetter: "O",
      duration: "June 2026 — Present",
      type: "Remote",
      isCurrent: true,
      techStack: ["Next.js", "TypeScript", "Supabase", "Component Architecture", "GitHub Workflows"],
      achievements: [
        "Contributed to the development of production-grade AI SaaS platforms using Next.js, TypeScript, and Supabase.",
        "Migrated legacy applications to modern architectures, implemented scalable dashboard features, and reusable components.",
        "Collaborated through GitHub-based workflows, feature reviews, and agile engineering practices.",
      ],
    },
    {
      id: "exp-yuva",
      role: "Junior Node.js Developer Intern",
      company: "Yuva Intern",
      logoLetter: "Y",
      duration: "May 2026 — June 2026",
      type: "Remote",
      isCurrent: false,
      techStack: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"],
      achievements: [
        "Developed secure RESTful APIs using Node.js, Express.js, and MongoDB with scalable backend architecture.",
        "Implemented JWT authentication, protected routes, backend validation, and API integrations.",
      ],
    },
    {
      id: "exp-codsoft",
      role: "Web Development Intern",
      company: "CodSoft",
      logoLetter: "C",
      duration: "Apr 2026 – May 2026",
      type: "Remote",
      isCurrent: false,
      techStack: ["HTML", "CSS", "JavaScript", "Flexbox / Grid"],
      achievements: [
        "Developed responsive web applications following mobile-first design principles.",
        "Built modern landing pages and interactive user interfaces using animations and responsive layouts.",
      ],
    },
  ] as Experience[],

  education: [
    {
      id: "edu-btech",
      degree: "B.Tech — Computer Science Engineering",
      institution: "Global Institute of Engineering and Technology",
      grade: "9.65",
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
  ] as Education[],
};
