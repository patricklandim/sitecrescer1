import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-brand-950/55 backdrop-blur-sm data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_150ms_ease-in]',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = 'DialogOverlay'

type ContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  closeLabel?: string
  closeClassName?: string
  overlayClassName?: string
}

export const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ContentProps>(
  ({ className, children, closeLabel = 'Fechar', closeClassName, overlayClassName, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-cream-50 p-7 shadow-2xl outline-none sm:p-9 data-[state=open]:animate-[dialog-in_280ms_cubic-bezier(0.22,1,0.36,1)]',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            'absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-brand-900/5 text-brand-900 transition-colors hover:bg-brand-900 hover:text-cream-50',
            closeClassName,
          )}
        >
          <X className="size-5" aria-hidden />
          <span className="sr-only">{closeLabel}</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
)
DialogContent.displayName = 'DialogContent'
