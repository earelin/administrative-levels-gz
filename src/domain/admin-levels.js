class AdminLevelAggregator {
  constructor() {
    this.subLevels = new Map();
  }

  hasSubLevel(adminLevel) {
    return this.subLevels.has(adminLevel.id);
  }

  addSubLevel(adminLevel) {
    if (!this.hasSubLevel(adminLevel)) {
      this.subLevels.set(adminLevel.id, adminLevel);
    }
  }

  toJSON() {
    return Array.from(this.subLevels.values())
      .map(subLevel => subLevel.toJSON());
  }

  findSubLevelById(id) {
    return this.subLevels.get(id);
  }
}

class AdminLevel extends AdminLevelAggregator {
  constructor(id, name) {
    super();
    this.id = id;
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      subLevels: super.toJSON()
    };
  }
}

module.exports = {
  AdminLevelAggregator,
  AdminLevel
};
