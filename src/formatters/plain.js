import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const plainTree = (data, path = '') => {
  const lines = data
    .filter((node) => node.type !== 'unchanged')
    .map(({ key, type, value, children, valueFrom, valueTo }) => {
      switch (type) {
        case 'added': {
          return `Property '${path}${key}' was added with value: ${getValue(value)}`;
        }
        case 'deleted': {
          return `Property '${path}${key}' was removed`;
        }
        case 'changed': {
          return `Property '${path}${key}' was updated. From ${getValue(valueFrom)} to ${getValue(valueTo)}`;
        }
        case 'nested': {
          return plainTree(children, `${path}${key}.`);
        }
        default:
          throw new Error(`Type ${type} is not defined`);
      }
    });
  return lines.join('\n');
};

const plain = (tree) => plainTree(tree);

export default plain;
