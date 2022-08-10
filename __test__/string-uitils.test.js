const {capitalizeWords, undoCommaSplit, extractIneCodeComponents} = require('../src/string-utils');

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
    });
  });

  describe('Extract INE code components', () => {
    test.each([
      ['asdf', null],
      ['15', { provincia: '15' }],
      ['15008', { provincia: '15', concello: '15008'}],
      ['1500809', { provincia: '15', concello: '15008', parroquia: '1500809'}],
      ['150080925', { provincia: '15', concello: '15008', parroquia: '1500809', poboacion: '150080925'}],
    ])('Extract INE code components %s: %s', (input, expected) => {
      expect(extractIneCodeComponents(input))
        .toEqual(expected);
    });
  });
});
