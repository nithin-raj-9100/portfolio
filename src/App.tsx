import { useState, useMemo, useEffect, useRef } from "react";
import { usePostHog } from "@posthog/react";
import ResumeChat from "./components/ResumeChat";
import { 
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Check,
  Copy,
  X,
  BookOpen,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Globe,
  Sun,
  Moon,
  Monitor,
  Menu,
  Search,
  Download
} from "lucide-react";

// Brand icons as inline custom SVGs due to Lucide v1.x removal
function GithubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Types
interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  metrics: { value: string; label: string }[];
  logoText: string;
  certificateUrl?: string;
}

interface Project {
  title: string;
  description: string;
  period: string;
  liveUrl: string;
  githubUrl: string;
  tech: string[];
  bullets: string[];
  category: "ecommerce" | "booking" | "all";
}

type Theme = "light" | "dark" | "system";

// Corrected Data Sets from main.tex
const jobsData: Job[] = [
  {
    id: "wednesday",
    company: "Wednesday Solutions",
    role: "Software Development Engineer 1 (SDE-1)",
    period: "March 2026 – Present",
    location: "Pune, India",
    bullets: [
      "Built an AI-powered internal platform to manage and monitor project health across the entire organization, consolidating DORA metrics, NPS scores, project status, and team rankings into a unified dashboard.",
      "Engineered automated bi-weekly sprint reporting workflows using n8n, delivering AI-generated project health summaries to managers across all active projects and enabling proactive risk identification at scale.",
      "Integrated an AI layer to analyze cross-project data and surface actionable insights, significantly reducing manual status-tracking overhead for engineering leads and stakeholders."
    ],
    metrics: [
      { value: "AI-Powered", label: "Dashboard" },
      { value: "n8n", label: "Automated Workflows" },
      { value: "SDE-1", label: "Current Level" }
    ],
    logoText: "WS"
  },
  {
    id: "stalcon-ft",
    company: "Stalcon Solutions Private Limited",
    role: "Backend Developer (Full-Time)",
    period: "October 2025 – February 2026",
    location: "Remote",
    bullets: [
      "Transitioned to a full-time role following a successful internship, taking ownership of backend architecture and API development.",
      "Led development across multiple concurrent projects including Amealio and SkillStride (learning platform), ensuring scalable and modular codebases.",
      "Collaborated with cross-functional teams to design and implement robust server-side logic using Node.js, Fastify, and Prisma ORM.",
      "Optimized database schemas and query performance in PostgreSQL to support increasing user traffic and data complexity."
    ],
    metrics: [
      { value: "Fastify", label: "Modular APIs" },
      { value: "Prisma", label: "ORM Optimization" },
      { value: "PostgreSQL", label: "Schema Restructure" }
    ],
    logoText: "SS"
  },
  {
    id: "stalcon-intern",
    company: "Stalcon Solutions Private Limited",
    role: "Backend Developer Intern",
    period: "July 2025 – September 2025",
    location: "Remote",
    bullets: [
      "Contributed to the backend of a production-ready learning platform built with NestJS and MongoDB, focusing on modular, secure, and scalable server architecture.",
      "Assisted in the migration of legacy components to modern backend architectures, improving maintainability and developer velocity.",
      "Participated in regular code reviews and technical knowledge transfer sessions to align with industry best practices."
    ],
    metrics: [
      { value: "NestJS", label: "Modular Server" },
      { value: "MongoDB", label: "NoSQL Schemas" },
      { value: "Intern", label: "Core Developer" }
    ],
    logoText: "SS"
  },
  {
    id: "eazybyts",
    company: "EazyByts Web Solutions",
    role: "Web Developer Intern",
    period: "August 2024 – February 2025",
    location: "Remote",
    bullets: [
      "Completed a comprehensive 7-month internship program, gaining hands-on experience in full-stack development.",
      "Developed a feature-rich Stock Market Dashboard using React, HTML5, CSS3, and JavaScript with real-time data integration.",
      "Implemented interactive portfolio management system with performance tracking and data visualization components.",
      "Designed responsive UI/UX ensuring cross-device compatibility and optimal user experience across multiple screen sizes."
    ],
    metrics: [
      { value: "7 Months", label: "Internship Duration" },
      { value: "React", label: "Stock Dashboard" },
      { value: "Chart.js", label: "Visualization" }
    ],
    logoText: "EB",
    certificateUrl: "https://drive.google.com/file/d/17zBOh8H4y5X8F8wuw97tsGEm93X2yUmi/view?usp=sharing"
  }
];

const projectsData: Project[] = [
  {
    title: "CartVerse",
    description: "Full-Stack E-Commerce Platform",
    period: "January 2025",
    liveUrl: "https://cartverse.vercel.app/",
    githubUrl: "https://github.com/nithin-raj-9100/cartverse",
    tech: ["React (Vite)", "TailwindCSS", "TanStack Query", "Framer Motion", "Fastify", "PostgreSQL", "Prisma ORM", "Lucia Auth"],
    bullets: [
      "Built a production-ready e-commerce platform with React, Vite, and Framer Motion.",
      "Architected a scalable backend with Fastify, PostgreSQL (Supabase), and Prisma following MVC pattern.",
      "Implemented secure JWT-based authentication using Lucia Auth with role-based access control."
    ],
    category: "ecommerce"
  },
  {
    title: "Airbnb Clone",
    description: "Hotel Booking Platform",
    period: "April 2023 – August 2023",
    liveUrl: "https://airbnb-nithinraj.vercel.app/",
    githubUrl: "https://github.com/nithin-raj-9100/airbnb",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Prisma ORM", "NextAuth.js", "Cloudinary"],
    bullets: [
      "Developed a comprehensive hotel booking platform with multi-authentication (Google, GitHub) and advanced search/filtering.",
      "Implemented a highly reliable conflict prevention system for reservations using DB constraints and real-time availability checks."
    ],
    category: "booking"
  }
];

const skillsData = [
  { name: "JavaScript/TypeScript", category: "languages", level: "Expert" },
  { name: "Python", category: "languages", level: "Advanced" },
  { name: "Java", category: "languages", level: "Intermediate" },
  { name: "SQL", category: "languages", level: "Advanced" },
  { name: "HTML5/CSS3", category: "languages", level: "Expert" },
  { name: "React", category: "frontend", level: "Expert" },
  { name: "Next.js", category: "frontend", level: "Expert" },
  { name: "Tailwind CSS", category: "frontend", level: "Expert" },
  { name: "Redux", category: "frontend", level: "Advanced" },
  { name: "Responsive Design", category: "frontend", level: "Expert" },
  { name: "Vite", category: "frontend", level: "Expert" },
  { name: "Node.js", category: "backend", level: "Expert" },
  { name: "Fastify", category: "backend", level: "Expert" },
  { name: "Express.js", category: "backend", level: "Expert" },
  { name: "Prisma ORM", category: "backend", level: "Expert" },
  { name: "REST APIs", category: "backend", level: "Expert" },
  { name: "PostgreSQL", category: "databases", level: "Expert" },
  { name: "MySQL", category: "databases", level: "Advanced" },
  { name: "MongoDB", category: "databases", level: "Advanced" },
  { name: "Redis", category: "databases", level: "Advanced" },
  { name: "DiceDB", category: "databases", level: "Intermediate" },
  { name: "Docker", category: "devops", level: "Advanced" },
  { name: "Git/GitHub", category: "devops", level: "Expert" },
  { name: "CI/CD Pipelines", category: "devops", level: "Advanced" },
  { name: "Vercel", category: "devops", level: "Expert" },
  { name: "Supabase", category: "devops", level: "Advanced" },
  { name: "Turborepo", category: "devops", level: "Advanced" },
  { name: "Serverless Deployment", category: "devops", level: "Advanced" },
  { name: "Jira", category: "tools", level: "Advanced" },
  { name: "GitLab", category: "tools", level: "Advanced" },
  { name: "IntelliJ", category: "tools", level: "Advanced" },
  { name: "Postman", category: "tools", level: "Expert" },
  { name: "GitHub Actions", category: "tools", level: "Advanced" },
  { name: "SSH", category: "tools", level: "Advanced" },
  { name: "Certbot", category: "tools", level: "Intermediate" },
  { name: "Cloudinary", category: "tools", level: "Advanced" },
  { name: "Data Structures & Algorithms", category: "core", level: "Advanced" },
  { name: "DBMS", category: "core", level: "Advanced" },
  { name: "System Design", category: "core", level: "Intermediate" },
  { name: "OOPS", category: "core", level: "Advanced" },
  { name: "Microservices Architecture", category: "core", level: "Intermediate" },
  { name: "Monorepo Management", category: "core", level: "Advanced" }
];

const skillCategories = [
  { id: "all", name: "All Skills" },
  { id: "languages", name: "Languages" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "databases", name: "Databases" },
  { id: "devops", name: "DevOps & Cloud" },
  { id: "tools", name: "Tools" },
  { id: "core", name: "Core Concepts" }
];

function App() {
  const posthog = usePostHog();

  // Navigation active state
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Skills filter state
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("all");
  const [skillSearch, setSkillSearch] = useState<string>("");
  const skillSearchRef = useRef<HTMLInputElement>(null);

  // Experience accordion state (ID of expanded job, default first)
  const [expandedJob, setExpandedJob] = useState<string>("wednesday");

  // Toast system state
  const [toast, setToast] = useState<{ message: string; show: boolean } | null>(null);

  // Modal systems
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle trigger Toast helper
  const showToast = (message: string) => {
    setToast({ message, show: true });
  };

  // Autoclose Toast
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast((prev) => prev ? { ...prev, show: false } : null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle Theme Application
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark =
        theme === "dark" ||
        (theme === "system" && mediaQuery.matches);
      
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    const listener = () => {
      if (theme === "system") applyTheme();
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [theme]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll-based active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["overview", "experience", "skills", "projects", "blog"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ⌘K / Ctrl+K to focus skill search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const el = document.getElementById("skills");
        el?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => skillSearchRef.current?.focus(), 400);
      }
      if (e.key === "Escape") {
        setIsShareModalOpen(false);
        setIsContactModalOpen(false);
        setIsThemeMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Refs for modal focus trapping
  const shareModalRef = useRef<HTMLDivElement>(null);
  const contactModalRef = useRef<HTMLDivElement>(null);

  // Focus trap: Share modal
  useEffect(() => {
    if (!isShareModalOpen || !shareModalRef.current) return;
    const el = shareModalRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    el.addEventListener("keydown", handleTab);
    return () => el.removeEventListener("keydown", handleTab);
  }, [isShareModalOpen]);

  // Focus trap: Contact modal
  useEffect(() => {
    if (!isContactModalOpen || !contactModalRef.current) return;
    const el = contactModalRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    el.addEventListener("keydown", handleTab);
    return () => el.removeEventListener("keydown", handleTab);
  }, [isContactModalOpen]);

  // Handle Theme Change
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setIsThemeMenuOpen(false);
    posthog?.capture("theme_changed", { theme: newTheme });
    showToast(`Theme set to ${newTheme}`);
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    posthog?.capture("contact_info_copied", { field: label });
    showToast(`${label} copied`);
  };

  // Filter skills based on tab and search query
  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchCategory = selectedSkillCategory === "all" || skill.category === selectedSkillCategory;
      const matchSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedSkillCategory, skillSearch]);

  // Group the filtered skills by category for layout optimization
  const groupedSkills = useMemo(() => {
    const groups: Record<string, typeof skillsData> = {};
    filteredSkills.forEach((skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });
    return groups;
  }, [filteredSkills]);

  // Handle Form Submit (Fully functional production form via FormSubmit API)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      showToast("Fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/nithinraj9100@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          _subject: `New Portfolio Message from ${contactName}`
        })
      });

      if (response.ok) {
        setIsContactModalOpen(false);
        posthog?.capture("contact_form_submitted", { name: contactName, email: contactEmail });
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        showToast("Message sent");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      posthog?.capture("contact_form_failed");
      showToast("Error sending message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-100 text-gray-1000 antialiased flex flex-col selection:bg-gray-1000 selection:text-background-100">
      
      {/* GLOW DECORATIONS (Vercel Style, minimalist radial grids) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-350 h-150 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-62.5 left-[20%] w-150 h-125 bg-blue-100/40 dark:bg-blue-900/15 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute -top-25 right-[10%] w-125 h-100 bg-pink-100/35 dark:bg-pink-900/10 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute top-75 left-[40%] w-100 h-75 bg-amber-100/30 dark:bg-amber-900/10 rounded-full blur-[90px] opacity-50"></div>
      </div>

      {/* TOP NOTIFICATION BAR */}
      <div className="w-full bg-background-200 border-b border-gray-200 text-center py-2 px-4 z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-2 label-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse inline-block"></span>
            <span className="font-medium text-gray-900">Available for SDE-1 & Full-Stack roles</span>
          </div>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <button 
            onClick={() => handleCopy("nithinraj9100@gmail.com", "Email")} 
            className="text-blue-700 hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
          >
            nithinraj9100@gmail.com <Copy size={10} />
          </button>
        </div>
      </div>

      {/* STICKY HEADER */}
      <header className="sticky top-0 bg-background-100/80 backdrop-blur-md border-b border-gray-200 z-40 transition-all duration-200 relative" ref={mobileMenuRef}>
        <div className="max-w-300 mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo / Personal Brand */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-sm bg-gray-1000 flex items-center justify-center font-mono text-background-100 text-sm font-bold transition-transform duration-200 group-hover:scale-105">
                NR
              </div>
              <span className="heading-16 text-gray-1000 tracking-tight font-semibold">Nithin Raj</span>
            </a>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: "overview", label: "Overview" },
                { id: "experience", label: "Experience" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "blog", label: "Writing" },
              ].map((tab) => (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    posthog?.capture("nav_link_clicked", { section: tab.id });
                  }}
                  className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-all duration-150 relative ${
                    activeTab === tab.id
                      ? "text-gray-1000 bg-gray-100"
                      : "text-gray-600 hover:text-gray-1000 hover:bg-gray-100/50"
                  }`}
                >
                  {tab.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Custom Theme Switcher */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="geist-focus border border-gray-300 hover:border-gray-500 bg-background-100 text-gray-900 hover:text-gray-1000 h-9 px-2.5 rounded-sm flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer shadow-raised relative"
                title="Change theme"
              >
                {theme === "light" && <Sun size={14} className="text-amber-600" />}
                {theme === "dark" && <Moon size={14} className="text-blue-600 dark:text-blue-500" />}
                {theme === "system" && <Monitor size={14} className="text-gray-600" />}
                
                <span className="capitalize label-13 font-medium select-none hidden sm:inline">{theme}</span>
                
                <ChevronDown size={12} className="text-gray-600 shrink-0 ml-0.5 hidden sm:inline" />
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-background-100 border border-gray-300 rounded-sm shadow-popover py-1 z-50 animate-fadeIn">
                  {[
                    { id: "light", label: "Light", icon: Sun },
                    { id: "dark", label: "Dark", icon: Moon },
                    { id: "system", label: "System", icon: Monitor },
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isSelected = theme === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleThemeChange(item.id as Theme)}
                        className={`w-full px-3 py-2 text-left text-sm font-medium flex items-center justify-between hover:bg-gray-100 cursor-pointer ${
                          isSelected ? "text-blue-700 font-semibold" : "text-gray-900"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <IconComp size={14} />
                          {item.label}
                        </span>
                        {isSelected && <Check size={12} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contact quick actions */}
            <a
              href="https://github.com/nithin-raj-9100"
              target="_blank"
              rel="noreferrer"
              onClick={() => posthog?.capture("github_profile_clicked", { source: "header" })}
              className="geist-focus border border-gray-300 hover:border-gray-500 bg-background-100 text-gray-900 hover:text-gray-1000 h-9 w-9 rounded-sm hidden sm:flex items-center justify-center transition-colors cursor-pointer shadow-raised"
              title="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/nithin-raj-32311222b/"
              target="_blank"
              rel="noreferrer"
              onClick={() => posthog?.capture("linkedin_profile_clicked", { source: "header" })}
              className="geist-focus border border-gray-300 hover:border-gray-500 bg-background-100 text-gray-900 hover:text-gray-1000 h-9 w-9 rounded-sm hidden sm:flex items-center justify-center transition-colors cursor-pointer shadow-raised"
              title="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Nithinraj_Resume.pdf"
              onClick={() => posthog?.capture("resume_downloaded", { source: "header" })}
              className="geist-focus border border-gray-300 hover:border-gray-500 bg-background-100 text-gray-900 hover:text-gray-1000 h-9 px-2.5 rounded-sm hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer shadow-raised"
              title="Download Resume"
            >
              <Download size={14} />
              <span className="hidden lg:inline">Resume</span>
            </a>

            <button
              onClick={() => { setIsContactModalOpen(true); posthog?.capture("contact_modal_opened", { source: "header" }); }}
              className="geist-focus text-sm font-medium bg-gray-1000 hover:bg-gray-800 text-background-100 px-2.5 sm:px-3.5 h-9 rounded-sm flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-raised active:bg-gray-900"
            >
              <Mail size={14} />
              <span className="hidden sm:inline">Contact</span>
            </button>

            {/* Mobile Navigation Drawer Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="geist-focus border border-gray-300 hover:border-gray-500 bg-background-100 text-gray-900 hover:text-gray-1000 h-9 w-9 rounded-sm flex md:hidden items-center justify-center transition-colors cursor-pointer shadow-raised shrink-0"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Popover */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute right-6 top-18 w-52 bg-background-100 border border-gray-300 rounded-md shadow-popover p-1.5 z-50 animate-fadeIn">
            {[
              { id: "overview", label: "Overview" },
              { id: "experience", label: "Experience" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "blog", label: "Writing" },
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                  posthog?.capture("nav_link_clicked", { section: tab.id, source: "mobile_menu" });
                }}
                className={`block w-full px-3.5 py-2.5 rounded-sm text-sm font-semibold transition-all duration-150 ${
                  activeTab === tab.id
                    ? "text-gray-1000 bg-background-200"
                    : "text-gray-900 hover:text-gray-1000 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="grow max-w-300 w-full mx-auto px-6 py-12 relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* HERO SECTION */}
        <section id="overview" className="scroll-mt-28 flex flex-col gap-6 md:gap-8 pt-4">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-100 border border-blue-400 text-blue-700 w-fit">
              <Sparkles size={12} className="animate-spin-slow" />
              <span className="label-12-mono font-medium tracking-wide uppercase">Software Engineer</span>
            </div>
            
            <h1 className="heading-56 md:heading-72 tracking-tight text-gray-1000 font-extrabold max-w-225 leading-none">
              Building ultra-fast, robust applications from database to DOM.
            </h1>
          </div>

          <p className="copy-18 md:copy-20 text-gray-900 max-w-190 font-normal leading-relaxed">
            I am Nithin Raj, a Software Development Engineer (SDE-1) at Wednesday Solutions based in Pune, India. 
            I construct responsive frontends, highly optimized REST APIs, and scalable backend microservices using Node.js, Fastify, Next.js, and Prisma.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-225 mt-2">
            {[
              { value: "SDE-1", label: "Current Role", sub: "Wednesday Solutions", color: "blue-700" },
              { value: "Full-Stack", label: "Architecture", sub: "Modular APIs & Microservices", color: "purple-700" },
              { value: "PostgreSQL", label: "Databases Handled", sub: "Fastify & Prisma ORM", color: "green-700" },
              { value: "8.0", label: "B. Tech CGPA", sub: "Computer Science", color: "amber-900" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-background-200 border border-gray-200 rounded-sm p-4 hover:border-gray-300 transition-colors shadow-raised group">
                <div className="label-12-mono text-gray-700 uppercase tracking-wider font-semibold mb-1">{stat.label}</div>
                <div className="heading-24 font-bold text-gray-1000 group-hover:text-blue-700">{stat.value}</div>
                <div className="label-12 text-gray-900 font-medium">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Hero Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mt-2">
            <button
              onClick={() => { setIsContactModalOpen(true); posthog?.capture("hire_me_clicked"); posthog?.capture("contact_modal_opened", { source: "hero" }); }}
              className="geist-focus bg-gray-1000 text-background-100 rounded-sm h-11 px-5 font-semibold label-14 shadow-raised hover:bg-gray-800 active:bg-gray-900 cursor-pointer flex items-center gap-2 transition-all"
            >
              Hire Me <ArrowRight size={16} />
            </button>

            <a
              href="/resume.pdf"
              download="Nithinraj_Resume.pdf"
              onClick={() => posthog?.capture("resume_downloaded")}
              className="geist-focus bg-background-100 hover:bg-gray-100 text-gray-1000 border border-gray-400 rounded-sm h-11 px-5 font-semibold label-14 flex items-center gap-2 transition-all cursor-pointer shadow-raised"
            >
              <Download size={15} /> Resume
            </a>
          </div>
        </section>

        {/* PROFESSIONAL EXPERIENCE SECTION */}
        <section id="experience" className="scroll-mt-28 flex flex-col gap-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="label-12-mono font-medium tracking-wider text-blue-700 uppercase mb-1">Career Timeline</div>
              <h2 className="heading-32 tracking-tight text-gray-1000 font-bold">Professional Experience</h2>
            </div>
            <p className="label-14 text-gray-900 max-w-sm">
              Click on any role to explore key achievements, technologies, and localized metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 items-start">
            {/* Mobile/Tablet Horizontal Tabs (LHS) - Hidden on Desktop */}
            <div className="lg:hidden flex overflow-x-auto gap-2 pb-2.5 scrollbar-none snap-x -mx-6 px-6">
              {jobsData.map((job) => {
                const isActive = expandedJob === job.id;
                
                // Construct compact names for horizontal swipe on mobile
                const compactName = job.company === "Stalcon Solutions Private Limited"
                  ? (job.role.includes("Intern") ? "Stalcon (Intern)" : "Stalcon (Full-Time)")
                  : job.company;

                return (
                  <button
                    key={job.id}
                    onClick={() => { setExpandedJob(job.id); posthog?.capture("experience_job_expanded", { company: job.company, role: job.role }); }}
                    className={`snap-center shrink-0 px-4 py-2.5 rounded-sm border text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer geist-focus ${
                      isActive 
                        ? "bg-gray-1000 text-background-100 border-gray-1000 shadow-raised" 
                        : "bg-background-200 hover:bg-gray-100/60 border-gray-200 text-gray-900"
                    }`}
                  >
                    {compactName}
                  </button>
                );
              })}
            </div>

            {/* Experience Menu list (LHS) - Visible on Desktop */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-3">
              {jobsData.map((job) => {
                const isActive = expandedJob === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => { setExpandedJob(job.id); posthog?.capture("experience_job_expanded", { company: job.company, role: job.role }); }}
                    className={`text-left p-4 rounded-sm border transition-all duration-200 flex gap-4 cursor-pointer geist-focus ${
                      isActive 
                        ? "bg-background-100 border-gray-1000 shadow-raised" 
                        : "bg-background-200 hover:bg-gray-100/60 border-gray-200"
                    }`}
                  >
                    {/* Visual block */}
                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isActive ? "bg-gray-1000 text-background-100" : "bg-gray-300 text-gray-900"
                    }`}>
                      {job.logoText}
                    </div>

                    <div className="grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="label-12-mono font-medium text-gray-700">{job.period}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-700"></span>}
                      </div>
                      <h3 className="heading-16 text-gray-1000 font-semibold truncate mt-1">{job.company}</h3>
                      <p className="label-13 text-gray-900 truncate mt-0.5">{job.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded Role Detail (RHS) */}
            <div className="lg:col-span-7 bg-background-100 border border-gray-200 rounded-sm p-6 shadow-raised flex flex-col gap-6 relative min-h-105">
              {jobsData.map((job) => {
                if (expandedJob !== job.id) return null;
                return (
                  <div key={job.id} className="flex flex-col gap-5 animate-fadeIn">
                    
                    {/* Header info */}
                    <div className="flex flex-col gap-1.5 pb-4 border-b border-gray-200">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="heading-20 text-gray-1000 font-bold">{job.company}</h3>
                        <span className="label-13-mono text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">{job.location}</span>
                      </div>
                      <p className="label-14 font-medium text-blue-700">{job.role}</p>
                      <p className="label-12-mono text-gray-700 mt-0.5">{job.period}</p>
                    </div>

                    {/* Impact Metrics banner */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-background-200 rounded-sm border border-gray-200">
                      {job.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <div className="heading-16 md:heading-20 font-bold text-gray-1000 truncate" title={metric.value}>{metric.value}</div>
                          <div className="label-12 text-gray-700 leading-tight mt-0.5">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Key Contributions */}
                    <div className="flex flex-col gap-2.5">
                      <div className="label-12-mono font-bold tracking-wider text-gray-700 uppercase">Core Contributions</div>
                      <ul className="flex flex-col gap-3">
                        {job.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2.5 items-start">
                            <span className="text-blue-700 font-bold mt-1 shrink-0">
                              <ChevronRight size={14} />
                            </span>
                            <span className="copy-14 text-gray-900 font-normal leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optional Internship Certificate Button */}
                    {job.certificateUrl && (
                      <div className="pt-4 border-t border-gray-200">
                        <a
                          href={job.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => posthog?.capture("certificate_viewed", { company: job.company })}
                          className="geist-focus inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-1000 border border-gray-300 rounded-sm px-4 py-2 text-xs font-semibold shadow-raised transition-colors cursor-pointer"
                        >
                          <ExternalLink size={12} /> View Internship Certificate
                        </a>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS SECTION */}
        <section id="skills" className="scroll-mt-28 flex flex-col gap-6 pt-4 border-t border-gray-200">
          <div className="flex flex-row flex-wrap items-end justify-between gap-4">
            <div>
              <div className="label-12-mono font-medium tracking-wider text-blue-700 uppercase mb-1">Knowledge Base</div>
              <h2 className="heading-32 tracking-tight text-gray-1000 font-bold">Technical Skills</h2>
            </div>

            {/* Skill Search Field */}
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600">
                <Search size={15} />
              </span>
              <input
                ref={skillSearchRef}
                type="text"
                placeholder="Search skills..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="geist-focus-input w-full bg-background-100 text-gray-1000 border border-gray-300 rounded-sm pl-10 pr-8 h-10 label-14 placeholder:text-gray-600 transition-all focus:border-gray-1000 shadow-raised"
              />
              {skillSearch ? (
                <button 
                  onClick={() => setSkillSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-1000 cursor-pointer p-0.5 rounded-sm hover:bg-gray-100"
                >
                  <X size={14} />
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-600 bg-background-200 border border-gray-300 px-1.5 py-0.5 rounded-sm select-none hidden sm:inline shadow-raised">
                  ⌘K
                </span>
              )}
            </div>
          </div>

          {/* Skill Category Filters */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-gray-200">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedSkillCategory(category.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-all duration-150 cursor-pointer ${
                  selectedSkillCategory === category.id
                    ? "bg-gray-1000 text-background-100 shadow-raised"
                    : "text-gray-900 hover:text-gray-1000 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills Grouped Cards Grid */}
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {Object.entries(groupedSkills).map(([catId, skills]) => {
                if (skills.length === 0) return null;
                
                const categoryLabels: Record<string, string> = {
                  languages: "Languages",
                  frontend: "Frontend Development",
                  backend: "Backend Architecture",
                  databases: "Database Management",
                  devops: "DevOps & Cloud Services",
                  tools: "Engineering Tools",
                  core: "Computer Science Core"
                };

                return (
                  <div 
                    key={catId} 
                    className="bg-background-200 dark:bg-background-100 border border-gray-200 rounded-sm p-5 shadow-raised hover:border-gray-400 transition-all flex flex-col gap-4 animate-fadeIn"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                      <h3 className="heading-16 text-gray-1000 font-bold tracking-tight">
                        {categoryLabels[catId] || catId}
                      </h3>
                      <span className="label-12-mono text-gray-700 bg-background-100 border border-gray-300 px-2 py-0.5 rounded-sm font-semibold shadow-raised">
                        {skills.length}
                      </span>
                    </div>

                    {/* Wrapping Pills */}
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => {
                        let badgeColor = "bg-background-100 border-gray-300 text-gray-1000";
                        if (skill.level === "Expert") {
                          badgeColor = "bg-blue-100/70 border-blue-400 text-blue-1000 dark:text-blue-700";
                        } else if (skill.level === "Advanced") {
                          badgeColor = "bg-purple-100/70 border-purple-400 text-purple-1000 dark:text-purple-700";
                        }
                        return (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-medium border ${badgeColor} cursor-default transition-all hover:scale-[1.03] select-none shadow-raised`}
                            title={`${skill.name} - ${skill.level}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              skill.level === 'Expert' 
                                ? 'bg-blue-700' 
                                : skill.level === 'Advanced' 
                                  ? 'bg-purple-700' 
                                  : 'bg-gray-600'
                            }`}></span>
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-600 bg-background-200 border border-gray-200 rounded-sm shadow-raised">
              No matching skills found. Try searching for something else.
            </div>
          )}
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-28 flex flex-col gap-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="label-12-mono font-medium tracking-wider text-blue-700 uppercase mb-1">Production Releases</div>
              <h2 className="heading-32 tracking-tight text-gray-1000 font-bold">Featured Projects</h2>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {projectsData.map((project, idx) => (
                <div 
                  key={idx} 
                  className="bg-background-100 border border-gray-200 hover:border-gray-500 rounded-sm p-6 shadow-raised transition-all duration-300 flex flex-col justify-between group h-full hover:shadow-popover"
                >
                  <div>
                    {/* Top title bar */}
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="heading-24 text-gray-1000 font-bold group-hover:text-blue-700 transition-colors">
                          {project.title}
                        </h3>
                        <span className="w-2 h-2 rounded-full bg-green-700" title="Active"></span>
                      </div>
                      <span className="label-12-mono text-gray-700">{project.period}</span>
                    </div>

                    <p className="label-14 font-medium text-gray-900 mb-4">{project.description}</p>

                    {/* Bullet Achievements */}
                    <ul className="flex flex-col gap-2.5 mb-6">
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-left">
                          <span className="text-gray-600 mt-1 shrink-0">
                            <ChevronRight size={13} />
                          </span>
                          <span className="copy-13 text-gray-900 leading-relaxed font-normal">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footing Tech & Actions */}
                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-gray-200">
                      {project.tech.map((techItem, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="label-12-mono bg-gray-100 border border-gray-300 text-gray-1000 px-2 py-0.5 rounded-sm font-medium"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 w-full">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => posthog?.capture("project_demo_clicked", { project: project.title })}
                        className="geist-focus grow bg-gray-1000 text-background-100 rounded-sm h-9.5 text-center font-medium label-13 flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-all cursor-pointer shadow-raised active:bg-gray-900"
                      >
                        <Globe size={14} /> Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => posthog?.capture("project_github_clicked", { project: project.title })}
                        className="geist-focus bg-background-100 text-gray-1000 border border-gray-400 rounded-sm h-9.5 px-4 font-medium label-13 flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-all cursor-pointer shadow-raised"
                      >
                        <GithubIcon size={14} /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* TECHNICAL WRITING SECTION */}
        <section id="blog" className="scroll-mt-28 flex flex-col gap-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="label-12-mono font-medium tracking-wider text-blue-700 uppercase mb-1">Publications</div>
              <h2 className="heading-32 tracking-tight text-gray-1000 font-bold">Technical Writing</h2>
            </div>
            <a 
              href="https://turborepo.hashnode.dev/build-and-deploy-a-full-stack-monorepo-turborepo-vitereact-fastify-prisma-on-vercel-serverless" 
              target="_blank" 
              rel="noreferrer"
              onClick={() => posthog?.capture("blog_article_read_clicked", { source: "text_link" })}
              className="geist-focus text-sm font-semibold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Read full post on Hashnode <ExternalLink size={14} />
            </a>
          </div>

          {/* Embedded featured article block */}
          <div className="bg-background-200 border border-gray-200 rounded-sm p-6 hover:border-gray-500 shadow-raised transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-2xl pointer-events-none opacity-40"></div>
            
            <div className="flex flex-col gap-4 relative z-10 max-w-212.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="label-12-mono text-purple-1000 bg-purple-100 border border-purple-400 px-2.5 py-0.5 rounded-full font-semibold uppercase whitespace-nowrap">Featured Guide</span>
                <span className="text-gray-400 hidden xs:inline">•</span>
                <span className="label-12 text-gray-900 font-medium whitespace-nowrap">Hashnode Publication</span>
              </div>

              <h3 className="heading-24 text-gray-1000 font-extrabold group-hover:text-blue-700 transition-colors">
                Full-Stack Monorepo Development Guide (Turborepo)
              </h3>

              <p className="copy-14 text-gray-900 font-normal leading-relaxed">
                An exhaustive, production-grade tutorial mapping the creation, management, and continuous serverless delivery of a full-stack monorepo. It details setting up Turborepo containing a React frontend built on Vite, a highly performance-oriented Fastify API, and PostgreSQL databases leveraging Prisma ORM.
              </p>

              {/* Sub items */}
              <div className="flex flex-col gap-2 bg-background-100 border border-gray-300 p-4 rounded-sm">
                <div className="label-12-mono font-bold text-gray-700 uppercase mb-1">Key Learning Outcomes Detailed:</div>
                {[
                  "Setting up Turborepo architecture with cached workspace-level task executions.",
                  "Connecting Vite (React) client with Fastify backend over optimized REST APIs.",
                  "Hosting Serverless deployments and handling DB pooling with Prisma ORM on Vercel."
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center label-13 text-gray-900">
                    <Check size={14} className="text-green-700 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <a
                  href="https://turborepo.hashnode.dev/build-and-deploy-a-full-stack-monorepo-turborepo-vitereact-fastify-prisma-on-vercel-serverless"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => posthog?.capture("blog_article_read_clicked", { source: "button" })}
                  className="geist-focus inline-flex items-center gap-2 bg-gray-1000 hover:bg-gray-800 text-background-100 label-13 font-semibold px-4 py-2.5 rounded-sm transition-all shadow-raised active:bg-gray-900 cursor-pointer"
                >
                  <BookOpen size={15} /> Read Guide
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COMPREHENSIVE EDUCATION SECTION */}
        <section className="flex flex-col gap-6 pt-4 border-t border-gray-200">
          <div>
            <div className="label-12-mono font-medium tracking-wider text-blue-700 uppercase mb-1">Credentials</div>
            <h2 className="heading-32 tracking-tight text-gray-1000 font-bold">Education</h2>
          </div>

          <div className="bg-background-100 border border-gray-200 rounded-sm p-6 shadow-raised flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-300 transition-colors">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-sm bg-blue-100 border border-blue-400 flex items-center justify-center text-blue-700 shrink-0">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="heading-20 text-gray-1000 font-bold">Mahatma Gandhi Institute of Technology</h3>
                <p className="label-14 text-gray-900 font-medium mt-1">B. Tech, Computer Science (CGPA: 8.0 / 10)</p>
                <p className="label-12-mono text-gray-700 mt-0.5">Hyderabad, India</p>
              </div>
            </div>

            <div className="bg-background-200 border border-gray-200 px-4 py-2.5 rounded-sm md:text-right w-full md:w-auto">
              <div className="label-12-mono text-gray-700 font-bold uppercase mb-0.5">Graduation Date</div>
              <div className="label-14 font-semibold text-gray-1000">December 2021 – June 2025</div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="bg-linear-to-br from-gray-1000 via-gray-900 to-primary text-background-100 rounded-sm p-8 md:p-12 shadow-raised text-center flex flex-col items-center gap-5 relative overflow-hidden">
          {/* Subtle line background details */}
          <div className="absolute inset-0 geist-grid opacity-10 pointer-events-none"></div>

          <h2 className="heading-32 md:heading-40 text-background-100 font-extrabold tracking-tight max-w-150 leading-tight relative z-10">
            Let's construct your next software product.
          </h2>
          
          <p className="copy-14 md:copy-16 text-gray-400 max-w-125 leading-relaxed relative z-10">
            Send a direct project briefing or general SDE-1 engineering inquiries. I respond within 24 business hours.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3.5 mt-2 relative z-10">
            <button
              onClick={() => { setIsContactModalOpen(true); posthog?.capture("contact_modal_opened", { source: "cta_section" }); }}
              className="geist-focus bg-background-100 text-gray-1000 hover:bg-gray-100 active:bg-gray-200 rounded-sm h-11 px-6 font-semibold label-14 cursor-pointer shadow-raised flex items-center gap-2"
            >
              <Mail size={16} /> Contact Me
            </button>
            <a
              href="mailto:nithinraj9100@gmail.com"
              className="geist-focus text-background-100 border border-gray-700 hover:border-gray-500 hover:bg-white/5 rounded-sm h-11 px-5 font-semibold label-14 flex items-center justify-center gap-2 cursor-pointer shadow-raised"
            >
              Direct Email
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-background-200 border-t border-gray-200 mt-16 relative z-10">
        <div className="max-w-300 mx-auto px-6 py-12 flex flex-col gap-8 md:gap-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-sm bg-gray-1000 flex items-center justify-center font-mono text-background-100 text-xs font-bold">
                  NR
                </div>
                <span className="heading-16 text-gray-1000 font-bold tracking-tight">Nithin Raj</span>
              </div>
              <p className="label-13 text-gray-900 max-w-sm mt-1 leading-relaxed">
                Software Development Engineer (SDE-1) at Wednesday Solutions. Specialized in high-performance Full-Stack Web Development.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="label-12-mono font-bold uppercase tracking-wider text-gray-700">Get in touch</div>
              <div className="flex flex-col gap-1.5 label-14 text-gray-900">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-600" />
                  <a href="mailto:nithinraj9100@gmail.com" className="hover:text-blue-700 hover:underline">nithinraj9100@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-600" />
                  <button
                    onClick={() => handleCopy("8143632579", "Phone")}
                    className="font-mono hover:text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    8143632579 <Copy size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="label-12 text-gray-600">
              © {new Date().getFullYear()} Nithin Raj.
            </div>
            
            {/* Quick social links */}
            <div className="flex items-center gap-4 label-13 text-gray-900 font-semibold">
              <a
                href="https://github.com/nithin-raj-9100"
                target="_blank"
                rel="noreferrer"
                onClick={() => posthog?.capture("github_profile_clicked", { source: "footer" })}
                className="hover:text-blue-700 hover:underline inline-flex items-center gap-1.5"
              >
                <GithubIcon size={14} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nithin-raj-32311222b/"
                target="_blank"
                rel="noreferrer"
                onClick={() => posthog?.capture("linkedin_profile_clicked", { source: "footer" })}
                className="hover:text-blue-700 hover:underline inline-flex items-center gap-1.5"
              >
                <LinkedinIcon size={14} /> LinkedIn
              </a>
              <a 
                href="https://turborepo.hashnode.dev/build-and-deploy-a-full-stack-monorepo-turborepo-vitereact-fastify-prisma-on-vercel-serverless" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-blue-700 hover:underline inline-flex items-center gap-1.5"
              >
                <BookOpen size={14} /> Hashnode
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* TOAST SYSTEM POPUP */}
      {toast?.show && (
        <div className="fixed bottom-[96px] right-6 bg-gray-1000 text-background-100 rounded-sm px-4 py-3 shadow-dialog z-50 flex items-center justify-between gap-3 min-w-70 border border-gray-700 animate-slideUp">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-600 shrink-0" />
            <span className="label-13 text-background-100 font-medium">{toast.message}</span>
          </div>
          <button 
            onClick={() => setToast((prev) => prev ? { ...prev, show: false } : null)}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsShareModalOpen(false); }}
        >
          <div
            ref={shareModalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Share Portfolio"
            className="bg-background-100 border border-gray-300 rounded-md max-w-md w-full p-4 sm:p-6 shadow-dialog relative animate-modalEnter max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-1000 p-1 rounded-sm hover:bg-gray-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="heading-20 text-gray-1000 font-bold">Share Portfolio</h3>
                <p className="copy-13 text-gray-900 mt-1 leading-relaxed">
                  Copy the direct link to Nithin Raj's digital portfolio or general resume info to share with hiring managers.
                </p>
              </div>

              {/* Share links */}
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Portfolio URL", value: window.location.href },
                  { label: "Contact Email", value: "nithinraj9100@gmail.com" },
                  { label: "LinkedIn Link", value: "https://www.linkedin.com/in/nithin-raj-32311222b/" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="label-12-mono text-gray-700 font-bold uppercase">{item.label}</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={item.value}
                        className="bg-background-200 border border-gray-300 text-gray-1000 rounded-sm text-xs font-mono px-3 py-1.5 grow"
                      />
                      <button
                        onClick={() => { handleCopy(item.value, item.label); posthog?.capture("profile_link_copied", { label: item.label }); }}
                        className="geist-focus bg-gray-100 hover:bg-gray-200 text-gray-1000 border border-gray-400 rounded-sm px-3 h-7.5 label-12 font-medium cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2 mt-2 border-t border-gray-200">
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="geist-focus bg-gray-1000 text-background-100 rounded-sm px-4 h-9 label-13 font-semibold hover:bg-gray-800 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT MODAL FORM */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsContactModalOpen(false); }}
        >
          <div
            ref={contactModalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Send Message"
            className="bg-background-100 border border-gray-300 rounded-md max-w-lg w-full p-4 sm:p-6 shadow-dialog relative animate-modalEnter max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setIsContactModalOpen(false)}
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-1000 p-1 rounded-sm hover:bg-gray-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <h3 className="heading-20 text-gray-1000 font-bold">Send Message</h3>
                <p className="copy-13 text-gray-900 mt-1 leading-relaxed">
                  Briefly explain what you are building. I'll get back to you with architectural notes or resume inquiries.
                </p>
              </div>

              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="label-12-mono text-gray-700 font-bold uppercase">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jake Gutierrez"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="geist-focus w-full bg-background-100 text-gray-1000 border border-gray-300 rounded-sm px-3 h-10 label-14 placeholder:text-gray-600 transition-all focus:border-gray-1000"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="label-12-mono text-gray-700 font-bold uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jake.gutierrez@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="geist-focus w-full bg-background-100 text-gray-1000 border border-gray-300 rounded-sm px-3 h-10 label-14 placeholder:text-gray-600 transition-all focus:border-gray-1000"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <label className="label-12-mono text-gray-700 font-bold uppercase">Project Briefing / Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Project details or hiring inquiries..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="geist-focus w-full bg-background-100 text-gray-1000 border border-gray-300 rounded-sm p-3 label-14 placeholder:text-gray-600 transition-all focus:border-gray-1000 resize-none"
                />
              </div>

              {/* Form buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 mt-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="geist-focus bg-background-100 text-gray-1000 border border-gray-400 rounded-sm px-4 h-9.5 label-13 font-semibold hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="geist-focus bg-gray-1000 hover:bg-gray-800 disabled:bg-gray-500 text-background-100 rounded-sm px-5 h-9.5 label-13 font-semibold cursor-pointer flex items-center gap-1.5 shadow-raised"
                >
                  {isSubmitting ? "Saving…" : "Deploy Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating resume chat widget */}
      <ResumeChat />

    </div>
  );
}

export default App;
