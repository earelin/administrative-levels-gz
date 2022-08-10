const pactum = require('pactum');

describe('Microservice observability', () => {
  it('Healthcheck', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/health`)
      .expectStatus(200)
      .expectJsonLike({
        "status": "OK"
      });
  })
});
