import {AdminLevel, LevelTypes} from '../domain/admin-levels.js';

class LevelsRepository {

  constructor(levelsDao) {
    this.levels = new Map();
    for (const levelDao of levelsDao) {
      this.levels.set(levelDao.id, AdminLevel.from(levelDao, LevelTypes.Provincia));
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

export default LevelsRepository;
