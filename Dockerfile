FROM node:lts AS runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --remote

CMD node ./dist/server/entry.mjs
