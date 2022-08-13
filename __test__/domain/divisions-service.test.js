const DivisionsService = require('../../src/domain/divisions-service');
const {LevelTypes, AdminLevel} = require('../../src/domain/admin-levels');
describe('Divisions service', () => {

  let divisionsService;

  const PROVINCE = new AdminLevel('15', 'A Coruña', LevelTypes.Provincia);

  const COMARCA_A = new AdminLevel('2', 'A Coruña', LevelTypes.Comarca);
  PROVINCE.addSubLevel(COMARCA_A);
  const COMARCA_B = new AdminLevel('15', 'Santiago', LevelTypes.Comarca);
  PROVINCE.addSubLevel(COMARCA_B);

  beforeEach(() => {
    const divisionRepository = {
      findById() {
        return PROVINCE;
      }
    };

    divisionsService = new DivisionsService(divisionRepository);
  });

  test('Should return comarcas of a province', () => {
    const subDivisions = divisionsService.findSubdivisionsOf('15', LevelTypes.Comarca);

    expect(subDivisions)
      .toEqual([COMARCA_A, COMARCA_B]);
  });
});
