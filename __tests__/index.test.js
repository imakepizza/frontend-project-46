import genDiff from '../src/index.js';
import { getParsedData } from '../src/index.js';
import { getFixturePath } from '../src/index.js';

const expectedStylish = getParsedData(getFixturePath('expectedStylish.txt'));
const expectedPlain = getParsedData(getFixturePath('expectedPlain.txt'));
const expectedJSON = getParsedData(getFixturePath('expectedJSON.txt'));

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
