import type { ReactNode } from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type InteractiveButtonProps = Omit<ButtonProps, "asChild" | "children"> & {
  children: ReactNode
  /** Icon shown next to the label. Colour and size follow the button. */
  icon?: ReactNode
  /** Which side of the label the icon sits on. */
  iconPosition?: "left" | "right"
  /**
   * How the icon appears on hover. `fade` fades it in, `slide` fades it in
   * while moving in from its outer edge, `none` keeps it always visible.
   * The icon's space is always reserved, so the button never changes size.
   */
  iconAnimation?: "none" | "fade" | "slide"
  /** Draw an underline under the label from left to right on hover. */
  underline?: boolean
  /** Whole-button feedback: `lift` raises it, `scale` grows it. */
  effect?: "none" | "lift" | "scale"
}

const iconAnimationClasses = {
  none: "",
  fade: "opacity-0 group-hover/ib:opacity-100 group-focus-visible/ib:opacity-100",
  slide:
    "opacity-0 group-hover/ib:translate-x-0 group-hover/ib:opacity-100 group-focus-visible/ib:translate-x-0 group-focus-visible/ib:opacity-100",
} as const

// `slide` starts offset towards the button's outer edge.
const slideOffset = {
  left: "-translate-x-1",
  right: "translate-x-1",
} as const

const effectClasses = {
  none: "",
  lift: "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
  scale: "hover:scale-[1.03] active:scale-[0.97]",
} as const

/**
 * `Button` with an animated icon, an optional left-to-right underline and
 * whole-button hover effects. Accepts every `Button` prop except `asChild`.
 *
 * Hooks: `.interactive-button` root, `.interactive-button-icon`,
 * `.interactive-button-label`. Motion is disabled for `prefers-reduced-motion`
 * (the icon then stays visible and the underline and effects don't move).
 */
function InteractiveButton({
  children,
  icon,
  iconPosition = "right",
  iconAnimation = "fade",
  underline = false,
  effect = "none",
  className,
  ...props
}: InteractiveButtonProps) {
  const iconNode = icon ? (
    <span
      data-slot="interactive-button-icon"
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 transition-[opacity,translate] duration-200 ease-out",
        "motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        iconAnimationClasses[iconAnimation],
        iconAnimation === "slide" && slideOffset[iconPosition],
        "interactive-button-icon"
      )}
    >
      {icon}
    </span>
  ) : null

  return (
    <Button
      data-slot="interactive-button"
      data-icon-position={iconPosition}
      data-icon-animation={iconAnimation}
      className={cn(
        "group/ib transition-[color,background-color,box-shadow,transform] duration-200 ease-out",
        "motion-reduce:transform-none motion-reduce:transition-none",
        effectClasses[effect],
        "interactive-button",
        className
      )}
      {...props}
    >
      {iconPosition === "left" && iconNode}
      <span
        data-slot="interactive-button-label"
        className={cn(
          "relative",
          underline &&
            "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:content-[''] group-hover/ib:after:origin-left group-hover/ib:after:scale-x-100 group-focus-visible/ib:after:origin-left group-focus-visible/ib:after:scale-x-100 motion-reduce:after:transition-none",
          "interactive-button-label"
        )}
      >
        {children}
      </span>
      {iconPosition === "right" && iconNode}
    </Button>
  )
}

export { InteractiveButton }
export type { InteractiveButtonProps }
