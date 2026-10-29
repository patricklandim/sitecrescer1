import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'rounded-3xl border border-border bg-card transition-colors duration-300 data-[state=open]:border-brand-800/15 data-[state=open]:bg-cream-50',
      className,
    )}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center justify-between gap-6 rounded-3xl px-6 py-5 text-left font-display text-lg font-semibold text-brand-900 sm:px-7 sm:text-xl',
        className,
      )}
      {...props}
    >
      {children}
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-[background-color,color,transform] duration-300 group-hover:bg-brand-100 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand-800 group-data-[state=open]:text-cream-50">
        <Plus className="size-5" aria-hidden />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-[accordion-up_250ms_ease-out] data-[state=open]:animate-[accordion-down_300ms_ease-out]"
    {...props}
  >
    <div className={cn('px-6 pb-6 text-base leading-relaxed text-muted-foreground sm:px-7 sm:text-[1.05rem]', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'
