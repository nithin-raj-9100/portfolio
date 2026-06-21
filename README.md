# nithinraj.tech — Personal Portfolio

Production portfolio of **Nithin Raj**, SDE-1 at Wednesday Solutions. Built with React, Vite, and TailwindCSS. Features an AI-powered resume chat backed by Google Gemma.

**Live:** [nithinraj.tech](https://nithinraj.tech)

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, Geist design tokens |
| AI Chat | AI SDK (Vercel), Google Gemma (`gemma-4-31b-it`) |
| Markdown | Streamdown (streaming-optimized renderer) |
| Analytics | PostHog |
| Deployment | Vercel (edge functions) |

---

## Features

- **AI Resume Chat** — floating widget that answers questions about experience, skills, and projects using a Gemma model with reasoning traces
- **Dark / Light / System theme** — persisted to localStorage
- **Resume download** — PDF served from `/public/resume.pdf`
- **Contact form** — powered by FormSubmit, no backend required
- **Accessible modals** — focus trap, `role="dialog"`, Escape to close
- **Keyboard shortcut** — `⌘K` / `Ctrl+K` focuses the skills search
- **Scroll-aware nav** — active section tracked via IntersectionObserver
- **SEO** — Open Graph, Twitter Card, canonical URL

---

## Project Structure

```
├── api/
│   └── chat.ts          # Edge function — AI resume chat handler
├── public/
│   └── resume.pdf       # Downloadable resume
└── src/
    ├── App.tsx           # Main page (all sections)
    ├── components/
    │   └── ResumeChat.tsx
    └── index.css         # Geist design tokens + Tailwind
```

---

## Local Development

```bash
npm install
npm run dev
```

The AI chat requires a Google AI API key:

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

---

## Deployment

Deployed on Vercel. Every push to `main` triggers a production deployment automatically.

The `api/chat.ts` edge function runs on Vercel's edge runtime — no cold starts.
