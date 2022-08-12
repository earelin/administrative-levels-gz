const divisions = require(process.env.DATA_LEVELS_PATH);
const LevelsRepository = require('./levels-repository');
const LevelsIndex = require('./levels-index');

const levelsRepository = new LevelsRepository(divisions);
const levelsIndex = new LevelsIndex(levelsRepository);

module.exports = {
  levelsIndex,
  levelsRepository
};
