import { useEffect, useMemo, useRef, type ComponentProps } from "react"
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

type NumberTickerProps = Omit<ComponentProps<"span">, "children"> & {
  /** Number to count to (or from, when `direction` is `down`). */
  value: number
  /** Number to count from (or to, when `direction` is `down`). */
  startValue?: number
  /** `up` counts startValue → value, `down` counts value → startValue. */
  direction?: "up" | "down"
  /** Seconds to wait after the ticker scrolls into view. */
  delay?: number
  /** Digits after the decimal point. */
  decimalPlaces?: number
}

/**
 * Counts to a number once it scrolls into view. Colour is inherited, so it
 * works on any `Container` variant. Override hook: `.number-ticker`.
 * Users with `prefers-reduced-motion` see the final number immediately.
 */
function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const from = direction === "down" ? value : startValue
  const to = direction === "down" ? startValue : value

  const format = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format,
    [decimalPlaces]
  )

  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      motionValue.jump(to)
      return
    }
    const timer = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => clearTimeout(timer)
  }, [motionValue, isInView, reduceMotion, delay, to])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, format, decimalPlaces]
  )

  return (
    <span
      ref={ref}
      data-slot="number-ticker"
      className={cn("inline-block tracking-wider tabular-nums number-ticker", className)}
      {...props}
    >
      {format(from)}
    </span>
  )
}

export { NumberTicker }
export type { NumberTickerProps }
