import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const newNode = node.flatMap((n) => {
      const [type, key, value, children] = [n.type, n.key, n.value, n.children];
      const currentPath = path === '' ? `${key}` : `${path}.${key}`;
      switch (type) {
        case 'nested':
          return iter(children, currentPath);
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`;
        default:
          return [];
      }
    });
    return newNode.join('\n');
  };
  return iter(tree, '');
};

export default plain;
