describe('User Login', () => {
    it('logs in an existing user successfully', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'Password123',
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  
    it('fails to log in with incorrect password', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword',
        });
      expect(response.statusCode).toBe(401);
    });
  });
  