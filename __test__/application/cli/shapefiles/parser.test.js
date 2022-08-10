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
        subLevels: [{
          id: '2',
          name: 'A Coruña',
          subLevels: [{
            id: '15008',
            name: 'Bergondo',
            subLevels: [{
              id: '1500809',
              name: 'Vixoi (San Fiz)',
              subLevels: [{
                id: '150080902',
                name: 'Pisón',
                subLevels: []
              }]
            }]
          }]
        }, {
          id: '15',
          name: 'Santiago',
          subLevels: [{
            id: '15082',
            name: 'Teo',
            subLevels: [{
              id: '1508201',
              name: 'Cacheiras (San Simón de Ons)',
              subLevels: [{
                id: '150820107',
                name: 'Feros',
                subLevels: []
              }, {
                id: '150820125',
                name: 'Parque Montouto',
                subLevels: []
              }]
            }, {
              id: '1508202',
              name: 'Calo (San Xoán)',
              subLevels: [{
                id: '150820213',
                name: 'As Galanas',
                subLevels: []
              }]
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          subLevels: [{
            id: '27004',
            name: 'Baleira',
            subLevels: [{
              id: '2700405',
              name: 'A Esperela (San Pedro)',
              subLevels: [{
                id: '270040501',
                name: 'O Cádavo',
                subLevels: []
              }]
            }]
          }]
        }]
      }]);
  });
});
