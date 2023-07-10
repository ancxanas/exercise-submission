import isEmpty from './isEmpty';
import isString from './isString';

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || isEmpty(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

export default parseSsn;
