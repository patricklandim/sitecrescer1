import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { navItems } from '@/config/content'
import { useActiveSection, useScroll } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/logo'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const sectionIds = navItems.map((item) => item.href.slice(1))
const dots = ['bg-sun', 'bg-coral', 'bg-leaf', 'bg-sky', 'bg-grape', 'bg-tangerine']

export function Header() {
  const { y, direction } = useScroll()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const pendingTarget = useRef<string | null>(null)

  const scrolled = y > 24
  const hidden = direction === 'down' && y > 480 && !open

  // No mobile, fechamos o menu primeiro e só então rolamos até a seção,
  // evitando conflito com o bloqueio de rolagem do diálogo.
  function goTo(href: string) {
    pendingTarget.current = href
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        hidden && '-translate-y-full',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-full py-2 pr-2 pl-3 transition-[background-color,box-shadow,backdrop-filter] duration-500 sm:pl-4',
            scrolled
              ? 'bg-cream-50/80 shadow-[0_12px_40px_-20px_rgb(22_58_43/0.35)] ring-1 ring-brand-900/5 backdrop-blur-xl'
              : 'bg-transparent',
          )}
        >
          <a href="#inicio" className="rounded-2xl" aria-label="Clínica Crescer, voltar ao início">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1)
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'relative block rounded-full px-4 py-2 text-[0.95rem] whitespace-nowrap font-medium transition-colors',
                        isActive ? 'text-brand-900' : 'text-brand-900/70 hover:text-brand-900',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-brand-800/8"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden h-11 pr-2 pl-5 sm:inline-flex">
              <a href="#contato">
                Fale conosco
                <ButtonArrow />
              </a>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-brand-800/6 xl:hidden" aria-label="Abrir menu">
                  <Menu className="size-5" aria-hidden />
                </Button>
              </DialogTrigger>
              <DialogContent
                closeLabel="Fechar menu"
                overlayClassName="bg-brand-950/40"
                className="top-3 left-3 w-[calc(100%-1.5rem)] max-w-none translate-x-0 translate-y-0 rounded-[2rem] p-6 pt-20 data-[state=open]:animate-[sheet-in_320ms_cubic-bezier(0.22,1,0.36,1)]"
                onCloseAutoFocus={(e) => {
                  const target = pendingTarget.current
                  if (!target) return
                  e.preventDefault()
                  pendingTarget.current = null
                  document.querySelector(target)?.scrollIntoView()
                  history.replaceState(null, '', target)
                }}
              >
                <DialogTitle className="sr-only">Menu de navegação</DialogTitle>
                <DialogDescription className="sr-only">Links para as seções do site</DialogDescription>
                <div className="absolute top-5 left-6">
                  <Logo />
                </div>
                <nav aria-label="Menu móvel">
                  <ul className="flex flex-col">
                    {navItems.map((item, i) => (
                      <li key={item.href} className="border-b border-border last:border-0">
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault()
                            goTo(item.href)
                          }}
                          className="flex items-center gap-4 py-4 font-display text-[1.75rem] font-semibold tracking-tight text-brand-900"
                        >
                          <span aria-hidden className={cn('size-2.5 rounded-full', dots[i % dots.length])} />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button
                  size="lg"
                  className="mt-6 w-full justify-between pr-2.5"
                  onClick={() => goTo('#contato')}
                >
                  Fale com nossa equipe
                  <ButtonArrow />
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  )
}
