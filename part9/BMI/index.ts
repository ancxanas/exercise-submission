import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';
import { isNotNumber } from './utils';

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
