import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export const config = { runtime: 'edge' };

// Resume context distilled from main.tex — the only ground truth for the chatbot
const RESUME_CONTEXT = `
NAME: Nithin Raj
EMAIL: nithinraj9100@gmail.com | PHONE: 8143632579
LinkedIn: https://www.linkedin.com/in/nithin-raj-32311222b/
GitHub: https://github.com/nithin-raj-9100

--- EDUCATION ---
Mahatma Gandhi Institute of Technology, Hyderabad, India
B. Tech, Computer Science | CGPA: 8.0 | December 2021 – June 2025

--- TECHNICAL SKILLS ---
Languages: JavaScript/TypeScript, Python, Java, SQL, HTML5/CSS3
Frontend: React, Next.js, Tailwind CSS, Redux, Responsive Design, Vite
Backend: Node.js, Fastify, Express.js, Prisma, REST APIs
Databases: PostgreSQL, MySQL, MongoDB, Redis, DiceDB
DevOps & Cloud: Docker, Git/GitHub, CI/CD Pipelines, Vercel, Supabase, Turborepo, Serverless Deployment
Tools: Prisma ORM, Jira, GitLab, IntelliJ, Postman, GitHub Actions, SSH, Certbot, Cloudinary
Core Concepts: Data Structures & Algorithms, DBMS, System Design, OOPS, Microservices Architecture, Monorepo Management

--- PROFESSIONAL EXPERIENCE ---

1. Wednesday Solutions — Software Development Engineer 1 (SDE-1)
   Pune, India | March 2026 – Present
   - Built an AI-powered internal platform to manage and monitor project health across the organization, consolidating DORA metrics, NPS scores, project status, and team rankings into a unified dashboard.
   - Engineered automated bi-weekly sprint reporting workflows using n8n, delivering AI-generated project health summaries to managers across all active projects and enabling proactive risk identification at scale.
   - Integrated an AI layer to analyze cross-project data and surface actionable insights, reducing manual status-tracking overhead for engineering leads and stakeholders.

2. Stalcon Solutions Private Limited — Backend Developer (Full-Time)
   Remote | October 2025 – February 2026
   - Transitioned to a full-time role following a successful internship, taking ownership of backend architecture and API development.
   - Led development across multiple concurrent projects including Amealio and SkillStride (learning platform), ensuring scalable and modular codebases.
   - Collaborated with cross-functional teams to design and implement robust server-side logic using Node.js, Fastify, and Prisma ORM.
   - Optimized database schemas and query performance in PostgreSQL to support increasing user traffic and data complexity.

3. Stalcon Solutions Private Limited — Backend Developer Intern
   Remote | July 2025 – September 2025
   - Contributed to the backend of a production-ready learning platform built with NestJS and MongoDB, focusing on modular, secure, and scalable server architecture.
   - Assisted in the migration of legacy components to modern backend architectures, improving maintainability and developer velocity.
   - Participated in regular code reviews and technical knowledge transfer sessions to align with industry best practices.

4. EazyByts Web Solutions — Web Developer Intern
   Remote | August 2024 – February 2025
   - Completed a comprehensive 7-month internship program, gaining hands-on experience in full-stack development.
   - Developed a feature-rich Stock Market Dashboard using React, HTML5, CSS3, and JavaScript with real-time data integration.
   - Implemented interactive portfolio management system with performance tracking and data visualization components.
   - Designed responsive UI/UX ensuring cross-device compatibility and optimal user experience across multiple screen sizes.

--- PROJECTS ---

1. CartVerse | Full-Stack E-Commerce Platform
   January 2025 | Live: https://cartverse.vercel.app/ | GitHub: https://github.com/nithin-raj-9100/cartverse
   - Built a production-ready e-commerce platform using React (Vite), TailwindCSS, TanStack Query, and Framer Motion.
   - Architected scalable backend with Fastify, PostgreSQL (Supabase), and Prisma ORM following MVC architecture.
   - Implemented secure JWT-based authentication using Lucia Auth with session management and role-based access control.

2. Airbnb Clone | Hotel Booking Platform
   April 2023 – August 2023 | Live: https://airbnb-nithinraj.vercel.app/ | GitHub: https://github.com/nithin-raj-9100/airbnb
   - Developed a comprehensive hotel booking platform with multi-authentication (Google, GitHub) and advanced filtering.
   - Implemented conflict prevention system for reservations using database constraints and real-time availability checking.

--- TECHNICAL WRITING ---
"Full-Stack Monorepo Development Guide"
Published on Hashnode: https://turborepo.hashnode.dev/build-and-deploy-a-full-stack-monorepo-turborepo-vitereact-fastify-prisma-on-vercel-serverless
- Authored comprehensive technical guide covering modern monorepo setup with Turborepo, Vite/React, Fastify, and Prisma.
`.trim();

const SYSTEM_PROMPT = `You are an AI assistant embedded in Nithin Raj's portfolio website. Your sole purpose is to answer questions about Nithin's professional background, skills, experience, education, and projects using ONLY the resume context provided below.

Rules you must follow:
1. ONLY answer questions that are directly related to Nithin's resume, professional background, skills, or experience.
2. If a question is unrelated to Nithin's resume (e.g., general knowledge questions, coding help for the user, math problems, jokes, trivia, opinions on other people, etc.), politely decline with: "I can only answer questions about Nithin's professional background and experience. Feel free to ask me about his skills, projects, or work history!"
3. Never invent, speculate, or add facts that are not present in the resume context. If something isn't mentioned, say so.
4. Keep answers concise and professional. Markdown formatting is allowed and encouraged for clarity.
5. You may use a friendly, conversational tone while remaining professional.

${RESUME_CONTEXT}`;

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let messages: UIMessage[];
  try {
    const body = await request.json() as { messages?: UIMessage[] };
    messages = body.messages ?? [];
    if (!messages.length) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Guard: reject oversized payloads (>50 messages)
    if (messages.length > 50) {
      return new Response(JSON.stringify({ error: 'Too many messages' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = streamText({
    model: google('gemma-4-31b-it'),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    maxTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
}
