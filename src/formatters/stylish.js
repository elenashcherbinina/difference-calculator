import _ from 'lodash';

const replacer = ' ';
const standartSpacesCount = 2;
const spacesCount = 4;

const getIndent = (depth = 1) => replacer.repeat(depth * spacesCount - standartSpacesCount);

const stringify = (value, depth = 1) => {
  const currentIndent = getIndent(depth + 1);
  const bracketIndent = currentIndent.slice(2);

  if (!_.isObject(value)) return value;

  const lines = Object.entries(value).map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const makeStylish = (node, depth = 1) => {
  const currentIndent = getIndent(depth);
  const bracketIndent = currentIndent.slice(2);

  const result = node.map(({ key, type, value, children, valueFrom, valueTo }) => {
    const data = `${key}: ${stringify(value, depth)}`;

    switch (type) {
      case 'added': {
        return `${currentIndent}+ ${data}`;
      }
      case 'deleted': {
        return `${currentIndent}- ${data}`;
      }
      case 'unchanged': {
        return `${currentIndent}  ${data}`;
      }
      case 'changed': {
        return [
          `${currentIndent}- ${key}: ${stringify(valueFrom, depth)}`,
          `${currentIndent}+ ${key}: ${stringify(valueTo, depth)}`,
        ].join('\n');
      }
      case 'nested': {
        return `${currentIndent}  ${key}: ${makeStylish(children, depth + 1)}`;
      }
      default:
        throw new Error(`Type ${type} is not defined`);
    }
  });
  return ['{', ...result, `${bracketIndent}}`].join('\n');
};

const stylish = (tree) => makeStylish(tree, 1);

export default stylish;
