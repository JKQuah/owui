import type { Meta, StoryObj } from "@storybook/react-vite"

import { Container } from "@/components/ui/container"
import { Typography } from "@/components/ui/typography"

const variants = ["default", "dark", "green", "gradient"] as const
const sizes = ["none", "xs", "sm", "md", "default", "lg", "xl"] as const

const meta = {
  title: "UI/Container",
  component: Container,
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: sizes },
  },
  args: {
    variant: "dark",
    size: "md",
    children: <Typography variant="h3">Container content</Typography>,
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Container key={variant} variant={variant} size="sm" className="border">
          <Typography variant="large">{variant}</Typography>
        </Container>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Container key={size} variant="green" size={size}>
          <Typography variant="large">size: {size}</Typography>
        </Container>
      ))}
    </div>
  ),
}
