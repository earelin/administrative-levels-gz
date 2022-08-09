const nomenclatorParser = require('../../src/nomenclator/parser');

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
          subLevels: [{
            id: '1500102',
            name: 'Cabanas (San Xián)',
            subLevels: [{
              id: '6',
              name: 'A Regueira',
              subLevels: []
            }, {
              id: '8',
              name: 'O Souto',
              subLevels: []
            }]
          }, {
            id: '1500109',
            name: 'Leiro (Santaia)',
            subLevels: [{
              id: '19',
              name: 'Soutelos',
              subLevels: []
            }]
          }]
        }, {
          id: '15003',
          name: 'Aranga',
          subLevels: [{
            id: '1500301',
            name: 'Aranga (San Paio)',
            subLevels: [{
              id: '7',
              name: 'Congostro',
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        subLevels: [{
          id: '27010',
          name: 'Castro De Rei',
          subLevels: [{
            id: '2701008',
            name: 'Duancos (Santa María)',
            subLevels: [{
              id: '7',
              name: 'A Torre',
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '32',
        name: 'Ourense',
        subLevels: [{
          id: '32026',
          name: 'Coles',
          subLevels: [{
            id: '3202603',
            name: 'A Barra (Santa María)',
            subLevels: [{
              id: '8',
              name: 'Vilanova',
              subLevels: []
            }]
          }]
        }]
      }]);
  });
});
