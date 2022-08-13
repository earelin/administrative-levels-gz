const {AdminDivision, AdminDivisionsAggregator, AdminDivisionTypes, lowerLevelOf, levelTypeToString, isLowerLevelOf} = require('../../src/domain/admin-levels');

describe('Political divisions', () => {

  const PROVINCE_ID = '15';
  const PROVINCE_NAME = 'A Coruña';
  const PROVINCE_TYPE = AdminDivisionTypes.Provincia;
  const PROVINCE_ALTERNATIVE_NAMES = ['Name A', 'Name B'];
  const PROVINCE_GEOMETRY = {
    type: 'Point',
    coordinates: [45.7, 50.34]
  };

  const LEVELS = [{
    id: PROVINCE_ID,
    name: PROVINCE_NAME,
    subLevels: [{
      id: '20',
      name: 'Santiago',
      subLevels: []
    }]
  }];

  describe('Aggregator', () => {
    test('Should add level', () => {
      const divisions = new AdminDivisionsAggregator();
      const province = new AdminDivision(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);

      divisions.addSubLevel(province);

      expect(divisions.hasSubLevel(province))
        .toBe(true);
    });

    test('Should detect not existent level', () => {
      const divisions = new AdminDivisionsAggregator();
      const province = new AdminDivision(PROVINCE_ID, PROVINCE_NAME);

      expect(divisions.hasSubLevel(province))
        .toBe(false);
    });

    test('Should return array of levels', () => {
      const divisions = new AdminDivisionsAggregator();
      const province = new AdminDivision(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);
      divisions.addSubLevel(province);

      expect(divisions.toJSON())
        .toEqual([{
          id: PROVINCE_ID,
          name: PROVINCE_NAME,
          type: 'Provincia',
          alternativeNames: [],
          subLevels: []
        }]);
    });

    test('Should return an empty array of levels', () => {
      const divisions = new AdminDivisionsAggregator();

      expect(divisions.toJSON())
        .toEqual([]);
    });

    test('Should find a sublevel by id', () => {
      const divisions = new AdminDivisionsAggregator();
      const province = new AdminDivision(PROVINCE_ID, PROVINCE_NAME);

      divisions.addSubLevel(province);

      expect(divisions.findSubLevelById(province.id))
        .toBe(province);
    });
  });

  describe('Administrative Level', () => {
    test('Should set properties on creation', () => {

      const province = new AdminDivision(PROVINCE_ID, PROVINCE_NAME,
        PROVINCE_TYPE, PROVINCE_ALTERNATIVE_NAMES, PROVINCE_GEOMETRY);

      expect(province.id)
        .toBe(PROVINCE_ID);
      expect(province.name)
        .toBe(PROVINCE_NAME);
      expect(province.type)
        .toBe(PROVINCE_TYPE);
      expect(province.alternativeNames)
        .toContain(...PROVINCE_ALTERNATIVE_NAMES);
      expect(province.geometry)
        .toBe(PROVINCE_GEOMETRY);
    });

    test('Should create from raw data', () => {
      const level = AdminDivision.from(LEVELS[0], AdminDivisionTypes.Provincia);

      expect(level)
        .toBeInstanceOf(AdminDivision);
      expect(level.toJSON())
        .toEqual({
          id: PROVINCE_ID,
          name: PROVINCE_NAME,
          type: 'Provincia',
          alternativeNames: [],
          subLevels: [{
            id: '20',
            name: 'Santiago',
            alternativeNames: [],
            type: 'Comarca',
            subLevels: []
          }]
        })
    });

    test('Should set and return list of alternative names', () => {
      const level = new AdminDivision(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);

      level.addAlternativeName('San Fiz');

      expect(level.alternativeNames)
        .toContain('San Fiz');
    });
  });

  describe('Legal types', () => {
    test.each([
      [AdminDivisionTypes.Provincia, AdminDivisionTypes.Comarca],
      [AdminDivisionTypes.Concello, AdminDivisionTypes.Parroquia],
      [AdminDivisionTypes.Poboacion, null],
    ])('Lower level type of %s: %s', (current, next) => {
      expect(lowerLevelOf(current))
        .toBe(next);
    })

    test.each([
      [AdminDivisionTypes.Provincia, 'Provincia'],
      [AdminDivisionTypes.Parroquia, 'Parroquia']
    ])('Type to string of %s: %s', (current, next) => {
      expect(levelTypeToString(current))
        .toBe(next);
    })

    test.each([
      [AdminDivisionTypes.Provincia, AdminDivisionTypes.Comarca, true],
      [AdminDivisionTypes.Concello, AdminDivisionTypes.Comarca, false],
      [AdminDivisionTypes.Parroquia, AdminDivisionTypes.Parroquia, false]
    ])('%s is second lower: %s', (parent, lower, expected) => {
      expect(isLowerLevelOf(parent, lower))
        .toBe(expected);
    })
  })
});
