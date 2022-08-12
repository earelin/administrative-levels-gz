const {LevelTypes} = require('../domain/admin-levels');

class LevelsIndex {
  constructor(repository) {
    const tree = repository.findAll();
    this.levelsByIneCode = new Map();
    indexTree(this.levelsByIneCode, tree);
  }

  findByIneCode(id) {
    return this.levelsByIneCode.get(id);
  }
}

function indexTree(index, tree) {
  for (let level of tree) {
    if (level.type !== LevelTypes.Comarca) {
      index.set(level.id, level);
    }
    indexTree(index, level.getSubLevelsAsArray());
  }
}

module.exports = LevelsIndex;
