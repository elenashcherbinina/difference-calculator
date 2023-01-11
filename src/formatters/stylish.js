import _ from 'lodash';

const replacer = ' ';
const standartSpacesCount = 2;
const spacesCount = 4;

const getIndent = (depth = 1) => replacer.repeat(depth * spacesCount - standartSpacesCount);

const getValue = (node, depth = 1) => {
  const currentIndent = getIndent(depth + 1);
  const bracketIndent = currentIndent.slice(2);

  if (!_.isObject(node)) return node;

  const lines = Object.entries(node).map(([key, val]) => `${currentIndent}  ${key}: ${getValue(val, depth + 1)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylishTree = (data, depth = 1) => {
  const currentIndent = getIndent(depth);
  const bracketIndent = currentIndent.slice(2);

  const lines = data.map((node) => {
    switch (node.type) {
      case 'added': {
        return `${currentIndent}+ ${node.key}: ${getValue(node.value, depth)}`;
      }
      case 'deleted': {
        return `${currentIndent}- ${node.key}: ${getValue(node.value, depth)}`;
      }
      case 'unchanged': {
        return `${currentIndent}  ${node.key}: ${getValue(node.value, depth)}`;
      }
      case 'changed': {
        return [
          `${currentIndent}- ${node.key}: ${getValue(node.valueFrom, depth)}`,
          `${currentIndent}+ ${node.key}: ${getValue(node.valueTo, depth)}`,
        ].join('\n');
      }
      case 'nested': {
        return `${currentIndent}  ${node.key}: ${stylishTree(node.children, depth + 1)}`;
      }
      default:
        throw new Error(`Type ${node.type} is not defined`);
    }
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (tree) => stylishTree(tree);

export default stylish;
