import { readFileSync } from 'node:fs';
import path from 'path';
import getParsedData from './parsers.js';
import getDiff from './diffGenerator.js';

const getData = (filepath) => readFileSync(filepath, 'utf8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const data1 = getParsedData(getData(filepath1), format1);
  const data2 = getParsedData(getData(filepath2), format2);

  const result = getDiff(data1, data2);
  return result;
};
