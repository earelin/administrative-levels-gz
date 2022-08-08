const nomenclatorParser = require('../src/nomenclator-parser');

describe('Nomenclator parser', () => {
  test('Should extract provinces', async () => {
    const divisions = await nomenclatorParser('./__test__/data/provinces.csv');

    expect(divisions.toArray())
      .toEqual([{
        id: '1',
        name: 'CORUÑA, A'
      }, {
        id: '5',
        name: 'LUGO'
      }, {
        id: '7',
        name: 'OURENSE'
      }]);
  });
});
