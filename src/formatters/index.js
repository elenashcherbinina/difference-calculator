import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';

export default (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatToStylish(data);
    case 'plain':
      return formatToPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`${formatName} is not supported`);
  }
};
