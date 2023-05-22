import yaml from 'js-yaml';

const mapping = {
  'json': (data) => JSON.parse(data),
  'yml': (data) => yaml.load(data),
  'yaml':(data) => yaml.load(data),
  'txt': (data) => data,
}

const parse = (data, format) => {
  return mapping[format](data);
}
export default parse;
