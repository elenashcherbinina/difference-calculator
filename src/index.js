import { readFileSync } from 'node:fs';
import path from 'path';
import getParsedData from './parsers.js';
import buildAST from './buildAST.js';
import buildStylishTree from './formatters/stylish.js';

const getData = (filepath) => readFileSync(filepath, 'utf8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, format = 'stylish') => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const data1 = getParsedData(getData(filepath1), format1);
  const data2 = getParsedData(getData(filepath2), format2);

  const result = buildAST(data1, data2);
  return buildStylishTree(result, format);
};
