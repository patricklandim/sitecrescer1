import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { manifesto } from '@/config/content'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'
import { Sprout } from '@/components/ui/organic-shape'

const ribbonDots = ['bg-sun', 'bg-coral', 'bg-leaf', 'bg-sky', 'bg-grape', 'bg-tangerine']

/** "Crescer é evoluir todos os dias": tipografia editorial com deslocamento horizontal discreto. */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const shiftA = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const shiftB = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} aria-labelledby="manifesto-title" className="overflow-hidden bg-brand-900 py-24 text-cream-50 sm:py-32">
      <h2 id="manifesto-title" className="sr-only">
        Manifesto: Crescer é evoluir todos os dias
      </h2>

      <div aria-hidden className="mx-auto max-w-[90rem] px-4 font-display leading-[0.88] font-semibold tracking-[-0.05em] sm:px-8">
        <motion.div style={{ x: shiftA }} className="flex items-center gap-[0.25em] text-[clamp(2.4rem,11.5vw,12rem)] whitespace-nowrap">
          <span>Crescer</span>
          <span className="h-[0.06em] flex-1 rounded-full bg-cream-50/25" />
          <span className="text-sun">é</span>
        </motion.div>
        <motion.div
          style={{ x: shiftB }}
          className="flex items-center justify-center gap-[0.25em] text-[clamp(2.4rem,11.5vw,12rem)] whitespace-nowrap italic"
        >
          <span className="grid size-[0.8em] shrink-0 place-items-center rounded-full bg-brand-500 not-italic">
            <Sprout className="size-[0.55em] text-cream-50" />
          </span>
          <span className="font-light">evoluir</span>
        </motion.div>
        <motion.div style={{ x: shiftA }} className="flex items-center gap-[0.25em] text-[clamp(2.4rem,11.5vw,12rem)] whitespace-nowrap">
          <span className="h-[0.06em] flex-1 rounded-full bg-cream-50/25" />
          <span>todos os</span>
          <span className="text-coral">dias</span>
        </motion.div>
      </div>

      <div aria-hidden className="mt-20 space-y-3 sm:mt-24">
        <Marquee duration={45} className="py-1">
          {manifesto.ribbon.map((word, i) => (
            <span key={word} className="flex items-center gap-6 pr-6 font-display text-2xl font-medium text-cream-100 sm:text-3xl">
              <span className={cn('size-3 rounded-full', ribbonDots[i % ribbonDots.length])} />
              {word}
            </span>
          ))}
        </Marquee>
        <Marquee duration={55} reverse className="py-1">
          {[...manifesto.ribbon].reverse().map((word, i) => (
            <span key={word} className="flex items-center gap-6 pr-6 font-display text-2xl font-medium text-cream-50/35 sm:text-3xl">
              <span className={cn('size-3 rounded-full opacity-60', ribbonDots[(i + 3) % ribbonDots.length])} />
              {word}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
