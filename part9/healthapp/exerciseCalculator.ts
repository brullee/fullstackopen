interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hoursPerDay: number[],
  targetHours: number,
): ExerciseReport => {
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((h) => h > 0).length;
  const average = hoursPerDay.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= targetHours;
  const rating =
    average === targetHours || average > targetHours - targetHours * 0.75
      ? 2
      : average > targetHours
        ? 3
        : 1;
  const ratingDescription = success
    ? "great job"
    : "not too bad but could be better";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
