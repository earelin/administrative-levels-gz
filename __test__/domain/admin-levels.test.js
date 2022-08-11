const {AdminLevel, AdminLevelAggregator, LevelTypes, lowerLevelOf, levelTypeToString} = require('../../src/domain/admin-levels');

describe('Political divisions', () => {

  const PROVINCE_ID = '15';
  const PROVINCE_NAME = 'A Coruña';
  const PROVINCE_TYPE = LevelTypes.Provincia;
  const LEVELS = [{
    id: PROVINCE_ID,
    name: PROVINCE_NAME,
    subLevels: [{
      id: '20',
      name: 'Santiago',
      subLevels: []
    }]
  }];
  const PROVINCE_GEOMETRY = {
    type: "Feature",
    geomerty: {
      type: 'Polygon',
      coordinates: [
        [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
        [100.0, 1.0], [100.0, 0.0]
      ]
    }
  };

  describe('Aggregator', () => {
    test('Should add level', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);

      divisions.addSubLevel(province);

      expect(divisions.hasSubLevel(province))
        .toBe(true);
    });

    test('Should detect not existent level', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      expect(divisions.hasSubLevel(province))
        .toBe(false);
    });

    test('Should return array of levels', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);
      divisions.addSubLevel(province);

      expect(divisions.toJSON())
        .toEqual([{
          id: PROVINCE_ID,
          name: PROVINCE_NAME,
          type: 'Provincia',
          alternativeNames: [],
          subLevels: [],
          geometry: null
        }]);
    });

    test('Should return an empty array of levels', () => {
      const divisions = new AdminLevelAggregator();

      expect(divisions.toJSON())
        .toEqual([]);
    });

    test('Should find a sublevel by id', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      divisions.addSubLevel(province);

      expect(divisions.findSubLevelById(province.id))
        .toBe(province);
    });
  });

  describe('Administrative Level', () => {

    test('Should set properties on creation', () => {
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);

      expect(province.id)
        .toBe(PROVINCE_ID);
      expect(province.name)
        .toBe(PROVINCE_NAME);
      expect(province.type)
        .toBe(PROVINCE_TYPE);
    });

    test('Should create from raw data', () => {
      const level = AdminLevel.from(LEVELS[0], LevelTypes.Provincia);

      expect(level)
        .toBeInstanceOf(AdminLevel);
      expect(level.toJSON())
        .toEqual({
          id: PROVINCE_ID,
          name: PROVINCE_NAME,
          type: 'Provincia',
          alternativeNames: [],
          geometry: null,
          subLevels: [{
            id: '20',
            name: 'Santiago',
            alternativeNames: [],
            type: 'Comarca',
            subLevels: [],
            geometry: null
          }]
        })
    });

    test('Should set and return list of alternative names', () => {
      const level = new AdminLevel(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);

      level.addAlternativeName('San Fiz');

      expect(level.alternativeNames)
        .toContain('San Fiz');
    });

    test('Should set and return geometry.', () => {
      const level = new AdminLevel(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE, [], PROVINCE_GEOMETRY);

      expect(level.geometry)
        .toEqual(PROVINCE_GEOMETRY);
    });
  });

  describe('Legal types', () => {
    test.each([
      [LevelTypes.Provincia, LevelTypes.Comarca],
      [LevelTypes.Concello, LevelTypes.Parroquia],
      [LevelTypes.Poboacion, null],
    ])('Lower level type of %s: %s', (current, next) => {
      expect(lowerLevelOf(current))
        .toBe(next);
    })

    test.each([
      [LevelTypes.Provincia, 'Provincia'],
      [LevelTypes.Parroquia, 'Parroquia']
    ])('Type to string of %s: %s', (current, next) => {
      expect(levelTypeToString(current))
        .toBe(next);
    })
  })
});
