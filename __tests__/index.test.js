import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixtureData = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  test.each(['json', 'yml', 'yaml'])('check %s', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);

    const resultStylish = getFixtureData('result-stylish.txt');
    const resultPlain = getFixtureData('result-plain.txt');
    const resultJson = getFixtureData('result-json.txt');

    expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(resultPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(resultJson);
  });
});
