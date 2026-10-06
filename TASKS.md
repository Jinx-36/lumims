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
- [ ] Add utility for composing class names only if needed.
- [x] Ensure no page depends on authentication yet.

---

# Phase 3 — Implement the design system

- [ ] Load Gloock and Montserrat.
- [ ] Add Lumims color tokens to Tailwind.
- [ ] Add font-family tokens.
- [ ] Add radius tokens.
- [ ] Add shadow tokens.
- [ ] Add global body/background/text styles.
- [ ] Add consistent focus-visible styles.
- [ ] Create base UI components as needed:
  - [ ] Button
  - [ ] Card
  - [ ] Badge
  - [ ] Input
  - [ ] Progress bar
  - [ ] Divider
- [ ] Validate mobile and desktop spacing against `DESIGN.md`.

---

# Phase 4 — Global layout and navigation

- [ ] Build responsive header.
- [ ] Add Lumims wordmark/text logo placeholder.
- [ ] Add primary navigation:
  - [ ] Home
  - [ ] Learn
- [ ] Add authentication action area:
  - [ ] Log in when signed out
  - [ ] Dashboard/profile access when signed in
- [ ] Build responsive mobile navigation.
- [ ] Build footer.
- [ ] Add subtle motion for menu/navigation state changes.

Do not spend time on a final custom logo yet unless a dedicated logo task is added later.

---

# Phase 5 — Landing page

Build `/`.

- [ ] Hero section explaining what Lumims is.
- [ ] Primary CTA: **Start learning**.
- [ ] Secondary CTA: browse curriculum.
- [ ] Explain who Lumims is for.
- [ ] Explain the learning method:
  - [ ] Learn the theory
  - [ ] Configure it on the GH5
  - [ ] See the visual effect
  - [ ] Practice it
- [ ] Preview major curriculum areas.
- [ ] Add photography/video imagery placeholders with correct aspect ratios.
- [ ] Explain user progress/account benefits.
- [ ] Add final CTA section.
- [ ] Make layout responsive.
- [ ] Add restrained Framer Motion entrance effects.
- [ ] Respect reduced-motion preferences.

---

# Phase 6 — Build the curriculum data layer

- [ ] Translate the curriculum in `CONTENT.md` into structured TypeScript data.
- [ ] Assign stable IDs to every topic and lesson.
- [ ] Assign URL-safe slugs.
- [ ] Preserve the exact topic order from `CONTENT.md`.
- [ ] Preserve lesson ordering within each topic.
- [ ] Add short topic descriptions.
- [ ] Add estimated lesson times where useful.
- [ ] Create helper functions:
  - [ ] get all topics
  - [ ] get topic by slug
  - [ ] get lesson by slug
  - [ ] get previous lesson
  - [ ] get next lesson
  - [ ] get lesson index / total

---

# Phase 7 — Learn overview

Build `/learn`.

- [ ] Page introduction.
- [ ] Display all topics in curriculum order.
- [ ] Show lesson count per topic.
- [ ] Show progress per topic when authenticated.
- [ ] Show no fake progress when logged out.
- [ ] Add topic cards with clear navigation.
- [ ] Add a “Continue learning” module when progress exists.
- [ ] Ensure layout remains easy to scan with 26 topics.

---

# Phase 8 — Topic page

Build `/learn/:topicSlug`.

- [ ] Topic title and description.
- [ ] Ordered lesson list.
- [ ] Lesson completion states.
- [ ] Topic progress indicator.
- [ ] Start/continue topic CTA.
- [ ] Handle unknown topic slug.
- [ ] Make the page useful to unauthenticated users too.

---

# Phase 9 — Lesson page framework

Build `/learn/:topicSlug/:lessonSlug`.

- [ ] Desktop curriculum sidebar.
- [ ] Mobile curriculum navigation/drawer.
- [ ] Lesson breadcrumb.
- [ ] Lesson title.
- [ ] Lesson position indicator.
- [ ] Lesson body renderer.
- [ ] Reusable content blocks:
  - [ ] Paragraph/text section
  - [ ] Image/media block
  - [ ] Theory block
  - [ ] GH5 setup block
  - [ ] Tip block
  - [ ] Warning block
  - [ ] Exercise block
  - [ ] Key takeaways block
- [ ] Previous lesson action.
- [ ] Next lesson action.
- [ ] Complete lesson action.
- [ ] Handle invalid lesson/topic combinations.

---

# Phase 10 — Write the first real lessons

Do not attempt all 26 topics at once.

Create a complete vertical slice first.

- [ ] Topic 1 — Photography Basics
  - [ ] What Is Photography?
  - [ ] How a Camera Works
  - [ ] Understanding Light
  - [ ] Exposure Explained
  - [ ] The Exposure Triangle
  - [ ] Understanding Stops
- [ ] Add useful diagrams/image placeholders.
- [ ] Add practical exercises.
- [ ] Validate the lesson content model against these six lessons.
- [ ] Adjust the content schema only if needed before scaling further.

---

# Phase 11 — Supabase project integration

- [ ] Create Supabase client wrapper.
- [ ] Read env variables safely.
- [ ] Add clear error for missing Supabase configuration in development.
- [ ] Create `profiles` table.
- [ ] Create `lesson_progress` table.
- [ ] Add unique `(user_id, lesson_id)` constraint.
- [ ] Enable RLS.
- [ ] Add policies allowing users to access only their own rows.
- [ ] Add profile creation strategy after signup.
- [ ] Document required SQL/migrations in the repository.

---

# Phase 12 — Authentication

- [ ] Add auth provider/context or equivalent state layer.
- [ ] Support session restoration.
- [ ] Build `/login`.
- [ ] Build `/signup`.
- [ ] Add validation and error states.
- [ ] Add loading state while auth session resolves.
- [ ] Add logout.
- [ ] Redirect authenticated users away from unnecessary login/signup screens when appropriate.
- [ ] Keep `/learn` and lesson pages public.

Optional later:

- [ ] Password reset.
- [ ] OAuth providers.

Do not add optional providers until the base email/password flow works.

---

# Phase 13 — Progress tracking

- [ ] Load authenticated user's lesson progress.
- [ ] Mark lesson complete.
- [ ] Allow a completed lesson to be marked incomplete if desired.
- [ ] Save `last_visited_at` when appropriate.
- [ ] Update UI immediately with safe optimistic behavior or a clear loading state.
- [ ] Handle Supabase errors without losing navigation.
- [ ] Calculate topic completion from lesson completion.
- [ ] Calculate overall curriculum progress.
- [ ] Keep local content IDs stable so saved progress does not break.

---

# Phase 14 — Dashboard

Build `/dashboard`.

- [ ] Protect route for authenticated users.
- [ ] Overall progress summary.
- [ ] Continue learning card.
- [ ] Topic progress list.
- [ ] Recently visited lessons.
- [ ] Completed lessons count.
- [ ] Empty state for a new user.
- [ ] Link back into learning content.

Keep the dashboard calm and educational, not gamified.

---

# Phase 15 — Profile/account

Build `/profile`.

- [ ] Display account email.
- [ ] Optional username editing.
- [ ] Optional avatar placeholder/support.
- [ ] Save profile changes to Supabase.
- [ ] Logout action.
- [ ] Clear success/error states.

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
