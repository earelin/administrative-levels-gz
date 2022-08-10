const pactum = require('pactum');

describe('Provinces', () => {
  it('Should return list', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels`)
      .expectStatus(200)
      .expectBody([{
        id: '15',
        name: 'A Coruña'
      }, {
        id: '27',
        name: 'Lugo'
      }]);
  });
});
