export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  bio: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  cgpa: string;
  location: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  type: string;
  description: string[];
}

export interface Project {
  name: string;
  duration: string;
  description: string;
  technologies: string[];
  features: string[];
  links: {
    website?: string;
    github?: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Blog {
  title: string;
  platform: string;
  description: string;
  link?: string;
}

export interface ProfileData {
  personal: PersonalInfo;
  education: Education;
  experience: Experience;
  projects: Project[];
  skills: SkillCategory[];
  blog: Blog;
}

export const profileData: ProfileData = {
  personal: {
    name: "NITHIN RAJ",
    email: "nithinraj9100@gmail.com",
    phone: "8143632579",
    linkedin: "https://www.linkedin.com/in/nithin-raj-32311222b/",
    github: "https://github.com/nithin-raj-9100/",
    bio: "Passionate Full-Stack Developer with expertise in modern web technologies. Currently pursuing B.Tech in Computer Science with hands-on experience in building scalable applications using React, Next.js, and Node.js. Committed to writing clean, efficient code and creating exceptional user experiences.",
  },

  education: {
    institution: "Mahatma Gandhi Institute of Technology",
    degree: "B.Tech",
    field: "Computer Science",
    duration: "December 2021 - Present",
    cgpa: "7.87",
    location: "Hyderabad, India",
  },

  experience: {
    company: "EazyByts Web Solutions",
    role: "Web Developer Intern",
    duration: "August 2024 – February 2025",
    type: "Remote, 7-month internship with certification",
    description: [
      "Completed a comprehensive 7-month internship program with official certification",
      "Developed a Stock Market Dashboard project using full-stack technologies (HTML, CSS, JavaScript, React)",
      "Implemented interactive features including real-time stock monitoring, portfolio management, and performance tracking",
      "Created responsive UI/UX design ensuring compatibility across multiple devices and screen sizes",
      "Integrated external APIs for fetching live stock market data and implemented data visualization components",
    ],
  },

  projects: [
    {
      name: "CartVerse",
      duration: "Jan 2025",
      description:
        "E-Commerce Platform - A full-stack e-commerce platform with modern architecture and seamless user experience",
      technologies: [
        "React",
        "Vite",
        "TailwindCSS",
        "TanStack Query",
        "Framer Motion",
        "Fastify",
        "PostgreSQL",
        "Prisma ORM",
        "Lucia Auth",
      ],
      features: [
        "Built with React (Vite), TailwindCSS, TanStack Query, and Framer Motion",
        "Architected backend with Fastify, PostgreSQL (Supabase), and Prisma ORM",
        "Implemented secure authentication via Lucia Auth using JWT-based session management",
        "Integrated Supabase Storage Buckets for managing product images with signed URLs",
        "Deployed frontend on Vercel and backend as Vercel serverless functions",
      ],
      links: {
        website: "https://cartverse.vercel.app",
        github: "https://github.com/nithin-raj-9100/cartverse",
      },
    },
    {
      name: "Airbnb Clone",
      duration: "April 2023 – August 2023",
      description:
        "Hotel Booking Platform - A scalable booking platform with advanced features and multi-authentication",
      technologies: [
        "Next.js",
        "React",
        "Supabase",
        "Cloudinary",
        "TailwindCSS",
      ],
      features: [
        "Developed a scalable hotel booking platform with advanced features",
        "Multi-authentication, reservation conflict prevention, and filtering options",
        "Integrated Cloudinary for seamless image uploads and optimized image load time by 30%",
        "Deployed on Vercel and managed database with Supabase",
      ],
      links: {
        website: "https://airbnb-nithinraj.vercel.app/",
        github: "https://github.com/nithin-raj-9100/airbnb",
      },
    },
  ],

  skills: [
    {
      category: "Languages",
      skills: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "SQL",
        "HTML5",
        "CSS3",
      ],
    },
    {
      category: "Frontend",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Redux",
        "Responsive Design",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Fastify", "Prisma", "REST APIs", "Lucia Auth"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DiceDB", "Supabase"],
    },
    {
      category: "DevOps & Tools",
      skills: [
        "Docker",
        "Git/GitHub",
        "CI/CD Pipelines",
        "Vercel",
        "Turborepo",
        "Postman",
      ],
    },
    {
      category: "Core Concepts",
      skills: [
        "Data Structures & Algorithms",
        "DBMS",
        "System Design",
        "OOPS",
        "Microservices",
        "Serverless",
      ],
    },
  ],

  blog: {
    title: "Build and Deploy a Full-Stack Monorepo with Turborepo",
    platform: "Hashnode",
    description:
      "An in-depth technical guide detailing the setup, configuration, and deployment of a modern full-stack monorepo using Turborepo, Vite/React, Fastify, Prisma, and Vercel Serverless functions.",
    link: "https://hashnode.com/@nithinraj",
  },
};
