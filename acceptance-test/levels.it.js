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

  it('Should return comarca data', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels/15/2`)
      .expectStatus(200)
      .expectBody({
        id: '2',
        name: 'A Coruña',
        concellos: [{
          id: '15008',
          name: 'Bergondo'
        }]
      });
  });

  it('Should return concello data', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels/15/2/15008`)
      .expectStatus(200)
      .expectBody({
        id: '15008',
        name: 'Bergondo',
        parroquias: [{
          id: '1500809',
          name: 'Vixoi (San Fiz)'
        }]
      });
  });

  it('Should return parroquia data', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels/15/2/15008/1500809`)
      .expectStatus(200)
      .expectBody({
        id: '1500809',
        name: 'Vixoi (San Fiz)',
        poboacions: [{
          id: '150080902',
          name: 'Pisón'
        }]
      });
  });
});
