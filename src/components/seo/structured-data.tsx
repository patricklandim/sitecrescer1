import { site } from '@/config/site'

/**
 * Dados estruturados (schema.org) para SEO local.
 * Só são emitidos quando domínio, telefone e endereço oficiais estiverem configurados,
 * evitando publicar informações incompletas ou fictícias.
 */
export function StructuredData() {
  const { url, contact } = site
  if (!url || !contact.whatsapp || !contact.address) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: site.name,
    url,
    telephone: `+${contact.whatsapp}`,
    address: contact.address,
    ...(contact.email && { email: contact.email }),
    medicalSpecialty: 'Pediatric',
    founder: { '@type': 'Person', name: site.founder.name },
    sameAs: site.socials.map((s) => s.href),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
