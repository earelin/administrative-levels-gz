const request = require('supertest')(TEST_BASE_URL);

describe('Microservice observability', () => {
  it('Healthcheck', async () => {
    const response = await request.get('/health');

    expect(response.statusCode)
      .toBe(200);
  })
});
