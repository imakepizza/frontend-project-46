import genDiff from '../src/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const jsonContent1 = getFixturePath('file1.json');
const jsonContent2 = getFixturePath('file2.json');
const ymlContent1 = getFixturePath('file1.yml');
const ymlContent2 = getFixturePath('file2.yml');
const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true

}`;

describe('genDiff', () => {
  it('should work with json extention', () => {
    expect(genDiff(jsonContent1, jsonContent2) === expected).toBe(true);
  });
  it('should work with yml extention', () => {
    expect(genDiff(ymlContent1, ymlContent2) === expected).toBe(true);
  });
});
