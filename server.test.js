const request = require('supertest');
const { createApp } = require('./src/app');

let app;

beforeEach(() => {
  app = createApp();
  app.resetState();
});

describe('POST /average API Tests', () => {
  it('should return correct initial average', async () => {
    const res = await request(app).post('/average').send({ number: 10 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ average: 10, count: 1 });
  });

  it('should calculate running average correctly', async () => {
    await request(app).post('/average').send({ number: 10 });
    await request(app).post('/average').send({ number: 20 });
    const res = await request(app).post('/average').send({ number: 30 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ average: 20, count: 3 });
  });

  it('should reject non-numeric inputs', async () => {
    const res = await request(app).post('/average').send({ number: 'abc' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});