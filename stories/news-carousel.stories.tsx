import type { Meta, StoryObj } from "@storybook/react-vite"

import { NewsCarousel, type NewsItem } from "@/components/compound/news-carousel"

// Offline placeholder images (inline SVG gradients).
const image = (from: string, to: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/></svg>`
  )}`

const items: NewsItem[] = [
  { date: "April 1, 2026", title: "Ant International Becomes Official Sponsor of The Argentine National Football Team", image: image("#1e3a8a", "#7c3aed"), href: "#1" },
  { date: "July 18, 2025", title: "Citi and Ant International Pilot AI-enabled Forecasting Solution to Enhance FX Risk Management for Airline Customers", image: image("#0ea5e9", "#f59e0b"), href: "#2" },
  { date: "July 10, 2025", title: "Ant International and DBS Recognized for Secure, Smart-Contract-Driven Treasury Tokens at 2025 Triple A Treasurise Awards", image: image("#78350f", "#d6d3d1"), href: "#3" },
  { date: "June 2, 2025", title: "Fourth story to scroll to", image: image("#065f46", "#34d399"), href: "#4" },
  { date: "May 20, 2025", title: "Fifth story to scroll to", image: image("#9f1239", "#fb7185"), href: "#5" },
  { date: "May 3, 2025", title: "Sixth story to scroll to", image: image("#3730a3", "#a5b4fc"), href: "#6" },
  { date: "April 14, 2025", title: "Seventh story to scroll to", image: image("#334155", "#94a3b8"), href: "#7" },
]

const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const

const meta = {
  title: "Compound/NewsCarousel",
  component: NewsCarousel,
  args: {
    items,
    imageEffect: "zoom",
    showControls: true,
    controlsAlign: "center",
    activeVariant: "outline",
    inactiveVariant: "ghost",
  },
  argTypes: {
    imageEffect: { control: "inline-radio", options: ["none", "zoom", "corner"] },
    controlsAlign: { control: "inline-radio", options: ["left", "center", "right"] },
    activeVariant: { control: "select", options: variants },
    inactiveVariant: { control: "select", options: variants },
    items: { control: false },
  },
} satisfies Meta<typeof NewsCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const CornerBorderEffect: Story = { args: { imageEffect: "corner" } }
export const PaginationRight: Story = { args: { controlsAlign: "right", activeVariant: "default", inactiveVariant: "outline" } }
