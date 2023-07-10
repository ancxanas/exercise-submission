import patients from '../../data/patients';

import { OmitPatientSSN, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
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

export default { getPatients, getSsnOmittedPatients, findPatientById };
