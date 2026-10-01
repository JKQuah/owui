import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRight, Rocket } from "lucide-react"

import { Container } from "@/components/ui/container"
import { InteractiveButton } from "@/components/compound/interactive-button"
import { TextBlock } from "@/components/compound/text-block"

const meta = {
  title: "Compound/TextBlock",
  component: TextBlock,
  args: {
    tagline: "New release",
    icon: <Rocket />,
    title: "Ship faster with reusable components",
    description: "Built on Tailwind v4 and shadcn/ui, tuned for any React project.",
    action: <InteractiveButton icon={<ArrowRight />} animation="underline">Get started</InteractiveButton>,
  },
  argTypes: { icon: { control: false }, action: { control: false } },
  decorators: [
    (Story) => (
      <Container variant="default" size="md">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof TextBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const TitleOnly: Story = {
  args: { tagline: undefined, icon: undefined, description: undefined, action: undefined },
}

export const OnDarkContainer: Story = {
  decorators: [
    (Story) => (
      <Container variant="gradient" size="lg">
        <Story />
      </Container>
    ),
  ],
}
