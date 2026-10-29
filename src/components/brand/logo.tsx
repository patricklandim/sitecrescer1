import { cn } from '@/lib/utils'
import { Sprout } from '@/components/ui/organic-shape'

/**
 * Logotipo tipográfico PROVISÓRIO, inspirado no logo bordado no uniforme da clínica
 * ("Clínica" + "CRESCER" com letras coloridas). Substitua por <img src="logo.svg"> quando
 * o arquivo oficial for enviado.
 */
const letters = [
  { char: 'C', color: 'text-sun' },
  { char: 'R', color: 'text-coral' },
  { char: 'E', color: 'text-leaf' },
  { char: 'S', color: 'text-sky' },
  { char: 'C', color: 'text-grape' },
  { char: 'E', color: 'text-tangerine' },
  { char: 'R', color: 'text-brand-500' },
]

type LogoProps = { tone?: 'dark' | 'light'; className?: string }

export function Logo({ tone = 'dark', className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className={cn(
          'grid size-10 place-items-center rounded-2xl',
          tone === 'dark' ? 'bg-brand-800 text-cream-50' : 'bg-cream-50 text-brand-800',
        )}
      >
        <Sprout className="size-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[0.7rem] font-semibold tracking-[0.2em] uppercase',
            tone === 'dark' ? 'text-brand-700' : 'text-cream-200',
          )}
        >
          Clínica
        </span>
        <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em]" aria-hidden>
          {letters.map((l, i) => (
            <span key={i} className={cn(l.color, tone === 'dark' && 'drop-shadow-[0_1px_0_rgb(22_58_43/0.25)]')}>
              {l.char}
            </span>
          ))}
        </span>
        <span className="sr-only">Clínica Crescer</span>
      </span>
    </span>
  )
}
