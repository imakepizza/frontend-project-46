import fs from 'fs';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import path from 'path';
import parse from './parsers.js';
import formatTree from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getExtentionName = (filepath) => path.extname(filepath).slice(1);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const genTree = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));
  const diff = keys.map((key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { type: 'nested', key, children: genTree(object1[key], object2[key]) };
    }
    if (!_.has(object2, key)) {
      return { type: 'deleted', key, value: object1[key] };
    }
    if (!_.has(object1, key)) {
      return { type: 'added', key, value: object2[key] };
    }
    if (object1[key] !== object2[key]) {
      return { type: 'changed', key, value: [object1[key], object2[key]] };
    }
    return { type: 'unchanged', key, value: object1[key] };
  });
  return diff;
};

const getParsedData = (filepath) => {
  const extention = getExtentionName(filepath);
  const data = readFile(filepath);
  const parsedData = parse(data, extention);
  return parsedData;
};

const genDiff = (file1, file2, format = 'stylish') => {
  const parsedData1 = getParsedData(file1);
  const parsedData2 = getParsedData(file2);
  const tree = genTree(parsedData1, parsedData2);
  return formatTree(tree, format);
};
export { genDiff, getParsedData, getFixturePath };
export default genDiff;
