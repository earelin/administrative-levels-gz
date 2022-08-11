const pactum = require('pactum');

describe('Provinces', () => {
  it('Should return list', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels`)
      .expectStatus(200)
      .expectBody([{
        id: '15',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Provincia',
        geometry: null
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Provincia',
        geometry: null
      }]);
  });

  it('Should return province data', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels/27`)
      .expectStatus(200)
      .expectBody({
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Provincia',
        geometry: null,
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          alternativeNames: [],
          type: 'Comarca',
          geometry: null,
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
        alternativeNames: [],
        type: 'Comarca',
        geometry: null,
        subLevels: [{
          id: '15008',
          name: 'Bergondo',
          alternativeNames: [],
          type: 'Concello',
          geometry: null
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
        type: 'Concello',
        alternativeNames: [],
        geometry: null,
        subLevels: [{
          id: '1500809',
          type: 'Parroquia',
          name: 'Vixoi',
          alternativeNames: ['San Fiz'],
          geometry: null
        }]
      });
  });

  it('Should return parroquia data', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels/15/2/15008/1500809`)
      .expectStatus(200)
      .expectBody({
        id: '1500809',
        name: 'Vixoi',
        alternativeNames: ['San Fiz'],
        type: 'Parroquia',
        geometry: null,
        subLevels: [{
          id: '150080902',
          name: 'Pisón',
          alternativeNames: [],
          type: 'Poboacion',
          geometry: {
            type: 'Feature',
            geometry: {
              coordinates: [561835.9694501489, 4794254.922073605],
              type: 'Point'
            }
          }
        }]
      });
  });

  it('Should return poboacion data', async () => {
    return pactum.spec()
      .get(`${TEST_BASE_URL}/levels/15/2/15008/1500809/150080902`)
      .expectStatus(200)
      .expectBody({
        id: '150080902',
        name: 'Pisón',
        alternativeNames: [],
        type: 'Poboacion',
        geometry: {
          type: 'Feature',
          geometry: {
            coordinates: [561835.9694501489, 4794254.922073605],
            type: 'Point'
          }
        }
      });
  });
});
