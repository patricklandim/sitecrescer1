import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Microscope, Route } from 'lucide-react'
import type { PointerEvent, ReactNode } from 'react'
import { site } from '@/config/site'
import { specialties, toneClasses } from '@/config/specialties'
import { asset, cn } from '@/lib/utils'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/section-heading'
import { OrganicShape, Sprout } from '@/components/ui/organic-shape'

const ease = [0.22, 1, 0.36, 1] as const
const titleLine1 = 'Cada criança tem seu jeito de'.split(' ')

export function Hero() {
  const reduce = useReducedMotion()
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const { innerWidth, innerHeight } = window
    px.set(e.clientX / innerWidth - 0.5)
    py.set(e.clientY / innerHeight - 0.5)
  }

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Fundo: grão de luz suave e uma forma orgânica ao fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-brand-100/70 blur-3xl" />
        <div className="absolute top-1/3 -right-48 size-[30rem] rounded-full bg-sun-soft/80 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Eyebrow>
              Desenvolvimento infantil<span className="hidden sm:inline"> · Equipe multidisciplinar</span>
            </Eyebrow>
          </motion.div>

          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.04em] text-brand-900 sm:text-6xl lg:text-[4.6rem] xl:text-[5.25rem]"
          >
            <span className="block">
              {titleLine1.map((word, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.22em] inline-block"
                  initial={{ opacity: 0, y: '0.5em' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="relative inline-block text-brand-500"
                initial={{ opacity: 0, y: '0.5em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + titleLine1.length * 0.06, ease }}
              >
                crescer.
                <svg
                  aria-hidden
                  viewBox="0 0 300 24"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-[94%] text-sun"
                >
                  <motion.path
                    d="M4 16C60 6 120 4 160 9C200 14 250 12 296 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.9, ease }}
                  />
                </svg>
              </motion.span>
            </span>
            <motion.span
              className="mt-4 block max-w-2xl text-[1.55rem] leading-[1.12] font-medium tracking-[-0.025em] text-brand-800/80 sm:text-[2rem] lg:text-[2.35rem]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease }}
            >
              Estamos aqui para acompanhar cada conquista.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
          >
            Uma equipe multidisciplinar dedicada ao desenvolvimento infantil, com acolhimento, cuidado individualizado e
            práticas baseadas em evidências.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease }}
          >
            <Button asChild size="lg" className="justify-between pr-2.5 sm:justify-center">
              <a href="#especialidades">
                Conheça nossas especialidades
                <ButtonArrow />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contato">Fale com nossa equipe</a>
            </Button>
          </motion.div>

          <motion.ul
            aria-label="Especialidades"
            className="mt-10 flex flex-wrap gap-2"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 1.1 } } }}
          >
            {specialties.map((s) => (
              <motion.li
                key={s.slug}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 rounded-full bg-cream-50/80 px-3 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-brand-900/8"
              >
                <span aria-hidden className={cn('size-2 rounded-full', toneClasses[s.tone].bg)} />
                {s.name}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <HeroArt px={px} py={py} />
      </div>
    </section>
  )
}

type Springs = { px: ReturnType<typeof useSpring>; py: ReturnType<typeof useSpring> }

/** Composição visual do hero: arco orgânico com formas nas cores das especialidades. */
function HeroArt({ px, py }: Springs) {
  const near = { x: useTransform(px, (v) => v * 18), y: useTransform(py, (v) => v * 18) }
  const far = { x: useTransform(px, (v) => v * -26), y: useTransform(py, (v) => v * -26) }

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[26rem] sm:max-w-md lg:col-span-5 lg:max-w-none"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.2, ease }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-brand-800">
        {site.heroImage ? (
          <img
            src={asset(site.heroImage.src)}
            alt={site.heroImage.alt}
            className="absolute inset-0 size-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <>
            <motion.div style={far} className="absolute inset-0">
              <OrganicShape shape="seed" color="var(--color-sun)" className="absolute -top-[6%] -right-[14%] w-[62%]" />
              <OrganicShape shape="pebble" color="var(--color-sky)" className="absolute top-[34%] -left-[18%] w-[50%] opacity-90" />
              <OrganicShape shape="bloom" color="var(--color-grape)" className="absolute top-[18%] left-[24%] w-[18%]" />
            </motion.div>
            <motion.div style={near} className="absolute inset-0">
              <OrganicShape shape="pebble" color="var(--color-coral)" className="absolute -bottom-[10%] -left-[6%] w-[58%]" />
              <OrganicShape shape="bloom" color="var(--color-tangerine)" className="absolute right-[8%] bottom-[16%] w-[30%]" />
              <OrganicShape shape="leaf" color="var(--color-leaf)" className="absolute top-[46%] right-[6%] w-[30%] rotate-12" />
            </motion.div>
            <motion.div
              className="absolute inset-x-0 bottom-0 mx-auto w-[58%] origin-bottom text-cream-100"
              initial={{ scaleY: 0.2, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6, ease }}
            >
              <Sprout className="w-full drop-shadow-[0_20px_30px_rgb(13_34_25/0.35)]" />
            </motion.div>
          </>
        )}
      </div>

      <RotatingBadge />

      <FloatingNote
        className="top-[18%] -left-3 sm:-left-10"
        icon={<Route className="size-4" aria-hidden />}
        label="Plano terapêutico personalizado"
        delay={1.2}
      />
      <FloatingNote
        className="-right-2 bottom-[24%] sm:-right-8 xl:bottom-[9%]"
        icon={<Microscope className="size-4" aria-hidden />}
        label="Práticas baseadas em evidências"
        delay={1.4}
        float="[animation-delay:-3.5s]"
      />
    </motion.div>
  )
}

function FloatingNote({
  className,
  icon,
  label,
  delay,
  float,
}: {
  className: string
  icon: ReactNode
  label: string
  delay: number
  float?: string
}) {
  return (
    <motion.div
      aria-hidden
      className={cn('absolute', className)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      <div
        className={cn(
          'flex animate-float items-center gap-2.5 rounded-2xl bg-cream-50/95 py-2.5 pr-4 pl-2.5 text-sm font-semibold text-brand-900 shadow-[0_18px_40px_-18px_rgb(13_34_25/0.45)] ring-1 ring-brand-900/5 backdrop-blur',
          float,
        )}
      >
        <span className="grid size-8 place-items-center rounded-xl bg-brand-50 text-brand-600">{icon}</span>
        <span className="max-w-[11rem] leading-tight">{label}</span>
      </div>
    </motion.div>
  )
}

/** Selo circular com texto girando lentamente (releitura do antigo "texto giratório"). */
function RotatingBadge() {
  return (
    <div aria-hidden className="absolute -bottom-8 left-1/2 grid size-28 -translate-x-1/2 place-items-center sm:size-32">
      <div className="absolute inset-0 rounded-full bg-cream-100 shadow-[0_18px_40px_-20px_rgb(13_34_25/0.5)]" />
      <svg viewBox="0 0 100 100" className="absolute inset-1.5 animate-spin-slow text-brand-800">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        {/* textLength ≈ circunferência (2π·38), para o texto fechar o círculo sem sobrepor */}
        <text className="fill-current text-[9.5px] font-bold uppercase">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
            Crescer é evoluir todos os dias •{' '}
          </textPath>
        </text>
      </svg>
      <span className="relative grid size-11 place-items-center rounded-full bg-sun text-brand-900">
        <Sprout className="size-6" />
      </span>
    </div>
  )
}
