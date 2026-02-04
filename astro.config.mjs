// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import db from '@astrojs/db';
import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [db(), node({ mode: 'standalone' }), sitemap()],
  output: 'server',
  adapter: node({ mode: 'standalone' }),
    server: {
        port: 8080
    }
});