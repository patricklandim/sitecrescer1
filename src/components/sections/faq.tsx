import { MessageCircleQuestion } from 'lucide-react'
import { faqs } from '@/config/content'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="duvidas-title"
              eyebrow="Dúvidas frequentes"
              title="Perguntas que as famílias costumam fazer."
            />
            <Reveal delay={0.1} className="mt-10 rounded-[2rem] bg-brand-800 p-8 text-cream-50">
              <MessageCircleQuestion className="size-8 text-sun" aria-hidden />
              <p className="mt-5 font-display text-2xl font-semibold tracking-tight">Não encontrou sua dúvida?</p>
              <p className="mt-2 leading-relaxed text-cream-200/85">
                Fale com a nossa equipe. Vamos explicar como funciona o atendimento.
              </p>
              <Button asChild variant="light" className="mt-6 pr-2">
                <a href="#contato">
                  Entrar em contato
                  <ButtonArrow />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
