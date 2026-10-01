import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const

type Args = { activeVariant: (typeof variants)[number]; inactiveVariant: (typeof variants)[number] }

const meta: Meta<Args> = {
  title: "UI/Pagination",
  argTypes: {
    activeVariant: { control: "select", options: variants },
    inactiveVariant: { control: "select", options: variants },
  },
  args: { activeVariant: "outline", inactiveVariant: "ghost" },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: ({ activeVariant, inactiveVariant }) => (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" inactiveVariant={inactiveVariant} /></PaginationItem>
        <PaginationItem><PaginationLink href="#" inactiveVariant={inactiveVariant}>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive activeVariant={activeVariant}>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" inactiveVariant={inactiveVariant}>3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext href="#" inactiveVariant={inactiveVariant} /></PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}
