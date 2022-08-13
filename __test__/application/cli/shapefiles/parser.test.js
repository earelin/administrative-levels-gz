const ShapefilesParser = require('../../../../src/application/cli/shapefiles/parser');

describe('Shapefile parser', () => {
  test('Should extract admin levels', async () => {
    const shapefileParser = new ShapefilesParser(
      './__test__/data/provincias-test',
      './__test__/data/comarcas-test',
      './__test__/data/concellos-test',
      './__test__/data/parroquias-test',
      './__test__/data/poboacions-test');

    const divisions = await shapefileParser.parse();

    expect(divisions.toJSON())
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Provincia',
        geometry: expect.anything(),
        subLevels: [{
          id: '2',
          name: 'A Coruña',
          alternativeNames: [],
          type: 'Comarca',
          geometry: expect.anything(),
          subLevels: [{
            id: '15008',
            name: 'Bergondo',
            alternativeNames: [],
            type: 'Concello',
            geometry: expect.anything(),
            subLevels: [{
              id: '1500809',
              name: 'Vixoi',
              alternativeNames: ['San Fiz'],
              type: 'Parroquia',
              geometry: expect.anything(),
              subLevels: [{
                id: '150080902',
                name: 'Pisón',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: expect.anything()
              }]
            }]
          }]
        }, {
          id: '15',
          name: 'Santiago',
          alternativeNames: [],
          type: 'Comarca',
          geometry: expect.anything(),
          subLevels: [{
            id: '15082',
            name: 'Teo',
            alternativeNames: [],
            type: 'Concello',
            geometry: expect.anything(),
            subLevels: [{
              id: '1508201',
              name: 'Cacheiras',
              alternativeNames: ['San Simón de Ons'],
              type: 'Parroquia',
              geometry: expect.anything(),
              subLevels: [{
                id: '150820107',
                name: 'Feros',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: expect.anything()
              }, {
                id: '150820125',
                name: 'Parque Montouto',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: expect.anything()
              }]
            }, {
              id: '1508202',
              name: 'Calo',
              alternativeNames: ['San Xoán'],
              type: 'Parroquia',
              geometry: expect.anything(),
              subLevels: [{
                id: '150820213',
                name: 'As Galanas',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: expect.anything()
              }]
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Provincia',
        geometry: expect.anything(),
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          alternativeNames: [],
          type: 'Comarca',
          geometry: expect.anything(),
          subLevels: [{
            id: '27004',
            name: 'Baleira',
            alternativeNames: [],
            type: 'Concello',
            geometry: expect.anything(),
            subLevels: [{
              id: '2700405',
              name: 'A Esperela',
              alternativeNames: ['San Pedro'],
              type: 'Parroquia',
              geometry: expect.anything(),
              subLevels: [{
                id: '270040501',
                name: 'O Cádavo',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: expect.anything()
              }]
            }]
          }]
        }]
      }]);
  });
});
