const {levelsIndex, levelsRepository} = require('../infrastructure');
const DivisionsService = require('./divisions-service');

const divisionsService = new DivisionsService(levelsIndex, levelsRepository);

module.exports = {
  divisionsService,
  levelsIndex,
  levelsRepository
};
