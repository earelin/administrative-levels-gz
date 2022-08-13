class DivisionsService {
  constructor(divisionsRepository) {
    this.divisionsRepository = divisionsRepository;
  }

  findSubdivisionsOf(divisionId, subdivisionType) {
    const division = this.divisionsRepository.findById(divisionId);

  }
}

module.exports = DivisionsService;
