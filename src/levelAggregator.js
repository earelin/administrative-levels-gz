class AdminLevelAggregator {
  constructor() {
    this.subLevels = new Map();
  }

  has(province) {
    return this.subLevels.has(province.id);
  }

  add(province) {
    if (!this.has(province)) {
      this.subLevels.set(province.id, province);
    }
  }

  toArray() {
    return Array.from(this.subLevels.values());
  }
}

class Province {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

module.exports = {
  AdminLevelAggregator: AdminLevelAggregator,
  Province
};
