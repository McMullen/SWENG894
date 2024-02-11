describe('User Logout', () => {
    it('logs out a user successfully', async () => {
      const response = await request(app)
        .post('/api/users/logout')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.statusCode).toBe(200);
    });
  });
  