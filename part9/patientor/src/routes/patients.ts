/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findOmittedSsnPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getSsnOmittedPatients());
});

patientRouter.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });

  res.json(addedPatient);
});

export default patientRouter;
