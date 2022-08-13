const {isLowerLevelOf} = require('./admin-levels');

class DivisionsService {
  constructor(divisionsRepository) {
    this.divisionsRepository = divisionsRepository;
  }

  findSubdivisionsOf(divisionId, subdivisionType) {
    const division = this.divisionsRepository.findById(divisionId);

    if (isLowerLevelOf(division.type, subdivisionType)) {
      return getSubLevelsOf(division, subdivisionType);
    }

    return null;
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
