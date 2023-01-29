import _ from 'lodash';

const replacer = ' ';
const signSpace = 2;
const spacesCount = 4;

const indent = (depth) => replacer.repeat(depth * spacesCount - signSpace);

const stringify = (data, depth) => {
  const currentIndent = indent(depth + 1);
  const bracketIndent = currentIndent.slice(2);

  if (!_.isObject(data)) return String(data);

  const lines = Object.entries(data).map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const buildTree = (data, depth = 1) => {
  const currentIndent = indent(depth);
  const bracketIndent = currentIndent.slice(2);

  const lines = data.map((node) => {
    switch (node.type) {
      case 'added': {
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'deleted': {
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'unchanged': {
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'changed': {
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.value1, depth)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.value2, depth)}`,
        ].join('\n');
      }
      case 'nested': {
        return `${currentIndent}  ${node.key}: ${stylishTree(node.children, depth + 1)}`;
      }
      default:
        throw new Error(`Type ${node.type} is not defined`);
    }
  });
  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const makeStylish = (tree) => buildTree(tree);

export default makeStylish;
