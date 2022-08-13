const {AdminDivisionTypes} = require('../domain/admin-levels');

class LevelsIndex {
  constructor(repository) {
    const tree = repository.findAll();
    this.levelsByIneCode = new Map();
    this.comarcasById = new Map();
    indexTree(this.levelsByIneCode, this.comarcasById, tree);
  }

  findByIneCode(id) {
    return this.levelsByIneCode.get(id);
  }

  findComarcaById(id) {
    return this.comarcasById.get(id);
  }

  findAllComarcas() {
    return Array.from(this.comarcasById.values());
  }
}

function indexTree(index, comarcasIndex, tree) {
  for (let level of tree) {
    if (level.type !== AdminDivisionTypes.Comarca) {
      index.set(level.id, level);
    } else {
      comarcasIndex.set(level.id, level);
    }
    indexTree(index, comarcasIndex, level.getSubLevelsAsArray());
  }
}

module.exports = LevelsIndex;
