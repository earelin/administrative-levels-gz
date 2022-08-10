const shapefilesParser = require('../../src/shapefiles/parser');

describe('Shapefile parser', () => {
  test('Should extract admin levels', async () => {
    const divisions = await shapefilesParser('./__test__/data/parroquias-test');

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
              subLevels: []
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
              subLevels: []
            }, {
              id: '1508202',
              name: 'Calo (San Xoán)',
              subLevels: []
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
              subLevels: []
            }]
          }]
        }]
      }]);
  });
});
