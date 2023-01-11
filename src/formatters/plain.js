import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const plainTree = (data, path = '') => {
  const lines = data
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'added': {
          return `Property '${path}${node.key}' was added with value: ${getValue(node.value)}`;
        }
        case 'deleted': {
          return `Property '${path}${node.key}' was removed`;
        }
        case 'changed': {
          return `Property '${path}${node.key}' was updated. From ${getValue(node.valueFrom)} to ${getValue(
            node.valueTo,
          )}`;
        }
        case 'nested': {
          return plainTree(node.children, `${path}${node.key}.`);
        }
        default:
          throw new Error(`Type ${node.type} is not defined`);
      }
    });
  return lines.join('\n');
};

const plain = (tree) => plainTree(tree);

export default plain;
