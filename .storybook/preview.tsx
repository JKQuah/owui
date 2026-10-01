import { useEffect } from "react"
import type { Preview } from "@storybook/react-vite"

import "../src/styles/global.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Light or dark theme (toggles the `.dark` class)",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === "dark"
      useEffect(() => {
        document.documentElement.classList.toggle("dark", dark)
      }, [dark])
      return (
        <div style={{ background: "var(--background)", color: "var(--foreground)", padding: "1.5rem" }}>
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
}

export default preview
