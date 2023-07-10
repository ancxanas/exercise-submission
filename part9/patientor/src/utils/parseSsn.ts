import isString from './isString';

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

export default parseSsn;
