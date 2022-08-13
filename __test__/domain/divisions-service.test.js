const DivisionsService = require('../../src/domain/divisions-service');
const {AdminDivisionTypes, AdminDivision} = require('../../src/domain/admin-levels');

describe('Divisions service', () => {

  let divisionsService;

  const PROVINCE = new AdminDivision('15', 'A Coruña', AdminDivisionTypes.Provincia);
  const COMARCA_A = new AdminDivision('2', 'A Coruña', AdminDivisionTypes.Comarca);
  PROVINCE.addSubLevel(COMARCA_A);
  const COMARCA_B = new AdminDivision('15', 'Santiago', AdminDivisionTypes.Comarca);
  PROVINCE.addSubLevel(COMARCA_B);
  const CONCELLO_A = new AdminDivision('15008', 'Teo', AdminDivisionTypes.Concello);
  COMARCA_B.addSubLevel(CONCELLO_A);

  beforeEach(() => {
    const divisionRepository = {
      findByIneCode() {
        return PROVINCE;
      }
    };

    divisionsService = new DivisionsService(divisionRepository);
  });

  test('Should return comarcas of a province', () => {
    const subDivisions = divisionsService.findSubdivisionsOf('15', AdminDivisionTypes.Comarca);

    expect(subDivisions)
      .toEqual([COMARCA_A, COMARCA_B]);
  });

  test('Should return concellos of a province', () => {
    const subDivisions = divisionsService.findSubdivisionsOf('15', AdminDivisionTypes.Concello);

    expect(subDivisions)
      .toEqual([CONCELLO_A]);
  });
});
