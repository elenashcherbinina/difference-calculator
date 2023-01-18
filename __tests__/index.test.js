import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixtureData = (filename) => readFileSync(buildFixturePath(filename), 'utf-8');

const resultStylish = getFixtureData('result-stylish.txt');
const resultPlain = getFixtureData('result-plain.txt');
const resultJson = getFixtureData('result-json.txt');

describe('gendiff', () => {
  test.each(['json', 'yml', 'yaml'])('check %s', (format) => {
    const filepath1 = buildFixturePath(`file1.${format}`);
    const filepath2 = buildFixturePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(resultPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(resultJson);
  });
});
