import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Styles for `container-*` live in global.css so consumers can override them.
const containerVariants = cva("container-base w-full rounded-xl px-6 max-md:px-4", {
  variants: {
    variant: {
      default: "bg-transparent text-foreground container-default",
      dark: "bg-black text-white container-dark",
      green: "bg-green-600 text-white container-green",
      gradient: "bg-linear-to-br from-emerald-500 via-teal-600 to-slate-900 text-white container-gradient",
    },
    size: {
      none: "py-0 container-none",
      xs: "py-4 max-md:py-3 container-xs",
      sm: "py-8 max-md:py-6 max-sm:py-4 container-sm",
      md: "py-16 max-lg:py-14 max-md:py-12 max-sm:py-8 container-md",
      lg: "py-24 max-lg:py-20 max-md:py-16 max-sm:py-12 container-lg",
      default: "py-24 max-lg:py-20 max-md:py-16 max-sm:py-12 container-lg",
      xl: "py-32 max-lg:py-26 max-md:py-20 max-sm:py-16 container-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ContainerProps = React.ComponentProps<"div"> & {
  /**
   * Background and text colour. Override classes:
   * `.container-default|dark|green|gradient`.
   */
  variant?: VariantProps<typeof containerVariants>["variant"]
  /**
   * Vertical padding, stepping down at max-lg / max-md / max-sm. Override
   * classes: `.container-none|xs|sm|md|lg|xl` (`default` is `lg`).
   */
  size?: VariantProps<typeof containerVariants>["size"]
  /** Render as the child element instead of a `<div>`. */
  asChild?: boolean
}

function Container({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="container"
      data-variant={variant}
      data-size={size}
      className={cn(containerVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Container, containerVariants }
export type { ContainerProps }
