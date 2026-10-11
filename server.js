// Starts the cabin book: `npm start`, then http://localhost:44210

import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createApp } from './src/app.js';
import { firstState } from './src/cabin.js';
import { openStore } from './src/store.js';

const PORT = 44210;
const file = fileURLToPath(new URL('./data/hytteboka.json', import.meta.url));

const store = openStore(file, () => firstState());
const server = createServer(createApp({ store }));

// Answers this machine only. Putting the book where the whole office reaches it is a decision still to make.
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Hytteboka er oppe: http://localhost:${PORT}`);
  console.log(`Boka ligger i ${file}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    server.closeAllConnections();
  });
}
