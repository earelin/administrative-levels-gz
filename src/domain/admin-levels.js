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

  getSubLevelsAsArray() {
    return Array.from(this.subLevels.values());
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
  static from(rawLevel, type = LevelTypes.Unknown) {
    const adminLevel = new AdminLevel(rawLevel.id, rawLevel.name, type, rawLevel.alternativeNames, rawLevel.geometry);
    const lowerLevel = lowerLevelOf(type);
    rawLevel.subLevels
      ?.map(subLevel => AdminLevel.from(subLevel, lowerLevel))
      .forEach(subLevel => adminLevel.addSubLevel(subLevel));
    return adminLevel;
  }

  constructor(id, name, type = LevelTypes.Unknown, alternativeNames = []) {
    super();
    this.id = id;
    this.name = name;
    this.type = type;
    this.alternativeNames = new Set(alternativeNames)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      alternativeNames: Array.from(this.alternativeNames),
      type: levelTypeToString(this.type),
      subLevels: super.toJSON()
    };
  }

  addAlternativeName(name) {
    this.alternativeNames.add(name);
  }

}

const LevelTypes = Object.freeze({
  Provincia: Symbol("provincia"),
  Comarca: Symbol("comarca"),
  Concello: Symbol("concello"),
  Parroquia: Symbol("parroquia"),
  Poboacion: Symbol("poboacion"),
  Unknown: Symbol("unknown")
});

const levelTypesOrder = [LevelTypes.Provincia, LevelTypes.Comarca, LevelTypes.Concello, LevelTypes.Parroquia, LevelTypes.Poboacion];

function lowerLevelOf(parent) {
  const parentTypeIndex = levelTypesOrder.indexOf(parent);

  if (parentTypeIndex + 1 < levelTypesOrder.length) {
    return levelTypesOrder[parentTypeIndex + 1];
  }

  return null;
}

const levelTypeStringMapping = new Map();
levelTypeStringMapping.set(LevelTypes.Provincia, "Provincia");
levelTypeStringMapping.set(LevelTypes.Comarca, "Comarca");
levelTypeStringMapping.set(LevelTypes.Concello, "Concello");
levelTypeStringMapping.set(LevelTypes.Parroquia, "Parroquia");
levelTypeStringMapping.set(LevelTypes.Poboacion, "Poboacion");
levelTypeStringMapping.set(LevelTypes.Unknown, "Unknown");

function levelTypeToString(levelType) {
  return levelTypeStringMapping.get(levelType);
}

module.exports = {
  AdminLevelAggregator,
  AdminLevel,
  LevelTypes,
  lowerLevelOf,
  levelTypeToString
};
