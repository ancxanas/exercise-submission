import isEmpty from './isEmpty';
import isString from './isString';

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || isEmpty(occupation) || Number(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }

  return occupation;
};

export default parseOccupation;
