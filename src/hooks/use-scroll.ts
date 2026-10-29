import { useEffect, useState } from 'react'

/** Posição de rolagem e direção, com um único listener passivo agrupado por frame. */
export function useScroll() {
  const [state, setState] = useState({ y: 0, direction: 'up' as 'up' | 'down' })

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const delta = y - lastY
      if (Math.abs(delta) > 6) {
        setState({ y, direction: delta > 0 ? 'down' : 'up' })
        lastY = y
      } else {
        setState((s) => (s.y === y ? s : { ...s, y }))
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}

/** Retorna o id da seção visível no centro da tela, para destacar o item do menu. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
