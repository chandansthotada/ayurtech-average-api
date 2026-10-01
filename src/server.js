/**
 * @file Entry point — boots the HTTP server.
 * @module server
 */

const { createApp } = require('./app');

/**
 * TCP port the server listens on. Overridable via `PORT` env var.
 * @constant {number}
 */
const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ayurtech Average API listening on http://localhost:${PORT}`);
});