import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Live on the custom domain (www canonical; apex redirects to www via GitHub Pages).
  site: 'https://www.primarycareandbeyond.com',
  // Generates sitemap-index.xml + sitemap-0.xml at build (referenced by robots.txt).
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
