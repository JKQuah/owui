import type { Meta, StoryObj } from "@storybook/react-vite"

import { Marquee } from "@/components/ui/marquee"

const logos = ["Alipay+", "Antom", "Bettr", "WorldFirst", "Zoloz", "Tng"]

const items = logos.map((name) => (
  <div key={name} className="rounded-xl border px-6 py-4 text-lg font-medium whitespace-nowrap">
    {name}
  </div>
))

const meta = {
  title: "UI/Marquee",
  component: Marquee,
  args: { reverse: false, pauseOnHover: true, vertical: false, repeat: 4, children: items },
  argTypes: {
    reverse: { control: "boolean" },
    pauseOnHover: { control: "boolean" },
    vertical: { control: "boolean" },
    repeat: { control: { type: "number", min: 1, max: 8 } },
    children: { control: false },
  },
} satisfies Meta<typeof Marquee>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  // Vertical needs a fixed height, so give the canvas one.
  render: (args) => <Marquee {...args} className={args.vertical ? "h-64" : undefined} />,
}

export const TwoRowsOppositeDirections: Story = {
  render: () => (
    <div className="flex flex-col">
      <Marquee pauseOnHover className="[--duration:20s]">{items}</Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">{items}</Marquee>
    </div>
  ),
}
