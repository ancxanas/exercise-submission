export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type SensitivePatient = Omit<Patient, 'ssn'>;
