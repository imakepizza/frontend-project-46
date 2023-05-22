import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from '../src/parsers.js';
import formatTree from './formatters/index.js'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExtentionName = (filepath) => path.extname(filepath).slice(1);
export const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const getTree = (object1, object2) => {
 const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));
  const diff = keys.map((key) => {

if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { type: 'nested', key: key, value: getTree(object1[key], object2[key]) };
}
if (!_.has(object2, key)) {
   return { type: 'deleted', key: key, value: object1[key] };
}
if (!_.has(object1, key)) {
   return { type: 'added', key: key, value: object2[key] };
}
  if(object1[key] !== object2[key]) {
      return { type: 'changed', key: key, value: [object1[key], object2[key]] };
    }
return { type: 'unchanged', key: key, value: object1[key] }
  });
  return diff;
};
export const getParsedData = (filename) => {
const path = getFixturePath(filename);
const extention = getExtentionName(path);
const data = readFile(path)
const parsedData = parse(data, extention);
  return parsedData;
}
const genDiff = (file1, file2, format) => {
  const parsedData1 = getParsedData(file1);
  const parsedData2 = getParsedData(file2);
  const tree = getTree(parsedData1, parsedData2);
  return formatTree(tree, format);
}
export default genDiff;
