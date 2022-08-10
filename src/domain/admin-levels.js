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
  static from(level) {
    const adminLevel = new AdminLevel(level.id, level.name);
    level.subLevels
      ?.map(subLevel => AdminLevel.from(subLevel))
      .forEach(subLevel => adminLevel.addSubLevel(subLevel));
    return adminLevel;
  }

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
