const {AdminLevel} = require('../domain/admin-levels');

class LevelsRepository {

  constructor(levelsDao) {
    this.levels = new Map();
    for (const levelDao of levelsDao) {
      this.levels.set(levelDao.id, AdminLevel.from(levelDao));
    }
  }

  static convertArraysToMap() {

  }

  findAll() {
    return Array.from(this.levels.values());
  }

  findById(id) {
    return this.levels.get(id);
  }
}

module.exports = LevelsRepository;
