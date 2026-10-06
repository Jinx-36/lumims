# AGENTS.md — Lumims

## 1. Project overview

**Lumims** is a learning website for beginner photographers and videographers who want to understand photography fundamentals and learn how to use a **Panasonic Lumix GH5** confidently.

The experience should feel similar to **W3Schools** in structure: clear navigation, short lessons, progressive topics, practical examples, and visible learning progress. The goal is not to overwhelm the learner with theory. Every important concept should connect back to real camera usage.

The product should help a beginner progress from:

> “I do not understand ISO, shutter speed, aperture, or the GH5 controls.”

into:

> “I can deliberately configure my camera for a situation and understand why I chose those settings.”

The initial camera/lens context is a **Lumix GH5 with a 12–42 mm lens**.

---

## 2. Core product goals

1. Teach photography fundamentals progressively.
2. Teach the Lumix GH5 controls and menu system in practical context.
3. Teach both photography and video.
4. Keep lessons short, visual, and practice-oriented.
5. Allow users to create an account and track their own learning progress.
6. Make it easy to add new topics and lessons without rewriting the application.
7. Provide a polished, editorial, photography-first interface.
8. Keep the codebase simple enough for an AI coding agent and a human learner to maintain.

---

## 3. Technology stack

Use the following stack unless a task explicitly says otherwise:

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Supabase**
- **React Router** for client-side routing

Recommended supporting libraries should be added only when they solve a clear need. Avoid dependency bloat.

---

## 4. Product areas

The initial application contains these main areas:

### Public

- Landing page
- Curriculum/topics overview
- Topic pages
- Lesson pages
- Login
- Sign up

### Authenticated

- User dashboard
- Learning progress
- Completed lessons
- Continue-learning entry point
- Account/profile controls

Future features may include quizzes, bookmarks, achievements, notes, camera presets, and interactive exposure tools, but they are not required for the first version unless listed in `TASKS.md`.

---

## 5. Information architecture

Recommended routes:

```text
/
/learn
/learn/:topicSlug
/learn/:topicSlug/:lessonSlug
/login
/signup
/dashboard
/profile
```

Optional future routes:

```text
/quiz/:quizSlug
/reference
/reference/:slug
/presets
```

Do not create unnecessary pages before they are required.

---

## 6. Content model

Educational content should be separate from UI code.

Use a structured content layer such as:

```text
src/content/
  curriculum.ts
  topics/
    photography-basics/
    gh5-basics/
    aperture/
    ...
```

Each topic should have metadata such as:

```ts
interface Topic {
  id: string
  slug: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}
```

Each lesson should support:

```ts
interface Lesson {
  id: string
  slug: string
  title: string
  summary: string
  order: number
  estimatedMinutes?: number
  sections: LessonSection[]
}
```

Important lessons should eventually follow this pedagogical pattern:

1. **Theory** — explain the concept simply.
2. **GH5 configuration** — show how to apply it on the camera.
3. **Visual example** — demonstrate the effect.
4. **Exercise** — ask the learner to try it.
5. **Key takeaways** — summarize what matters.

Do not hard-code lesson text directly into page components.

---

## 7. Supabase responsibilities

Supabase handles:

- Authentication
- User profiles
- Lesson progress
- Topic progress derived from lesson progress
- Optional future user settings/bookmarks

The educational curriculum itself should remain local/static for the first implementation unless a later task explicitly moves it into Supabase.

Recommended tables:

### `profiles`

```text
id                  uuid primary key references auth.users
username            text nullable
avatar_url           text nullable
created_at           timestamptz
updated_at           timestamptz
```

### `lesson_progress`

```text
id                  uuid primary key
user_id             uuid references auth.users
lesson_id           text
completed           boolean default false
completed_at        timestamptz nullable
last_visited_at     timestamptz
```

Add a unique constraint on:

```text
(user_id, lesson_id)
```

Enable Row Level Security. Users must only be able to read and modify their own profile/progress data.

Never expose the Supabase service-role key in client-side code.

---

## 8. Authentication behavior

Use Supabase Auth.

Initial flow:

- User can browse learning content without authentication.
- User must sign in to persist progress.
- When authenticated, completing a lesson writes progress to Supabase.
- The dashboard shows overall completion, topic completion, recently visited lessons, and a “Continue learning” action.
- When unauthenticated, progress controls may invite the user to sign in instead of failing silently.

Do not block public educational content behind authentication unless a future requirement explicitly changes this.

---

## 9. UI and design rules

`DESIGN.md` is the visual source of truth.

General product feel:

- editorial
- premium but approachable
- warm
- precise
- photography-centered
- spacious
- calm rather than flashy

Use Framer Motion selectively for hierarchy and feedback, not decoration.

Good uses:

- page/section entrance
- subtle card hover feedback
- progress transitions
- expandable lesson navigation
- small navigation state changes

Avoid:

- excessive parallax
- continuous decorative motion
- long blocking animations
- motion that distracts from reading

Respect `prefers-reduced-motion`.

---

## 10. Responsive behavior

The site must work well on:

- mobile
- tablet
- desktop
- large desktop

The learning interface should prioritize readability over density.

On desktop, lesson pages may use:

```text
[left curriculum sidebar] [main lesson content] [optional on-page outline]
```

On small screens, side navigation should collapse into an accessible drawer or compact navigation control.

---

## 11. Accessibility

Minimum expectations:

- Semantic HTML
- Keyboard-accessible navigation
- Visible focus states
- Sufficient text/background contrast
- Accessible labels for controls and forms
- Meaningful image alt text
- Do not communicate status using color alone
- Support reduced motion

Interactive components must work without a mouse.

---

## 12. Code quality rules

When implementing tasks:

1. Read `AGENTS.md`, `DESIGN.md`, `TASKS.md`, and `CONTENT.md` first.
2. Follow the current task; do not implement unrelated future features.
3. Prefer small reusable components over oversized page components.
4. Keep business logic outside presentation components where practical.
5. Use TypeScript types for public component APIs and data models.
6. Avoid `any` unless there is a documented reason.
7. Keep naming explicit and consistent.
8. Remove dead code and unused imports.
9. Do not duplicate constants that belong in shared configuration.
10. Keep Supabase access behind small dedicated helpers/services.
11. Do not commit secrets or `.env` values.
12. Do not silently change the design system.
13. Do not invent curriculum titles when `CONTENT.md` already defines them.

---

## 13. Suggested source structure

```text
src/
  app/
  assets/
  components/
    auth/
    layout/
    learning/
    ui/
  content/
    curriculum.ts
    topics/
  hooks/
  lib/
    supabase/
  pages/
  routes/
  types/
  utils/
```

A reasonable component split may include:

```text
Header
Footer
Hero
TopicCard
LessonSidebar
LessonHeader
LessonSection
ProgressBar
ProgressRing
CompleteLessonButton
ContinueLearningCard
AuthForm
ProtectedRoute
```

This is guidance, not a requirement to create every component immediately.

---

## 14. Environment variables

Use environment variables such as:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Provide an `.env.example` containing variable names only.

Never place secrets in documentation, committed source files, or frontend code.

---

## 15. Definition of done for implementation tasks

A task is complete when:

- The requested behavior works.
- TypeScript builds successfully.
- The page is usable on mobile and desktop.
- Loading, empty, and error states are handled where relevant.
- Accessibility basics are respected.
- Styling follows `DESIGN.md`.
- Content titles and ordering follow `CONTENT.md`.
- Supabase access respects RLS when applicable.
- No unrelated features were added.

---

## 16. Agent workflow

For every meaningful coding task:

1. Inspect the current project state.
2. Read the relevant markdown project files.
3. Identify the smallest coherent implementation.
4. Implement it.
5. Run available lint/type/build checks.
6. Fix errors introduced by the change.
7. Summarize what changed and any remaining blockers.

When a task depends on credentials, external assets, or manual Supabase configuration, implement everything possible locally and clearly document the exact manual step that remains.

## Supabase MCP

The official Supabase MCP server is available to Codex and is scoped to the Lumims project.

Rules:

- Use the Supabase MCP when a task explicitly requires inspecting or modifying Supabase.
- Do not make database changes during unrelated frontend tasks.
- Database schema changes must be represented as version-controlled migrations.
- Prefer `apply_migration` for schema changes instead of ad-hoc DDL through `execute_sql`.
- Never perform destructive database operations unless the current task explicitly requires them.
- Keep manual confirmation enabled for database writes.
- Enable Row Level Security on every user-owned table before exposing it to the client.
- Users must never be able to access another user's private rows.
- Never place a Supabase secret key, service-role key, database password, or access token in frontend code.
- Browser code may only use the project URL and publishable key.
- Never commit `.env.local` or other files containing credentials.
- After schema changes, use Supabase's security advisors when appropriate.
- Generate/update TypeScript database types after the schema becomes stable.
