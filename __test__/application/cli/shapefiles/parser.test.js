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
        subLevels: [{
          id: '2',
          name: 'A Coruña',
          alternativeNames: [],
          subLevels: [{
            id: '15008',
            name: 'Bergondo',
            alternativeNames: [],
            subLevels: [{
              id: '1500809',
              name: 'Vixoi (San Fiz)',
              alternativeNames: [],
              subLevels: [{
                id: '150080902',
                name: 'Pisón',
                alternativeNames: [],
                subLevels: []
              }]
            }]
          }]
        }, {
          id: '15',
          name: 'Santiago',
          alternativeNames: [],
          subLevels: [{
            id: '15082',
            name: 'Teo',
            alternativeNames: [],
            subLevels: [{
              id: '1508201',
              name: 'Cacheiras (San Simón de Ons)',
              alternativeNames: [],
              subLevels: [{
                id: '150820107',
                name: 'Feros',
                alternativeNames: [],
                subLevels: []
              }, {
                id: '150820125',
                name: 'Parque Montouto',
                alternativeNames: [],
                subLevels: []
              }]
            }, {
              id: '1508202',
              name: 'Calo (San Xoán)',
              alternativeNames: [],
              subLevels: [{
                id: '150820213',
                name: 'As Galanas',
                alternativeNames: [],
                subLevels: []
              }]
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          alternativeNames: [],
          subLevels: [{
            id: '27004',
            name: 'Baleira',
            alternativeNames: [],
            subLevels: [{
              id: '2700405',
              name: 'A Esperela (San Pedro)',
              alternativeNames: [],
              subLevels: [{
                id: '270040501',
                name: 'O Cádavo',
                alternativeNames: [],
                subLevels: []
              }]
            }]
          }]
        }]
      }]);
  });
});
