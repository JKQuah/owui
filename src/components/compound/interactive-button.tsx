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
   * The one hover animation (they never combine). `swipe` shifts the label
   * away from the icon while the icon swipes in from left to right; the icon
   * is positioned outside the layout, so the button never changes width.
   * `underline` draws a line under the label from left to right and keeps the
   * icon always visible. `none` has no animation and the icon is always visible.
   */
  animation?: "none" | "underline" | "swipe"
}

// Half of (icon width + gap): how far the label moves to make room.
const labelShift = {
  left: "group-hover/ib:translate-x-3 group-focus-visible/ib:translate-x-3",
  right: "group-hover/ib:-translate-x-3 group-focus-visible/ib:-translate-x-3",
} as const

// The swipe icon is absolutely positioned beside the label.
const swipeIconSide = {
  left: "right-full mr-2",
  right: "left-full ml-2",
} as const

/**
 * `Button` with one hover animation (icon swipe or underline). Accepts every `Button` prop except `asChild`.
 *
 * Hooks: `.interactive-button` root, `.interactive-button-icon`,
 * `.interactive-button-label`. Motion is disabled for `prefers-reduced-motion`
 * (the swipe icon then stays visible and the underline doesn't move).
 */
function InteractiveButton({
  children,
  icon,
  iconPosition = "right",
  animation = "swipe",
  className,
  ...props
}: InteractiveButtonProps) {
  const swipe = animation === "swipe"

  const iconNode = icon ? (
    <span
      data-slot="interactive-button-icon"
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0",
        swipe
          ? [
              "absolute top-1/2 -translate-y-1/2",
              swipeIconSide[iconPosition],
              "[clip-path:inset(0_100%_0_0)] opacity-0 transition-[clip-path,opacity] duration-300 ease-out",
              "group-hover/ib:[clip-path:inset(0)] group-hover/ib:opacity-100 group-focus-visible/ib:[clip-path:inset(0)] group-focus-visible/ib:opacity-100",
              "motion-reduce:[clip-path:inset(0)] motion-reduce:opacity-100 motion-reduce:transition-none",
            ]
          : iconPosition === "left"
            ? "mr-2"
            : "ml-2",
        "interactive-button-icon"
      )}
    >
      {icon}
    </span>
  ) : null

  const label = (
    <span
      data-slot="interactive-button-label"
      className={cn(
        "relative text-center",
        swipe &&
          cn(
            "transition-transform duration-300 ease-out motion-reduce:transition-none",
            labelShift[iconPosition],
            "motion-reduce:translate-x-0"
          ),
        animation === "underline" &&
          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:content-[''] group-hover/ib:after:origin-left group-hover/ib:after:scale-x-100 group-focus-visible/ib:after:origin-left group-focus-visible/ib:after:scale-x-100 motion-reduce:after:transition-none",
        "interactive-button-label"
      )}
    >
      {children}
      {swipe && iconNode}
    </span>
  )

  return (
    <Button
      data-slot="interactive-button"
      data-icon-position={iconPosition}
      data-animation={animation}
      className={cn(
        "group/ib gap-0 transition-[color,background-color,box-shadow,transform] duration-200 ease-out",
        "motion-reduce:transform-none motion-reduce:transition-none",
        "interactive-button",
        className
      )}
      {...props}
    >
      {!swipe && iconPosition === "left" && iconNode}
      {label}
      {!swipe && iconPosition === "right" && iconNode}
    </Button>
  )
}

export { InteractiveButton }
export type { InteractiveButtonProps }
