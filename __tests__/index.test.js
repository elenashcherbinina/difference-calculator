import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getData = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'result-stylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'result-stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'result-stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'result-plain.txt'],
  ['file1.yaml', 'file2.yaml', 'plain', 'result-plain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'result-plain.txt'],
])('check diff', (file1, file2, formatName, resultFile) => {
  const expectedResult = genDiff(getFixturePath(file1), getFixturePath(file2), formatName);
  const result = getData(resultFile);
  expect(expectedResult).toBe(result);
});
