import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  /** Duração de um ciclo completo, em segundos */
  duration?: number
  reverse?: boolean
  className?: string
}

/**
 * Faixa com rolagem horizontal contínua. O conteúdo é duplicado para o loop;
 * a cópia fica oculta para leitores de tela. Pausa no hover.
 */
export function Marquee({ children, duration = 40, reverse = false, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]',
        )}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
