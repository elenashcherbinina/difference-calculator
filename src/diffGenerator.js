import _ from 'lodash';

export default (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const diff = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${value2}`;
    }
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (value1 === value2) {
      return `    ${key}: ${value2}`;
    }
    return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
  });
  const result = diff.join('\n');
  return `{\n${result}\n}`;
};
