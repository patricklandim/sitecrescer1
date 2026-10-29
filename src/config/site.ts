/**
 * Configuração central da Clínica Crescer.
 *
 * Tudo o que é institucional (contatos, redes, equipe, fotos) fica aqui.
 * Campos `null` ou listas vazias significam "ainda não fornecido pela clínica":
 * o site esconde automaticamente o que depende deles, sem publicar dados fictícios.
 * Procure por "PENDENTE" para ver o que falta preencher.
 */

export type SocialLink = { label: string; href: string; network: 'instagram' | 'facebook' }

export type TeamMember = {
  name: string
  role: string
  /** Registro profissional (ex.: CRP), somente se confirmado */
  registry?: string
  photo?: string
  specialty?: string
}

export type GalleryPhoto = { src: string; alt: string; width: number; height: number }

export type Testimonial = { quote: string; author: string; context?: string }

export const site = {
  name: 'Clínica Crescer',
  tagline: 'Crescer é evoluir todos os dias',

  /** PENDENTE: domínio oficial, usado em canonical/og:url e dados estruturados */
  url: null as string | null,

  contact: {
    /**
     * PENDENTE: número oficial do WhatsApp, somente dígitos com DDI e DDD (ex.: '5535999999999').
     * O template antigo exibia "+55 35 8459-6541", que tem apenas 8 dígitos após o DDD
     * (celulares brasileiros têm 9) e o link apontava para outro número fictício.
     * Por segurança, a integração fica desativada até a confirmação.
     */
    whatsapp: null as string | null,
    /** PENDENTE: e-mail oficial */
    email: null as string | null,
    /** PENDENTE: endereço completo */
    address: null as string | null,
    /** PENDENTE: link do Google Maps */
    mapsUrl: null as string | null,
    /** PENDENTE: horário de funcionamento (ex.: 'Segunda a sexta, 8h às 18h') */
    hours: null as string | null,
  },

  /**
   * PENDENTE: serviço de formulário (ex.: endpoint do Formspree "https://formspree.io/f/xxxx").
   * Se preenchido, o formulário envia por ele; caso contrário, usa o WhatsApp quando configurado.
   * Também pode ser definido no build pela variável de ambiente VITE_FORM_ENDPOINT.
   */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || null,

  /** PENDENTE: perfis oficiais da clínica. */
  socials: [] as SocialLink[],

  founder: {
    name: 'Stéfany Nunes Almeida',
    role: 'Psicóloga e fundadora',
    photo: 'images/stefany-nunes.png',
    photoAlt: 'Stéfany Nunes Almeida, psicóloga e fundadora da Clínica Crescer, sorrindo com o uniforme da clínica',
    /** Perfis pessoais encontrados no projeto original */
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/stefanynunesa/', network: 'instagram' },
      { label: 'Facebook', href: 'https://www.facebook.com/stefany.nunes.3?locale=pt_BR', network: 'facebook' },
    ] as SocialLink[],
  },

  /**
   * Profissionais da equipe. A fundadora já aparece aqui porque nome, função e foto foram confirmados.
   * PENDENTE: demais profissionais (nome, especialidade, registro e foto autorizada).
   */
  team: [
    {
      name: 'Stéfany Nunes Almeida',
      role: 'Psicóloga · Fundadora',
      photo: 'images/stefany-nunes.png',
      specialty: 'psicologia',
    },
  ] as TeamMember[],

  /** PENDENTE: fotos autorizadas dos ambientes. A galeria só aparece quando houver fotos. */
  gallery: [] as GalleryPhoto[],

  /** PENDENTE: depoimentos reais e autorizados. Sem eles, exibimos o bloco de acolhimento. */
  testimonials: [] as Testimonial[],

  /** PENDENTE: foto de destaque autorizada para o hero. Sem ela, usamos a composição ilustrada. */
  heroImage: null as { src: string; alt: string } | null,
}

export const whatsappLink = (message?: string) => {
  if (!site.contact.whatsapp) return null
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${site.contact.whatsapp}${text}`
}
