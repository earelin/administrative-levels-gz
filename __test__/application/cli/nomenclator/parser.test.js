const nomenclatorParser = require('../../../../src/application/cli/nomenclator/parser');

describe('Nomenclator parser', () => {
  test('Should extract admin levels', async () => {
    const divisions = await nomenclatorParser('./__test__/data/data.csv');

    expect(divisions.toJSON())
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        alternativeNames: [],
        geometry: null,
        type: 'Unknown',
        subLevels: [{
          id: '15001',
          name: 'Abegondo',
          alternativeNames: [],
          geometry: null,
          type: 'Unknown',
          subLevels: [{
            id: '1500102',
            name: 'Cabanas (San Xián)',
            alternativeNames: [],
            geometry: null,
            type: 'Unknown',
            subLevels: [{
              id: '6',
              name: 'A Regueira',
              alternativeNames: [],
              geometry: null,
              type: 'Unknown',
              subLevels: []
            }, {
              id: '8',
              name: 'O Souto',
              alternativeNames: [],
              geometry: null,
              type: 'Unknown',
              subLevels: []
            }]
          }, {
            id: '1500109',
            name: 'Leiro (Santaia)',
            alternativeNames: [],
            geometry: null,
            type: 'Unknown',
            subLevels: [{
              id: '19',
              name: 'Soutelos',
              alternativeNames: [],
              geometry: null,
              type: 'Unknown',
              subLevels: []
            }]
          }]
        }, {
          id: '15003',
          name: 'Aranga',
          alternativeNames: [],
          geometry: null,
          type: 'Unknown',
          subLevels: [{
            id: '1500301',
            name: 'Aranga (San Paio)',
            alternativeNames: [],
            geometry: null,
            type: 'Unknown',
            subLevels: [{
              id: '7',
              name: 'Congostro',
              alternativeNames: [],
              geometry: null,
              type: 'Unknown',
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        geometry: null,
        type: 'Unknown',
        subLevels: [{
          id: '27010',
          name: 'Castro De Rei',
          alternativeNames: [],
          geometry: null,
          type: 'Unknown',
          subLevels: [{
            id: '2701008',
            name: 'Duancos (Santa María)',
            alternativeNames: [],
            geometry: null,
            type: 'Unknown',
            subLevels: [{
              id: '7',
              name: 'A Torre',
              alternativeNames: [],
              geometry: null,
              type: 'Unknown',
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '32',
        name: 'Ourense',
        alternativeNames: [],
        geometry: null,
        type: 'Unknown',
        subLevels: [{
          id: '32026',
          name: 'Coles',
          alternativeNames: [],
          geometry: null,
          type: 'Unknown',
          subLevels: [{
            id: '3202603',
            name: 'A Barra (Santa María)',
            alternativeNames: [],
            geometry: null,
            type: 'Unknown',
            subLevels: [{
              id: '8',
              name: 'Vilanova',
              alternativeNames: [],
              geometry: null,
              type: 'Unknown',
              subLevels: []
            }]
          }]
        }]
      }]);
  });
});
