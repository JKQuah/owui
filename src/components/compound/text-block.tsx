import * as React from "react";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * Vertical stack: tagline, icon, title, description, action.
 *
 * Styling hooks (class / `data-slot`):
 * `.text-block` root (owns the `gap`), `.text-block-tagline`,
 * `.text-block-icon`, `.text-block-title`, `.text-block-description`,
 * `.text-block-points` (+ `-point`, `-point-icon`, `-point-content`),
 * `.text-block-extra`, `.text-block-action`.
 */
type TextBlockLink = {
  text: string;
  href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"`. */
  external?: boolean;
};

/** A piece of point content: plain text or a link. */
type TextBlockPointSegment = string | TextBlockLink;

/**
 * A string, any node, or an array mixing plain text and links, e.g.
 * `["Read the ", { text: "docs", href: "/docs" }, " first."]`.
 */
type TextBlockPoint = React.ReactNode | TextBlockPointSegment[];

type TextBlockProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Small eyebrow line above everything else. */
  tagline?: React.ReactNode;
  /** Decorative icon shown between the tagline and the title. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Bullet list rendered below the description. */
  points?: TextBlockPoint[];
  /** Marker shared by every point. Defaults to a text bullet ("•"). */
  pointIcon?: React.ReactNode;
  /** Free-form slot rendered below the points and above the action. */
  extra?: React.ReactNode;
  /** Call-to-action slot, typically a `<Button>`. */
  action?: React.ReactNode;
};

const DEFAULT_POINT_ICON = "•";

function isLink(segment: unknown): segment is TextBlockLink {
  return (
    typeof segment === "object" &&
    segment !== null &&
    !React.isValidElement(segment) &&
    "href" in segment
  );
}

function renderPoint(content: TextBlockPoint) {
  if (!Array.isArray(content)) return content as React.ReactNode;
  return content.map((segment, i) =>
    isLink(segment) ? (
      <a
        key={i}
        href={segment.href}
        className="underline underline-offset-4 hover:text-primary"
        {...(segment.external && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        {segment.text}
      </a>
    ) : (
      <React.Fragment key={i}>{segment as React.ReactNode}</React.Fragment>
    ),
  );
}

function TextBlock({
  tagline,
  icon,
  title,
  description,
  points,
  pointIcon,
  extra,
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
      {points && points.length > 0 && (
        <ul
          data-slot="text-block-points"
          className="flex flex-col gap-2 text-block-points"
        >
          {points.map((point, i) => (
            <li
              key={i}
              data-slot="text-block-point"
              className="flex items-start gap-2 text-block-point"
            >
              <span
                aria-hidden={pointIcon === undefined ? true : undefined}
                data-slot="text-block-point-icon"
                className="text-primary shrink-0 [&_svg:not([class*='size-'])]:size-5 text-block-point-icon"
              >
                {pointIcon ?? DEFAULT_POINT_ICON}
              </span>
              <span
                data-slot="text-block-point-content"
                className="text-block-point-content"
              >
                {renderPoint(point)}
              </span>
            </li>
          ))}
        </ul>
      )}
      {extra && (
        <div data-slot="text-block-extra" className="text-block-extra">
          {extra}
        </div>
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
export type {
  TextBlockLink,
  TextBlockPoint,
  TextBlockPointSegment,
  TextBlockProps,
};
