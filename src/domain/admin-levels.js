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

  constructor(id, name, type) {
    super();
    this.id = id;
    this.name = name;
    this.type = type;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      subLevels: super.toJSON()
    };
  }
}

const LevelTypes = Object.freeze({
  Provincia: Symbol("provincia"),
  Comarca: Symbol("comarca"),
  Concello: Symbol("concello"),
  Parroquia: Symbol("parroquia"),
  Poboacion: Symbol("poboacion")
});

const levelTypesOrder = [LevelTypes.Provincia, LevelTypes.Comarca, LevelTypes.Concello, LevelTypes.Parroquia, LevelTypes.Poboacion];

function lowerLevelOf(parent) {
  const parentTypeIndex = levelTypesOrder.indexOf(parent);

  if (parentTypeIndex + 1 < levelTypesOrder.length) {
    return levelTypesOrder[parentTypeIndex + 1];
  }

  return null;
}

module.exports = {
  AdminLevelAggregator,
  AdminLevel,
  LevelTypes,
  lowerLevelOf
};
