const {capitalizeWords, undoCommaSplit} = require('../src/string-utils');

describe('String utils', () => {
  describe('Capitalize words', () => {
    test.each([
      ['CORUÑA, A', 'Coruña, A'],
      ['LUGO', 'Lugo'],
      ['Cabanas (San Xián)', 'Cabanas (San Xián)']
    ])('Capitalize %s: %s', (input, expected) => {
      expect(capitalizeWords(input))
        .toEqual(expected);
    });
  });

  describe('Undo comma separation', () => {
    test.each([
      ['Coruña, A', 'A Coruña'],
      ['Lugo', 'Lugo'],
      ['Barra, A (Santa María)', 'A Barra (Santa María)']
    ])('Undo comma split %s: %s', (input, expected) => {
      expect(undoCommaSplit(input))
        .toEqual(expected);
    })
  })
});
