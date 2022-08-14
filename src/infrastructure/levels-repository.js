const {AdminDivision, AdminDivisionTypes} = require('../domain/admin-levels');

class LevelsRepository {

  constructor(levelsDao) {
    this.levels = new Map();
    for (const levelDao of levelsDao) {
      this.levels.set(levelDao.id, AdminDivision.from(levelDao, AdminDivisionTypes.Provincia));
    }
  }

  findAll() {
    return Array.from(this.levels.values());
  }

}

module.exports = LevelsRepository;
