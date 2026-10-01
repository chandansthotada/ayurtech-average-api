/**
 * @file In-memory store for tracking the running average of submitted numbers.
 * @module averageStore
 */

/**
 * Internal list of all numbers submitted to the store.
 * @type {number[]}
 */
const numbers = [];

/**
 * Adds a number to the store.
 *
 * @param {number} value - The numeric value to add.
 * @throws {TypeError} If `value` is not a finite number.
 * @returns {void}
 */
function add(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError('value must be a finite number');
  }
  numbers.push(value);
}

/**
 * Computes the arithmetic mean of all numbers currently stored.
 * Returns 0 when no numbers have been added yet (empty-set convention).
 *
 * @returns {number} The average of all stored numbers, or 0 if empty.
 */
function getAverage() {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Returns the number of items currently stored.
 * Primarily useful for tests and diagnostics.
 *
 * @returns {number} Count of stored numbers.
 */
function count() {
  return numbers.length;
}

/**
 * Clears the store. Intended for tests.
 *
 * @returns {void}
 */
function reset() {
  numbers.length = 0;
}

module.exports = { add, getAverage, count, reset };