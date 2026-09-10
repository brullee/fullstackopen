import diagnosesData from "../data/diagnoses.ts";
import type { Diagnosis } from "../utils/types.ts";

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
