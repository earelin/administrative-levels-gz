const pactum = require('pactum');
const LEVELS = require('./data/it-levels.json');

describe('Provinces', () => {
  it('Should return list', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels`)
      .expectStatus(200)
      .expectBody(LEVELS);
  });
});
