import { readFileSync } from 'node:fs';
import path from 'path';
import getParsedData from './parsers.js';
import buildAST from './buildAST.js';
import format from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => readFileSync(getFullPath(filepath), 'utf8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const data1 = getParsedData(getData(filepath1), format1);
  const data2 = getParsedData(getData(filepath2), format2);

  const data = buildAST(data1, data2);
  return format(data, formatName);
};
