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

  toArray() {
    return Array.from(this.subLevels.values());
  }
}

class AdminLevel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

module.exports = {
  AdminLevelAggregator,
  AdminLevel
};
