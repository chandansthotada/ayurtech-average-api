const request = require('supertest');
const app = require('./src/app');

describe('POST /average API Tests', () => {
  beforeEach(() => {
    app.resetState();
  });

  it('should return correct initial average', async () => {
    const res = await request(app).post('/average').send({ number: 10 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ average: 10 });
  });

  it('should calculate running average correctly', async () => {
    await request(app).post('/average').send({ number: 10 });
    await request(app).post('/average').send({ number: 20 });
    const res = await request(app).post('/average').send({ number: 30 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ average: 20 });
  });

  it('should reject non-numeric inputs', async () => {
    const res = await request(app).post('/average').send({ number: 'abc' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});