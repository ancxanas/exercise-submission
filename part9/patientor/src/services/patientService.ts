import patients from '../../data/patients';

import { OmitPatientSSN, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getSsnOmittedPatients = (): OmitPatientSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients, getSsnOmittedPatients };
