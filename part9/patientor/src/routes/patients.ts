import express from 'express';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send('Fetching all patients');
});

patientRouter.post('/', (_req, res) => {
  res.send('Saving a patient');
});

export default patientRouter;
