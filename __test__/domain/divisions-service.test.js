const DivisionsService = require('../../src/domain/divisions-service');
const {AdminDivisionTypes, AdminDivision} = require('../../src/domain/admin-levels');

describe('Divisions service', () => {

  let divisionsService;

  const PROVINCE_A = new AdminDivision('15', 'A Coruña', AdminDivisionTypes.Provincia);
  const COMARCA_A = new AdminDivision('2', 'A Coruña', AdminDivisionTypes.Comarca);
  PROVINCE_A.addSubLevel(COMARCA_A);
  const COMARCA_B = new AdminDivision('15', 'Santiago', AdminDivisionTypes.Comarca);
  PROVINCE_A.addSubLevel(COMARCA_B);
  const CONCELLO_A = new AdminDivision('15008', 'Bergondo', AdminDivisionTypes.Concello);
  COMARCA_B.addSubLevel(CONCELLO_A);
  const CONCELLO_B = new AdminDivision('15082', 'Teo', AdminDivisionTypes.Concello);
  COMARCA_B.addSubLevel(CONCELLO_B);
  const PROVINCE_B = new AdminDivision('27', 'Lugo', AdminDivisionTypes.Provincia);
  const COMARCA_B_A = new AdminDivision('19', 'A Fonsagrada', AdminDivisionTypes.Comarca);
  PROVINCE_B.addSubLevel(COMARCA_B_A);
  const CONCELLO_B_A = new AdminDivision('27004', 'Baleira', AdminDivisionTypes.Concello);
  COMARCA_B_A.addSubLevel(CONCELLO_B_A);

  beforeEach(() => {
    const divisionsIndex = {
      findByIneCode() {
        return PROVINCE_A;
      }
    };

    const divisionsRepository = {
      findAll() {
        return [PROVINCE_A, PROVINCE_B];
      }
    };

    divisionsService = new DivisionsService(divisionsIndex, divisionsRepository);
  });

  test('Should return comarcas of a province', () => {
    const subDivisions = divisionsService.findSubdivisionsOf('15', AdminDivisionTypes.Comarca);

    expect(subDivisions)
      .toEqual([COMARCA_A, COMARCA_B]);
  });

  test('Should return concellos of a province', () => {
    const subDivisions = divisionsService.findSubdivisionsOf('15', AdminDivisionTypes.Concello);

    expect(subDivisions)
      .toEqual([CONCELLO_A, CONCELLO_B]);
  });

  test('Should return all concellos', () => {
    const concellos = divisionsService.findAllDivisionsOfType(AdminDivisionTypes.Concello);

    expect(concellos)
      .toEqual([CONCELLO_A, CONCELLO_B, CONCELLO_B_A]);
  });
});
