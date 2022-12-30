import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  return _.sortBy(_.union(keys1, keys2));
};

const buildAST = (obj1, obj2) => {
  const keys = getSortedKeys(obj1, obj2);

  const data = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: buildAST(value1, value2) };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: value1 };
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value2 };
    }
    return { key, type: 'changed', valueFrom: value1, valueTo: value2 };
  });

  return data;
};

export default buildAST;
