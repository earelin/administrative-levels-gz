const shapefilesParser = require('../../src/shapefiles/parser');

describe('Shapefile parser', () => {
  test('Should extract admin levels', async () => {
    const divisions = await shapefilesParser('./__test__/data/provincias-test');

    expect(divisions.toJSON())
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        subLevels: []
      }, {
        id: '27',
        name: 'Lugo',
        subLevels: []
      }]);
  });
});
