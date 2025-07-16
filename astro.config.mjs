// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("/draft/") && !page.includes("/contact-test/")
    })
  ],
  output: 'static',
  server: {
    port: 4321,
    host: true
  },
  base: "/land-vista/",
  site: "https://kasaman04.github.io/land-vista/",
});
