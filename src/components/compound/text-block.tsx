import * as React from "react";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * Vertical stack: tagline, icon, title, description, action.
 *
 * Styling hooks (class / `data-slot`):
 * `.text-block` root (owns the `gap`), `.text-block-tagline`,
 * `.text-block-icon`, `.text-block-title`, `.text-block-description`,
 * `.text-block-action`.
 */
type TextBlockProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Small eyebrow line above everything else. */
  tagline?: React.ReactNode;
  /** Decorative icon shown between the tagline and the title. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Call-to-action slot, typically a `<Button>`. */
  action?: React.ReactNode;
};

function TextBlock({
  tagline,
  icon,
  title,
  description,
  action,
  className,
  ...props
}: TextBlockProps) {
  return (
    <div
      data-slot="text-block"
      className={cn("flex flex-col items-start gap-4 text-block", className)}
      {...props}
    >
      {tagline && (
        // Rendered as <p> so the heading outline goes h2 -> ... without an h4 first.
        <Typography variant="h4" asChild>
          <p data-slot="text-block-tagline" className="text-block-tagline">
            {tagline}
          </p>
        </Typography>
      )}
      {icon && (
        <div
          data-slot="text-block-icon"
          className="text-primary [&_svg:not([class*='size-'])]:size-8 text-block-icon"
        >
          {icon}
        </div>
      )}
      <Typography
        variant="h2"
        data-slot="text-block-title"
        className="border-b-0 pb-0 text-block-title"
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="p"
          data-slot="text-block-description"
          className="not-first:mt-0 text-block-description"
        >
          {description}
        </Typography>
      )}
      {action && (
        <div data-slot="text-block-action" className="mt-2 text-block-action">
          {action}
        </div>
      )}
    </div>
  );
}

export { TextBlock };
export type { TextBlockProps };
