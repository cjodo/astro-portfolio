// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import db from '@astrojs/db';

const port = Number(process.env.PORT) || 3000;

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({ mode: 'standalone' }),
  integrations: [db()],
  server: { port } // Reads Railway's PORT automatically
});

