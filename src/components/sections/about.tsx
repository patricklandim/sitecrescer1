import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { about } from '@/config/content'
import { Eyebrow } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { OrganicShape } from '@/components/ui/organic-shape'

/** Apresentação da clínica, com frase-manifesto que "acende" palavra por palavra durante a rolagem. */
export function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = about.statement.split(' ')

  return (
    <section id="clinica" aria-labelledby="clinica-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>A Clínica Crescer</Eyebrow>
            <h2 id="clinica-title" className="sr-only">
              Sobre a Clínica Crescer
            </h2>
            <p
              ref={ref}
              className="mt-8 font-display text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.03em] text-brand-900 sm:text-5xl lg:text-[3.6rem]"
            >
              {words.map((word, i) =>
                reduce ? (
                  <span key={i}>{word} </span>
                ) : (
                  <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                    {word}
                  </Word>
                ),
              )}
            </p>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:col-span-5 lg:pb-3">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="flex items-center gap-3 pt-2">
              <span className="flex -space-x-2" aria-hidden>
                {['var(--color-sun)', 'var(--color-coral)', 'var(--color-leaf)', 'var(--color-sky)', 'var(--color-grape)', 'var(--color-tangerine)'].map(
                  (c) => (
                    <OrganicShape key={c} shape="seed" color={c} className="size-7 drop-shadow-[0_0_0_var(--color-cream-100)]" />
                  ),
                )}
              </span>
              <span className="text-sm font-semibold text-brand-800">Seis especialidades, um só cuidado</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="relative">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  )
}
