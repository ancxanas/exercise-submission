import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getSsnOmittedPatients());
});

patientRouter.post('/', (req, res) => {});

export default patientRouter;
