const pactum = require('pactum');

describe('Provinces', () => {
  it('Should return list', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels`)
      .expectStatus(200)
      .expectJsonLike([{
        id: '15',
        name: 'A Coruña',
        subLevels: [{
          id: '2',
          name: 'A Coruña',
          subLevels: [],
        }, {
          id: '15',
          name: 'Santiago',
          subLevels: []
        }]
      }, {
        id: '27',
        name: 'Lugo',
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          subLevels: []
        }]
      }]);
  });
});
