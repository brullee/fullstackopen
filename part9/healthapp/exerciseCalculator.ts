import { isNumber, isArray } from "./utils.ts";

interface ExerciseValues {
  targetHours: number;
  hoursPerDay: number[];
}

interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (isNumber(args[2]) && isArray(args[3].split(","))) {
    return {
      targetHours: Number(args[2]),
      hoursPerDay: args[3].split(",").map(Number),
    };
  } else {
    throw new Error("A Provided value was not of the correct type!");
  }
};

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

try {
  const { hoursPerDay, targetHours } = parseArguments(process.argv);
  console.log(calculateExercises(hoursPerDay, targetHours));
} catch (error: unknown) {
  let errorMessage = "An Error Occured: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
