import { readFileSync } from 'node:fs';
import _ from 'lodash';

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const parseFile = (data) => JSON.parse(data);

const compareAndSort = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeysSorted = _.sortBy(_.union(keys1, keys2));
  let result = '';

  for (const key of uniqKeysSorted) {
    if (!_.has(obj1, key)) {
      result += ` + ${key}: ${obj2[key]}\n`;
    } else if (!_.has(obj2, key)) {
      result += ` - ${key}: ${obj2[key]}\n`;
    } else if (obj1[key] === obj2[key]) {
      result += `   ${key}: ${obj2[key]}\n`;
    } else {
      result += ` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}\n`;
    }
  }
  result = `{\n${result}}`;
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(readFile(filepath1));
  const data2 = parseFile(readFile(filepath2));
  const result = compareAndSort(data1, data2);
  return result;
};

export default genDiff;
