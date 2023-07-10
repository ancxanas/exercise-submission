import isEmpty from './isEmpty';
import isString from './isString';

const parseName = (name: unknown) => {
  if (!isString(name) || isEmpty(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

export default parseName;
