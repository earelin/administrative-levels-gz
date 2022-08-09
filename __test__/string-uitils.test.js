const {capitalize} = require('../src/string-utils');

describe('String utils', () => {
  describe('Capitalize words', () => {
    test.each([
      ['CORUÑA, A', 'Coruña, A'],
      ['LUGO', 'Lugo']
    ])('Capitalize %i: %i', (input, expected) => {
      expect(capitalize(input))
        .toEqual(expected);
    });
  });

  describe()
});
