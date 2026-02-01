FROM node:lts AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --remote

FROM node:lts AS runtime
WORKDIR /app

# Copy built files and dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]

