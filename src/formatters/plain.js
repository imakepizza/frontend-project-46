import _ from 'lodash';
const stringify = (value) => _.isObject(value) ? `[complex value]` : _.isString(value) ? `'${value}'` : value; 
const plain = (tree) => {
	const iter = (node, path) => {
		return node.flatMap((n) => {
		const [type, key, value] = [n.type, n.key, n.value];
		const currentPath = path === '' ? `${key}` : `${path}.${key}`; 
		switch(type) {
			 case 'nested':
			 return iter(value, currentPath);
			case 'added':
			return `Property '${currentPath}' was added with value: ${stringify(value)}`;
			case 'deleted':
			return `Property '${currentPath}' was removed`;
			case 'unchanged':
			return [];
			case 'changed':
			return `Property '${currentPath}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`;
		}
	}).join('\n')
	}
	return iter(tree, '');
}
export default plain;