// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import db from '@astrojs/db';
import node from '@astrojs/node';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [db(), node({ mode: 'standalone' })],
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});

