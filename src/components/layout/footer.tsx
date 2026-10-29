import { Facebook, Instagram } from 'lucide-react'
import { navItems } from '@/config/content'
import { site, whatsappLink } from '@/config/site'
import { specialties } from '@/config/specialties'
import { Logo } from '@/components/brand/logo'

const icons = { instagram: Instagram, facebook: Facebook }

export function Footer() {
  // Enquanto a clínica não informar perfis oficiais, exibimos os da fundadora, identificados como tal.
  const clinicSocials = site.socials
  const socials = clinicSocials.length > 0 ? clinicSocials : site.founder.socials
  const socialsTitle = clinicSocials.length > 0 ? 'Redes sociais' : 'Redes da fundadora'
  const { email } = site.contact
  const whatsapp = whatsappLink()

  return (
    <footer className="mt-6 bg-brand-950 text-cream-200 sm:mt-10">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs leading-relaxed text-cream-200/75">
              Atendimento multidisciplinar para o desenvolvimento infantil, com acolhimento e práticas baseadas em
              evidências.
            </p>
            <p className="mt-6 font-display text-lg font-medium text-sun">{site.tagline}.</p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2">
            <h2 className="text-sm font-bold tracking-[0.14em] text-cream-50 uppercase">Navegação</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-cream-50">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold tracking-[0.14em] text-cream-50 uppercase">Especialidades</h2>
            <ul className="mt-5 space-y-3">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <a href="#especialidades" className="transition-colors hover:text-cream-50">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold tracking-[0.14em] text-cream-50 uppercase">Contato</h2>
            <ul className="mt-5 space-y-3">
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-cream-50">
                    WhatsApp
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-cream-50">
                    {email}
                  </a>
                </li>
              )}
              {site.contact.address && <li>{site.contact.address}</li>}
              <li>
                <a href="#contato" className="hover:text-cream-50">
                  Formulário de contato
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <>
                <h2 className="mt-8 text-sm font-bold tracking-[0.14em] text-cream-50 uppercase">{socialsTitle}</h2>
                <ul className="mt-4 flex gap-2">
                  {socials.map((s) => {
                    const Icon = icons[s.network]
                    return (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid size-11 place-items-center rounded-full bg-cream-50/8 transition-colors hover:bg-sun hover:text-brand-950"
                        >
                          <Icon className="size-5" aria-hidden />
                          <span className="sr-only">{s.label} (abre em nova aba)</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream-50/10 pt-8 text-sm text-cream-200/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <a href="#inicio" className="hover:text-cream-50">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
