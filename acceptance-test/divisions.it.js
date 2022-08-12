const request = require('supertest')(TEST_BASE_URL);

describe('Divisions endoints', () => {
  it('Should return list', async () => {
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
        type: 'Provincia',
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          alternativeNames: [],
          type: 'Comarca',
        }]
      });
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
        type: 'Comarca',
        subLevels: [{
          id: '15008',
          name: 'Bergondo',
          alternativeNames: [],
          type: 'Concello',
        }]
      });
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
        alternativeNames: [],
        subLevels: [{
          id: '1500809',
          type: 'Parroquia',
          name: 'Vixoi',
          alternativeNames: ['San Fiz']
        }]
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
        type: 'Parroquia',
        subLevels: [{
          id: '150080902',
          name: 'Pisón',
          alternativeNames: [],
          type: 'Poboacion'
        }]
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
        type: 'Poboacion',
        subLevels: []
      });
  });
});
