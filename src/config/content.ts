import { ClipboardList, HeartHandshake, MessageCircle, Route, Sparkles, Sprout, Users, Microscope, type LucideIcon } from 'lucide-react'
import { site } from './site'

/** Textos institucionais. Todos derivam do conteúdo do site original. */

export const navItems = [
  { href: '#clinica', label: 'A clínica' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
]

export const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Users,
    title: 'Equipe multidisciplinar',
    text: 'Profissionais de diferentes áreas dedicados ao progresso e ao bem-estar de cada criança.',
  },
  {
    icon: Microscope,
    title: 'Baseado em evidências',
    text: 'Terapias fundamentadas em evidências científicas, como a Análise do Comportamento Aplicada (ABA).',
  },
  {
    icon: Route,
    title: 'Cuidado individualizado',
    text: 'Cada criança tem um plano terapêutico personalizado, construído a partir da avaliação inicial.',
  },
  {
    icon: HeartHandshake,
    title: 'Família por perto',
    text: 'Apoiamos crianças e suas famílias em cada etapa, promovendo aprendizagem, inclusão e qualidade de vida.',
  },
]

export const journey: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessageCircle,
    title: 'Primeiro contato',
    text: 'A família entra em contato com a clínica para contar um pouco sobre a criança e tirar dúvidas.',
  },
  {
    icon: ClipboardList,
    title: 'Avaliação inicial',
    text: 'Conhecemos a criança e suas necessidades para entender quais áreas podem apoiar seu desenvolvimento.',
  },
  {
    icon: Route,
    title: 'Plano terapêutico personalizado',
    text: 'A partir da avaliação, é definido um plano individualizado, pensado para a criança e sua rotina.',
  },
  {
    icon: Sparkles,
    title: 'Terapias especializadas',
    text: 'As sessões acontecem com a equipe multidisciplinar, de acordo com o plano de cada criança.',
  },
  {
    icon: Sprout,
    title: 'Acompanhamento do desenvolvimento',
    text: 'A evolução é acompanhada de perto, junto com a família, celebrando cada pequena conquista.',
  },
]

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Quais especialidades a Clínica Crescer oferece?',
    answer:
      'Contamos com Psicologia, Fisioterapia, Fonoaudiologia, Terapia ABA, Psicopedagogia e Terapia Ocupacional, reunidas em uma equipe multidisciplinar dedicada ao desenvolvimento infantil.',
  },
  {
    question: 'Para quem é o atendimento?',
    answer:
      'Oferecemos atendimento especializado para crianças com desenvolvimento neuroatípico e apoio às suas famílias. Se você tem dúvidas sobre o desenvolvimento do seu filho, entre em contato para conversar com a nossa equipe.',
  },
  {
    question: 'O que é a Terapia ABA?',
    answer:
      'ABA significa Análise do Comportamento Aplicada. É uma metodologia baseada em evidências científicas, utilizada no desenvolvimento de crianças com TEA e outros transtornos do neurodesenvolvimento.',
  },
  {
    question: 'Como funciona o início do atendimento?',
    answer:
      'O primeiro passo é entrar em contato com a clínica. Depois, a criança passa por uma avaliação inicial, que orienta a construção de um plano terapêutico personalizado.',
  },
  {
    question: 'Como a família participa do processo?',
    answer:
      'A família faz parte do cuidado. Nossa equipe apoia as crianças e suas famílias em cada etapa do desenvolvimento, acompanhando a evolução de perto.',
  },
  {
    question: 'Quais são os valores, horários e formas de pagamento ou convênios?',
    answer:
      'Essas informações são passadas diretamente pela nossa equipe no primeiro contato, de acordo com a necessidade de cada família.',
  },
]

export const manifesto = {
  words: ['Crescer', 'é', 'evoluir', 'todos', 'os', 'dias'],
  ribbon: ['Acolhimento', 'Desenvolvimento', 'Família', 'Evidências', 'Inclusão', 'Cuidado', 'Conquistas', 'Aprendizagem'],
}

export const about = {
  statement: 'Onde cada pequena evolução se transforma em uma grande conquista.',
  paragraphs: [
    `Na ${site.name}, oferecemos atendimento especializado para crianças com desenvolvimento neuroatípico, com uma equipe multidisciplinar dedicada ao progresso e ao bem-estar de cada paciente.`,
    'Acompanhamos o desenvolvimento de cada criança com cuidado, dedicação e terapias baseadas em evidências científicas, promovendo aprendizagem, inclusão e qualidade de vida.',
  ],
}

export const founderText = {
  quote: 'Acredito que cada criança possui um potencial único, e que com o acompanhamento adequado é possível promover avanços significativos em seu desenvolvimento.',
  paragraphs: [
    'Stéfany é psicóloga e fundadora da Clínica Crescer, criada com o propósito de oferecer atendimento especializado para crianças com desenvolvimento neuroatípico.',
    'Por isso, a clínica trabalha com terapias baseadas em evidências científicas, como a Análise do Comportamento Aplicada (ABA), e conta com uma equipe multidisciplinar dedicada a apoiar crianças e suas famílias.',
  ],
}
