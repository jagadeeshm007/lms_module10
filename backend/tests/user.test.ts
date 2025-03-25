import request from 'supertest';
import app from '../app'; // Import your Express app

describe('User API Endpoints', () => {
  
  test('GET /api/users/:id - should return user by ID', async () => {
    const userId = 1; // Change this based on your test data
    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  test('GET /api/users/:id - should return 404 if user is not found', async () => {
    const invalidUserId = 9999; // Non-existent user ID
    const response = await request(app).get(`/api/users/${invalidUserId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

});
