const {isLowerLevelOf} = require('./admin-levels');

class DivisionsService {
  constructor(levelsIndex, levelsRepository) {
    this.levelsIndex = levelsIndex;
    this.levelsRepository = levelsRepository;
  }

  findAllDivisionsOfType(divisionType) {
    return this.levelsRepository.findAll()
      .flatMap(province => this.findSubdivisionsFromReference(province, divisionType));
  }

  findSubdivisionsFromReference(parent, divisionType) {
    if (isLowerLevelOf(parent.type, divisionType)) {
      return getSubLevelsOf(parent, divisionType);
    }

    return null;
  }

  findSubdivisionsOf(divisionId, subdivisionType) {
    const division = this.levelsIndex.findByIneCode(divisionId);

    return this.findSubdivisionsFromReference(division, subdivisionType);
  }
}

function getSubLevelsOf(parent, subDivisionType) {
  const subDivisions = parent.getSubLevelsAsArray();

  if (subDivisions.length === 0) {
    return [];
  }

  if (subDivisions[0].type === subDivisionType) {
    return subDivisions;
  }

  return subDivisions.flatMap(subDivision => getSubLevelsOf(subDivision, subDivisionType));
}

module.exports = DivisionsService;
