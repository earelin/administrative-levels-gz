import LevelsRepository from './levels-repository.js';
import LevelsIndex from './levels-index.js';
import fs from 'fs';

const divisions = JSON.parse(fs.readFileSync(process.env.DATA_LEVELS_PATH));

export const levelsRepository = new LevelsRepository(divisions);
export const levelsIndex = new LevelsIndex(levelsRepository);
