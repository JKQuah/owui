export { cn } from "./lib/utils"
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button"
export { Container, containerVariants, type ContainerProps } from "./components/ui/container"
export { Marquee, type MarqueeProps } from "./components/ui/marquee"
export { NumberTicker, type NumberTickerProps } from "./components/ui/number-ticker"
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination"
export { Typography, typographyVariants } from "./components/ui/typography"
export { InteractiveButton, type InteractiveButtonProps } from "./components/compound/interactive-button"
export {
  NewsCarousel,
  type NewsCarouselProps,
  type NewsItem,
  type NewsImageEffect,
} from "./components/compound/news-carousel"
export { TextBlock, type TextBlockProps } from "./components/compound/text-block"

// Importing the stylesheet here makes the build emit it as dist/owui.css.
import "./styles/global.css"
