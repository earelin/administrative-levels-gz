const request = require('supertest')(TEST_BASE_URL);

describe('Divisions endoints', () => {
  it('Should return all provinces', async () => {
    const response = await request.get('/provincias');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Provincia',
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Provincia',
      }]);
  });

  it('Should return province data', async () => {
    const response = await request.get('/divisions/27');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual({
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Provincia'
      });
  });

  it('Should return all comarcas', async () => {
    const response = await request.get('/comarcas');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual([{
        id: '2',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Comarca'
      }, {
        id: '15',
        name: 'Santiago',
        alternativeNames: [],
        type: 'Comarca'
      }, {
        id: '19',
        name: 'A Fonsagrada',
        alternativeNames: [],
        type: 'Comarca'
      }]);
  });

  it('Should return comarca data', async () => {
    const response = await request.get('/comarcas/2');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual({
        id: '2',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Comarca'
      });
  });

  it('Should return all concellos', async () => {
    const response = await request.get('/concellos');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual([{
        id: '15008',
        name: 'Bergondo',
        alternativeNames: [],
        type: 'Concello'
      }, {
        id: '15082',
        name: 'Teo',
        alternativeNames: [],
        type: 'Concello'
      }, {
        id: '27004',
        name: 'Baleira',
        alternativeNames: [],
        type: 'Concello'
      }]);
  });

  it('Should return concello data', async () => {
    const response = await request.get('/divisions/15008');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual({
        id: '15008',
        name: 'Bergondo',
        type: 'Concello',
        alternativeNames: []
      });
  });

  it('Should return parroquia data', async () => {
    const response = await request.get('/divisions/1500809');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual({
        id: '1500809',
        name: 'Vixoi',
        alternativeNames: ['San Fiz'],
        type: 'Parroquia'
      });
  });

  it('Should return poboacion data', async () => {
    const response = await request.get('/divisions/150080902');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual({
        id: '150080902',
        name: 'Pisón',
        alternativeNames: [],
        type: 'Poboacion'
      });
  });

  it('Should return comarcas of a province', async () => {
    const response = await request.get('/divisions/15/comarcas');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual([{
        id: '2',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Comarca'
      }, {
        id: '15',
        name: 'Santiago',
        alternativeNames: [],
        type: 'Comarca'
      }]);
  });

  it('Should return concellos of a province', async () => {
    const response = await request.get('/divisions/15/concellos');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual([{
        id: '15008',
        name: 'Bergondo',
        alternativeNames: [],
        type: 'Concello'
      }, {
        id: '15082',
        name: 'Teo',
        alternativeNames: [],
        type: 'Concello'
      }]);
  });

  it('Should return geometry of a admin division', async () => {
    const response = await request.get('/divisions/15/geometry');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual({
        type: 'Feature',
        geometry: expect.anything(),
        properties: {
          id: '15',
          name: 'A Coruña',
          alternativeNames: [],
          type: 'Provincia'
        }
      });
  });

  it('Should return concellos of a province geometries', async () => {
    const response = await request.get('/divisions/15/concellos/geometry');

    expect(response.statusCode)
      .toBe(200);
    expect(response.body)
      .toEqual({
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: expect.anything(),
          properties: {
            id: '15008',
            name: 'Bergondo',
            alternativeNames: [],
            type: 'Concello'
          }
        }, {
          type: 'Feature',
          geometry: expect.anything(),
          properties: {
            id: '15082',
            name: 'Teo',
            alternativeNames: [],
            type: 'Concello'
          }
        }]
      });
  });
});
