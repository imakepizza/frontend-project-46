import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatTree from './formatters/index.js';
import genTree from './genTree.js'

const getExtentionName = (filepath) => path.extname(filepath).slice(1);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

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

export default genDiff;
