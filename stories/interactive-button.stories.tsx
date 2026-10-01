import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRight, Download } from "lucide-react"

import { InteractiveButton } from "@/components/compound/interactive-button"

const meta = {
  title: "Compound/InteractiveButton",
  component: InteractiveButton,
  args: {
    children: "Get started",
    icon: <ArrowRight />,
    iconPosition: "right",
    animation: "swipe",
    variant: "default",
    size: "lg",
  },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"] },
    size: { control: "select", options: ["xs", "sm", "default", "lg"] },
    iconPosition: { control: "inline-radio", options: ["left", "right"] },
    animation: { control: "inline-radio", options: ["none", "underline", "swipe"] },
    icon: { control: false },
  },
} satisfies Meta<typeof InteractiveButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const IconOnTheLeft: Story = {
  args: { icon: <Download />, iconPosition: "left", animation: "swipe", children: "Download" },
}
