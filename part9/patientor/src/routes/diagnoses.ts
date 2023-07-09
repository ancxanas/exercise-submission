import express from 'express';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send('Fetching all diagnoses');
});

export default diagnosesRouter;
