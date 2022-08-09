const nomenclatorParser = require('../src/nomenclator-parser');

describe('Nomenclator parser', () => {
  test('Should extract provinces', async () => {
    const divisions = await nomenclatorParser('./__test__/data/data.csv');

    expect(divisions.toJSON())
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        subLevels: [{
          id: '15001',
          name: 'Abegondo',
          subLevels: []
        },{
          id: '15003',
          name: 'Aranga',
          subLevels: []
        }]
      }, {
        id: '27',
        name: 'Lugo',
        subLevels: [{
          id: '27010',
          name: 'Castro De Rei',
          subLevels: []
        }]
      }, {
        id: '32',
        name: 'Ourense',
        subLevels: [{
          id: '32026',
          name: 'Coles',
          subLevels: []
        }]
      }]);
  });
});
