import { Gender } from '../types';
import isGender from './isGender';
import isString from './isString';

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

export default parseGender;
