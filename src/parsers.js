import yaml from 'js-yaml';

const mapping = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.load(data),
  yaml: (data) => yaml.load(data),
};

const parse = (data, format) => mapping[format](data);

export default parse;
