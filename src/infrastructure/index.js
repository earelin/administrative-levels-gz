const LevelsRepository = require('./levels-repository');
const divisions = require(process.env.DATA_LEVELS_PATH);

const levelsRepository = new LevelsRepository(divisions);

module.exports = {
  levelsRepository
};
