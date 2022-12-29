import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getData = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'result-stylish.txt'],
  ['file1.yaml', 'file2.yaml', 'result-stylish.txt'],
  ['file1.yml', 'file2.yml', 'result-stylish.txt'],
  ['file3.json', 'file4.json', 'result-4-5.txt'],
  ['file3.yaml', 'file4.yaml', 'result-4-5.txt'],
  ['file3.yml', 'file4.yml', 'result-4-5.txt'],
])('check diff', (file1, file2, resultFile) => {
  const expectedResult = genDiff(getFixturePath(file1), getFixturePath(file2));
  const result = getData(resultFile);
  expect(expectedResult).toBe(result);
});
