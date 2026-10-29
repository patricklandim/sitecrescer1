import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { whatsappLink } from '@/config/site'
import { useScroll } from '@/hooks/use-scroll'

/** Botões fixos: WhatsApp (apenas com número oficial configurado) e voltar ao topo. */
export function FloatingActions() {
  const { y } = useScroll()
  const visible = y > 600
  const whatsapp = whatsappLink('Olá! Gostaria de saber mais sobre o atendimento da Clínica Crescer.')

  return (
    <div className="pointer-events-none fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {visible && (
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="pointer-events-auto grid size-12 place-items-center rounded-full bg-cream-50 text-brand-900 shadow-[0_12px_30px_-12px_rgb(13_34_25/0.5)] ring-1 ring-brand-900/10 transition-colors hover:bg-brand-900 hover:text-cream-50"
          >
            <ArrowUp className="size-5" aria-hidden />
            <span className="sr-only">Voltar ao topo</span>
          </motion.button>
        )}
      </AnimatePresence>

      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto grid size-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-[0_14px_34px_-12px_rgb(31_157_85/0.8)] transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.43-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.43 9.42Zm8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.62l6.02-1.58a11.3 11.3 0 0 0 5.41 1.38h.01c6.24 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.03Z" />
          </svg>
          <span className="sr-only">Conversar pelo WhatsApp (abre em nova aba)</span>
        </a>
      )}
    </div>
  )
}
