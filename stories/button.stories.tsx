import type { Meta, StoryObj } from "@storybook/react-vite"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const
const sizes = ["xs", "sm", "default", "lg"] as const

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: [...sizes, "icon", "icon-xs", "icon-sm", "icon-lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail /> Login with email
    </Button>
  ),
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-24 text-sm">{variant}</span>
          {sizes.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {size}
            </Button>
          ))}
          <Button variant={variant} size="icon" aria-label="mail">
            <Mail />
          </Button>
        </div>
      ))}
    </div>
  ),
}
