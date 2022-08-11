const nomenclatorParser = require('../../../../src/application/cli/nomenclator/parser');

describe('Nomenclator parser', () => {
  test('Should extract admin levels', async () => {
    const divisions = await nomenclatorParser('./__test__/data/data.csv');

    expect(divisions.toJSON())
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        alternativeNames: [],
        subLevels: [{
          id: '15001',
          name: 'Abegondo',
          alternativeNames: [],
          subLevels: [{
            id: '1500102',
            name: 'Cabanas (San Xián)',
            alternativeNames: [],
            subLevels: [{
              id: '6',
              name: 'A Regueira',
              alternativeNames: [],
              subLevels: []
            }, {
              id: '8',
              name: 'O Souto',
              alternativeNames: [],
              subLevels: []
            }]
          }, {
            id: '1500109',
            name: 'Leiro (Santaia)',
            alternativeNames: [],
            subLevels: [{
              id: '19',
              name: 'Soutelos',
              alternativeNames: [],
              subLevels: []
            }]
          }]
        }, {
          id: '15003',
          name: 'Aranga',
          alternativeNames: [],
          subLevels: [{
            id: '1500301',
            name: 'Aranga (San Paio)',
            alternativeNames: [],
            subLevels: [{
              id: '7',
              name: 'Congostro',
              alternativeNames: [],
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        subLevels: [{
          id: '27010',
          name: 'Castro De Rei',
          alternativeNames: [],
          subLevels: [{
            id: '2701008',
            name: 'Duancos (Santa María)',
            alternativeNames: [],
            subLevels: [{
              id: '7',
              name: 'A Torre',
              alternativeNames: [],
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '32',
        name: 'Ourense',
        alternativeNames: [],
        subLevels: [{
          id: '32026',
          name: 'Coles',
          alternativeNames: [],
          subLevels: [{
            id: '3202603',
            name: 'A Barra (Santa María)',
            alternativeNames: [],
            subLevels: [{
              id: '8',
              name: 'Vilanova',
              alternativeNames: [],
              subLevels: []
            }]
          }]
        }]
      }]);
  });
});
