/**
 * @file Frontend logic for the Average Calculator web UI.
 */

const form = document.getElementById('form');
const numberInput = document.getElementById('number');
const averageEl = document.getElementById('average');
const countEl = document.getElementById('count');
const sumEl = document.getElementById('sum');
const historyEl = document.getElementById('history');
const errorEl = document.getElementById('error');

/**
 * Sends a number to POST /average and updates the UI.
 * @param {number} value - The number to submit.
 * @returns {Promise<void>}
 */
async function submitNumber(value) {
  errorEl.hidden = true;
  try {
    const res = await fetch('/average', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: value }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || 'Something went wrong.';
      errorEl.hidden = false;
      return;
    }

    averageEl.textContent = Number(data.average.toFixed(4));
    countEl.textContent = data.count;
    sumEl.textContent = Number(data.sum.toFixed(4));

    const li = document.createElement('li');
    li.textContent = value;
    historyEl.prepend(li);
  } catch (err) {
    errorEl.textContent = 'Network error — is the server running?';
    errorEl.hidden = false;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = Number(numberInput.value);
  if (!Number.isFinite(value)) return;
  await submitNumber(value);
  numberInput.value = '';
  numberInput.focus();
});