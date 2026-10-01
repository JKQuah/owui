import type { Meta, StoryObj } from "@storybook/react-vite"

import { Typography } from "@/components/ui/typography"

const variants = [
  "h1", "h2", "h3", "h4", "p", "blockquote", "code", "lead", "large", "small", "muted",
] as const

const meta = {
  title: "UI/Typography",
  component: Typography,
  args: { children: "The quick brown fox jumps over the lazy dog" },
  argTypes: { variant: { control: "select", options: variants } },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { variant: "h2" } }

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant}>
          <Typography variant="muted">{variant}</Typography>
          <Typography variant={variant}>{args.children}</Typography>
        </div>
      ))}
    </div>
  ),
}
