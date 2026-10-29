import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-800 text-cream-50 shadow-[0_10px_30px_-12px_rgb(29_74_54/0.7)] hover:bg-brand-700 hover:shadow-[0_16px_36px_-14px_rgb(29_74_54/0.8)]',
        brand: 'bg-brand-500 text-cream-50 hover:bg-brand-600',
        light: 'bg-cream-50 text-brand-900 hover:bg-sun',
        outline: 'border border-brand-800/20 bg-transparent text-brand-900 hover:border-brand-800 hover:bg-brand-800 hover:text-cream-50',
        ghost: 'text-brand-900 hover:bg-brand-900/5',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-[0.95rem]',
        lg: 'h-14 px-7 text-base',
        icon: 'size-12',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  },
)
Button.displayName = 'Button'

/** Ícone de seta que desliza no hover do botão */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative grid size-7 place-items-center overflow-hidden rounded-full bg-current/10',
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 transition-transform duration-300 group-hover/button:translate-x-[130%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
      <svg
        viewBox="0 0 16 16"
        className="absolute size-3.5 -translate-x-[130%] transition-transform duration-300 group-hover/button:translate-x-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </span>
  )
}

export { buttonVariants }
