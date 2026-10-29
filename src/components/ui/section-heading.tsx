import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] uppercase',
        tone === 'dark' ? 'bg-brand-800/6 text-brand-700' : 'bg-cream-50/10 text-cream-200',
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('flex flex-col gap-5', align === 'center' ? 'items-center text-center' : 'items-start', className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          'max-w-3xl text-[2.25rem] leading-[1.02] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]',
          tone === 'dark' ? 'text-brand-900' : 'text-cream-50',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-lg leading-relaxed',
            tone === 'dark' ? 'text-muted-foreground' : 'text-cream-200/85',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
