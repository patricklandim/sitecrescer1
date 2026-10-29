import { UserRound } from 'lucide-react'
import { site, type TeamMember } from '@/config/site'
import { specialties, toneClasses } from '@/config/specialties'
import { asset, cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

/**
 * Equipe multidisciplinar. Exibe apenas profissionais confirmados em `site.team`.
 * Enquanto a lista estiver incompleta, um card informa que a apresentação será ampliada.
 */
export function Team() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="equipe-title"
          eyebrow="Equipe multidisciplinar"
          title="Profissionais dedicados a cada etapa do desenvolvimento."
          description="Nossa equipe reúne diferentes especialidades para apoiar crianças e suas famílias, promovendo aprendizagem, inclusão e qualidade de vida."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.team.map((member, i) => (
            <li key={member.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <MemberCard member={member} />
              </Reveal>
            </li>
          ))}
          <li className={cn(site.team.length % 3 === 1 && 'lg:col-span-2')}>
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col justify-between gap-10 rounded-[2rem] border-2 border-dashed border-brand-900/15 p-8 sm:p-10">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl">
                    Em breve, você vai conhecer cada profissional da nossa equipe.
                  </h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                    Enquanto isso, fale com a clínica para saber mais sobre os profissionais de cada especialidade.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label="Especialidades da equipe">
                  {specialties.map((s) => (
                    <li
                      key={s.slug}
                      className={cn('rounded-full px-3 py-1.5 text-sm font-semibold', toneClasses[s.tone].soft, toneClasses[s.tone].text)}
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  const specialty = specialties.find((s) => s.slug === member.specialty)
  const tone = specialty ? toneClasses[specialty.tone] : toneClasses.leaf

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream-50 ring-1 ring-brand-900/5">
      <div className={cn('relative aspect-[4/3] overflow-hidden', tone.soft)}>
        {member.photo ? (
          <img
            src={asset(member.photo)}
            alt={`Foto de ${member.name}`}
            loading="lazy"
            decoding="async"
            className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <UserRound className={cn('absolute inset-0 m-auto size-16', tone.text)} aria-hidden />
        )}
      </div>
      <div className="p-7">
        <h3 className="text-xl font-semibold tracking-tight text-brand-900">{member.name}</h3>
        <p className="mt-1 text-muted-foreground">{member.role}</p>
        {member.registry && <p className="mt-1 text-sm text-muted-foreground">{member.registry}</p>}
      </div>
    </article>
  )
}
