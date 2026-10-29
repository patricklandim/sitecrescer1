import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { journey } from '@/config/content'
import { cn } from '@/lib/utils'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const dotColors = ['bg-sun', 'bg-coral', 'bg-leaf', 'bg-sky', 'bg-grape']

/** Linha do tempo da jornada de atendimento, com a linha central preenchida conforme a rolagem. */
export function Journey() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="atendimento-title"
                eyebrow="Como funciona"
                title="Uma jornada construída junto com a família."
                description="Conheça as etapas do acompanhamento na Clínica Crescer, do primeiro contato ao acompanhamento contínuo do desenvolvimento."
              />
              <Reveal delay={0.15} className="mt-9">
                <Button asChild size="lg" className="pr-2.5">
                  <a href="#contato">
                    Dar o primeiro passo
                    <ButtonArrow />
                  </a>
                </Button>
              </Reveal>
            </div>
          </div>

          <ol ref={listRef} className="relative lg:col-span-7">
            {/* trilho e progresso */}
            <span aria-hidden className="absolute top-2 bottom-2 left-[1.6rem] w-0.5 rounded-full bg-brand-900/10" />
            <motion.span
              aria-hidden
              style={{ scaleY: progress }}
              className="absolute top-2 bottom-2 left-[1.6rem] w-0.5 origin-top rounded-full bg-brand-500"
            />

            {journey.map((step, i) => {
              const Icon = step.icon
              return (
                <li key={step.title} className="relative pb-6 pl-20 last:pb-0 sm:pl-24">
                  <Reveal delay={0.05}>
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 grid size-[3.25rem] place-items-center rounded-full bg-cream-50 text-brand-800 ring-1 ring-brand-900/10"
                    >
                      <Icon className="size-5" strokeWidth={1.9} />
                      <span className={cn('absolute -top-0.5 -right-0.5 size-3.5 rounded-full ring-4 ring-cream-100', dotColors[i])} />
                    </span>
                    <div className="rounded-[1.75rem] bg-cream-50 p-6 ring-1 ring-brand-900/5 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(22_58_43/0.4)] sm:p-8">
                      <span className="text-sm font-bold tracking-[0.14em] text-brand-600 uppercase">
                        Etapa {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-brand-900 sm:text-[1.7rem]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
