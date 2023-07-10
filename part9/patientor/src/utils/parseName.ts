import isEmpty from './isEmpty';
import isString from './isString';

const parseName = (name: unknown) => {
  console.log(typeof name);

  if (!isString(name) || isEmpty(name) || Number(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

export default parseName;
