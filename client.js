const http = require('http');

function sendNumber(num) {
  const data = JSON.stringify({ number: num });

  const req = http.request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/average',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    },
    (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          console.log(`Sent: ${num} | Server Response:`, JSON.parse(body));
        } catch (e) {
          console.log(`Sent: ${num} | Raw Response:`, body);
        }
      });
    }
  );

  req.on('error', (err) => console.error('Client Error:', err.code || err.message));
  req.write(data);
  req.end();
}

console.log('--- Client Utility Request Sequence ---');
sendNumber(10);
setTimeout(() => sendNumber(20), 500);
setTimeout(() => sendNumber(30), 1000);