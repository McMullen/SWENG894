describe('Baby Registration', () => {
    it('registers a new baby for a logged-in user', async () => {
      const response = await request(app)
        .post('/api/babies/register')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userId: '3',
          name: 'Baby Name',
          birthDate: '2023-01-01',
          sex: 'Male',
          birthWeight: '1',
          birthHeight: '2'
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('babyId');
    });
  });
  