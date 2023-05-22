import _ from 'lodash';
const status = {
	nested: ' ',
	added: '+',
	deleted: '-',
	unchanged: ' ',
}
const stringify = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indent = '    '.repeat(currentDepth);
    const bracketIndent = '    '.repeat(currentDepth - 1);
    const lines = Object.entries(currentValue).map(([key, val]) => {
    	return`${indent}${key}: ${stringify(val, currentDepth + 1)}`
    })
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, depth);
};

const stylish = (tree) => {
	const iter = (node, depth) => {
		return node.map((n) => {
		const indent = depth * 4;
		const bracketIndent = ' '.repeat(indent);
		const keyIndent = ' '.repeat(indent - 2);
		const [type, key, value] = [n.type, n.key, n.value];
		switch(type) {
			case 'nested':
			return `${keyIndent}${status[type]} ${key}: {\n${iter(value, depth + 1).join('\n')}\n${bracketIndent}}`;
			case 'added':
			return `${keyIndent}${status[type]} ${key}: ${stringify(value, depth + 1)}`;
			case 'deleted':
			return `${keyIndent}${status[type]} ${key}: ${stringify(value, depth + 1)}`;
			case 'unchanged':
			return `${keyIndent}${status[type]} ${key}: ${stringify(value, depth + 1)}`;
			case 'changed':
			return `${keyIndent}${status['deleted']} ${key}: ${stringify(value[0], depth + 1)}\n${keyIndent}${status['added']} ${key}: ${stringify(value[1], depth + 1)}`;
		}
	})
	}
	return ['{', ...iter(tree, 1), '}'].join('\n');
}

export default stylish