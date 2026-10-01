import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    // The project's vite.config.ts is a library build. Storybook needs the
    // app-style config, so drop the declaration plugin and the lib settings.
    const plugins = (config.plugins ?? []).flat(Infinity) as { name?: string }[]
    config.plugins = plugins.filter((p) => !p?.name?.includes("dts"))
    if (config.build) {
      delete config.build.lib
      delete config.build.rollupOptions
    }
    return config
  },
}

export default config
