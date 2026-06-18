import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Live on the custom domain (www canonical; apex redirects to www via GitHub Pages).
  site: 'https://www.primarycareandbeyond.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
