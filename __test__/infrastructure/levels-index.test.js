const LevelsIndex = require('../../src/infrastructure/levels-index');
const {LevelTypes, AdminLevel} = require('../../src/domain/admin-levels');

describe('Levels indexes', () => {

  const CORUNA = new AdminLevel('15', 'A Coruña', LevelTypes.Provincia);
  const SANTIAGO = new AdminLevel('15', 'Santiago', LevelTypes.Comarca);
  CORUNA.addSubLevel(SANTIAGO)

  const TEO = new AdminLevel('15082', 'Teo', LevelTypes.Concello);
  SANTIAGO.addSubLevel(TEO);

  const LUGO = new AdminLevel('27', 'Lugo', LevelTypes.Provincia);

  const LEVELS = [CORUNA, LUGO];

  let levelsIndex;

  beforeEach(() => {
    const repository = {
      levels: LEVELS,
      findAll() {
        return this.levels;
      }
    }
    levelsIndex = new LevelsIndex(repository);
  });

  test.each([
    ['15', CORUNA],
    ['27', LUGO],
    ['15082', TEO],
    ['0', undefined]
  ])('Should find by code %s: %s', (input, expected) => {
    expect(levelsIndex.findByIneCode(input))
      .toBe(expected);
  });
});
