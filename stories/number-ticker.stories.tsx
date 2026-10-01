import type { Meta, StoryObj } from "@storybook/react-vite"

import { NumberTicker } from "@/components/ui/number-ticker"

const meta = {
  title: "UI/NumberTicker",
  component: NumberTicker,
  args: { value: 12500, startValue: 0, direction: "up", delay: 0, decimalPlaces: 0, className: "text-5xl font-bold" },
  argTypes: {
    direction: { control: "inline-radio", options: ["up", "down"] },
    decimalPlaces: { control: { type: "number", min: 0, max: 4 } },
    delay: { control: { type: "number", min: 0, step: 0.1 } },
  },
  // Re-mount on any control change so the count-up replays.
  decorators: [(Story, { args }) => <Story key={JSON.stringify(args)} />],
} satisfies Meta<typeof NumberTicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Decimals: Story = { args: { value: 98.6, decimalPlaces: 1 } }

export const CountDown: Story = { args: { value: 100, startValue: 0, direction: "down" } }
