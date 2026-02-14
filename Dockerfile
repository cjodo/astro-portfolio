FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Build the app
RUN npm run build

# Expose port
ENV PORT=8080
EXPOSE 8080

# Start the Astro server
CMD ["node", "dist/server/entry.mjs"]
