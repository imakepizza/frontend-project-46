import _ from 'lodash';

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

export default genTree;
