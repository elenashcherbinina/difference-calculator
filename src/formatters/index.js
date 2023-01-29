import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(data);
    case 'plain':
      return makePlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`${formatName} is not supported`);
  }
};
