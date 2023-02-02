import genDiff from '../src/index.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonPath1 = readFile('file1.json')
const jsonPath2 = readFile('file2.json')
const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true

}`

describe('genDiff', () => {
	it('should work', ()=> {
		expect(genDiff(jsonPath1, jsonPath2) === expected).toBe(true)
	})
});