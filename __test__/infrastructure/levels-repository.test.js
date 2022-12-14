const LevelsRepository = require('../../src/infrastructure/levels-repository');

const LEVELS = [{
  id: '6',
  name: 'A Regueira',
  subLevels: []
}, {
  id: '8',
  name: 'O Souto',
  subLevels: []
}];

describe('Levels repository tests', () => {
  let levelsRepository ;

  beforeEach(() => levelsRepository = new LevelsRepository(LEVELS));

  test('Should return list', () => {
    expect(levelsRepository.findAll().map(item => item.toJSON()))
      .toEqual([{
        id: '6',
        name: 'A Regueira',
        alternativeNames: [],
        type: 'Provincia',
        geometry: null,
        subLevels: [],
      }, {
        id: '8',
        name: 'O Souto',
        alternativeNames: [],
        type: 'Provincia',
        geometry: null,
        subLevels: [],
      }]);
  });
});
