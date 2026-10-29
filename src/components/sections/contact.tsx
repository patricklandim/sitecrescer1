import { Clock, Instagram, Mail, MapPin, MessageCircle, type LucideIcon } from 'lucide-react'
import { site, whatsappLink } from '@/config/site'
import { OrganicShape } from '@/components/ui/organic-shape'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { ContactForm } from './contact-form'

type Channel = { icon: LucideIcon; label: string; value: string; href?: string; external?: boolean }

function formatWhatsapp(digits: string) {
  const local = digits.replace(/^55/, '')
  return `+55 (${local.slice(0, 2)}) ${local.slice(2, local.length - 4)}-${local.slice(-4)}`
}

/** Apenas canais confirmados em `site.contact` são exibidos. */
function getChannels(): Channel[] {
  const { whatsapp, email, address, mapsUrl, hours } = site.contact
  const list: Channel[] = []
  if (whatsapp)
    list.push({ icon: MessageCircle, label: 'WhatsApp', value: formatWhatsapp(whatsapp), href: whatsappLink()!, external: true })
  if (email) list.push({ icon: Mail, label: 'E-mail', value: email, href: `mailto:${email}` })
  if (address) list.push({ icon: MapPin, label: 'Endereço', value: address, href: mapsUrl ?? undefined, external: true })
  if (hours) list.push({ icon: Clock, label: 'Horário', value: hours })
  return list
}

export function Contact() {
  const channels = getChannels()
  const instagram = site.founder.socials.find((s) => s.network === 'instagram')

  return (
    <section id="contato" aria-labelledby="contato-title" className="py-6 sm:py-10">
      <div className="mx-auto max-w-[90rem] px-3 sm:px-4">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand-800 px-4 py-20 sm:rounded-[3rem] sm:px-10 sm:py-24 lg:px-16">
          <OrganicShape shape="seed" color="var(--color-brand-700)" className="absolute -top-32 -left-32 -z-10 w-[28rem]" />
          <OrganicShape shape="bloom" color="var(--color-sun)" className="absolute -right-20 bottom-24 -z-10 w-40 opacity-90" />

          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                id="contato-title"
                tone="light"
                eyebrow="Contato"
                title="Vamos conversar sobre o desenvolvimento do seu filho?"
                description="Entre em contato para tirar dúvidas e conhecer as possibilidades de atendimento da Clínica Crescer."
              />

              <Reveal delay={0.15} className="mt-10">
                {channels.length > 0 ? (
                  <ul className="flex flex-col gap-3">
                    {channels.map((c) => {
                      const Icon = c.icon
                      const content = (
                        <>
                          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cream-50/10 text-sun">
                            <Icon className="size-5" aria-hidden />
                          </span>
                          <span>
                            <span className="block text-sm text-cream-200/70">{c.label}</span>
                            <span className="block font-semibold text-cream-50">{c.value}</span>
                          </span>
                        </>
                      )
                      return (
                        <li key={c.label}>
                          {c.href ? (
                            <a
                              href={c.href}
                              {...(c.external && { target: '_blank', rel: 'noopener noreferrer' })}
                              className="flex items-center gap-4 rounded-3xl p-2 transition-colors hover:bg-cream-50/5"
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="flex items-center gap-4 p-2">{content}</div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className="rounded-3xl bg-cream-50/8 p-6 text-cream-200/85 ring-1 ring-cream-50/10">
                    <p className="leading-relaxed">
                      Os canais oficiais de atendimento (WhatsApp, e-mail, endereço e horários) serão publicados aqui em
                      breve.
                    </p>
                    {instagram && (
                      <a
                        href={instagram.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 font-semibold text-cream-50 underline-offset-4 hover:underline"
                      >
                        <Instagram className="size-4" aria-hidden />
                        Acompanhe a fundadora no Instagram
                        <span className="sr-only">(abre em nova aba)</span>
                      </a>
                    )}
                  </div>
                )}
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-7">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
