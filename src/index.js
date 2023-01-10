import { readFileSync } from 'node:fs';
import path from 'path';
import getParsedData from './parsers.js';
import buildAST from './buildAST.js';
import format from './formatters/index.js';

const getFullPath = (filename) => path.resolve(process.cwd(), filename);
const getData = (filename) => readFileSync(getFullPath(filename), 'utf8');
const getFormat = (filename) => path.extname(filename).slice(1);

export default (filename1, filename2, formatName = 'stylish') => {
  const format1 = getFormat(filename1);
  const format2 = getFormat(filename2);

  const data1 = getParsedData(getData(filename1), format1);
  const data2 = getParsedData(getData(filename2), format2);

  const data = buildAST(data1, data2);
  return format(data, formatName);
};
