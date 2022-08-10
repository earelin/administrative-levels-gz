const LevelsRepository = require('./levels-repository');
const divisions = require(process.env.DATA_LEVELS_PATH);

module.exports = {
  levelsRepository: new LevelsRepository(divisions)
};
