import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import { getParsedData } from '../src/index.js';

const expectedStylish = getParsedData('expectedStylish.txt')
const expectedPlain = getParsedData('expectedPlain.txt')
const expectedJSON = getParsedData('expectedJSON.txt')

test.each(['.json', '.yml', '.yaml'])('Compare with passing format', (extention) => {
  const file1 = `file1${extention}`;
  const file2 = `file2${extention}`;
  expect(genDiff(file1, file2 , 'stylish')).toEqual(expectedStylish);
  expect(genDiff(file1, file2 , 'plain')).toEqual(expectedPlain);
  expect(genDiff(file1, file2 , 'json')).toEqual(expectedJSON);
});
test('Compare without passing format', () => {
   const file1 = `file1.json`;
  const file2 = `file2.json`;
  expect(genDiff(file1, file2)).toEqual(expectedStylish);
});


