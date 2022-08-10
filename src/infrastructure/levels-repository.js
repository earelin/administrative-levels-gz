class LevelsRepository {

  constructor(levelsDao) {
    this.levelsDao = levelsDao;
  }

  findAll() {
    return this.levelsDao;
  }

}

module.exports = LevelsRepository;
