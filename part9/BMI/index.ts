import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { isNotNumber } from './utils';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (isNotNumber(Number(height)) || isNotNumber(Number(weight))) {
    return res.status(400).json({ error: 'height or weight are not numbers' });
  }

  const result = calculateBmi(Number(height), Number(weight));

  return res.json(result);
});

app.post('/exercises', (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises: dailyExercises } = req.body;

  if (!target || !dailyExercises) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    isNotNumber(target) ||
    !(
      dailyExercises instanceof Array &&
      dailyExercises.every((num) => typeof num === 'number')
    )
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(Number(target), dailyExercises as number[]);

  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
