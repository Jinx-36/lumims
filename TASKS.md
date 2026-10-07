# TASKS.md — Lumims Implementation Roadmap

This file is the implementation order for the first complete version of Lumims.

Complete tasks in sequence unless a dependency clearly requires a different order. Do not implement later phases early unless the current task explicitly requires them.

---

# Phase 0 — Project decisions

- [x] Confirm project name: **Lumims**.
- [x] Use React + TypeScript + Vite.
- [x] Use Tailwind CSS for styling.
- [x] Use Framer Motion for restrained UI motion.
- [x] Use Supabase for authentication and progress persistence.
- [x] Use React Router for routes.
- [x] Keep lesson/course content local in the repository for v1.
- [x] Keep authenticated user state/progress in Supabase.

---

# Phase 1 — Bootstrap the application

- [x] Create the Vite React TypeScript project.
- [x] Install application dependencies.
- [x] Configure Tailwind CSS.
- [x] Install Framer Motion.
- [x] Install Supabase JavaScript client.
- [x] Install React Router.
- [x] Add `.env.example` with Supabase variable names only.
- [x] Add basic lint/type/build scripts.
- [x] Verify the blank project builds successfully.

Suggested initial dependencies:

```text
react
react-dom
react-router-dom
framer-motion
@supabase/supabase-js
```

Add an icon library only when the UI first requires icons.

---

# Phase 2 — Project foundations

- [x] Create the source folder structure described in `AGENTS.md`.
- [x] Add shared TypeScript types for Topic, Lesson, and lesson progress.
- [x] Add route configuration.
- [x] Add application shell.
- [x] Add a reusable page/container layout.
- [x] Add error/not-found route.
- [x] Add utility for composing class names only if needed.
- [x] Ensure no page depends on authentication yet.

---

# Phase 3 — Implement the design system

- [x] Load Gloock and Montserrat.
- [x] Add Lumims color tokens to Tailwind.
- [x] Add font-family tokens.
- [x] Add radius tokens.
- [x] Add shadow tokens.
- [x] Add global body/background/text styles.
- [x] Add consistent focus-visible styles.
- [x] Create base UI components as needed:
  - [x] Button
  - [x] Card
  - [x] Badge
  - [x] Input
  - [x] Progress bar
  - [x] Divider
- [x] Validate mobile and desktop spacing against `DESIGN.md`.

---

# Phase 4 — Global layout and navigation

- [x] Build responsive header.
- [x] Add Lumims wordmark/text logo placeholder.
- [x] Add primary navigation:
  - [x] Home
  - [x] Learn
- [x] Add authentication action area:
  - [x] Log in when signed out
  - [x] Dashboard/profile access when signed in
- [x] Build responsive mobile navigation.
- [x] Build footer.
- [x] Add subtle motion for menu/navigation state changes.

Do not spend time on a final custom logo yet unless a dedicated logo task is added later.

---

# Phase 5 — Landing page

Build `/`.

- [x] Hero section explaining what Lumims is.
- [x] Primary CTA: **Start learning**.
- [x] Secondary CTA: browse curriculum.
- [x] Explain who Lumims is for.
- [x] Explain the learning method:
  - [x] Learn the theory
  - [x] Configure it on the GH5
  - [x] See the visual effect
  - [x] Practice it
- [x] Preview major curriculum areas.
- [x] Add photography/video imagery placeholders with correct aspect ratios.
- [x] Explain user progress/account benefits.
- [x] Add final CTA section.
- [x] Make layout responsive.
- [x] Add restrained Framer Motion entrance effects.
- [x] Respect reduced-motion preferences.

---

# Phase 6 — Build the curriculum data layer

- [x] Translate the curriculum in `CONTENT.md` into structured TypeScript data.
- [x] Assign stable IDs to every topic and lesson.
- [x] Assign URL-safe slugs.
- [x] Preserve the exact topic order from `CONTENT.md`.
- [x] Preserve lesson ordering within each topic.
- [x] Add short topic descriptions.
- [x] Add estimated lesson times where useful.
- [x] Create helper functions:
  - [x] get all topics
  - [x] get topic by slug
  - [x] get lesson by slug
  - [x] get previous lesson
  - [x] get next lesson
  - [x] get lesson index / total

---

# Phase 7 — Learn overview

Build `/learn`.

- [x] Page introduction.
- [x] Display all topics in curriculum order.
- [x] Show lesson count per topic.
- [x] Show progress per topic when authenticated.
- [x] Show no fake progress when logged out.
- [x] Add topic cards with clear navigation.
- [x] Add a “Continue learning” module when progress exists.
- [x] Ensure layout remains easy to scan with 26 topics.

---

# Phase 8 — Topic page

Build `/learn/:topicSlug`.

- [x] Topic title and description.
- [x] Ordered lesson list.
- [x] Lesson completion states.
- [x] Topic progress indicator.
- [x] Start/continue topic CTA.
- [x] Handle unknown topic slug.
- [x] Make the page useful to unauthenticated users too.

---

# Phase 9 — Lesson page framework

Build `/learn/:topicSlug/:lessonSlug`.

- [x] Desktop curriculum sidebar.
- [x] Mobile curriculum navigation/drawer.
- [x] Lesson breadcrumb.
- [x] Lesson title.
- [x] Lesson position indicator.
- [x] Lesson body renderer.
- [x] Reusable content blocks:
  - [x] Paragraph/text section
  - [x] Image/media block
  - [x] Theory block
  - [x] GH5 setup block
  - [x] Tip block
  - [x] Warning block
  - [x] Exercise block
  - [x] Key takeaways block
- [x] Previous lesson action.
- [x] Next lesson action.
- [x] Complete lesson action.
- [x] Handle invalid lesson/topic combinations.

---

# Phase 10 — Write the first real lessons

Do not attempt all 26 topics at once.

Create a complete vertical slice first.

- [x] Topic 1 — Photography Basics
  - [x] What Is Photography?
  - [x] How a Camera Works
  - [x] Understanding Light
  - [x] Exposure Explained
  - [x] The Exposure Triangle
  - [x] Understanding Stops
- [x] Add useful diagrams/image placeholders.
- [x] Add practical exercises.
- [x] Validate the lesson content model against these six lessons.
- [x] Adjust the content schema only if needed before scaling further.

---

# Phase 11 — Supabase project integration

- [x] Create Supabase client wrapper.
- [x] Read env variables safely.
- [x] Add clear error for missing Supabase configuration in development.
- [x] Create `profiles` table.
- [x] Create `lesson_progress` table.
- [x] Add unique `(user_id, lesson_id)` constraint.
- [x] Enable RLS.
- [x] Add policies allowing users to access only their own rows.
- [x] Add profile creation strategy after signup.
- [x] Document required SQL/migrations in the repository.

---

# Phase 12 — Authentication

- [x] Add auth provider/context or equivalent state layer.
- [x] Support session restoration.
- [x] Build `/login`.
- [x] Build `/signup`.
- [x] Add validation and error states.
- [x] Add loading state while auth session resolves.
- [x] Add logout.
- [x] Redirect authenticated users away from unnecessary login/signup screens when appropriate.
- [x] Keep `/learn` and lesson pages public.

Optional later:

- [x] Password reset.
- [x] OAuth providers.

Do not add optional providers until the base email/password flow works.

---

# Phase 13 — Progress tracking

- [x] Load authenticated user's lesson progress.
- [x] Mark lesson complete.
- [x] Allow a completed lesson to be marked incomplete if desired.
- [x] Save `last_visited_at` when appropriate.
- [x] Update UI immediately with safe optimistic behavior or a clear loading state.
- [x] Handle Supabase errors without losing navigation.
- [x] Calculate topic completion from lesson completion.
- [x] Calculate overall curriculum progress.
- [x] Keep local content IDs stable so saved progress does not break.

---

# Phase 14 — Dashboard

Build `/dashboard`.

- [x] Protect route for authenticated users.
- [x] Overall progress summary.
- [x] Continue learning card.
- [x] Topic progress list.
- [x] Recently visited lessons.
- [x] Completed lessons count.
- [x] Empty state for a new user.
- [x] Link back into learning content.

Keep the dashboard calm and educational, not gamified.

---

# Phase 15 — Profile/account

Build `/profile`.

- [x] Display account email.
- [x] Optional username editing.
- [x] Optional avatar placeholder/support.
- [x] Save profile changes to Supabase.
- [x] Logout action.
- [x] Clear success/error states.

Do not add account deletion or complex settings until requested.

---

# Phase 16 — Scale lesson content

After the first topic and full app workflow are stable, add the remaining curriculum in batches.

Suggested batches:

- [ ] Batch A — Camera + exposure fundamentals
  - [ ] Topics 2–7
- [ ] Batch B — Focus, color, files, composition, light
  - [ ] Topics 8–12
- [ ] Batch C — GH5 photography + practical situations
  - [ ] Topics 13–14
- [ ] Batch D — Video fundamentals + GH5 video
  - [ ] Topics 15–18
- [ ] Batch E — Stabilization, audio, movement, advanced GH5
  - [ ] Topics 19–22
- [ ] Batch F — Presets, workflow, projects, reference
  - [ ] Topics 23–26

For each lesson:

- [ ] Simple explanation
- [ ] Practical context
- [ ] GH5 instructions where relevant
- [ ] Visual example placeholder/reference
- [ ] Exercise where useful
- [ ] Key takeaways

---

# Phase 17 — Curriculum navigation refinement

- [ ] Search/filter lessons if the full curriculum becomes difficult to navigate.
- [ ] Add collapsible topic sections in the lesson sidebar.
- [ ] Auto-expand the current topic.
- [ ] Keep current lesson clearly visible.
- [ ] Add completed-state indicator.
- [ ] Ensure keyboard navigation works.
- [ ] Persist only UI state that is genuinely useful.

---

# Phase 18 — Reference experience

Use Topic 26 as the first reference hub.

- [ ] Photography glossary.
- [ ] Exposure cheat sheet.
- [ ] Aperture cheat sheet.
- [ ] Shutter-speed cheat sheet.
- [ ] ISO cheat sheet.
- [ ] GH5 button reference.
- [ ] GH5 menu reference.
- [ ] Recommended-settings reference.

Reference content should be scannable and link back to full lessons.

---

# Phase 19 — Quality and accessibility pass

- [ ] Keyboard-test all major flows.
- [ ] Check focus visibility.
- [ ] Check form labels/errors.
- [ ] Check heading hierarchy.
- [ ] Check image alt text.
- [ ] Check color contrast.
- [ ] Check reduced motion.
- [ ] Check mobile navigation.
- [ ] Check long lesson readability.
- [ ] Check loading states.
- [ ] Check Supabase error states.
- [ ] Check 404 behavior.

---

# Phase 20 — Performance pass

- [ ] Lazy-load lesson media where useful.
- [ ] Optimize image sizes/formats.
- [ ] Avoid unnecessary large JS dependencies.
- [ ] Avoid re-fetching progress excessively.
- [ ] Code-split routes if beneficial.
- [ ] Validate production build.
- [ ] Check Lighthouse-style performance/accessibility issues.

---

# Phase 21 — SEO and metadata

- [ ] Add meaningful page titles.
- [ ] Add meta descriptions for landing/learn/topic pages.
- [ ] Add Open Graph defaults.
- [ ] Add favicon placeholder.
- [ ] Add canonical handling if required by deployment.
- [ ] Add robots/sitemap strategy after deployment URL exists.

---

# Phase 22 — Testing

Start with high-value behavior.

- [ ] Curriculum helpers.
- [ ] Previous/next lesson resolution.
- [ ] Progress calculations.
- [ ] Auth-dependent UI states.
- [ ] Complete lesson flow.
- [ ] Invalid slug handling.

Add broader test tooling only when the project complexity justifies it.

---

# Phase 23 — Deployment readiness

- [ ] Production build succeeds.
- [ ] Environment variables documented.
- [ ] Supabase production URL/key configured on hosting platform.
- [ ] Supabase auth redirect URLs configured.
- [ ] SPA route fallback works.
- [ ] No secret keys are committed.
- [ ] RLS verified in production project.
- [ ] README contains local setup instructions.

---

# Phase 24 — Post-v1 ideas

Do not implement these during v1 unless explicitly requested.

- [ ] Lesson quizzes
- [ ] Topic quizzes
- [ ] Interactive exposure triangle simulator
- [ ] Camera-setting simulator
- [ ] Bookmark lessons
- [ ] Personal notes
- [ ] Photography challenges
- [ ] Achievement system
- [ ] Search across lesson content
- [ ] User-created camera presets
- [ ] Multiple camera bodies/lenses
- [ ] Admin/CMS for content editing
- [ ] Community features
- [ ] Multilingual content
- [ ] Offline/PWA support
