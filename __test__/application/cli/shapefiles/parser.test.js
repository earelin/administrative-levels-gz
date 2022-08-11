const shapefilesParser = require('../../../../src/application/cli/shapefiles/parser');

describe('Shapefile parser', () => {
  test('Should extract admin levels', async () => {
    const divisions = await shapefilesParser(
      './__test__/data/parroquias-test',
      './__test__/data/poboacions-test');

    expect(divisions.toJSON())
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Provincia',
        subLevels: [{
          id: '2',
          name: 'A Coruña',
          alternativeNames: [],
          type: 'Comarca',
          subLevels: [{
            id: '15008',
            name: 'Bergondo',
            alternativeNames: [],
            type: 'Concello',
            subLevels: [{
              id: '1500809',
              name: 'Vixoi',
              alternativeNames: ['San Fiz'],
              type: 'Parroquia',
              subLevels: [{
                id: '150080902',
                name: 'Pisón',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion'
              }]
            }]
          }]
        }, {
          id: '15',
          name: 'Santiago',
          alternativeNames: [],
          type: 'Comarca',
          subLevels: [{
            id: '15082',
            name: 'Teo',
            alternativeNames: [],
            type: 'Concello',
            subLevels: [{
              id: '1508201',
              name: 'Cacheiras',
              alternativeNames: ['San Simón de Ons'],
              type: 'Parroquia',
              subLevels: [{
                id: '150820107',
                name: 'Feros',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
              }, {
                id: '150820125',
                name: 'Parque Montouto',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
              }]
            }, {
              id: '1508202',
              name: 'Calo',
              alternativeNames: ['San Xoán'],
              type: 'Parroquia',
              subLevels: [{
                id: '150820213',
                name: 'As Galanas',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
              }]
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Provincia',
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          alternativeNames: [],
          type: 'Comarca',
          subLevels: [{
            id: '27004',
            name: 'Baleira',
            alternativeNames: [],
            type: 'Concello',
            subLevels: [{
              id: '2700405',
              name: 'A Esperela',
              alternativeNames: ['San Pedro'],
              type: 'Parroquia',
              subLevels: [{
                id: '270040501',
                name: 'O Cádavo',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
              }]
            }]
          }]
        }]
      }]);
  });
});
