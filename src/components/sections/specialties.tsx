import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { specialties, toneClasses, type Specialty } from '@/config/specialties'
import { requestContact } from '@/lib/contact-intent'
import { cn } from '@/lib/utils'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { OrganicShape, type ShapeName } from '@/components/ui/organic-shape'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { SpotlightCard } from '@/components/ui/spotlight-card'

/** Bento assimétrico no desktop (grid de 12 colunas), 2 colunas no tablet e 1 no celular. */
const layout = ['lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-4', 'lg:col-span-5']
const isFeatured = (i: number) => i === 0 || i === layout.length - 1
const shapes: ShapeName[] = ['seed', 'pebble', 'leaf', 'bloom', 'pebble', 'seed']

export function Specialties() {
  const [selected, setSelected] = useState<Specialty | null>(null)
  const pendingContact = useRef<string | null>(null)

  return (
    <section id="especialidades" aria-labelledby="especialidades-title" className="py-6 sm:py-10">
      <div className="mx-auto max-w-[90rem] px-3 sm:px-4">
        <div className="rounded-[2.5rem] bg-cream-200 px-4 py-20 sm:rounded-[3rem] sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading
                id="especialidades-title"
                eyebrow="Especialidades"
                title="Seis áreas, um olhar completo para cada criança."
              />
              <Reveal delay={0.1} className="max-w-md">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Atendimento especializado para o desenvolvimento infantil, com uma equipe multidisciplinar e
                  terapias baseadas em evidências científicas.
                </p>
              </Reveal>
            </div>

            <ul className="mt-14 grid auto-rows-[minmax(19rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
              {specialties.map((s, i) => (
                <motion.li
                  key={s.slug}
                  className={cn('h-full', layout[i])}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SpecialtyCard specialty={s} index={i} featured={isFeatured(i)} onOpen={() => setSelected(s)} />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SpecialtyDialog
            specialty={selected}
            onContact={() => {
              pendingContact.current = selected.name
              setSelected(null)
            }}
            onCloseAutoFocus={(e) => {
              // Ao seguir para o contato, não devolvemos o foco ao card (isso rolaria a página de volta)
              const name = pendingContact.current
              if (!name) return
              e.preventDefault()
              pendingContact.current = null
              requestContact(name)
            }}
          />
        )}
      </Dialog>
    </section>
  )
}

function SpecialtyCard({
  specialty: s,
  index,
  featured,
  onOpen,
}: {
  specialty: Specialty
  index: number
  featured: boolean
  onOpen: () => void
}) {
  const tone = toneClasses[s.tone]
  const Icon = s.icon

  return (
    <SpotlightCard
      glow={tone.hex}
      className="flex h-full flex-col rounded-[2rem] bg-cream-50 p-7 ring-1 ring-brand-900/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(22_58_43/0.35)] sm:p-8"
    >
      <OrganicShape
        shape={shapes[index]}
        color={tone.hex}
        className={cn(
          'pointer-events-none absolute -z-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/spot:scale-125 group-hover/spot:rotate-12',
          // nos cards de destaque a forma fica no topo, longe do texto
          featured ? '-top-24 -right-20 w-72 opacity-90' : '-right-12 -bottom-14 w-40 opacity-80',
        )}
      />

      <div className="flex items-start justify-between">
        <span className={cn('grid size-14 place-items-center rounded-2xl', tone.soft, tone.text)}>
          <Icon className="size-7" aria-hidden strokeWidth={1.75} />
        </span>
        <span className="font-display text-sm font-semibold text-brand-900/45" aria-hidden>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={cn('mt-auto pt-10', featured ? 'lg:max-w-sm' : 'max-w-md')}>
        <h3
          className={cn(
            'font-semibold tracking-[-0.02em] text-brand-900',
            featured ? 'text-3xl lg:text-[2.5rem] lg:leading-[1.02]' : 'text-2xl',
          )}
        >
          {s.name}
        </h3>
        <p className={cn('mt-3 leading-relaxed text-muted-foreground', featured && 'text-lg')}>{s.summary}</p>
        {/* O ::after estende a área clicável do botão ao card inteiro */}
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream-50 py-2 pr-3 pl-4 text-sm font-semibold text-brand-900 ring-1 ring-brand-900/10 transition-colors after:absolute after:inset-0 after:rounded-[2rem] after:content-[''] hover:bg-brand-900 hover:text-cream-50"
        >
          Saiba mais <span className="sr-only">sobre {s.name}</span>
          <ArrowUpRight className="size-4 transition-transform group-hover/spot:rotate-45" aria-hidden />
        </button>
      </div>
    </SpotlightCard>
  )
}

function SpecialtyDialog({
  specialty: s,
  onContact,
  onCloseAutoFocus,
}: {
  specialty: Specialty
  onContact: () => void
  onCloseAutoFocus: (e: Event) => void
}) {
  const tone = toneClasses[s.tone]
  const Icon = s.icon
  return (
    <DialogContent className="overflow-hidden" onCloseAutoFocus={onCloseAutoFocus}>
      <OrganicShape shape="seed" color={tone.hex} className="pointer-events-none absolute -top-20 -right-20 w-56 opacity-80" />
      <span className={cn('relative grid size-14 place-items-center rounded-2xl', tone.soft, tone.text)}>
        <Icon className="size-7" aria-hidden strokeWidth={1.75} />
      </span>
      <DialogTitle className="relative mt-6 font-display text-3xl font-semibold tracking-tight text-brand-900">
        {s.name}
      </DialogTitle>
      <DialogDescription className="relative mt-4 text-lg leading-relaxed text-muted-foreground">
        {s.details}
      </DialogDescription>
      <p className="relative mt-4 leading-relaxed text-muted-foreground">
        O plano de cada criança é definido de forma individualizada, a partir da avaliação inicial.
      </p>
      <Button className="relative mt-8 w-full justify-between pr-2.5 sm:w-auto" onClick={onContact}>
        Conversar sobre {s.name}
        <ButtonArrow />
      </Button>
    </DialogContent>
  )
}
