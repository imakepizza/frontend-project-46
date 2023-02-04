import fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  // const f1 = fs.readFileSync(file1, 'utf-8')
  // const f2 = fs.readFileSync(file2, 'utf-8')
  const obj1 = JSON.parse(filepath1);
  const obj2 = JSON.parse(filepath2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(uniqKeys);
  const result = sortedKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc.push(`+ ${key}: ${obj2[key]}\n`);
    } else if (!_.has(obj2, key)) {
      acc.push(`- ${key}: ${obj1[key]}\n`);
    } else if (obj1[key] === obj2[key]) {
      acc.push(`  ${key}: ${obj1[key]}\n`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`- ${key}: ${obj1[key]}\n`);
      acc.push(`+ ${key}: ${obj2[key]}\n`);
    }
    return acc;
  }, []);
  return `{\n${result.join('')}\n}`;
};

export default genDiff;
