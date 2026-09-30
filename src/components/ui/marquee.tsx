import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = ComponentProps<"div"> & {
  /** Scroll in the opposite direction. */
  reverse?: boolean;
  /** Pause the animation while hovered. */
  pauseOnHover?: boolean;
  /** Scroll top-to-bottom. Give the marquee a fixed height when using this. */
  vertical?: boolean;
  /** How many copies of the children to render. Raise it for short content. */
  repeat?: number;
};

/**
 * Endlessly scrolling row (or column) of children.
 *
 * Speed and spacing are CSS variables, so override them with plain CSS:
 * `.marquee { --duration: 20s; --gap: 2rem; }`.
 * Hooks: `.marquee` root, `.marquee-track` each scrolling copy.
 * Animation is disabled for users with `prefers-reduced-motion`.
 */
function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      data-orientation={vertical ? "vertical" : "horizontal"}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-(--gap)",
        vertical ? "flex-col" : "flex-row",
        "marquee",
        className,
      )}
      {...props}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          data-slot="marquee-track"
          // Copies after the first are visual filler only.
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) motion-reduce:animate-none",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            pauseOnHover && "group-hover:paused",
            reverse && "direction-[reverse]",
            "marquee-track",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export { Marquee };
export type { MarqueeProps };
