import { isNumber, isArray } from "./utils.ts";

interface ExerciseValues {
  hoursPerDay: number[];
  targetHours: number;
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

export const calculateExercises = (
  hoursPerDay: number[],
  targetHours: number,
): ExerciseReport => {
  // console.log(hoursPerDay);
  // console.log(targetHours);
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((h) => h > 0).length;
  const average = hoursPerDay.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= targetHours;
  const rating =
    average === targetHours || average > targetHours - targetHours * 0.25
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

export const parseBody = (
  hoursPerDay: unknown,
  targetHours: unknown,
): ExerciseValues => {
  if (!hoursPerDay || !targetHours) {
    throw new Error("parameters missing");
  }

  if (isArray(hoursPerDay) && isNumber(targetHours)) {
    return {
      hoursPerDay: hoursPerDay as number[],
      targetHours: Number(targetHours),
    };
  } else {
    throw new Error("malformatted parameters");
  }
};

if (process.argv[1] === import.meta.filename) {
  const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough arguments");

    if (isArray(args.slice(3)) && isNumber(args[2])) {
      return {
        hoursPerDay: args.slice(3).map(Number),
        targetHours: Number(args[2]),
      };
    } else {
      throw new Error("A Provided value was not of the correct type!");
    }
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
}
