import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react"
import type { ButtonProps } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

type NewsItem = {
  /** Stable key. Falls back to `href`, then the index. */
  id?: string
  image: string
  /** Leave empty when the title already describes the image. */
  imageAlt?: string
  /** Already formatted, e.g. "April 1, 2026". */
  date: ReactNode
  title: ReactNode
  /** Makes the whole card a link. */
  href?: string
}

type NewsImageEffect = "none" | "zoom" | "corner"

type NewsCarouselProps = Omit<ComponentProps<"section">, "children"> & {
  items: NewsItem[]
  /**
   * Hover effect on the image. `zoom` scales the image in, `corner` draws a
   * rounded border out of the bottom-right corner.
   */
  imageEffect?: NewsImageEffect
  /** Show the pagination below the carousel. One page = one screen of cards. */
  showControls?: boolean
  /** Where the pagination sits under the carousel. */
  controlsAlign?: "left" | "center" | "right"
  /** Button variant of the current page. */
  activeVariant?: ButtonProps["variant"]
  /** Button variant of every other page and of Previous / Next. */
  inactiveVariant?: ButtonProps["variant"]
  /** Accessible name of the carousel region. */
  label?: string
}

const controlsAlignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const

const imageEffectClasses: Record<NewsImageEffect, string> = {
  none: "",
  zoom: "group-hover/news:scale-105 group-focus-visible/news:scale-105 motion-reduce:transform-none",
  corner: "",
}

/**
 * Horizontally scrolling news cards: image, date, title. Three columns on
 * desktop, two below 1000px, one below 640px (desktop-first).
 *
 * Columns and spacing are CSS variables, so override them with plain CSS:
 * `.news-carousel { --columns: 4; --gap: 2rem; }` (your value then applies at
 * every width, so add your own media queries if you still want it to shrink).
 * Hooks: `.news-carousel`, `-track`, `-item`, `-image`, `-image-border`,
 * `-date`, `-title`, `-controls` (the shadcn `Pagination`).
 * `activeVariant` / `inactiveVariant` pick the Button variant of the pages.
 */
function NewsCarousel({
  items,
  imageEffect = "zoom",
  showControls = true,
  controlsAlign = "center",
  activeVariant = "outline",
  inactiveVariant = "ghost",
  label = "Latest news",
  className,
  ...props
}: NewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    // One page is one screenful: the track width plus one gap.
    const step = track.clientWidth + gap
    const count = Math.max(1, Math.ceil((track.scrollWidth + gap) / step - 0.01))
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1
    setPageCount(count)
    setPage(atEnd ? count - 1 : Math.min(count - 1, Math.round(track.scrollLeft / step)))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    update()
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => observer.disconnect()
  }, [update, items.length])

  const goToPage = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    track.scrollTo({
      left: Math.min(index * (track.clientWidth + gap), track.scrollWidth - track.clientWidth),
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  const go = (index: number) => (event: MouseEvent) => {
    event.preventDefault()
    if (index >= 0 && index < pageCount) goToPage(index)
  }

  const disabledClass = "pointer-events-none opacity-50"

  return (
    <section
      data-slot="news-carousel"
      data-image-effect={imageEffect}
      aria-roledescription="carousel"
      aria-label={label}
      className={cn(
        "flex w-full flex-col gap-6 [--columns:3] [--gap:3.5rem] max-md:[--columns:2] max-sm:[--columns:1] max-sm:[--gap:1.5rem]",
        "news-carousel",
        className
      )}
      {...props}
    >
      <div
        ref={trackRef}
        data-slot="news-carousel-track"
        onScroll={update}
        className="flex snap-x snap-mandatory scrollbar-none overflow-x-auto gap-(--gap) [&::-webkit-scrollbar]:hidden news-carousel-track"
      >
        {items.map((item, index) => {
          const Card = item.href ? "a" : "div"
          return (
            <Card
              key={item.id ?? item.href ?? index}
              data-slot="news-carousel-item"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
              href={item.href}
              className="group/news flex shrink-0 basis-[calc((100%-(var(--columns)-1)*var(--gap))/var(--columns))] snap-start flex-col gap-4 rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 news-carousel-item"
            >
              <div
                data-slot="news-carousel-image"
                className="relative mb-4 aspect-video overflow-hidden rounded-2xl news-carousel-image"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  loading="lazy"
                  className={cn(
                    "size-full object-cover transition-transform duration-500 ease-out",
                    imageEffectClasses[imageEffect]
                  )}
                />
                {imageEffect === "corner" && (
                  <span
                    data-slot="news-carousel-image-border"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 bottom-0 size-8 rounded-br-2xl border-r-2 border-b-2 border-white opacity-0 transition-[width,height,opacity] duration-500 ease-out group-hover/news:size-full group-hover/news:opacity-100 group-focus-visible/news:size-full group-focus-visible/news:opacity-100 motion-reduce:transition-none news-carousel-image-border"
                  />
                )}
              </div>
              <Typography
                variant="muted"
                data-slot="news-carousel-date"
                className="text-lg news-carousel-date"
              >
                {item.date}
              </Typography>
              <Typography variant="large" asChild>
                <h3
                  data-slot="news-carousel-title"
                  className="text-xl font-medium news-carousel-title"
                >
                  {item.title}
                </h3>
              </Typography>
            </Card>
          )
        })}
      </div>

      {showControls && pageCount > 1 && (
        <Pagination
          data-slot="news-carousel-controls"
          data-align={controlsAlign}
          className={cn(controlsAlignClasses[controlsAlign], "news-carousel-controls")}
        >
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                inactiveVariant={inactiveVariant}
                aria-disabled={page === 0}
                className={page === 0 ? disabledClass : undefined}
                onClick={go(page - 1)}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index === page}
                  activeVariant={activeVariant}
                  inactiveVariant={inactiveVariant}
                  aria-label={`Go to page ${index + 1}`}
                  onClick={go(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                inactiveVariant={inactiveVariant}
                aria-disabled={page === pageCount - 1}
                className={page === pageCount - 1 ? disabledClass : undefined}
                onClick={go(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  )
}

export { NewsCarousel }
export type { NewsCarouselProps, NewsItem, NewsImageEffect }
