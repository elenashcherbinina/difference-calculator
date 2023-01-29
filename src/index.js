import { readFileSync } from 'node:fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import format from './formatters/index.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(readFileSync(buildFullPath(filepath), 'utf8'), extractFormat(filepath));

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const diff = buildDiffTree(data1, data2);
  return format(diff, formatName);
};
