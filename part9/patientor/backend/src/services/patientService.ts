import { v1 as uuid } from "uuid";
import patientData from "../data/patients.ts";
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
} from "../utils/types.ts";

const patients: Patient[] = patientData;

const getPatient = (): Patient[] => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatient, getNonSensitivePatient, addPatient };
