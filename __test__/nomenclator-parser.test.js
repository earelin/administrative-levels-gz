const nomenclatorParser = require('../src/nomenclator-parser');

describe('Nomenclator parser', () => {
  test('Should extract provinces', async () => {
    const divisions = await nomenclatorParser('./__test__/data/data.csv');

    expect(divisions.toArray())
      .toEqual([{
        id: '15',
        name: 'Coruña, A'
      }, {
        id: '27',
        name: 'Lugo'
      }, {
        id: '32',
        name: 'Ourense'
      }]);
  });
});
