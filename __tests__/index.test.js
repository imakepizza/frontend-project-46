import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import  genDiff  from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('expectedJSON.txt'), 'utf-8');

test.each(['.json', '.yml', '.yaml'])('Compare with passing format', (extention) => {
  const file1 = getFixturePath(`file1${extention}`);
  const file2 = getFixturePath(`file2${extention}`);
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});

test('Compare without passing format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});
