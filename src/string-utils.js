i mport _ from 'lodash';

function capitalizeWords(string) {
  return string.toLocaleLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

function capitalize(string) {
  for (let i = 0; i < string.length; i++) {
    const character = string.charAt(i);
    if (_.isNumber(character)) {
      return string;
    }

    if (character.toLowerCase() !== character.toUpperCase()) {
      return string.substring(0, i) + character.toUpperCase() + string.substring(i + 1);
    }
  }

  return string;
}

function undoCommaSplit(string) {
  if (string.includes(',')) {
    const splitCommaString = string.split(',');

    if (splitCommaString[1].includes('(')) {
      const optionalNamePosition = splitCommaString[1].indexOf('(');
      splitCommaString[0] += " " + splitCommaString[1].slice(optionalNamePosition);
      splitCommaString[1] = splitCommaString[1].slice(0, optionalNamePosition);
    }

    return splitCommaString.reverse()
      .map(part => part.trim())
      .join(" ")
  }

  return string;
}

function extractIneCodeComponents(input) {
  const extractComponentsStrings = /([0-9][0-9])([0-9][0-9][0-9])?([0-9][0-9])?/;
  const componentsStrings = extractComponentsStrings.exec(input);

  if (doesNotMatchIneCodePattern(componentsStrings)) {
    return null;
  }

  return convertRegexResultToComponents(componentsStrings, input);
}

function doesNotMatchIneCodePattern(componentsStrings) {
  return !componentsStrings || !componentsStrings[1];
}

function convertRegexResultToComponents(componentsStrings, input) {
  const components = {
    provincia: componentsStrings[1]
  };

  if (input.length >= 5) {
    components.concello = components.provincia + componentsStrings[2];
  }

  if (input.length >= 7) {
    components.parroquia = components.concello + componentsStrings[3];
  }

  if (input.length === 9) {
    components.poboacion = input;
  }

  return components;
}



module.exports = {
  capitalizeWords,
  extractIneCodeComponents,
  undoCommaSplit
};
