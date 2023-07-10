import { NewPatient } from '../types';

const toNewPatient = (object: unknown): NewPatient => {
  const newPatient: NewPatient = {
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: 'male',
    occupation: 'New york city cop',
  };

  return newPatient;
};

export default toNewPatient;
