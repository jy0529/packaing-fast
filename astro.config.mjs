import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://packstudio3d.com',
  trailingSlash: 'never',
  build: {
    assets: 'assets'
  },
  integrations: [sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  })]
});
