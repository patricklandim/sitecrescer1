import { Facebook, Instagram } from 'lucide-react'
import { founderText } from '@/config/content'
import { site } from '@/config/site'
import { asset } from '@/lib/utils'
import { OrganicShape } from '@/components/ui/organic-shape'
import { Reveal } from '@/components/ui/reveal'
import { Eyebrow } from '@/components/ui/section-heading'

const icons = { instagram: Instagram, facebook: Facebook }

export function Founder() {
  const { founder } = site
  return (
    <section id="fundadora" aria-labelledby="fundadora-title" className="py-6 sm:py-10">
      <div className="mx-auto max-w-[90rem] px-3 sm:px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sun-soft px-5 py-20 sm:rounded-[3rem] sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
              <div className="relative aspect-square">
                <OrganicShape shape="pebble" color="var(--color-sun)" className="absolute inset-0 size-full" />
                <OrganicShape
                  shape="leaf"
                  color="var(--color-brand-500)"
                  className="absolute -top-2 -right-2 w-1/4 rotate-[-20deg]"
                />
                <OrganicShape shape="seed" color="var(--color-coral)" className="absolute bottom-4 -left-2 w-[14%]" />
                <img
                  src={asset(founder.photo)}
                  alt={founder.photoAlt}
                  width={296}
                  height={353}
                  loading="lazy"
                  decoding="async"
                  className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Fundadora</Eyebrow>
                <h2
                  id="fundadora-title"
                  className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-brand-900 sm:text-5xl"
                >
                  {founder.name}
                </h2>
                <p className="mt-2 text-lg font-medium text-sun-deep">{founder.role}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <blockquote className="relative mt-10">
                  <span
                    aria-hidden
                    className="absolute -top-8 -left-1 font-display text-8xl leading-none text-sun select-none"
                  >
                    “
                  </span>
                  <p className="relative font-display text-2xl leading-[1.25] font-medium tracking-[-0.015em] text-brand-900 sm:text-[2rem]">
                    {founderText.quote}
                  </p>
                </blockquote>
              </Reveal>

              <Reveal delay={0.2} className="mt-8 space-y-4">
                {founderText.paragraphs.map((p, i) => (
                  <p key={i} className="max-w-2xl text-lg leading-relaxed text-brand-900/75">
                    {p}
                  </p>
                ))}
              </Reveal>

              {founder.socials.length > 0 && (
                <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
                  {founder.socials.map((s) => {
                    const Icon = icons[s.network]
                    return (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-2.5 text-sm font-semibold text-brand-900 ring-1 ring-brand-900/10 transition-colors hover:bg-brand-900 hover:text-cream-50"
                      >
                        <Icon className="size-4" aria-hidden />
                        {s.label} da Stéfany
                        <span className="sr-only">(abre em nova aba)</span>
                      </a>
                    )
                  })}
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
