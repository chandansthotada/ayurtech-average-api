const express = require('express');

const app = express();
app.use(express.json());

let totalSum = 0;
let totalCount = 0;

/**
 * Route handler for calculating running average.
 * @route POST /average
 */
app.post('/average', (req, res) => {
  const { number } = req.body;

  if (typeof number !== 'number' || Number.isNaN(number)) {
    return res.status(400).json({
      error: 'Invalid input. Please provide a valid numeric value.',
    });
  }

  totalSum += number;
  totalCount += 1;

  const average = totalSum / totalCount;

  return res.status(200).json({ average });
});

/**
 * Resets memory state between test runs.
 */
app.resetState = () => {
  totalSum = 0;
  totalCount = 0;
};

module.exports = app;