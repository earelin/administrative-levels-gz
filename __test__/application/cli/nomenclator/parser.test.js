const nomenclatorParser = require('../../../../src/application/cli/nomenclator/parser');

describe('Nomenclator parser', () => {
  test('Should extract admin levels', async () => {
    const divisions = await nomenclatorParser('./__test__/data/data.csv');

    expect(divisions.toJSON())
      .toEqual([{
        id: '15',
        name: 'A Coruña',
        alternativeNames: [],
        type: 'Unknown',
        geometry: null,
        subLevels: [{
          id: '15001',
          name: 'Abegondo',
          alternativeNames: [],
          type: 'Unknown',
          geometry: null,
          subLevels: [{
            id: '1500102',
            name: 'Cabanas (San Xián)',
            alternativeNames: [],
            type: 'Unknown',
            geometry: null,
            subLevels: [{
              id: '6',
              name: 'A Regueira',
              alternativeNames: [],
              type: 'Unknown',
              geometry: null,
              subLevels: []
            }, {
              id: '8',
              name: 'O Souto',
              alternativeNames: [],
              type: 'Unknown',
              geometry: null,
              subLevels: []
            }]
          }, {
            id: '1500109',
            name: 'Leiro (Santaia)',
            alternativeNames: [],
            type: 'Unknown',
            geometry: null,
            subLevels: [{
              id: '19',
              name: 'Soutelos',
              alternativeNames: [],
              type: 'Unknown',
              geometry: null,
              subLevels: []
            }]
          }]
        }, {
          id: '15003',
          name: 'Aranga',
          alternativeNames: [],
          type: 'Unknown',
          geometry: null,
          subLevels: [{
            id: '1500301',
            name: 'Aranga (San Paio)',
            alternativeNames: [],
            type: 'Unknown',
            geometry: null,
            subLevels: [{
              id: '7',
              name: 'Congostro',
              alternativeNames: [],
              type: 'Unknown',
              geometry: null,
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Unknown',
        geometry: null,
        subLevels: [{
          id: '27010',
          name: 'Castro De Rei',
          alternativeNames: [],
          type: 'Unknown',
          geometry: null,
          subLevels: [{
            id: '2701008',
            name: 'Duancos (Santa María)',
            alternativeNames: [],
            type: 'Unknown',
            geometry: null,
            subLevels: [{
              id: '7',
              name: 'A Torre',
              alternativeNames: [],
              type: 'Unknown',
              geometry: null,
              subLevels: []
            }]
          }]
        }]
      }, {
        id: '32',
        name: 'Ourense',
        alternativeNames: [],
        type: 'Unknown',
        geometry: null,
        subLevels: [{
          id: '32026',
          name: 'Coles',
          alternativeNames: [],
          type: 'Unknown',
          geometry: null,
          subLevels: [{
            id: '3202603',
            name: 'A Barra (Santa María)',
            alternativeNames: [],
            type: 'Unknown',
            geometry: null,
            subLevels: [{
              id: '8',
              name: 'Vilanova',
              alternativeNames: [],
              type: 'Unknown',
              geometry: null,
              subLevels: []
            }]
          }]
        }]
      }]);
  });
});
