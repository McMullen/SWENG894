const request = require('supertest');
const app = require('../src/app/app');

describe('User Registration', () => {
  it('registers a new user successfully', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('fails to register a user with duplicate email', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123',
      });
    expect(response.statusCode).toBe(400);
  });
});
