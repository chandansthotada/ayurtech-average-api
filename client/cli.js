#!/usr/bin/env node
/**
 * @file Simple CLI client for the Ayurtech Average API.
 * @module client/cli
 *
 * Usage:
 *   node client/cli.js 5
 *   node client/cli.js 10 --url http://localhost:3000
 */

/**
 * Parses `--url` flag from argv, defaulting to localhost:3000.
 *
 * @param {string[]} argv - process.argv
 * @returns {string} Base URL
 */
function parseUrl(argv) {
  const idx = argv.indexOf('--url');
  return idx !== -1 && argv[idx + 1] ? argv[idx + 1] : 'http://localhost:3000';
}

/**
 * Sends a number to the API and prints the resulting average.
 *
 * @param {string} baseUrl - API base URL.
 * @param {number} value - Number to submit.
 * @returns {Promise<void>}
 */
async function send(baseUrl, value) {
  const res = await fetch(`${baseUrl}/average`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: value }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error(`Error ${res.status}:`, data);
    process.exitCode = 1;
    return;
  }
  console.log(`Sent ${value} → average = ${data.average} (n=${data.count})`);
}

(async () => {
  const value = Number(process.argv[2]);
  if (!Number.isFinite(value)) {
    console.error('Usage: node client/cli.js <number> [--url http://host:port]');
    process.exit(1);
  }
  await send(parseUrl(process.argv), value);
})();