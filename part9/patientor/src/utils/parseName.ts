import isString from './isString';

const parseName = (name: unknown) => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

export default parseName;
