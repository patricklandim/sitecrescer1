import { site } from '@/config/site'
import { Button, ButtonArrow } from '@/components/ui/button'
import { OrganicShape } from '@/components/ui/organic-shape'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

/**
 * Depoimentos reais (quando fornecidos) ou, na ausência deles,
 * um bloco sobre a proposta de acolhimento. Nenhum depoimento é inventado.
 */
export function Care() {
  return site.testimonials.length > 0 ? <Testimonials /> : <Welcome />
}

function Welcome() {
  return (
    <section aria-labelledby="acolhimento-title" className="py-6 sm:py-10">
      <div className="mx-auto max-w-[90rem] px-3 sm:px-4">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-sky-soft px-6 py-20 sm:rounded-[3rem] sm:px-12 sm:py-24 lg:px-20">
          <OrganicShape shape="bloom" color="var(--color-sky)" className="absolute -right-24 -bottom-28 -z-10 w-[26rem] opacity-30" />
          <OrganicShape shape="seed" color="var(--color-grape)" className="absolute top-10 right-[12%] -z-10 w-16 opacity-60" />
          <OrganicShape shape="pebble" color="var(--color-sun)" className="absolute right-[30%] bottom-12 -z-10 w-10" />

          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading
                id="acolhimento-title"
                eyebrow="Acolhimento"
                title="Buscar apoio para o desenvolvimento do seu filho é um passo de cuidado."
                description="Acreditamos que cada criança possui um potencial único. Por isso, recebemos cada família com atenção e estamos disponíveis para conversar sobre suas dúvidas e explicar como funciona o atendimento."
              />
            </div>
            <Reveal delay={0.15} className="lg:col-span-4 lg:justify-self-end">
              <Button asChild size="lg" className="pr-2.5">
                <a href="#contato">
                  Conversar com a equipe
                  <ButtonArrow />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="depoimentos-title" eyebrow="Depoimentos" title="O que as famílias dizem." />
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <li key={i}>
              <Reveal delay={i * 0.08} className="h-full">
                <figure className="flex h-full flex-col justify-between gap-8 rounded-[2rem] bg-cream-50 p-8 ring-1 ring-brand-900/5">
                  <blockquote className="font-display text-xl leading-snug text-brand-900">“{t.quote}”</blockquote>
                  <figcaption>
                    <span className="block font-semibold text-brand-900">{t.author}</span>
                    {t.context && <span className="text-sm text-muted-foreground">{t.context}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
