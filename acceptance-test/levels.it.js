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

  it('Should return province data', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels/27`)
      .expectStatus(200)
      .expectBody({
        id: '27',
        name: 'Lugo',
        comarcas: [{
          id: '19',
          name: 'A Fonsagrada'
        }]
      });
  });
});
