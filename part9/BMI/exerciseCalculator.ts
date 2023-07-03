import { isNotNumber } from './utils';

interface ExerciseValues {
  target: number;
  exerciseHours: number[];
}

interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 8) throw new Error('Not enough arguments');

  const slicedArgs = args.slice(2);

  const numberArrayWithoutTargetValue = slicedArgs.slice(1).map(Number);

  if (slicedArgs.map((arg) => !isNotNumber(arg))) {
    return {
      target: Number(slicedArgs[0]),
      exerciseHours: numberArrayWithoutTargetValue,
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const calculateExercises = (
  target: number,
  exerciseHours: number[]
): ExercisesResult => {
  let trainingDays = 0;
  let success;
  let ratingDescription;
  let rating;

  exerciseHours.map((hours) => {
    if (hours > 0) {
      trainingDays = trainingDays += 1;
    }
  });

  const totalExerciseHours = exerciseHours.reduce(
    (acc: number, curr: number) => {
      return acc + curr;
    },
    0
  );

  const average = totalExerciseHours / exerciseHours.length;

  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = 'Excellent, keep up the good work!';
  } else if (average >= target * 0.5) {
    success = false;
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    success = false;
    rating = 1;
    ratingDescription = 'you should work a lot better than this';
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    average,
    target,
    ratingDescription,
    success,
    rating,
  };
};

try {
  const { target, exerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(target, exerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
