import { motion, type HTMLMotionProps } from 'motion/react'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  /** Distância vertical inicial, em px */
  y?: number
}

/** Entrada suave ao rolar. Com `prefers-reduced-motion`, só a opacidade anima. */
export function Reveal({ delay = 0, y = 28, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
