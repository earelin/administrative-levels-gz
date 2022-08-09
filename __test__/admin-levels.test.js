const {AdminLevel, AdminLevelAggregator} = require('../src/admin-levels');

describe('Political divisions', () => {

  const PROVINCE_ID = '15';
  const PROVINCE_NAME = 'A Coruña';

  describe('Aggregator', () => {
    test('Should add level', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      divisions.add(province);

      expect(divisions.has(province))
        .toBe(true);
    });

    test('Should detect not existent level', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      expect(divisions.has(province))
        .toBe(false);
    });

    test('Should return array of levels', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      divisions.add(province);

      expect(divisions.toArray())
        .toEqual([{
          id: PROVINCE_ID,
          name: PROVINCE_NAME
        }]);
    });
  });

  describe('Administrative Level', () => {

    test('Should set properties on creation', () => {
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      expect(province.id)
        .toBe(PROVINCE_ID);
      expect(province.name)
        .toBe(PROVINCE_NAME);
    });
  });
});
