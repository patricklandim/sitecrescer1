import type { SVGProps } from 'react'

/** Formas orgânicas inspiradas em sementes, folhas e seixos: o vocabulário visual do "crescer". */
const paths = {
  pebble:
    'M47.6,-58.4C60.9,-46.1,70.2,-30.2,73.2,-13.1C76.2,4,72.8,22.3,63.2,36.6C53.6,50.9,37.8,61.2,20.4,67.4C3,73.6,-16,75.7,-32.4,69.3C-48.8,62.9,-62.6,48,-70.2,30.6C-77.8,13.2,-79.2,-6.7,-72.4,-23.3C-65.6,-39.9,-50.6,-53.2,-34.8,-64.8C-19,-76.4,-2.4,-86.3,12.9,-83.9C28.2,-81.5,34.3,-70.7,47.6,-58.4Z',
  bloom:
    'M40.9,-47.6C53.3,-38.4,63.5,-25.6,67.4,-10.7C71.3,4.2,68.9,21.2,60.2,34.3C51.5,47.4,36.5,56.6,20.4,62.5C4.3,68.4,-12.9,71,-28.6,65.8C-44.3,60.6,-58.5,47.6,-66.3,31.4C-74.1,15.2,-75.5,-4.2,-69.1,-20.3C-62.7,-36.4,-48.5,-49.2,-33.6,-57.9C-18.7,-66.6,-3.1,-71.2,10.6,-68.1C24.3,-65,28.5,-56.8,40.9,-47.6Z',
  leaf: 'M-60,40C-60,-20,-20,-60,60,-60C60,0,20,60,-60,40Z',
  seed: 'M0,-70C38,-70,62,-36,62,0C62,40,34,70,0,70C-34,70,-62,40,-62,0C-62,-36,-38,-70,0,-70Z',
} as const

export type ShapeName = keyof typeof paths

type OrganicShapeProps = SVGProps<SVGSVGElement> & { shape?: ShapeName; color?: string }

export function OrganicShape({ shape = 'pebble', color = 'currentColor', ...props }: OrganicShapeProps) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden focusable="false" {...props}>
      <path d={paths[shape]} fill={color} />
    </svg>
  )
}

/** Broto: o símbolo de crescimento usado em detalhes do site */
export function Sprout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden focusable="false" {...props}>
      <path d="M24 42V24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M24 25c0-7.5 5-12.5 12.5-12.5 0 7.5-5 12.5-12.5 12.5Z" fill="currentColor" />
      <path d="M24 30c0-6-4-10-10-10 0 6 4 10 10 10Z" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
