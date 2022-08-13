class AdminDivisionsAggregator {
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

class AdminDivision extends AdminDivisionsAggregator {
  static from(rawLevel, type = AdminDivisionTypes.Unknown) {
    const adminLevel = new AdminDivision(rawLevel.id, rawLevel.name, type, rawLevel.alternativeNames, rawLevel.geometry);
    const lowerLevel = lowerLevelOf(type);
    rawLevel.subLevels
      ?.map(subLevel => AdminDivision.from(subLevel, lowerLevel))
      .forEach(subLevel => adminLevel.addSubLevel(subLevel));
    return adminLevel;
  }

  constructor(id, name, type = AdminDivisionTypes.Unknown, alternativeNames = []) {
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

const AdminDivisionTypes = Object.freeze({
  Provincia: Symbol("provincia"),
  Comarca: Symbol("comarca"),
  Concello: Symbol("concello"),
  Parroquia: Symbol("parroquia"),
  Poboacion: Symbol("poboacion"),
  Unknown: Symbol("unknown")
});

const levelTypesOrder = [AdminDivisionTypes.Provincia, AdminDivisionTypes.Comarca, AdminDivisionTypes.Concello, AdminDivisionTypes.Parroquia, AdminDivisionTypes.Poboacion];

function lowerLevelOf(parent) {
  const parentTypeIndex = levelTypesOrder.indexOf(parent);

  if (parentTypeIndex + 1 < levelTypesOrder.length) {
    return levelTypesOrder[parentTypeIndex + 1];
  }

  return null;
}

function isLowerLevelOf(parentLevelType, levelType) {
  return (levelTypesOrder.indexOf(levelType)
    - levelTypesOrder.indexOf(parentLevelType)) > 0;
}

const levelTypeStringMapping = new Map();
levelTypeStringMapping.set(AdminDivisionTypes.Provincia, "Provincia");
levelTypeStringMapping.set(AdminDivisionTypes.Comarca, "Comarca");
levelTypeStringMapping.set(AdminDivisionTypes.Concello, "Concello");
levelTypeStringMapping.set(AdminDivisionTypes.Parroquia, "Parroquia");
levelTypeStringMapping.set(AdminDivisionTypes.Poboacion, "Poboacion");
levelTypeStringMapping.set(AdminDivisionTypes.Unknown, "Unknown");

function levelTypeToString(levelType) {
  return levelTypeStringMapping.get(levelType);
}

module.exports = {
  AdminDivisionsAggregator,
  AdminDivision,
  AdminDivisionTypes,
  lowerLevelOf,
  levelTypeToString,
  isLowerLevelOf
};
