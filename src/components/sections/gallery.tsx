import { useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { site } from '@/config/site'
import { asset, cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const spans = ['sm:col-span-2 sm:row-span-2', '', '', 'sm:row-span-2', '', 'sm:col-span-2']

/**
 * Galeria dos ambientes com ampliação acessível (teclado: ← →, Esc).
 * Só é renderizada quando `site.gallery` contém fotos reais e autorizadas.
 */
export function Gallery() {
  const photos = site.gallery
  const [index, setIndex] = useState<number | null>(null)

  if (photos.length === 0) return null

  const go = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length))
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }
  const current = index !== null ? photos[index] : null

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="galeria-title" eyebrow="Nosso espaço" title="Ambientes pensados para acolher." />

        <ul className="mt-14 grid auto-rows-[12rem] grid-cols-1 gap-4 sm:auto-rows-[14rem] sm:grid-cols-4">
          {photos.map((photo, i) => (
            <li key={photo.src} className={cn(spans[i % spans.length])}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group relative block size-full overflow-hidden rounded-[1.75rem] bg-cream-200"
                >
                  <img
                    src={asset(photo.src)}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="sr-only">Ampliar foto</span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={current !== null} onOpenChange={(open) => !open && setIndex(null)}>
        {current && (
          <DialogContent
            onKeyDown={onKeyDown}
            className="max-w-5xl bg-brand-950 p-3 sm:p-4"
            closeClassName="bg-cream-50/90 hover:bg-cream-50 hover:text-brand-900"
          >
            <DialogTitle className="sr-only">
              Foto {index! + 1} de {photos.length}
            </DialogTitle>
            <DialogDescription className="sr-only">{current.alt}</DialogDescription>
            <img
              src={asset(current.src)}
              alt={current.alt}
              className="max-h-[80vh] w-full rounded-[1.5rem] object-contain"
            />
            <div className="mt-3 flex items-center justify-between px-2 text-cream-100">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid size-11 place-items-center rounded-full bg-cream-50/10 hover:bg-cream-50/20"
              >
                <ChevronLeft className="size-5" aria-hidden />
                <span className="sr-only">Foto anterior</span>
              </button>
              <span className="text-sm" aria-live="polite">
                {index! + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid size-11 place-items-center rounded-full bg-cream-50/10 hover:bg-cream-50/20"
              >
                <ChevronRight className="size-5" aria-hidden />
                <span className="sr-only">Próxima foto</span>
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
