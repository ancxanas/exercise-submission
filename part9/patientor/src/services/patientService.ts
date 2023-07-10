import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, OmitPatientSSN, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const findPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const findOmittedSsnPatientById = (id: string): OmitPatientSSN | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    const { id, name, dateOfBirth, gender, occupation } = patient;
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  }

  return undefined;
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

const addPatient = (patientDetails: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...patientDetails,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getSsnOmittedPatients,
  findOmittedSsnPatientById,
  findPatientById,
};
