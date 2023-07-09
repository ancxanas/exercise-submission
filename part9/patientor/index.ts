import express from 'express';
import cors from 'cors';

import patientRouter from './src/routes/patients';
import diagnosesRouter from './src/routes/diagnoses';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
