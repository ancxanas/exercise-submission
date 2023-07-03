interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[]): ExercisesResult => {
  let trainingDays = 0;
  let success;
  let target = 2;
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
  } else if (average >= target * 0.8) {
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

const exerciseHours = [2, 2, 2, 2, 2, 2, 2];

try {
  console.log(calculateExercises(exerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
}
