/**
 * @file Express application factory for the Ayurtech Average API.
 * @module app
 */

const express = require('express');
const store = require('./averageStore');

/**
 * Creates and configures an Express application exposing the `/average` endpoint.
 *
 * @returns {import('express').Express} The configured Express app.
 */
function createApp() {
  const app = express();
  app.use(express.json());

  /**
   * POST /average
   *
   * Request body: `{ "number": <number> }`
   *   Also accepts a bare numeric body (`42`) for convenience.
   *
   * Response: `{ "average": <number>, "count": <number> }`
   *
   * @name PostAverage
   * @route POST /average
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   */
  app.post('/average', (req, res) => {
    const raw =
      req.body && typeof req.body === 'object' && 'number' in req.body
        ? req.body.number
        : req.body;

    const value = typeof raw === 'string' ? Number(raw) : raw;

    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return res.status(400).json({
        error: 'Request body must contain a finite number, e.g. { "number": 5 }',
      });
    }

    store.add(value);

    return res.status(200).json({
      average: store.getAverage(),
      count: store.count(),
    });
  });

  /**
   * GET /health — lightweight readiness probe.
   *
   * @name Health
   * @route GET /health
   * @param {import('express').Request} _req
   * @param {import('express').Response} res
   * @returns {void}
   */
 app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.resetState = () => {    // ← ADD THESE 3 LINES
    store.reset();
  };

  return app;
}

module.exports = { createApp };