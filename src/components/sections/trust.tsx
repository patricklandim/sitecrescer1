import { pillars } from '@/config/content'
import { cn } from '@/lib/utils'
import { OrganicShape } from '@/components/ui/organic-shape'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const accents = ['text-sun', 'text-coral', 'text-sky', 'text-leaf']

/** Pilares reais do atendimento, sem números ou promessas que a clínica não forneceu. */
export function Trust() {
  return (
    <section aria-labelledby="confianca-title" className="relative overflow-hidden bg-brand-800 py-24 text-cream-50 sm:py-32">
      <OrganicShape
        shape="bloom"
        color="var(--color-brand-700)"
        className="pointer-events-none absolute -top-40 -right-40 w-[34rem] opacity-70"
      />
      <OrganicShape
        shape="pebble"
        color="var(--color-brand-900)"
        className="pointer-events-none absolute -bottom-48 -left-32 w-[30rem] opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="confianca-title"
          tone="light"
          eyebrow="Por que a Crescer"
          title={
            <>
              Confiança se constrói com <span className="text-sun">cuidado</span> em cada detalhe.
            </>
          }
          description="Para as famílias, saber como a criança é acompanhada faz toda a diferença. Estes são os pilares do nosso atendimento."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-cream-50/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <li key={p.title} className="bg-brand-800">
                <Reveal delay={i * 0.08} className="flex h-full flex-col gap-6 p-8 transition-colors duration-500 hover:bg-brand-700/60 sm:p-9">
                  <span className={cn('grid size-14 place-items-center rounded-2xl bg-cream-50/8', accents[i])}>
                    <Icon className="size-7" aria-hidden strokeWidth={1.75} />
                  </span>
                  <div className="mt-auto">
                    <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-cream-200/80">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
