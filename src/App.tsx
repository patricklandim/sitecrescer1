import { MotionConfig } from 'motion/react'
import { FloatingActions } from '@/components/layout/floating-actions'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { StructuredData } from '@/components/seo/structured-data'
import { About } from '@/components/sections/about'
import { Care } from '@/components/sections/care'
import { Contact } from '@/components/sections/contact'
import { Faq } from '@/components/sections/faq'
import { Founder } from '@/components/sections/founder'
import { Gallery } from '@/components/sections/gallery'
import { Hero } from '@/components/sections/hero'
import { Journey } from '@/components/sections/journey'
import { Manifesto } from '@/components/sections/manifesto'
import { Specialties } from '@/components/sections/specialties'
import { Team } from '@/components/sections/team'
import { Trust } from '@/components/sections/trust'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-brand-900 px-5 py-3 font-semibold text-cream-50 transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Specialties />
        <Trust />
        <Journey />
        <Founder />
        <Team />
        <Manifesto />
        <Gallery />
        <Care />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <StructuredData />
    </MotionConfig>
  )
}
