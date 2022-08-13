const LevelsIndex = require('../../src/infrastructure/levels-index');
const {AdminDivisionTypes, AdminDivision} = require('../../src/domain/admin-levels');

describe('Levels indexes', () => {

  const CORUNA = new AdminDivision('15', 'A Coruña', AdminDivisionTypes.Provincia);
  const SANTIAGO = new AdminDivision('15', 'Santiago', AdminDivisionTypes.Comarca);
  CORUNA.addSubLevel(SANTIAGO)

  const TEO = new AdminDivision('15082', 'Teo', AdminDivisionTypes.Concello);
  SANTIAGO.addSubLevel(TEO);

  const LUGO = new AdminDivision('27', 'Lugo', AdminDivisionTypes.Provincia);

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

  test('Should return comarca by id', () => {
    expect(levelsIndex.findComarcaById('15'))
      .toBe(SANTIAGO);
  });

  test('Should return all comarcas', () => {
    expect(levelsIndex.findAllComarcas())
      .toEqual([SANTIAGO]);
  });
});
