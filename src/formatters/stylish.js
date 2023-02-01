import _ from 'lodash';

const replacer = ' ';
const signSpace = 2;
const spacesCount = 4;

const indent = (depth, isFull = true) => {
  const size = depth * spacesCount;
  return isFull ? replacer.repeat(size) : replacer.repeat(size - signSpace);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) return String(data);

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

const getTree = (tree, depth = 1) => tree
  .map((node) => {
    switch (node.type) {
      case 'added': {
        return `${indent(depth, false)}+ ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'deleted': {
        return `${indent(depth, false)}- ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'unchanged': {
        return `${indent(depth)}${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'changed': {
        return [
          `${indent(depth, false)}- ${node.key}: ${stringify(node.value1, depth)}`,
          `${indent(depth, false)}+ ${node.key}: ${stringify(node.value2, depth)}`,
        ].join('\n');
      }
      case 'nested': {
        const children = getTree(node.children, depth + 1).join('\n');
        return `${indent(depth)}${node.key}: {\n${children}\n${indent(depth)}}`;
      }
      default:
        throw new Error(`Type ${node.type} is not defined`);
    }
  });

const formatStylish = (tree) => `{\n${getTree(tree).join('\n')}\n}`;

export default formatStylish;
