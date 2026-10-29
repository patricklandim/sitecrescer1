import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  /** Cor do brilho que acompanha o cursor */
  glow?: string
  /** Inclinação máxima em graus (0 desativa) */
  tilt?: number
}

/**
 * Card com brilho que segue o cursor e leve inclinação 3D.
 * Os efeitos só ocorrem com mouse; em toque ou com movimento reduzido, o card fica estático.
 */
export function SpotlightCard({ children, className, glow = 'var(--color-sun)', tilt = 4 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--spot-x', `${x}px`)
    ref.current.style.setProperty('--spot-y', `${y}px`)
    if (!reduce && tilt) {
      ry.set(((x / rect.width) - 0.5) * tilt * 2)
      rx.set(-((y / rect.height) - 0.5) * tilt * 2)
    }
  }

  function onPointerLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn('group/spot relative isolate overflow-hidden', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, ${glow} 45%, transparent), transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
