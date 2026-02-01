# Railway Deployment

This Astro portfolio site is configured for deployment on Railway.

## Deployment Configuration

- **Build Command**: `npm run build`
- **Start Command**: `node dist/server/entry.mjs`
- **Node Version**: Railway will automatically detect from package.json

## Environment Variables

Ensure these environment variables are set in Railway:

- `ASTRO_DATABASE_URL`: Database connection string (if using Astro DB)
- Any other required environment variables from `.env.example`

## Deploying to Railway

1. Push your code to a Git repository
2. Connect the repository to Railway
3. Railway will automatically build and deploy using the configuration in `railway.json`

## Local Development

```bash
npm install
npm run dev
```

## Build Test

To test the build locally:

```bash
npm run build
npm run preview
```