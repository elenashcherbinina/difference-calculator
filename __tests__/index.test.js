import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('check flat json', () => {
  const expectedResult = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const result = readFile('result-stylish.txt');
  expect(expectedResult).toBe(result);
});

test('check flat yml', () => {
  const expectedResult = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const result = readFile('result-stylish.txt');
  expect(expectedResult).toBe(result);
});

test('check flat yaml', () => {
  const expectedResult = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  const result = readFile('result-stylish.txt');
  expect(expectedResult).toBe(result);
});
