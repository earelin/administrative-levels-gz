class Divisions {
  constructor() {
    this.provinces = new Map();
  }

  has(province) {
    return this.provinces.has(province.id);
  }

  add(province) {
    if (!this.has(province)) {
      this.provinces.set(province.id, province);
    }
  }

  toArray() {
    return Array.from(this.provinces.values());
  }
}

class Province {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

module.exports = {
  Divisions,
  Province
};
