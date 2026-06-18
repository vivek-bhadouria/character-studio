# Character Studio — Copilot Context Prompt

---

## Project Overview

I'm building **Character Studio** — a B2B tool that lets businesses create custom AI personas (chatbots with a defined personality, tone, and domain knowledge) and deploy them without writing code. Think of it as: a business owner fills out a form (character name, personality traits, tone, knowledge base), and gets a working AI chat assistant that sounds like a specific, consistent character — not a generic ChatGPT wrapper.

**Target audience:** Customer Success / Support teams at Indian B2B SaaS startups who want an AI agent that sounds on-brand, not robotic.

**Current goal:** A working MVP in 21 days (not a polished product). I'm validating whether this is worth pursuing further — so speed and functionality matter more than code elegance right now.

---

## My Technical Background (so you calibrate explanations correctly)

- 12+ years in IT, currently a Digital Operations Manager (MarTech platform ops, not a full-time developer)
- Strong with: HTML/CSS/JS, PHP, MySQL, basic Python
- Rusty (haven't touched in ~3 years): full-stack PHP/Drupal development
- Comfortable reading code and debugging, but I need more hand-holding on:
  - Modern React patterns (hooks, state management)
  - FastAPI specifics (I know Python basics, not this framework)
  - Deployment workflows (Railway, Vercel — first time using both)
  - LLM API integration patterns (prompt engineering basics yes, production patterns no)

**Please explain non-obvious decisions briefly as you suggest code** — not lengthy tutorials, just a sentence on *why* this approach, especially for FastAPI and deployment steps.

---

## Tech Stack (Decided — Please Don't Suggest Alternatives Unless Something Is Broken)

- **Backend:** FastAPI (Python)
- **Frontend:** React (no Next.js, keep it simple)
- **Database:** SQLite (deliberately simple — no Postgres yet, this is a validation MVP)
- **LLM:** Anthropic API (Claude) or OpenAI API — using whichever I've set up in `.env`
- **Backend hosting:** Railway.app
- **Frontend hosting:** Vercel
- **Version control:** GitHub, repo name `character-studio`

---

## How I'm Working — Two AI Collaborators, Different Jobs

I want you to understand the division of labor so we don't duplicate effort:

- **Claude (Anthropic)** is helping me with: strategy, market validation, the 21-day project plan, daily/weekly milestones, feedback synthesis, and go/no-go decisions.
- **You (Copilot)** are helping me with: actual code implementation, debugging, explaining unfamiliar syntax/frameworks, and suggesting code-level solutions to the tasks Claude and I have already planned.

**What this means practically:** When I bring a task to you, it's already been scoped and prioritized. I don't need help deciding *what* to build next — I need help *building* the specific thing on today's task list. If something seems architecturally odd, flag it, but assume the high-level plan is intentional unless I ask for your opinion on it.

---

## The 21-Day Plan (For Your Context — So You Know What's Coming)

**Week 1 (Build):** prompt_builder.py → FastAPI /chat endpoint → React UI skeleton → connect frontend to backend. Goal: a working local prototype, no deployment yet.

**Week 2 (Deploy):** SQLite persistence → deploy backend to Railway → deploy frontend to Vercel → build a demo character → minimal landing page. Goal: a live, shareable URL.

**Week 3 (Show):** No more building — outreach to 5 real people, feedback calls, synthesis, and a decision gate on whether to continue.

I'll tell you which day/task I'm on when I bring you a request. If I say "Day 3 task," you can assume it's the FastAPI /chat endpoint, for example — but I'll always restate the specific task too, so don't assume silently.

---

## How I'd Like You to Help, Day to Day

1. **Give me working code first, explanation second.** I'd rather see a functional snippet and a 2-line "why" than a long explanation before any code.
2. **Default to the simplest working solution**, not the most scalable one. This is a 3-week validation sprint, not production infrastructure.
3. **If I paste an error, assume I want the fix, not a lecture** — unless the same error recurs, in which case please explain the underlying concept so I stop hitting it.
4. **Flag scope creep.** If I ask for something that clearly belongs in a later week (e.g., asking for user auth in Week 1), gently point that out — I have a tendency to over-engineer early.
5. **Keep responses scannable.** I'm doing this in ~1-hour blocks around a full-time job and an MBA, so dense, step-by-step instructions work better than long prose.

---

## Today's Context

*(Update this section at the start of each session)*

- **Today's date:** [DATE]
- **Day number in the 21-day plan:** [DAY X]
- **Today's specific task:** [paste from the plan, e.g., "Day 2 — build prompt_builder.py"]
- **What I've already done / current state of the code:** [brief note or paste relevant files]
- **Where I'm stuck or what I need:** [your actual question]

---

*This file should stay in the repo for the full 21 days. If priorities shift significantly (e.g., I decide to pivot or extend the timeline), I'll update this document and let you know.*
