import { Blocks, BookOpen, Footprints, Hand, HeartHandshake, MessagesSquare, type LucideIcon } from 'lucide-react'

export type SpecialtyTone = 'sun' | 'coral' | 'leaf' | 'sky' | 'grape' | 'tangerine'

export type Specialty = {
  slug: string
  name: string
  tone: SpecialtyTone
  icon: LucideIcon
  /** Texto curto do card */
  summary: string
  /** Texto do "Saiba mais". Quando houver páginas individuais, use o `slug` como rota. */
  details: string
}

/**
 * Psicologia, ABA, Fonoaudiologia e Psicopedagogia reaproveitam os textos do site original.
 * Fisioterapia e Terapia Ocupacional usam descrições institucionais gerais da área:
 * PENDENTE validar com a clínica.
 */
export const specialties: Specialty[] = [
  {
    slug: 'psicologia',
    name: 'Psicologia',
    tone: 'sun',
    icon: HeartHandshake,
    summary: 'Acompanhamento psicológico focado no desenvolvimento emocional, comportamental e social das crianças.',
    details:
      'Acompanhamento psicológico voltado para o desenvolvimento emocional, social e comportamental das crianças, com acolhimento à criança e à família.',
  },
  {
    slug: 'fisioterapia',
    name: 'Fisioterapia',
    tone: 'coral',
    icon: Footprints,
    summary: 'Atendimento voltado ao desenvolvimento motor da criança, como movimento, equilíbrio e coordenação.',
    details:
      'A fisioterapia infantil trabalha o desenvolvimento motor, apoiando a criança a explorar o movimento, o equilíbrio e a coordenação com segurança.',
  },
  {
    slug: 'fonoaudiologia',
    name: 'Fonoaudiologia',
    tone: 'leaf',
    icon: MessagesSquare,
    summary: 'Desenvolvimento da fala, linguagem e comunicação, auxiliando na interação e no aprendizado.',
    details:
      'Atendimento especializado em comunicação e linguagem, promovendo o desenvolvimento da fala e da comunicação, com reflexos na interação e no aprendizado.',
  },
  {
    slug: 'terapia-aba',
    name: 'Terapia ABA',
    tone: 'sky',
    icon: Blocks,
    summary: 'Análise do Comportamento Aplicada, metodologia baseada em evidências científicas.',
    details:
      'Aplicação da Análise do Comportamento Aplicada (ABA), metodologia baseada em evidências científicas utilizada no desenvolvimento de crianças com TEA e outros transtornos do neurodesenvolvimento.',
  },
  {
    slug: 'psicopedagogia',
    name: 'Psicopedagogia',
    tone: 'grape',
    icon: BookOpen,
    summary: 'Acompanhamento das dificuldades de aprendizagem e do desenvolvimento de habilidades cognitivas e escolares.',
    details:
      'Acompanhamento especializado para dificuldades de aprendizagem, ajudando a criança a desenvolver habilidades cognitivas e escolares.',
  },
  {
    slug: 'terapia-ocupacional',
    name: 'Terapia Ocupacional',
    tone: 'tangerine',
    icon: Hand,
    summary: 'Apoio à autonomia da criança nas atividades do dia a dia, no brincar e na participação.',
    details:
      'A terapia ocupacional apoia a autonomia e a participação da criança nas atividades do cotidiano, como brincar, cuidar de si e interagir com o ambiente.',
  },
]

/** Classes Tailwind por tom. Listadas por extenso para o Tailwind detectá-las. */
export const toneClasses: Record<
  SpecialtyTone,
  { bg: string; soft: string; text: string; ring: string; hex: string }
> = {
  sun: { bg: 'bg-sun', soft: 'bg-sun-soft', text: 'text-sun-deep', ring: 'ring-sun', hex: 'var(--color-sun)' },
  coral: { bg: 'bg-coral', soft: 'bg-coral-soft', text: 'text-coral-deep', ring: 'ring-coral', hex: 'var(--color-coral)' },
  leaf: { bg: 'bg-leaf', soft: 'bg-leaf-soft', text: 'text-leaf-deep', ring: 'ring-leaf', hex: 'var(--color-leaf)' },
  sky: { bg: 'bg-sky', soft: 'bg-sky-soft', text: 'text-sky-deep', ring: 'ring-sky', hex: 'var(--color-sky)' },
  grape: { bg: 'bg-grape', soft: 'bg-grape-soft', text: 'text-grape-deep', ring: 'ring-grape', hex: 'var(--color-grape)' },
  tangerine: {
    bg: 'bg-tangerine',
    soft: 'bg-tangerine-soft',
    text: 'text-tangerine-deep',
    ring: 'ring-tangerine',
    hex: 'var(--color-tangerine)',
  },
}
