import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Project page on GitHub Pages: https://cosacalo.github.io/PCB
  // When the custom domain is wired, set site to 'https://primarycareandbeyond.com'
  // and base to '/' (and add a public/CNAME), then redeploy.
  site: 'https://cosacalo.github.io',
  base: '/PCB',
  vite: {
    plugins: [tailwindcss()],
  },
});
