import stylish from './stylish.js'
import plain from './plain.js'

const mapping = {
	'stylish': (diff) => stylish(diff),
	'plain': (diff) => plain(diff),
	'json': (diff) => JSON.stringify(diff),
}
const formatTree = (tree, format = 'stylish') => {
	return mapping[format](tree)
}
export default formatTree;