import compression from 'compression';
import { createServer } from 'node:http';
import { handler as handle } from './dist/server/entry.mjs';

const server = createServer((req, res) => {
  // Apply compression
  compression()(req, res, () => {
    handle(req, res);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
