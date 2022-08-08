const {Province} = require('./divisions');

describe('Political divisions', () => {
  describe('Province', () => {
    const ID = '15';
    const NAME = 'A Coruña';

    test('Should set properties on creation', () => {
      const province = new Province(ID, NAME);

      expect(province.id)
        .toBe(ID);
      expect(province.name)
        .toBe(NAME);
    })
  });
});
