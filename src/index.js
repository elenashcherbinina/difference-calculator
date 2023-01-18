/** @format */

import { readFileSync } from 'node:fs';
import path from 'path';
import parse from './parsers.js';
import buildAST from './buildAST.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const buildFullPath = path.resolve(process.cwd(), filepath);
  const getData = readFileSync(buildFullPath, 'utf8');
  const extractFormat = path.extname(filepath).slice(1);
  return parse(getData, extractFormat);
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const data = buildAST(data1, data2);
  return format(data, formatName);
};
