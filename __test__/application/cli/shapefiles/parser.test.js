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
        alternativeNames: [],
        type: 'Provincia',
        geometry: null,
        subLevels: [{
          id: '2',
          name: 'A Coruña',
          alternativeNames: [],
          type: 'Comarca',
          geometry: null,
          subLevels: [{
            id: '15008',
            name: 'Bergondo',
            alternativeNames: [],
            type: 'Concello',
            geometry: null,
            subLevels: [{
              id: '1500809',
              name: 'Vixoi',
              alternativeNames: ['San Fiz'],
              type: 'Parroquia',
              geometry: null,
              subLevels: [{
                id: '150080902',
                name: 'Pisón',
                alternativeNames: [],
                subLevels: [],
                geometry: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [561835.9694501489, 4794254.922073605]
                  }
                },
                type: 'Poboacion'
              }]
            }]
          }]
        }, {
          id: '15',
          name: 'Santiago',
          alternativeNames: [],
          type: 'Comarca',
          geometry: null,
          subLevels: [{
            id: '15082',
            name: 'Teo',
            alternativeNames: [],
            type: 'Concello',
            geometry: null,
            subLevels: [{
              id: '1508201',
              name: 'Cacheiras',
              alternativeNames: ['San Simón de Ons'],
              type: 'Parroquia',
              geometry: null,
              subLevels: [{
                id: '150820107',
                name: 'Feros',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [537623.0065500295, 4740750.360520596]
                  }
                },
              }, {
                id: '150820125',
                name: 'Parque Montouto',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [537177.987350267, 4742797.385432867]
                  }
                },
              }]
            }, {
              id: '1508202',
              name: 'Calo',
              alternativeNames: ['San Xoán'],
              type: 'Parroquia',
              geometry: null,
              subLevels: [{
                id: '150820213',
                name: 'As Galanas',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [533545.9371939497, 4742422.382812353]
                  }
                },
              }]
            }]
          }]
        }]
      }, {
        id: '27',
        name: 'Lugo',
        alternativeNames: [],
        type: 'Provincia',
        geometry: null,
        subLevels: [{
          id: '19',
          name: 'A Fonsagrada',
          alternativeNames: [],
          type: 'Comarca',
          geometry: null,
          subLevels: [{
            id: '27004',
            name: 'Baleira',
            alternativeNames: [],
            type: 'Concello',
            geometry: null,
            subLevels: [{
              id: '2700405',
              name: 'A Esperela',
              alternativeNames: ['San Pedro'],
              type: 'Parroquia',
              geometry: null,
              subLevels: [{
                id: '270040501',
                name: 'O Cádavo',
                alternativeNames: [],
                subLevels: [],
                type: 'Poboacion',
                geometry: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [643007.7152924184, 4764135.260521823]
                  }
                },
              }]
            }]
          }]
        }]
      }]);
  });
});
