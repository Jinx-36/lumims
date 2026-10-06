import { motion, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { pageContainerClassName } from '../components/layout/PageContainer'
import { Badge } from '../components/ui/Badge'
import { buttonClassName } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Divider } from '../components/ui/Divider'
import { getTopicBySlug } from '../content/curriculum'
import { cn } from '../utils/cn'

const landingCurriculumPreviewSlugs = [
  'photography-basics',
  'mastering-exposure',
  'focus',
  'composition',
  'working-with-light',
  'gh5-photography-settings',
  'video-fundamentals',
  'gh5-video-settings',
] as const

const learningMethod = [
  {
    title: 'Learn the theory',
    description: 'Start with plain-language explanations that make each idea feel useful, not abstract.',
  },
  {
    title: 'Configure the GH5',
    description: 'Connect each concept to the dial, setting, or menu choice on your own camera.',
  },
  {
    title: 'See the visual effect',
    description: 'Understand what changes in the image or footage when you change a setting.',
  },
  {
    title: 'Practice it',
    description: 'Try a focused exercise, then carry the idea into the next time you shoot.',
  },
] as const

function LandingReveal({ children, className }: PropsWithChildren<{ className?: string }>) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function HeroMedia() {
  return (
    <figure className="space-y-3">
      <img
        alt="Photographer composing a landscape photograph with a mirrorless camera at golden hour"
        className="aspect-4/5 w-full rounded-lg border border-border object-cover shadow-2"
        height="1402"
        sizes="(min-width: 1024px) 50vw, 100vw"
        src="/images/hero-photographer.webp"
        width="1122"
      />
      <figcaption className="type-micro text-muted">Learn with an eye on what changes in the frame.</figcaption>
    </figure>
  )
}

function VisualLearningMedia() {
  return (
    <figure className="space-y-3">
      <img
        alt="Hands adjusting a mirrorless camera on a tripod while framing a sunset landscape"
        className="aspect-video w-full rounded-lg border border-border object-cover shadow-2"
        height="941"
        loading="lazy"
        sizes="(min-width: 1024px) 60vw, 100vw"
        src="/images/camera-at-sunset.webp"
        width="1672"
      />
      <figcaption className="text-sm text-muted">Photography lessons will pair clear explanations with visual comparisons.</figcaption>
    </figure>
  )
}

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <section aria-labelledby="hero-title">
        <div className={cn(pageContainerClassName, 'grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-24 lg:py-32')}>
          <LandingReveal className="max-w-2xl space-y-6">
            <Badge variant="accent">Lumix GH5 learning</Badge>
            <h1 className="type-display-1" id="hero-title">
              Understand your camera. <span className="text-accent">Make images with intention.</span>
            </h1>
            <p className="type-lead max-w-xl text-muted">
              Learn photography and video by understanding the idea, applying it on your Lumix GH5, seeing the result, and practicing it yourself.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link className={buttonClassName()} to="/learn">Start learning</Link>
              <Link className={buttonClassName({ variant: 'secondary' })} to="/learn">Browse curriculum</Link>
            </div>
          </LandingReveal>
          <LandingReveal><HeroMedia /></LandingReveal>
        </div>
      </section>

      <section aria-labelledby="audience-title" className="border-y border-border bg-surface-alt">
        <div className={cn(pageContainerClassName, 'grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center')}>
          <div className="space-y-4">
            <p className="type-label text-accent">Built for a clear start</p>
            <h2 className="type-display-2" id="audience-title">Learn the settings, not just the shortcuts.</h2>
          </div>
          <Card className="space-y-5" surface="white">
            <p className="text-muted">Lumims is for people picking up a camera for the first time, or returning to one with questions.</p>
            <Divider />
            <ul className="grid gap-3 text-sm text-foreground sm:grid-cols-2">
              <li>Build confidence from the basics.</li>
              <li>Understand settings instead of copying presets blindly.</li>
              <li>Use the GH5 for photographs and video.</li>
              <li>Practice with ordinary scenes and real camera choices.</li>
            </ul>
          </Card>
        </div>
      </section>

      <section aria-labelledby="method-title">
        <div className={cn(pageContainerClassName, 'py-16 sm:py-24 lg:py-32')}>
          <div className="max-w-2xl space-y-4">
            <p className="type-label text-accent">The Lumims method</p>
            <h2 className="type-display-2" id="method-title">A practical loop for every new skill.</h2>
            <p className="text-muted">Each lesson moves from understanding to a deliberate camera choice, so the next step always has a reason behind it.</p>
          </div>
          <ol className="mt-12 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {learningMethod.map(({ description, title }, index) => (
              <li className="border-b border-border py-6 sm:px-6 sm:odd:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0 lg:not(:last-child):border-r" key={title}>
                <p className="type-label text-accent">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="type-h3 mt-4">{title}</h3>
                <p className="mt-3 text-sm text-muted">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="curriculum-title" className="border-y border-border bg-surface">
        <div className={cn(pageContainerClassName, 'grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start')}>
          <div className="space-y-5 lg:sticky lg:top-8">
            <p className="type-label text-accent">What you will learn</p>
            <h2 className="type-display-2" id="curriculum-title">From first principles to confident GH5 choices.</h2>
            <p className="text-muted">The full curriculum will build photography and video knowledge in a clear, progressive order.</p>
            <Link className={buttonClassName({ variant: 'secondary' })} to="/learn">Explore the curriculum</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {landingCurriculumPreviewSlugs.map((slug, index) => {
              const topic = getTopicBySlug(slug)

              if (!topic) {
                return null
              }

              return (
                <Card className="flex min-h-32 flex-col justify-between" key={topic.id} padding="comfortable">
                  <span className="type-label text-accent">Area {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="type-h3 mt-6">{topic.title}</h3>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="visual-learning-title">
        <div className={cn(pageContainerClassName, 'grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:py-32')}>
          <VisualLearningMedia />
          <div className="space-y-5">
            <p className="type-label text-accent">See the difference</p>
            <h2 className="type-display-2" id="visual-learning-title">Learn to read what your settings change.</h2>
            <p className="text-muted">Photography becomes less mysterious when you can connect aperture, shutter speed, ISO, focus, and light to what you see in the frame.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="progress-title" className="border-y border-border bg-surface-alt">
        <div className={cn(pageContainerClassName, 'grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center')}>
          <div className="space-y-5">
            <p className="type-label text-accent">Learn at your pace</p>
            <h2 className="type-display-2" id="progress-title">Keep your learning connected.</h2>
            <p className="text-muted">Create an account when you are ready to save completed lessons, continue where you stopped, and see your progress across the curriculum.</p>
            <Link className={buttonClassName({ variant: 'secondary' })} to="/signup">Create an account</Link>
          </div>
          <Card className="space-y-5" surface="white">
            <p className="type-label text-accent">Your learning, later</p>
            <Divider />
            <ul className="space-y-3 text-sm text-muted">
              <li>Save lessons when you complete them.</li>
              <li>Return to the next useful lesson.</li>
              <li>See a clear view of your overall progress.</li>
            </ul>
          </Card>
        </div>
      </section>

      <section aria-labelledby="final-cta-title" className="bg-accent text-ivory">
        <div className={cn(pageContainerClassName, 'flex flex-col gap-8 py-16 sm:py-24 lg:flex-row lg:items-end lg:justify-between lg:py-32')}>
          <div className="max-w-3xl space-y-4">
            <p className="type-label text-crimson-tint">Begin with the foundations</p>
            <h2 className="type-display-2" id="final-cta-title">Every confident camera choice starts with understanding.</h2>
            <p className="max-w-xl text-ivory/85">Start with Photography Basics and build from there, one practical lesson at a time.</p>
          </div>
          <Link className={buttonClassName({ variant: 'secondary' })} to="/learn">Start learning</Link>
        </div>
      </section>
    </main>
  )
}
